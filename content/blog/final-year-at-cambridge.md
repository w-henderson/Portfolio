---
slug: "/blog/final-year-at-cambridge"
date: "2025-06-29"
title: "Finishing my final year of CompSci at Cambridge"
description: "Looking back at my third and final year studying Computer Science at Cambridge."
---

It's hard to believe that my three years at Cambridge have gone by so quickly. It feels like just last week that I was writing about [my second year at Cambridge](/blog/second-year-at-cambridge), yet I'm already back in the deserted post-exam Computer Lab again, writing the final chapter of my Cambridge trilogy.

This year has been the hardest of the three in every way, but that makes it the most rewarding of the three to have finished. I've overcome the biggest challenges of my life so far, and in doing so I've learnt an incredible amount about Computer Science, about people, and most importantly, about myself.

In this post, I'll be reflecting on my final year studying Computer Science at Cambridge, sharing some of the things I got up to as well as discussing my courses, modules, and dissertation, and my Cambridge experience as a whole.

## Michaelmas Term

![Collage of photos from Michaelmas Term](/images/blog_images/final_year_michaelmas.jpg)

*Left to right: my sister visiting Cambridge (she's going to Oxford, what a traitor!), autumn colours on the way to the department, Trinity bridge through the mist*

I arrived back in Cambridge at the start of October, after a very full-on summer working at Citadel Securities in London and travelling around the world, and was immediately thrown into the deep end with a two-hour Category Theory lecture at 9am on the very first day of term.

### Category Theory

Unlike the first two years, which are made up entirely of lecture courses that are examined at the end of the year, third year also includes two modules that are taught in Michaelmas and Lent terms (12.5% each), and a dissertation that runs throughout the year (25%).

My first module, Category Theory, was basically my life for Michaelmas term. It's a very abstract branch of mathematics that looks at the relationships between different mathematical structures, and I chose it because it was the only option in Michaelmas that looked remotely interesting. Unfortunately, though, I encountered an extremely severe skill issue: no matter how hard I studied, I just could not get my head around it at all.

Category Theory has quite the reputation at Cambridge, and I can see why. It is genuinely fascinating, and seeing how all of maths is basically the same thing is so satisfying, but at the same time, the course is so fast-paced and abstract that you need to be a proper maths genius to make any sense of it. There seem to be plenty of those at Cambridge, but I am most certainly not one of them!

To my surprise, I managed to survive the first assessed exercise sheet by blindly applying the definitions and shuffling symbols around for about 30 hours until something resembling a correct answer appeared, but I wasn't so lucky with the second one in January, which, unsurprisingly, was my lowest mark of the year.

### Courses

Okay, enough complaining about how badly I messed up Category Theory. Let's talk about the other courses I took in Michaelmas term.

- [Types](https://www.cl.cam.ac.uk/teaching/2425/Types/): type systems and their properties. This course followed on from last year's Semantics of Programming Languages, and was every bit as interesting and fun. I really enjoy these kinds of theoretical yet creative courses, where the course teaches various common techniques and then encourages you to apply them in new contexts. I did think that the lectures spent a bit too much time going into the exact details of various proofs, which all follow basically the same structure, but aside from that it was a great course.

- [Denotational Semantics](https://www.cl.cam.ac.uk/teaching/2425/DenotSem/): mathematically modelling programming languages. This was another great theoretical course, giving another interesting perspective on programming languages and their semantics as mathematical objects. As painful as Category Theory was, lots of the concepts from it proved quite useful in this course. I think one thing that made this course, as well as Types, so enjoyable was that my supervisors for these courses were fantastic, so I was able to really dig deep into the material and get a lot out of it.

- [Information Theory](https://www.cl.cam.ac.uk/teaching/2425/InfoTheory/): the standard information theory course, discussing information, entropy, coding, and compression. I'm surprised this is a third-year course - honestly I think it would be better combined with the first-year probability course, as it felt quite slow and basic at times.

- [Business Studies](https://www.cl.cam.ac.uk/teaching/2425/Business/): a rather chaotic course covering a wide range of topics in business, from marketing to finance to management. I'm not sure that this should be an examinable course as it doesn't seem very academic (or even well-defined), but it does provide a useful backup option in the exam - memorise a couple of buzzwords and you'll get a decent mark. It felt more like a business podcast rather than a university course, but it wasn't too bad.

- [Principles of Communications](https://www.cl.cam.ac.uk/teaching/2425/PrincComm/): a really dense course about networking that seemed like a collection of random topics that didn't fit together all that well. I think that's what networking is like in real life, though, being a collection of random hacks and decisions that were reasonable at the time but are still around because it's too hard to change them. Either way, not a course for me!

### Life

Between Category Theory, supervisions, and my own bad time management, I didn't have a huge amount of time to actually have a life in Michaelmas term. That being said, I still managed to squeeze quite a lot in! Like last year, I was invited to the Scholar's Feast (a five-course formal dinner for everyone who got a first), which was even better than last year because the seating plan put me next to some really interesting people. I also went to a couple of concerts (Dvorak's New World Symphony at Trinity was a highlight), and both my sister and my mum visited during the term too.

Over the Christmas break, I had a mountain of work to do, both to prepare for the second Category Theory assessment, and on my dissertation (which I'll talk about in a moment!). Despite this, I started the break by going to Rome for a week, which, looking back, was maybe not the wisest choice given my situation, but the food made it all worthwhile. I also went to Cornwall to visit my family for a bit, which was the highlight of my Christmas, and, this time, I actually managed to work a bit while I was there!

![Collage of photos from the Christmas break](/images/blog_images/final_year_christmas.jpg)

*Left to right: the Pantheon, Dartmoor in the snow, me and my cousin in Cornwall*

## Dissertation

Now is probably a good time to talk about another unique aspect of third year: the dissertation. Following the very valuable advice of my director of studies (DoS) Dr. John Fawcett, I started planning my dissertation very early (over Easter in second year), and managed to secure Prof. Alan Mycroft as my supervisor, mainly by being one of the first to reach out to him about it!

I'll split this section into two parts, first talking about my actual project from a technical perspective (it's not that boring, trust me), and then reflecting on the experience of doing the dissertation.

### The Actual Project

My dissertation, titled "A Prolog interpreter for the browser", aims to solve the rather obscure, but genuine, problem of running the Prolog logic programming language in the browser environment. Prior to my project, existing solutions were either written in JavaScript (painfully slow) or were WebAssembly ports of existing native implementations (inflexible and inefficient in memory use). I set out to design a new Prolog implementation, WebPL, from the ground up, compiling to WebAssembly and designed specifically with the unique constraints of the browser in mind. (And yes, I wrote it in Rust, of course!)

![The cover page of my dissertation and a screenshot of the project](/images/blog_images/final_year_dissertation.jpg)

*Left to right: the cover of my dissertation, the web-based Prolog editor I built as an extension to demonstrate my project (recognise the style?)*

I largely completed the implementation of the project in Michaelmas term and over Christmas, and I began writing the actual dissertation in January. That being said, I was still adding to the code well into Lent term with some more exciting features, like precise generational garbage collection and a JavaScript foreign function interface. I could happily write 11,999 words about how cool it is (believe it or not, [I already did that](https://github.com/w-henderson/WebPL/blob/main/dissertation.pdf)), but I'll save the less formal write-up for a future post.

... okay, I can't resist. Just one graph, I promise.

![The performance of WebPL relative to the industry-standard SWI-Prolog](/images/blog_images/final_year_dissertation_performance.jpg)

*The performance of WebPL relative to industry-standard SWI-Prolog*

While I made sure not to have "beaten the competition in execution time, memory usage, and binary size" as an explicit success criterion of my project *juuuuust* in case, it was always the number one goal at the back of my mind, and it was an incredibly satisfying one to achieve.

I was actually surprised at just how far behind the other implementations were, so I dug into it a bit deeper and ended up down a really interesting rabbit hole. In short, WebAssembly doesn't yet support proper exceptions, which the compiler Emscripten uses to implement the C `setjmp`/`longjmp` functions, which SWI-Prolog (and others) in turn use to implement Prolog exceptions. However, instead of just failing to compile the program, Emscripten quietly inserts code to delegate exception handling to JavaScript, meaning that every single call to a *potentially* exception-raising function has to cross the WebAssembly-JavaScript boundary (twice!), which is very expensive. To get ~~more marks~~ a fairer comparison, I forked SWI-Prolog and modified it to use experimental native WebAssembly exceptions, which successfully brought its performance much closer to that of WebPL (but not surpassing it in the majority of cases 😎).

This was such a fun discovery to make, not least because it perfectly proves one of the most important aspects of my project's motivation: just compiling an existing project to WebAssembly is not good enough!

### The Dissertation Experience

Measuring by the notoriously accurate and valuable metric that is *lines of code*, WebPL doesn't even rank in the top five biggest projects I've done, so why did it take me so many months?

Well, for one thing, I didn't write 11,999 meticulously-chosen and comprehensively-critiqued words about any of the others - they were lucky to get one blog post's worth of late-night ramblings. I was so incredibly lucky to have Alan as a supervisor to help me with this: not only is he an incredibly knowledgeable and accomplished Prolog expert, but he also dedicated a huge amount of time to reading my drafts, providing very detailed feedback, and discussing ideas with me. Lots of my friends had supervisors who took weeks and weeks to respond to their emails and even then only skimmed over the drafts and gave surface-level comments, but Alan was always quick to reply and would write pages of feedback on every draft I sent him.

I will admit, at times it did feel like he would criticise every word I wrote, and I grew accustomed to receiving annotated drafts covered in bright red scribbles, but that was exactly what I needed to write the best dissertation I could. It was so rewarding to see my writing improve and the comments getting more and more positive over the year, and I ended up with what I think is the best piece of writing I've ever done.

Anyway, we're getting ahead of ourselves - before I submitted my dissertation I had the whole of Lent term to survive.

## Lent Term

![Collage of photos from Lent term](/images/blog_images/final_year_lent.jpg)

*Clockwise: formal at Selwyn with Dron, "Castle Mound in Cambridge", playing music with Dron, Sam, and Yuting, Jack's with my grandparents*

Lent term couldn't have got off to a worse start with the absolute disaster that was the Category Theory exam. In the past, I've always been able to overcome difficult problems just by working really hard at them, so it was something of a new experience for me to put in all this effort over so many months just to eventually take the L. Fortunately, my life rapidly improved once I was free from the shackles of Category Theory, and I was able to start enjoying my final year at Cambridge!

### Multicore Semantics

I might have been free from Category Theory, but I wasn't free from doing a module. My Lent term module was Multicore Semantics, a two-part course covering really cool lock-free data structures and theoretical memory consistency models, as well as exploring what real hardware actually does. This was right up my street - extremely dedicated readers will remember my two now very old blog posts about [atomic operations](/blog/implementing-atomics-in-rust/) and [mutexes](/blog/rust-mutexes/) which I wrote before even coming to Cambridge - and I plan to write another blog post in the future incorporating some of what I learnt during this course.

It was really interesting to properly study concepts I have worked with in the past, but never really understood, especially relaxed memory. The relationship between what the programmer wants the hardware to do, what the hardware manufacturer says the hardware will do, and what the hardware actually does turns out to be much more nuanced than I ever imagined, and I am now absolutely terrified of writing any concurrent program for anything other than x86.

In terms of assessment, this module also had two assignments, both of which were fairly practical. They went a lot better than Category Theory (although still not as well as I would've liked, but hey, I survived), and, unlike Category Theory, didn't take up every waking second of my term!

### Courses

Of course, Cambridge couldn't possibly be so kind as to let me focus on my module and dissertation, so I also had a handful of courses to get through in Lent as well.

- [Optimising Compilers](https://www.cl.cam.ac.uk/teaching/2425/OptComp/): dataflow optimisations, abstract interpretation, constraint-based analyses, and more weird and wonderful things that compilers do. This was a really fun course, taught well, and definitely better than Compiler Construction last year (although I enjoyed that one too).

- [Advanced Computer Architecture](https://www.cl.cam.ac.uk/teaching/2425/AdComArch/): exploiting various forms of parallelism in hardware, including pipelining, multi-core systems, vector processors, etc. While this course was interesting, half of its content was already covered in last year's Introduction to Computer Architecture, making much of it redundant and a waste of time. To be a worthwhile course, I think it needs to either take a radically different approach to last year's one, or the content could be split more explicitly into two courses.

- [Quantum Computing](https://www.cl.cam.ac.uk/teaching/2425/QuantComp/): an introduction to quantum computing, covering the basics of quantum mechanics, quantum gates, and quantum algorithms. My key takeaway from this course is that quantum computing is really confusing and I don't understand it at all, but it was an interesting course nonetheless. However, I ended up dropping it because I already had enough easier courses for the exam.

- [E-Commerce](https://www.cl.cam.ac.uk/teaching/2425/ECommerce/): a follow-on from Business Studies, focussing on e-commerce businesses. The same criticisms apply as for Business Studies (chaotic and ill-defined), but it did save my life in the exam when I couldn't do the Types question that I really should have been able to do, so I can't complain too much.

### Life

Being free of Category Theory and having a slightly more manageable workload meant that I was able to do a lot more fun things in Lent term! My friends and I had dinner together almost every day, and we also formed a "band" (in the loosest sense of the word) and played music together which was so much fun. My grandparents visited for a few days, and I really enjoyed showing them all the things that have changed since their time. The now bustling West Cambridge site, home of the Computer Science department (alongside a growing number of others), was just empty fields when my grandfather studied here many years ago!

About halfway through the term, I escaped the stress of Cambridge for a weekend and went to the Alps (don't tell John), which was amazing. Of course, it would have been very irresponsible to completely switch off from work, so I took my laptop and actually did the most productive work I've done all year while I was there. It's amazing how a change of scenery can help you lock in and get things done!

![Collage of photos of me working on my dissertation in various scenic locations](/images/blog_images/final_year_scenic_dissertation.jpg)

*Left to right: dissertating in Cornwall, Germany, Austria, and with my sister*

I continued my streak of being extremely productive in scenic locations over the Easter break, when I visited my family in Cornwall, went to Barcelona for a long weekend with my mum and my sister (which was incredible), and of course did a huge amount of work at home. It was right before my final exam term, after all, so I did spend almost all of my time working. I think I averaged about 5 or 6 hours a day over the month, but I still wasn't quite where I wanted to be by the time I got back to Cambridge. Fortunately, the course workload in Easter term was much lighter than in Lent, so there was just about enough time to catch up.

## Easter Term

And so, for the final time in my life, we've got to exam term.

![Collage of photos from Easter term](/images/blog_images/final_year_easter.jpg)

*Left to right: our final lecture ever, all-you-can-eat wings challenge (I won with 50!), on the way to the lab for a late-night study session*

My biggest struggle in Easter term was just keeping up the momentum until the end. I had worked so hard over Easter and at the start of term studying for exams that by the time we actually got close to the exams, I was completely burnt out. I didn't have this problem in either of the previous two years, and I think this was because those years had a much more varied workload in Easter term, with courses, supervisions, projects, and of course exams to spread my time between. This year, going all in on just exams made studying much more monotonous and tiring.

In an effort to make things more interesting, I studied in lots of different places around Cambridge, as well as going down to London a few times to study there too. I also made sure to take lots of breaks (I gained 200 chess.com rating over the term...), and I think this intentional approach to studying really helped my mental health and motivation.

### Courses

Before the exams, I did have one last course to get through:

- [Hoare Logic and Model Checking](https://www.cl.cam.ac.uk/teaching/2425/HLog+ModC/): formally specifying and verifying programs. I really enjoyed this course, which was effectively the final course in the semantics trilogy of Semantics of Programming Languages (operational semantics), Denotational Semantics, and Hoare Logic (axiomatic semantics). Seeing programs through all these different lenses, and how they relate to each other, was maybe the highlight of the Computer Science Tripos for me!

### Life

Unlike in previous exam terms, I actually had a life this time. This was a conscious choice on my part to minimise the burnout that was constantly trying to creep in, and despite many of my friends making the opposite choice to go "hermit mode" and lock in at the expense of everything else, I took every opportunity any of them gave me to go out and do something fun.

I went to several concerts, had plenty of dinners out, and even went to a couple of parties. I also went for a lot of walks around Cambridge by myself, as well as "taking up" running (I went for like four runs), which was way more enjoyable than I expected. Of course, I still did a huge amount of work, but by doing meaningful things outside of work, I was just about able to keep the burnout at bay.

## Exams

The structure of the exams is different again in third year. This year, there are only two three-hour papers, but both of them are on all the courses from the entire year, with 13 questions of which you have to answer 5. On paper, this sounds like a lot less work than the previous two years, but for some reason it really didn't feel like it.

At the start of the year, I was convinced that I was going to study all 13 of the courses to give me maximum flexibility in the exam, but as the year went on I realised that this was just not going to be possible. In the end, I studied 7 of the courses, which I thought would probably give me enough options in the exam.

In the first paper, I completely panicked and spent half the time on one question which I didn't even end up submitting, and which I solved the moment I stepped out of the exam hall. Fortunately, I managed to lock in for the second half of the paper and did end up submitting 5 questions, but I wasn't super happy with it. Luckily, the second paper went pretty much as well as it could have gone, so it balanced out quite nicely. I was certainly very glad to have had two backup courses to save the day in the first paper!

## After Exams

![Collage of photos from after exams](/images/blog_images/final_year_after_exams.jpg)

*Left to right: the Trinity May Ball, Croatia, recreating the 1949 department photo*

Since the exams ended a few weeks ago, I've been celebrating pretty much non-stop. Following a great party after the final exam and a day or two of recovery, the four of us went to Croatia for a week, which was amazing. We went to several beaches, climbed a mountain, explored an island, and ate a lot of delicious food. It was a fantastic (albeit not very relaxing) way to celebrate the end of our time at Cambridge.

After returning to Cambridge, we went to the Trinity May Ball, which was a really fun night. It felt so good to actually be there after all the hoops I had to jump through to get a ticket, and the Ball was even better than I could have imagined, from the incredible firework display to the amazing food and drink.

## Three Years at Cambridge

It's pretty surreal to think that this is the last time I'll be sitting here in the Computer Lab, scrolling back through my photos and my calendar to remind myself of everything I wanted to write about in my annual Cambridge blog post. In some ways I feel like a completely different person to the one who started here three years ago, and in other ways I feel like I've barely changed at all. I'm the happiest, smartest, and healthiest I've ever been, I've grown so much both academically and personally, but I'm still the same positive, optimistic, slightly awkward guy that I was when I walked into my first Foundations of Computer Science lecture three years ago.

It's extremely cliché, but it's true that the most valuable lessons I've learnt at Cambridge are not those of computer science, but those of life. I won't remember in five years' time how to prove consistency of the simply-typed lambda calculus, what a mildly context-sensitive grammar is, or even how to solve a partial differential equation. Instead, I'll remember how to look after myself through stress and burnout, how to make the right choices even when they're the hardest ones, how to be a good person while staying true to myself, how to focus on the things that matter and not worry about the things that don't, and how to do things I thought were impossible.

Writing it down, this all feels so obvious and cringe - they're the kind of lessons that a wise old animal should've taught me long ago in a Disney film - but at the same time, they're some of the hardest and most important ones to learn. If you'd asked me three years ago, I would have told you that I already knew all of this, that I wasn't a naive kid any more thank you very much, but ironically, I feel far more like a naive kid now than I did back then. But that's the whole point of university. To learn and to live, to contemplate and to clash, to struggle and to succeed, all with the stabilisers (that's "training wheels" for the Drons out there) of a director of studies, a tutorial system, and most importantly, an incredible group of friends, all going through the same thing, to catch you when you fall. I couldn't be more grateful for the endless support I've received from my friends and family over the past three years, and I hope that I've been able to give them as much support in return.

It really does feel like the beginning of a new era for me - I've learnt just enough to know that I know nothing, which gives me a whole world of things to learn and explore, experiences to have, and people to meet. So... what's next?

## What's Next?

First and foremost, a good rest! I've barely had a break since starting at Cambridge - I did an internship both summers, and I studied pretty hard every Christmas and Easter break - so it'll be really nice to have a few months off where I can do whatever I want, whenever I want.

I've got a few really exciting trips planned for the summer, including a month exploring China by myself (wish me luck, my Chinese is not exactly fluent), and the best part of a week in Norway with Dron. Alongside that, I'll hopefully do some more writing on my blog, see my family and friends, and, of course, catch up on three years of insufficient sleep!

After the summer, I'll be going back to Citadel Securities in London as a full-time software engineer, which I'm really looking forward to. I had an amazing time there last summer, and I can't wait (after a good rest) to get back to solving some really cool problems. If you're going to be in London this autumn or beyond, [let me know](mailto:william@whenderson.dev) - it would be great to meet up!

Beyond that, I don't know what the future holds, but I'm excited to find out. My current goal, maybe slightly less ambitiously than many of my peers at Cambridge, is to keep learning, keep improving myself, and most importantly, to keep doing what makes me happy - so that's what I'm going to do. See you in the next chapter!

![Photos of me from each stage of my life](/images/blog_images/final_year_eras.jpg)

---

Thank you so much for getting to the end of this unexpectedly deep and sentimental post! I hope it's been an interesting insight into my rollercoaster of a final year at Cambridge. Please [let me know](mailto:william@whenderson.dev) your thoughts, feedback, and questions - I love hearing from all of you!