---
title: "Using Twython To Connect To The Twitter Streaming API via OAuth"
date: "2013-08-03"
tags: ["python", "oauth", "twitter"]
slug: "using_twython_to_connect_to_twitter_streaming_api_via_oauth "

---

Before you can connect to the Streaming API you need create a Twitter application. This will give you the necessary OAuth credentials. To do this, go to [dev.twitter.com/apps](https://dev.twitter.com/apps), login to your Twitter account then click the _Create a new application_ button and follow the instructions.

To connect to the Streaming using Twython, you need create a subclass of `TwythonStreamer`

```python
from twython import TwythonStreamer

class TweetStreamer(TwythonStreamer):
    def on_success(self, data):
        if 'text' in data:
            print data['text'].encode('utf-8')

    def on_error(self, status_code, data):
        print status_code
        self.disconnect()
```

Now we will instanstiate the `TweetStreamer` class and pass in the oauth details

```python

# replace these with the details from your Twitter Application
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

streamer = TweetStreamer(consumer_key, consumer_secret,
                         access_token, access_token_secret)

streamer.statuses.filter(track = 'python')
```

The method `on_success` on the class `TweetStreamer` will get called for each tweet we receive from the streaming api. The `statuses.filter` call, will find tweets that contain the word _python_. Running this script will start printing tweets to the console.
