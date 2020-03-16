---
title: "Let's build a Web Framework, or how to waste development time"
draft: true
date: "2008-11-25"
tags: ["python", "web framework"]
slug: "lets_build_our_own_web_framework"

---

Sand at the beach
---------------

EDIT: I've put this post back up, because it's my own opinion. Hey, Free Speech !!!

There is one thing plenty of in this "web 2.0" buzz word ridden internet, Web Frameworks. From any language of your choice there is a web framework.

<https://en.wikipedia.org/wiki/List_of_web_application_frameworks>

See what i mean !

"Hypothetical"
------------

Here is a hypothetical situation;

You get hired by a company that you applied to as a web developer and you learn that this company has a working web application with around 1,000+ users written in framework X. But for possible future user growth, the power(s) that be *have already*  decided to _re-write_ from _scratch_ the current web app in a completely new  _scalable_ web framework.

To cut the time required in developing this new framework, a requirements or even a design document is not written. That being said, the existing web app and it's functionality is considered as the _requirements_ both for the new web framework and the porting of the existing web app to this new framework.

So how would you approach a situation like this ? And you can choose any of the following options :D

![framework](https://farm4.static.flickr.com/3279/3062622888_336f2a69c5.jpg)

Design & Prototype....Rinse & Repeat
-------------------------------

If I was ever in a situation like this and I _had the power_ then this is how I would approach it.

First writing a web framework from scratch in this day is just crazy talk IMHO.  So I would choose the second option above.

Second I think we need to "design" the most crucial part of this web framework that we need. Which is scalability. But I hear you say,  "how can you design scalability ?" well there are numerous paradigms that can be used that _might_ work, for example a distributed model. Then implement the design as a prototype and determine if our design goals were met which is being scalabile. But what is "scalability" ? Well this is what Wikipedia has to say about it;

> scalability is a desirable property of a system, a network, or a process, which indicates its ability to either
> handle growing amounts of work in a graceful manner, or to be readily enlarged

So in a situation like this you need to determine what needs to be scalable. Let's say we want to be able to support at least 1,000 users and their data which is the maximum amount of users the current web app is able to support. This is our initial design goal, the new framework _must_ support 10,000 users. The prototype we build  _must_ support 1,000+ users to prove that it is a _feasible_ design, without diving head first into development. Now that we know our initial design goal we can either design something using a design pattern or research into web frameworks that _exists_  that might satisfy our goal.  Our research into frameworks should also try to find live sites that are using these frameworks and possibly learn their user support and how they scale up.

With this data, we can rank some or all of the frameworks we researched into, then prototype a site with "users", using the framework with the highest rank. Then test to to see if our prototype meets the initial design goal. We need to then work out the plan for scalability. What happens when we hit the current bottleneck ? Do we just add more hardware ? After this plan we can then move on to the full implementation of porting the current web app to the new framework.

We probably saved 4 months of development time because we did not write a new framework that is _usable_ from scratch and even determined that our framework of choice is scalable.

Conclusion
---------

Building a web framework or _any_ framework is not easy, especially when you have a _deadline_ to reach, which includes the porting of features of an existing application to a new framework that your other developers know nothing about.

So here is some simple steps if you are in a situation like this;

1. Don't write your own framework as you will waste time and effort when a plethora of Open Source frameworks exist that have been battle hardened

2. Design you're web application and choose a framework that _might_ suit your needs

3. Develop a prototype to prove that you will be able to meet your most import design goal
