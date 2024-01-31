---
slug: "/blog/embedding-v8-in-rust"
date: "2024-01-27"
title: "Calling JavaScript functions from Rust by embedding V8"
description: "How, and why, I embedded V8 in Rust to support JavaScript plugins in my static site generator, Stuart."
---

Being the language of the web, JavaScript seems to be everywhere and do everything. And sometimes, as much as I wish it weren't the case, it's the best tool for the job. In this post, I'll be discussing how I used V8 to add support for JavaScript plugins to my static site generator, Stuart, as well as why I thought this was a remotely good idea in the first place.

## Background: Supporting {{ mathi("\LaTeX") }}

As I wrote more and more LaTeX as part of my [most recent blog post](/blog/youngest-player-starts), I quickly began to realise that manually converting all my equations to images was going to be a pain. Given that I'd never really written such a maths-heavy post before, I'd always been able to make do with the occasional formula manually rendered in an image, but this time I was clearly going to need something better.

Stuart, which this blog is built with, and which you can read all about [here](/blog/building-stuart), has a fairly nice plugin system, so all I needed to do was write a little LaTeX plugin. There was just one problem: LaTeX is massive. Like, several gigabytes massive. I definitely didn't want the poor Cloudflare Pages build VM to have to download all that every time it built my blog, so I needed to find a way to render the equations without having to install LaTeX.

My mind immediately jumped to MathJax, being something I'd [used before](/blog/how-i-built-equion) to render equations client-side on the web. However, for a static site, I really wanted to be able to render the equations at build time, so I could just include the SVGs in the final HTML without also serving loads of JavaScript to render them. MathJax is also written in JavaScript - not ideal for a Rust plugin.

