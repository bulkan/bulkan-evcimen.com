---
title: "Building a Twitter Filter With CherryPy, Redis, and tweetstream"
date: "2010-03-18"
tags: ["python", "redis", "cherrypy", "twitter"]
slug: "building_twitter_filter_cherrypy_redis_tweetstream"

---

## Background  

_all the code is available at https://github.com/bulkan/queshuns_

Since reading [this post by Simon Willison](https://simonwillison.net/2009/Oct/22/redis/)
I've been interested in [Redis](https://code.google.com/p/redis) and have been following
its development. After having a quick play around with Redis I've been looking
for a project to work on that uses Redis as a data store. I then came across this [blog post](https://www.digitalhobbit.com/2009/11/08/building-a-twitter-filter-with-sinatra-redis-and-tweetstream/) by Mirko Froehlich, in which he shows the steps and code
to create a Twitter filter using Redis as the datastore and Sinatra as the web app.
This blog post will explain how I created [queshuns.com](https://queshuns.com)
in Python and the various listed tools below.

## Tools  


* [tweetstream](https://pypi.python.org/pypi/tweetstream) - provides the interface to the Twitter Streaming API
* [CherryPy](https://www.cherrypy.org/) - used for handling the web app side, no need for an ORM
* [Jinja2](https://jinja.pocoo.org/2/) - HTML templating
* [jQuery](https://jquery.com/) - for doing the AJAXy stuff and visual effects
* [redis-py](https://github.com/andymccurdy/redis-py) - Python client for Redis
* [Redis](https://code.google.com/p/redis/) - the "database", look here for the documenation on how to install it  

<br>
## Retrieving tweets    


The first thing we need to is retrieve tweets from the Twitter Streaming API. Thankfully there
is already a Python module that provides a nice interface called *tweetstream*. For more
information about tweetstream look at the Cheeseshop page for its usage guide.   

Here is the code for the *filter_daemon.py*, which when executed as a script from the command-line
will start streaming tweets from Twitter that contain the words "why", "how", "when", "lol", "feeling"
and the tweet must end in a question mark.  

<script src="https://gist.github.com/263158.js?file=filter_daemon.py"></script>  

In this script I define a class, _FilterRedis_ which I use to abstract some methods that will
be used by both *filter_daemon.py* and later by the web app itself.  

The important part of this class is the _push_ method, which will push *data* onto the tail of a Redis
list. It also keeps a count of items and when it goes over the threshold of 100 items,
it will trim starting from the head and the first 20th elements (or the oldest tweets).

The *schema* for the tweet data that gets pushed into the Redis list is a dictionary
of values that gets jsonified (we can probably use then new Redis hash type);

> { 'id':"the tweet id",
>   'text':"text of the tweet",
>   'username':",
>   'userid':"userid",
>   'name': "name of the twitter user",
>   'profile_image_url': "url to profile image",
>   'received_at':time.time() }  

'received_at' is important because we will be using that to find *new* tweets to
display in the web app.

## Web App     

I picked CherryPy to write the web application, because I wanted to learn it for the future
when I need to write a small web frontends that dont need an ORM. Also, CherryPy has a built-in
HTTP server that is *sufficient* for websites with small loads, which I initially used to run
[queshuns.com](https://queshuns.com) it is now being run with mod_python. For templating, I used Jinja2 because its similair
in syntax to the Django templating language that I am familiar with.   

The following is the code for *questions_app.py* which is the CherryPy application.

<script src="https://gist.github.com/263167.js?file=questions_app.py"></script>  

The _index_ (method) of the web app will get the all the tweets from Redis. The other exposed  
function is _latest_ which accepts an argument *since* which is used to get
tweets that are newer (_since_ is the latest tweets received_at value). *nt* is
used to create a different URL each time so that IE doesn't cache it. This method returns
JSON at.

The templates are located in a directory called _templates_ :)

Here is the template for the root/index of the site; index.jinja  

<script src="https://gist.github.com/263172.js?file=gistfile1.htm"></script>  

This template will be used to render a list of tweets and also assign the first
tweets *recieved_at* value to a variable on the *window* object. This is used by
the *refreshTweets* function which will pass it on to /latest in a GET parameter.
*refreshTweets* will try to get new tweets and prepend it to the *content* div
and then slide the *latest* tweets. This is the template used to render the HTML
for the latest tweets;  

<script src="https://gist.github.com/263175.js?file=gistfile1.htm"></script>  

I explicitly set the the *latest* div to "display: none" so that I can animate it.

Now we should be able to run questions_daemon.py to start retrieving tweets then start
questions_app.py to look at the web app. On your browser go to https://localhost:8080/
and if everything went correctly you should see a list of tweets that update every 10 seconds.

Thats it. Hope this was helpful.
