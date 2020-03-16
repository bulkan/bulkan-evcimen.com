---
title: "Switched Static Site Generator From Pelican To Hugo"
tags: ["go", "python"]
date: 2016-08-09T13:54:18+10:00
---


## Out with the old

I've been using the static site generator [Pelican](https://docs.getpelican.com/en/3.6.3/) for a very long time to generate my blog. The problem I've had for a
while with Pelican is that I had to also use [virtualenv](https://virtualenv.pypa.io/en/stable/) to isolate the dependencies, having to manually run `make html` to generate the html output. I
was never able to get the development server setup with Pelican.

The deployment process was also a little painful but not really Pelican's fault. I would first push to github then pull down the changes on my server and
again run `make html`.

I'm sure this process could have been automated.

## In with the new

[Hugo](https://gohugo.io/) is written in Go which means all I have to install is just a single binary and on OS X with homebrew it was as simple as;

```shell
brew install hugo
```

After installing, I just followed the [quickstart](https://gohugo.io/overview/quickstart/) guide to get started then I picked a theme - [purehugo](https://themes.gohugo.io/purehugo/) -
that resembled my old blog. I tinkered the theme until I got it exactly the way I wanted it. This required me to edit and create some template files based on Go's built in
templating.

The hardest part of switching to Hugo was just updating the [Front Matter](https://gohugo.io/content/front-matter/) that was already in place.

Now to deploy all I have to do is just `rsync` the output directory from Hugo to my server.
