---
slug: "/blog/rust-mutexes"
date: "2022-07-16"
title: "How are mutexes implemented in Rust?"
description: "Discussing how mutexes work and why they are important, then implementing one in a number of ways in Rust."
---

Mutual exclusion locks, or mutexes, are a vital component of any multi-threaded program. In this post, I'll discuss how they work and why they are important, then write a basic implementation in Rust. Finally, we'll look at how they are implemented in the Rust standard library, and see why our basic implementation is not as efficient as the implementation there.

This post directly follows on from my previous post, [*Implementing atomics from scratch in Rust*](/blog/implementing-atomics-in-rust), so if you're not familiar with the concept of atomic operations, you may want to read that one first.

## What is a mutex?

A mutex, or simply a lock, is a mechanism by which a single thread of a multi-threaded program can gain exclusive access to a resource. In other words, a mutex is a way to prevent multiple threads from accessing a certain resource at the same time.

Mutexes work by using atomic operations to maintain a lock on a resource. When a thread wants to access a resource, it attempts to lock the mutex. If the mutex is already locked, the thread will wait until the mutex is unlocked before the call to `lock` returns. If the mutex is not locked, it will return straight away. From then on, the thread has exclusive access to the resource, so atomic operations are not necessary and complex data structures and operations can be used safely. When the thread has finished accessing the resource, it unlocks the mutex, allowing other threads to access it.

## Why are mutexes important?

As I mentioned in the previous post, it is only safe to manipulate shared memory from multiple threads if the operations are atomic, i.e. they cannot be interrupted or be seen in a partially-completed state. For basic variables, such as a counter, this can be achieved through atomic increment operations, but the CPU does not provide atomic operations for much else. Even with numbers, if you want to perform more than one operation, such as tripling then then adding one, this cannot be done atomically. For this reason, a mechanism of "locking" a resource to prevent multiple threads from accessing it at the same time is necessary.

## Implementing a basic mutex

We'll be using our `AtomicUsize` type from the last post to implement a basic mutex, although we actually only need two bits of it. An important feature of Rust mutexes is that they can become "poisoned" if the thread that locked them panics, which prevents other threads accessing corrupted data, so we'll implement this feature too.

Let's start by defining our `Mutex` type. It'll be generic over the type of data it holds, like with the standard library's implementation.

```rust
use crate::AtomicUsize;

use std::cell::UnsafeCell;
use std::ops::{Deref, DerefMut};

pub struct Mutex<T> {
    inner: UnsafeCell<T>,
    status: AtomicUsize,
}
```

We're using an `UnsafeCell` to hold the data, since it effectively opts out of the Rust borrow checker, as discussed in the [previous blog post](/blog/implementing-atomics-in-rust). We're also using an atomic type to store the status of the mutex, which will be `0` if it is unlocked, `1` if it is locked, and `2` if it is poisoned.

We also need a `MutexGuard` type which is given to the locking thread to gain access to the data. This is important as we can automatically unlock the mutex when this structure is dropped, or poison the mutex if the thread panics. This pattern is called ["resource acquisition is initialization" (RAII)](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization), which refers to the fact that constructing the guard locks the mutex, and destructing the guard unlocks the mutex.

```rust
pub struct MutexGuard<'a, T> {
    mutex: &'a Mutex<T>,
}
```

The lifetime of this struct is tied to the lifetime of the mutex, so Rust will ensure at compile-time that the mutex cannot be dropped while it is locked.

The final type we need to define is an error type to be returned when a thread tries to lock a poisoned mutex. For this, we'll just make a simple enum with a single variant, and derive the `Debug` trait so it can be used as the error of a `Result`.

```rust
#[derive(Debug)]
pub enum MutexError {
    Poisoned,
}
```

