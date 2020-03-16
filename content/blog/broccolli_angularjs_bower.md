---
title: "Broccoli and Angular.js"
status: "published"
date: "2016-02-16"
tags: ["node.js", "broccoli", "angular"]
slug: "broccoli_and_angularjs"

---

### Warning

This post was initially written on 2014-05-28 and not published. Things might have changed.

[Broccoli](https://www.solitr.com/blog/2014/02/broccoli-first-release/) is a relatively new asset builder. It is based on doing operations
on a trees of files.

Here is how I used it to concatenate front end dependencies installed via
bower and an angular.js app.

## Bower

First, let me show you the two files you need for bower.

## bower.json

Here is an example `bower.json` that lists the frontend dependencies. Note the `resolutions` property.

```json
{
  "dependencies": {
    "angular-ui-router": "0.2.11",
  },
  "resolutions": {
    "angular": "~1.3.0"
  }
}
```

## .bowerrc

This is relative to your project and tells bower where to put the dependencies.

```json
{
    "directory": "public/vendor"
}
```

## Broccoli

Now we need to install broccoli. I've installed the `broccoli-cli` globally and as per the
[installation guide](https://github.com/broccolijs/broccoli#installation).

```shell
npm install --save-dev broccoli
npm install --global broccoli-cli
```

We also need to install plugins for broccoli;

```shell
npm install --saveDev broccoli-concat
```

## Brocfile.js

Like all __task__ runners broccoli has its own file format to define its operations, though
its not really a __task__ runner but rather a build tool.

Here is the `brocfile.js` to concatenate all of the above bower dependencies

```javascript
var broccoli = require('broccoli');
var concat = require('broccoli-concat');

var concatenated = concat('public/',  {
  inputFiles: [
    'vendor/jquery/jquery.min.js',
    'vendor/angular/angular.js',
    'vendor/angular-ui-router/release/angular-ui-router.min.js',
    'js/**/*.js',
  ],
  outputFile: '/assets/app.js',
  separator: '\n', // (optional, defaults to \n)
  wrapInEval: false // (optional, defaults to false)
});

module.exports = concatenated;
```

We explicitly define the order of concatenation to the `concat` function. This
way we have jQuery loading before angular, and angular loading before ui-router
and our app code (which is assumed to exist in `public/js`).

Now running `broccoli serve` will start a http server on port 4200 and the
concatenated Javascript will be available at __https://localhost:4200/assets/app.js__.

Hope that helps.
