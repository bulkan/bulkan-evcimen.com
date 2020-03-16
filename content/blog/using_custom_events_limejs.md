---
title: "Using Custom Events With LimeJS"
date: "2013-04-29"
tags: ["javascript", "limejs"]
slug: "using_custom_events_with_limejs"

---


[LimeJS]( https://limejs.com/0-getting-started) is an open source JavaScript HTML5 game creation framework built using Google Closure. In this article I will show you how to create a new event type and dispatch it, which is more so a Closure feature than LimeJS. I am going to assume you have installed LimeJS if not read the instruction.

We will create a simple *game* that will display a Sprite with the same width and height as the viewport. We will listen to touch & click events on this Sprite, generate a random number when these events fired, between 0-256 and fire a custom event once this number is greater than 128.

This number will be than used to change the color of our Sprite.

The *game* we will create is kind of a contrived example with zero playability but I hope it will serve the purpose introducing custom events to you.

Let there be events
-------------------

Create a new LimeJS project by typing the following, which will create a directory called `events_tutorial` which will contain two files, `events_tutorial.html` and `events_tutorial.js`


    bin/lime.py create events_tutorial

I like to create a separate file to store all my event types and the dispatcher so lets start with that file.

Create a new file in the `events_tutorial` directory and call it `events.js` and copy/paste in the following.


<script src="https://gist.github.com/bulkan/5500582.js"></script>

Closure provides goog.events.EventTarget for dispatching events and listening to them. The documentation blurb writes;

   Inherit from this class to give your object the ability to dispatch events. Note that this class provides event sending behaviour, not event receiving behaviour: your object will be able to broadcast events, and other objects will be able to listen for those events using goog.events.listen().

As goog.events.EventTarget provides the ability to dispatch events we just create a new instance instead of inheriting from it which is done on line 6.

To distinguish between events we will need to create a subclass from goog.events.Event which is done on lines 8-10.  The important part of that code block is the call to the base class on line 9. Make sure you use pass a unique string as this will be the string that will be used to identify the event.

Time to use this event in a new Sprite.

Create a new new file in `events_tutorial` called `coloredsprite.js` directory and paste in the following.


<script src="https://gist.github.com/bulkan/5500571.js"></script>

Here we create a subclass from lime.Sprite_ in which the constructor requires the width and height parameters that define it's size. The changeColor method will be the callback method which will be registered in the event listener when the user touches or clicks on the Sprite. This method is straight forward, generate a random number and if it is greater than 128 fire a new instance of our event class we defined in `events.js`.

Before we move on run the following so that we update our dependencies.


    bin/lime.py update

Let us now connect all of this together in `events_tutorial.js` which will look like the following.


<script src="https://gist.github.com/bulkan/5500572.js"></script>

Most of the code above is boiler plate code. We create an instance of Director, Scene and Layer. The getting started guide for LimeJS_ describes what each of these objects do.

What is important is that we also create an instance of our ColoredSprite class on line 19 and add it to the Layer called *target*. We than listen to the custom event that is being dispatched on line 24 using the unique string we passed into the call to the base class on line 9 of `events.js`.

When the event fires we create a Label, add it to *target* and animate it.

Hope this blog post helped. If you have questions comment on the individual Gist's or send me a tweet @bulkanevcimen
