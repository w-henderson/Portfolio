---
slug: "/blog/start-hack-2023"
date: "2023-03-30"
title: "Optimising content moderators with ML in Switzerland"
description: "Discussing my trip to Switzerland to participate in START Hack 2023."
---

Last week, I had the privilege of participating in [START Hack 2023](https://www.startglobal.org/start-hack), a 36-hour hackathon hosted by START Global which took place in St. Gallen, Switzerland. I was joined by my two teammates [Dron](https://github.com/dronhazra), who I previously worked with at [HackX](/blog/predict-the-future/), and [Sam](https://github.com/00samyun). We were competing against over 100 teams from all around the world, and while we didn't come out on top, we had a great time and learned a lot.

In this blog post, I'll be discussing the project we worked on, the challenges we faced... and a bit about our Swiss adventure too.

## Project Positive Vibes

Nine companies from Switzerland and beyond came up with problems they wanted us to solve, and our first challenge was to pick one. We were torn between Supercell's problem of improving their content moderation process, and the problem presented by DKSH of building a system to bring consolidated healthcare services to communities in South East Asia. In the end, we decided to go with Supercell's problem, as we felt it was more aligned with our individual skill sets - and had more scope for interesting solutions. The hackathon began at 10pm on Wednesday, so we got to work straight away.

### The Problem

You might know [Supercell](https://supercell.com/en/) as the company behind the popular mobile games Clash of Clans and Clash Royale. Their problem was that they have plenty of data being logged for moderation purposes, such as chat messages and user events, but this data is not being used to its full potential - in the end, it's up to the moderators to trawl through whatever context they feel is necessary to make a judgement about each report. This is a time-consuming process - well, if by "time-consuming" you mean an average of 12 seconds per report - so they wanted to see if we could find a way to better utilise their moderators' valuable time.

### The Current Approach

Currently, Supercell's content moderation process is almost completely manual. When a message is reported, a moderator will be presented with the message and up to 50 messages before and after it, alongside some basic information about the user and the clan the message was sent in, in this UI:

![Supercell's current content moderation UI](/images/blog_images/starthack_supercell.png)

If you're anything like me, you'll be thinking "there's no way this is their real UI", but apparently it is. From every possible standpoint (design, functionality, usability, etc.), it's a mess. Yes, it's just an internal system, but it's what their many moderators use all day, every day, so it's important that it's not slowing them down - and as you'll see in a moment, our solution ensures that it does the opposite and speeds them up!

**Design:** it's not immediately clear which message was the reported one, there's lots of white space where it shouldn't be and not enough where it should, and the colour scheme is all over the place.

**Functionality:** the moderator has to manually scroll through what could be a hundred messages to get the necessary contextual information, and there's no way to filter out irrelevant messages.

**Usability:** the moderator has to move the mouse around a lot and click several times, even for the most obvious report, wasting precious time. With 12 seconds average per report, every second counts!

### The Solution

While other teams worked on incorporating additional signals into the moderation process, we decided to focus on reducing the noise in the signals we already have. We wanted to make it easier and faster for the moderators to understand the context of a reported message, so we spent all of Thursday building Project Positive Vibes.

![Project Positive Vibes](/images/blog_images/starthack_dashboard.png)

Alongside a complete overhaul of the UI, we added three ML-powered features to the moderation process:

1. **Themes**: we used topic modelling to identify the main themes of the chat log, and displayed them to the moderator. This allows them to get an idea of what the conversation was about without having to read through everything.

2. **Insight**: we trained a text embedding model on the large dataset they gave us to find similar reports from the past. The outcomes of these past reports are shown to the moderator, so they can make better use of work they or their colleagues previously did.

3. **Threads of Conversation**: using GPT-3, we identified threads of conversation within the chat log, and provided the moderator with the ability to filter out the messages of users that were not taking part in the offending discussion. This allows the moderator to instantly cut down the number of messages they need to look at, again saving them time.

One of Supercell's most important principles was that, at the end of the day, it should always be the moderator who makes the final decision. We made sure that our solution only used ML to provide insights and recommendations, and never to make decisions for the moderator. We also ensured that the interface continued to provide an easy way for the moderator to dig into the data themselves in cases where the models can't grasp the full picture.

In addition to these three features, we also added a reputation system for both reporters and reportees, displayed as a percentage. For reporters, this is the percentage of their reports that were found to be valid, and for reportees, it's calculated from the average "risk" value of their messages ("risk" is a metric Supercell uses to determine how likely a message is to be offensive, which as far as we can tell is just glorified keyword detection).

Being developers, we know how beneficial to productivity well-thought-out keybinds can be, so we also made the UI completely keyboard-based. Now, instead of having to click in several different places to deal with a simple report, the moderator can just press A to bring up the action menu, then press another key to select the action they want to take. We used data about the most common actions taken by moderators to optimally assign keys to each action.

![Action menu](/images/blog_images/starthack_actions.png)

Of course, we made sure that the UI was accessible, so that moderators who prefer to use a mouse or another kind of pointer input can still do so.

### The Break

After a long day of working on the project, we took a break to go swimming in the local pool which for some reason was free for us to use! It was very nice to get out for a short walk and to get some exercise in the pool, and I think clearing our heads with a bit of swimming did us a lot of good.

### The Preparation

When we got back, we had just over 12 hours before the project was due at 10am on Friday, so it was time to prepare the presentation. With the bulk of the programming and data science work done, we were able to focus completely on the presentation. With the presentation strictly limited to just three minutes, we decided it made more sense for just one of us to present, so Dron ended up with the unenviable task of delivering 129,600 seconds of work within 180.

Our first run-through of the presentation, which we did at around midnight, ended up taking more than ten minutes, with the three minutes exhausted by the end of the introductory slide! After cutting out all the unnecessary details and a lot of the interesting stuff too, we managed to get the second draft down to around six minutes. This was still double the time limit, but after another rewrite and a bit more thinking, our third draft was exactly three minutes long to the second.

### The Chess Tournament

Just as we were planning to get some sleep in the early hours of the morning, it was announced that the official START Hack chess tournament would be starting in just a few minutes. Being the chess nerd that I am (I've been playing in the University league this term, albeit with mixed results), I was very excited to take part. After all, what better time to play some chess than at 2am? (this is hilariously [backed up by Google Trends data](https://trends.google.com/trends/explore?date=now%207-d&geo=GB&q=chess&hl=en-GB))

Ironically, the tournament format was not the [Swiss format](https://en.wikipedia.org/wiki/Swiss-system_tournament); it was instead a one-hour arena: everyone plays as many games against each other as there is time for in one hour, and the winner is whoever has the most points at the end. The time control was 3+2 (three minutes per player, with an additional two seconds added for each move made), which is a bit faster than I usually play.

I squeezed 9 games into the hour, and despite my sleep deprivation, I managed to win every single one of them, finishing with a perfect score of 9/9 to win the tournament! I think I had slightly overestimated my opponents - I'm used to getting consistently crushed every week at the Cambridge University Chess Club - but it seemed like I was the only one to have studied much chess theory, so I was able to take advantage of that.

At around 4am, I curled up in my corner of the freezing room, feeling very pleased with myself, and I managed to get a few hours of sleep before the deadline.

### The Presentation

After 36 hours of hard work, an unhealthy amount of Swiss chocolate (it was free and unlimited, okay?), and less than 5 hours of sleep in total, we were ready to present our solution to Supercell. Well, Dron was ready to present, and we were ready to sit back, provide moral support, and pray that he kept it under three minutes.

Fortunately, he gave an absolutely brilliant presentation, covering all the points we wanted to make, showing our enthusiasm for the project, and most importantly, staying just under the time limit.

You can find the presentation slides [here](https://github.com/w-henderson/ProjectPositiveVibes/blob/master/presentation.pdf) (although they will make limited sense without Dron's commentary!).

### The Result

While we didn't end up on top, I'm still really pleased with how we did - we presented a solution that I believe was both technically impressive and genuinely useful, and we had a great time doing it.

The winning team for Supercell's challenge did [a similar thing](https://tobias314.github.io/CantaloupeStartHack23) to us, but also incorporated other signals into the moderation process such as join/leave events, which they used to identify patterns such as "join-hate-leave", where a user joins a clan, spams offensive messages, then leaves without any further interaction. The data science work they did behind the scenes was seriously impressive, and they certainly deserved the success. Unfortunately, they didn't go on to win the overall competition - I think they should've done, but the judges for the final round were using very different criteria (namely how flashy and marketable the project was, rather than how technically interesting it was).

The [overall winners](https://github.com/Yonom/new-bets) put ChatGPT between a speech-to-text engine and a text-to-speech engine and branded it a solution to the problem of loneliness among the elderly, which I think is a bit of a stretch, but who am I to judge? Their presentation was very memorable, they definitely had the business and marketing side down, and when the judges are all startup founders and CEOs, giving them the business jargon they want to hear is a pretty good strategy!

Overall, START Hack was an amazing experience and a huge step up from HackX in Cambridge last year. I'm really glad I decided to go (and that between my college and the organisers, the trip was almost completely paid for!). I can't wait to go to another hackathon soon.

That's it for the hackathon write-up, but read on if you want to hear more about the rest of our trip to Switzerland!

## Zurich, Switzerland

After the hackathon, we had almost exactly 24 hours until our flight back to London. We got the train back from St. Gallen to Zurich, crashed at the hotel for the night, and then got up fairly early to spend the whole day exploring Zurich.

![Zurich photo collage](/images/blog_images/starthack_zurich.jpg)

*Clockwise: Sam, Dron, and I enjoying the view over Zurich from Käferberg (a big hill), some random street with St. Peter's Church just visible, the view from the Lindenhof*

We started the day by walking through the city, taking in the sights and getting some brunch. We saw the Lindenhof (nice view), St. Peter's Church (nice clock), Paradeplatz (RIP Credit Suisse), Lake Zurich (beautiful and imaginatively named), the opera house (cool), and the Grossmünster (big and also imaginatively named). As you can tell, I'm not a very good travel blogger.

For brunch, my lack of German almost let me down, but hand signals and pointing proved sufficient to get an amazing zopf (kind of like brioche but even better) for just two francs from a market stall that was just shutting up shop. I was surprised (and pleased) at how many people knew no English - compared to other European cities I've visited, it seemed like, for the first time, knowing the local language would've actually been of significant use! While this definitely made it harder to get around, it's much more fun than having everyone speak English. My French was unfortunately no use (too far east for that), except in a waffle shop... where they spoke English anyway.

In the afternoon, we walked up Käferberg, a big hill, to get a better view of the city. The view was absolutely worth the climb, and the walk down the hill to the river was equally scenic. By the time we got back to the city centre, it was time for dinner, so we went to a little Swiss restaurant and I had a rösti (a traditional potato-y Swiss dish, I'm not a food blogger either), which was delicious.

After dinner, we got the train to the airport to get our flight back to London. In the airport I remembered that I had operating systems supervision work due for noon the next day, so I spent most of the flight frantically doing it (aeroplane mode really made me realise how much I still need to learn), eventually submitting it in bed at about 3am once we were back at the house in London. I wouldn't be a proper student if I didn't sacrifice sleep for literally anything else, right?

## Conclusion

I had an absolutely amazing time at START Hack, and in Zurich as well. Thank you for reading this long post - well done for getting to the end! - and I hope you enjoyed it. Let me know what you thought on [Instagram](https://instagram.com/hxswell) or by [email](mailto:hello@whenderson.dev)! If you found the post interesting, please consider sharing it with others who may be interested. That's it for this one - see you next time.