I found a project called [`mathjax_svg`](https://github.com/gw31415/mathjax_svg) which seemed to solve all my problems: it does some magic to let me use MathJax from Rust at build time! But upon digging deeper to discover the nature of this magic, I found that it actually spins up an entire V8 instance just to render the equations. This seemed a bit overkill, but it gave me an idea.

### What is V8?

Before we get into my fun idea, let's take a step back and talk about what V8 is. I've written about V8 before, in my [post](/blog/webgl-garbage-collection) about its garbage collector, but I'll give you a quick recap here just in case you aren't a sufficiently dedicated reader.

V8 is the JavaScript engine that powers Chrome, Node.js, and a bunch of other stuff. Written in C++, it deals with the low-level process of taking JavaScript source code and executing it on the CPU. It's a pretty complicated piece of software with lots of moving parts, but being so ubiquitous in the world of JavaScript, it's been written about a lot and there's plenty of good documentation out there.

That's all you need to know for now - back to the idea.

### The Idea

While a Rust plugin having its own V8 instance just to call MathJax seemed a bit overkill, what if I could have a single V8 instance for the whole build process that could be used by all plugins? Or, even better, what if I could just support JavaScript plugins natively, and deal with the whole V8 thing internally?

This seemed like a pretty good idea to me - the ease of writing and modifying plugins in JavaScript combined with the speed of Rust would make Stuart even more powerful.

## Actually Doing It

Okay, so how do we even start? Well, using V8 from Rust is pretty easy thanks to the [`v8`](https://crates.io/crates/v8) crate. It conveniently ships with pre-built V8 binaries for all the major platforms, so all the hard work of compiling and linking V8 is done for us behind the scenes.

### Isolates, Handles, Scopes and Contexts

V8 has some specific concepts that are important to understand before we can get started. The following is largely taken from the [V8 docs](https://v8.dev/docs/embed), but since they refer to C++ APIs, I'll be discussing the Rust way of doing things.

- An **isolate** is a single instance of the V8 engine, with its own heap. You can't access the same isolate from multiple threads, but you can create multiple isolates and run them in parallel.

- A **handle** is a reference to a V8 object. Since V8 is garbage collected, you can't just store a raw pointer, because the object might get [moved around in memory](/blog/webgl-garbage-collection) or even destroyed entirely. Instead, handles allow V8 to keep track of which objects are accessible from Rust, and update pointers when necessary.

- All handles are created within a **handle scope**. This is how Rust reasons about the ownership and lifetimes of handles: you can think of handles as being owned by the scope they're created in. When the scope is dropped, all the handles created within it are dropped too, leaving the objects they pointed to free to be GC'd, provided nothing within V8 is still using them.

- A **context** is a V8 object that holds all the global variables and functions that are accessible from JavaScript. Originally implemented to allow different tabs in Chrome to have their own sandboxed JavaScript environment within one isolate, we'll be using them to keep plugins separate from each other.

Wow, this almost feels like my lecture notes. That's the end of the definitions, I promise.

### Initialising V8

Before we can even create our isolate, we need to initialise V8.

```rs
v8::V8::initialize_platform(v8::new_default_platform(0, false).make_shared());
v8::V8::initialize();
```

Cool. But don't do it twice, or you'll get the somewhat cryptic error message "invalid global state". I avoided this by using `Once` to ensure that the initialisation code only runs once:

```rs
static INIT: Once = Once::new();

// --snip--

INIT.call_once(|| {
  v8::V8::initialize_platform(v8::new_default_platform(0, false).make_shared());
  v8::V8::initialize();
});
```

Even more fun is the fact that we need our isolate to be thread local, so we can't just do the same thing for its initialisation. Instead, we need to use `thread_local!` to create a new isolate for each thread:

```rs
thread_local! {
    static ISOLATE: RefCell<v8::OwnedIsolate> =
        RefCell::new(v8::Isolate::new(Default::default()));
}
```

We need to use `RefCell` here because we can access the isolate from anywhere in the code (as long as it's from the same thread), even in places where we'd enrage the borrow checker (e.g. if we tried to borrow it mutably in a function that was called by one that already has a mutable borrow). `RefCell` just moves the borrow checking to runtime - you can think of it like a single-threaded mutex. Just don't think too hard about what "single-threaded mutex" really means...

### Loading a Plugin

Now that we've got our isolate, we can run some JavaScript! The code for this gets very messy, very quickly, as almost every function takes a handle scope as an argument to keep the garbage collector at bay, so I'll only include the important bits here. You can find the whole implementation [here](https://github.com/w-henderson/Stuart/tree/master/stuart/src/plugins/js).

We'll start by creating a handle scope to allocate our context in, then create a context. We need the context to stay alive for the whole lifetime of the plugin, so we'll store it in a `Global`: a handle that doesn't get destroyed when the scope it was created in is dropped. This handle will be stored within the plugin struct, so we can access it later. Finally, we'll create a context scope, which wraps the handle scope with the additional context information.

```rs
let handle_scope = &mut v8::HandleScope::new(&mut *isolate);
let context = v8::Context::new(handle_scope);
let global_context = v8::Global::new(handle_scope, context);
let scope = &mut v8::ContextScope::new(handle_scope, context);
```

Using the context scope, we can compile and instantiate the JavaScript module for the plugin. `source` refers to a V8 string containing the source code for the plugin, and `origin` is a V8 `ScriptOrigin` object that contains information about where the source code came from, in order to give helpful error messages.

```rs
let compile_source = v8::script_compiler::Source::new(source, Some(&origin));
let module = v8::script_compiler::compile_module(scope, compile_source)?;
module.instantiate_module(scope, |_, _, _, m| Some(m))?;
module.evaluate(scope)?;
```

All that's left to do at plugin load time is to parse the plugin's default export, and store all the functions it supports as global objects within its newly-created context. I'm not going to copy all the code here, because it's largely irrelevant, but the V8 API lets us query the object in a fairly intuitive way.

We only keep track of the names of the functions that the plugin supports, because we can use the global objects to find them later.

A very very basic plugin looks something like this:

```js
export default {
  name: "my_plugin",
  version: "0.0.1",
  functions: [
    {
      name: "add",
      fn: (a, b) => a + b
    }
  ]
}
```

### Calling a Plugin Function

Now for what we've all been waiting for: actually calling a JavaScript function provided by the plugin, from Rust.

We first need to create a new handle scope and corresponding context scope for the plugin's context. This scope will last for the duration of the function call, but will be dropped afterwards.

Then, we need to convert the function's argument from Stuart's Rust representation to V8 objects. Stuart allows strings and integers as direct arguments, as well as variables which are just JSON objects. I didn't really think about my decision to use JSON objects for variables back when I was first prototyping Stuart, but it turns out to be extremely convenient here - the mapping is almost trivial.

Once we've done that, we can retrieve the function from the context's corresponding global object, the name of which is stored as a V8 string in the `key` variable below.

```rs
let function = v8::Local::<v8::Function>::try_from(
    context.global(scope).get(scope, key).unwrap()
).unwrap();
```

Just before we call the function, we call this very important and complicated function, which I'll discuss in just a moment:

```rs
context::set_stuart_context(scope, stuart_scope);
```

Finally, we can call the function using V8's nice API, convert its result to a string, and put it into the document.

```rs
if let Some(result) = function.call(scope, function_obj, &evaluated_args) {
    if !result.is_undefined() {
        stuart_scope
            .output(result.to_rust_string_lossy(scope))
            .unwrap();
    }
}
```

And that's how you call a JavaScript function from Rust! But what's that `context::set_stuart_context` function all about?

### Calling Rust from JavaScript

While not necessary for compiling LaTeX, some functions might need access to more Stuart state than just their arguments. For example, a function might want to modify variables during the build process so that it can be used in conjunction with other functions from other plugins, or even built-in functions.

In order to do this, we need some way in JavaScript of accessing the Stuart context (we're using the word "context" in a different context here...). I decided the best way to do this would be to have a global JavaScript object called `STUART` that contains `get` and `set` functions for accessing and modifying variables. These functions would be implemented in Rust but called from JavaScript. The details of these functions aren't important, as they just interact with the Stuart build system in a fairly straightforward way.

The `context::set_stuart_context` function is responsible for setting up this global object. We use V8 `FunctionTemplate`s to create JavaScript functions that call Rust functions, and store a pointer to Stuart's `Scope` as a V8 `External` object, which is a JavaScript object that wraps a C pointer.

```rs
let set = v8::FunctionTemplate::new(scope, set_fn).get_function(scope).unwrap();
let get = v8::FunctionTemplate::new(scope, get_fn).get_function(scope).unwrap();
let ptr = v8::External::new(scope, context as *mut _ as *mut std::ffi::c_void);
```

Retrieving the `&mut Scope` from the called Rust function is as simple (and unsafe!) as this:

```rs
unsafe fn get_stuart_context<'s>(
    scope: &mut v8::HandleScope,
    obj: v8::Local<'_, v8::Object>,
) -> &'s mut Scope<'s> {
    let k_external = v8::String::new(scope, "_ptr").unwrap();

    (v8::Local::<v8::External>::try_from(obj.get(scope, k_external.into()).unwrap())
        .unwrap()
        .value() as *mut Scope)
        .as_mut()
        .unwrap()
}
```

All we have to do is get the `External` object from the `_ptr` field of the `STUART` object (which is passed as the `obj` argument), and make the appropriate casts.

How do we know this is safe? Well, we know that the pointer points to a valid object when we create it in `set_stuart_context`, as we got it from a `&mut Scope`. Without returning from the outermost Rust function that deals with calling an arbitrary JavaScript plugin, we execute the JavaScript function, during which V8 might call one of our callback functions (e.g. `set_fn`). However, at that point the pointer is still valid since the V8 isolate is single-threaded and we're still inside the outermost Rust function. Then, once the JavaScript function has finished executing, we return from said Rust function, dropping the handle scope, which drops the `External` object and its pointer, so JavaScript can no longer access it.

## Conclusion

I had a lot of fun digging deeper into V8 and figuring out how to use it from Rust. I hope this post has been interesting and informative, and if you're trying to implement something yourself, you can find the full source code for my implementation [here](https://github.com/w-henderson/Stuart/tree/master/stuart/src/plugins/js).