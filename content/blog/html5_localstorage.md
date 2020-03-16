---
title: "HTML5 Manifest File & Nginx"
status: "published"
date: "2013-05-09"
tags: ["html5", "javascript", "manifest file", "nginx", "limejs"]
slug: "html5_manifest_file_nginx"

---

Ive been developing a HTML5 game using the LimeJS framework. As I am targetting iPhone and iPod Touches I asked my lovely <del>girlfriend</del> [fiance](https://aurorachiarello.com) to design me an app icon and hopefully In the near future she will also have give startup images too.

As I dont want to load the icon and startup images via the __network__ every time the _app_ loads, I thought I would cache it "offline". To do this you need to create a manifest file which your web server needs to set a specific content-type header which is just `text/cache.manifest`.

To load a `manifest` file you need to add an attribute called `manifest` that points to your manifest file. It can be a relative path.

```
<!DOCTYPE HTML>
<html manifest="mysite.manifest">
...
```

Here is how the rest of my HTML file looks like

```
...
<head>
    <title>site</title>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <link rel="apple-touch-icon" href="/assets/icon.png"/>
    <script type="text/javascript" src="site.js"/>
</head>
    <body></body>
</html>
```

The `manifest` file tells the browser which files to store locally, the syntax for it kind of reminds me of INI files, but not quite. My manifest file looks like following;

```
CACHE MANIFEST
/assets/icon.png

NETWORK:
site.js
```

This tells the site to cache/store the png image for the _app_ icon. The file listing following the `NETWORK:` section tells the browser to always load the files from the _network_.  More info is available in this [link](https://www.html5rocks.com/en/tutorials/appcache/beginner/)

If you are using Nginx like I am, then you need to change the file `mime.types` and add the following

```
text/cache.manifest       manifest;
```

Which just tells Nginx to serve up file resources ending with `manifest` with the content-type header of `test/cache.manifest`.


Hope this helps.
