---
title: "jQuery.get and IE7"
date: "2009-12-15"
tags: ["jquery", "ie7"]
slug: "jquery_get_ie7"

---

I've been recently playing around with jQuery and some AJAXy stuff using jquery.get to request a piece of HTML. Like any sane web developer I use Firefox and Firebug and everything worked as expected. But then I decided to try Internet Explorer 7 (yeah i'm crazy like that). Well the AJAX call didn't work. Actuallyjquery.get was executed but the callback function didn't get *ehh* called. I spent quite a few hours googling I didn't find anything directly to solve my problem.  [This Google Group post](https://groups.google.com/group/jquery-en/browse_thread/thread/a020397793239c51/01c74f0b75dd3f49?lnk=gst&q=get+ie7+callback#01c74f0b75dd3f49) kind of helped.

I read on the [jQuery docs](https://docs.jquery.com/Ajax/jQuery.get#urldatacallbacktype) that the callback to get will only execute if data is loaded. Don't know why data wasn't being loaded when IE7 issued the get (maybe because of [caching](https://groups.google.com/group/jquery-en/browse_thread/thread/a40b6fb572232e3b/662932a169dd4e14?lnk=gst&q=%24.ajax%28%29+firefox+ie7#662932a169dd4e14) ). So I decided to change the back end code to return JSON instead and use jquery.getJSON. With this change IE7 getJSON successfully got data back from the server.