Our `Mutex` type should be `Send` and `Sync` if the type it holds is `Send`. This tells the compiler that, if the contained type is safe to send from one thread to another, our mutex implementation makes it safe to use the mutex from multiple threads at once. You can read more about these traits in the [Rustonomicon](https://doc.rust-lang.org/nomicon/send-and-sync.html). We can specify this as follows:

```rust
unsafe impl<T: Send> Send for Mutex<T> {}
unsafe impl<T: Send> Sync for Mutex<T> {}
```

### Implementing `Mutex`

Now everything is set up, we can implement the `Mutex` type. We're only going to implement two methods, `new` and `lock`.

Initializing a new mutex is easy. We just need to put the initial value into the `UnsafeCell` and set the status to `0` (unlocked).

```rust
impl<T> Mutex<T> {
    pub const fn new(inner: T) -> Self {
        Self {
            inner: UnsafeCell::new(inner),
            status: AtomicUsize::new(0),
        }
    }

    pub fn lock(&self) -> Result<MutexGuard<T>, MutexError> {
        // todo
    }
}
```

The implementation of the `lock` function is where the magic happens. For our basic example, we're going to use a simple spinlock, which works by continually using the compare-and-swap operation of the atomic status variable in an attempt to lock the mutex. We want to atomically change the status to "locked" if the current status is "unlocked". If the mutex is already locked, we'll just continually try again. If the mutex is poisoned, we'll return an error.

```rust
pub fn lock(&self) -> Result<MutexGuard<T>, MutexError> {
    loop {
        match self.status.compare_exchange(0, 1) {
            Ok(_) => break, // mutex is now locked!
            Err(2) => return Err(MutexError::Poisoned), // mutex is poisoned
            Err(_) => continue, // mutex is already locked, try again
        }
    }

    Ok(MutexGuard { mutex: self })
}
```

### Implementing `MutexGuard`

Now that our mutex can be locked, we need to implement the `MutexGuard` type so that we can use the data inside the mutex, as well as unlock the mutex when we're done. The three traits we need to implement are `Deref`, `DerefMut`, and `Drop`. The former two allow immutable and mutable access to the data inside the mutex respectively by overriding the dereferencing operator `*`. Rust also performs dereferencing automatically when calling a method on a reference, so this allows us to call methods on the guard as if we were doing so on the data inside the mutex. `Drop` will be used to unlock the mutex when the guard is dropped, as well as poisoning the mutex if it is dropped during a panic.

Implementing `Deref` and `DerefMut` is as simple as returning a reference to the data inside the mutex. This is safe because the mutex is locked, so the data can only be accessed by the thread that locked it. Furthermore, Rust ensures that these references cannot be used after the guard is dropped and the mutex is no longer locked.

```rust
impl<T> Deref for MutexGuard<'_, T> {
    type Target = T;

    fn deref(&self) -> &T {
        unsafe { &*self.mutex.inner.get() }
    }
}

impl<T> DerefMut for MutexGuard<'_, T> {
    fn deref_mut(&mut self) -> &mut T {
        unsafe { &mut *self.mutex.inner.get() }
    }
}
```

We can implement `Drop` by checking if the thread is panicking, and updating the status accordingly. If the thread is panicking, we'll poison the mutex by storing the value `2`, and if not, we'll simply unlock it by storing the value `0`.

```rust
impl<T> Drop for MutexGuard<'_, T> {
    fn drop(&mut self) {
        if std::thread::panicking() {
            self.mutex.status.store(2);
        } else {
            self.mutex.status.store(0);
        }
    }
}
```

And that's all we need to do to implement our mutex!

### Testing the implementation

In the [previous post](/blog/implementing-atomics-in-rust), I showed how non-atomic operations, when performed on the same data concurrently from multiple threads, can cause data corruption or data loss. I did this by using a mutable global variable to store the value of a counter, which was incremented 1,000,000 times simultaneously from four different threads. While the expected value upon the program's completion was 4,000,000, the actual value was much lower at around 1,300,000.

We'll perform the same test here, but this time we'll use our `Mutex` type to protect the counter and only allow one thread to increment it at a time.

```rust
#[test]
fn test_mutex() {
    let mutex = Arc::new(Mutex::new(0_usize));
    let mut threads = Vec::new();

    for _ in 0..4 {
        let mutex_ref = mutex.clone();

        threads.push(std::thread::spawn(move || {
            for _ in 0..1_000_000 {
                let mut counter = mutex_ref.lock().unwrap();
                *counter += 1;
            }
        }));
    }

    // Wait for all threads to finish
    for thread in threads {
        thread.join().unwrap();
    }

    assert_eq!(*mutex.lock().unwrap(), 4_000_000);
}
```

If we run this code now, we'll see that the test passes - the mutex is working correctly!

## Why does the standard library do it differently?

The Rust standard library's `Mutex` implementation is completely different from ours. Our simple spinlock implementation is very inefficient as the CPU must continually check the status of the mutex. This means the program will use as much CPU time as it possibly can - not a good idea for a real-world application.

The best way to optimise this is by letting the operating system, which is responsible for allocating CPU time, handle the locking. This allows the locking thread to be put to sleep while waiting for the mutex to be available, during which it uses no CPU time at all! We can then handle poisoning ourselves with an atomic boolean flag. This is how the Rust standard library does it (with a different implementation for each operating system).

In this section, we'll look at the system calls that are used to implement the mutex on Windows and Linux.

### Windows

On Windows, the standard library uses [Slim Reader/Writer (SRW) locks](https://docs.microsoft.com/en-us/windows/win32/sync/slim-reader-writer--srw--locks) to implement the mutex. These are optimised for minimal memory usage and are very efficient. Interestingly, they can also facilitate shared read-only access to the data, which means that, on Windows, the standard library's `Mutex` and `RwLock` implementations are pretty much the same thing.

To initialise a mutex, we use the `InitializeSRWLock` function, which takes a pointer to an `SRWLOCK` structure. The structure is the same size as a pointer, so we use the `usize` type to represent it and the value `0` to initialise it before calling the initialiser function.

To lock the mutex, we first check whether the mutex is poisoned, and if it is, an error is returned. If it isn't, we call the `AcquireSRWLockExclusive` function, which blocks the thread until the mutex is available. Once the lock has been acquired, we need to again check whether the mutex is poisoned, in case the previous thread to lock the mutex panicked. If it is not poisoned, we can return the guard as before.

When the guard is dropped, we check whether the thread is panicking with `std::thread::panicking()`, and if it is, we poison the mutex by setting the poison flag. Either way, we then release the lock by calling the `ReleaseSRWLockExclusive` function.

### Linux

On Linux, the standard library uses [Pthreads](https://man7.org/linux/man-pages/man3/pthread_mutex_lock.3p.html) to implement the mutex.

To initialise a mutex, we use the `pthread_mutex_init` system call, which takes a pointer to a `pthread_mutex_t` type as well as a pointer to any attributes. The type takes 40 bytes on 64-bit systems, and 24 bytes on 32-bit systems, so we can use Rust's conditional compilation to represent this:

```rust
#[cfg(target_pointer_width = "64")]
type PTHREAD_MUTEX_T = [u8; 40];
#[cfg(target_pointer_width = "32")]
type PTHREAD_MUTEX_T = [u8; 24];
```

Locking the mutex is exactly the same as on Windows, but we need to use the `pthread_mutex_lock` system call instead of `AcquireSRWLockExclusive`. The implementation of `Drop` is also the same, but with `pthread_mutex_unlock` instead of `ReleaseSRWLockExclusive`.

One difference is that we need to clean up the mutex after we are done with it, unlike on Windows. This is done by implementing `Drop` for the mutex itself, and calling `pthread_mutex_destroy` to clean up the mutex when it is dropped.

### System Calls in Rust

We've discussed how Rust implements mutexes on Windows and Linux, but one important thing we are yet to cover is how to actually perform the system calls in Rust. Rust supports C interoperability, which means we can call C functions from Rust, and vice versa. This is vital, since the system calls on Windows and Linux both use C's calling convention, which means that the system calls are called like any other C function.

In order to tell Rust about the existence of these functions, we need to use an `extern "C"` block, which allows us to define C functions that our program will be able to call. On Linux, we also need to use the `#[link(name = "pthread")]` attribute to tell the linker where to find the functions. This is not necessary for Windows, because the functions are defined in `Kernel32.lib`, which is automatically linked.

For Windows, the code looks like this:

```rust
type SRWLOCK = usize;

extern "C" {
    fn InitializeSRWLock(lock: *mut SRWLOCK);
    fn AcquireSRWLockExclusive(lock: *mut SRWLOCK);
    fn ReleaseSRWLockExclusive(lock: *mut SRWLOCK);
}
```

For Linux, the code looks like this:

```rust
#[link(name = "pthread")]
extern "C" {
    fn pthread_mutex_init(lock: *mut PTHREAD_MUTEX_T, attr: *const u8) -> i32;
    fn pthread_mutex_lock(lock: *mut PTHREAD_MUTEX_T) -> i32;
    fn pthread_mutex_unlock(lock: *mut PTHREAD_MUTEX_T) -> i32;
    fn pthread_mutex_destroy(lock: *mut PTHREAD_MUTEX_T) -> i32;
}
```

Writing these bindings ourselves is useful for learning about how Rust's FFI (foreign function interface) works, but it is a lot of work and is not necessary. On Windows, we can use the [`windows`](https://crates.io/crates/windows) crate, which is developed by Microsoft and provides bindings for the entire Windows API. On Linux, we can use the [`libc`](https://crates.io/crates/libc) crate for the same purpose.

## Conclusion

In this post, we've looked at how mutexes work, why they are needed, and discussed both a simple implementation and a more efficient implementation used by the standard library. We've also seen how to make system calls in Rust using its FFI. If you found this post informative, please consider sharing it with others who may be interested. Thank you for reading!