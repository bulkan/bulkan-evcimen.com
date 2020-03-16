---
title: Testing With Mocha, Sinon.js & Mocking Request
date: "2013-10-07"
slug: "testing_with_mocha_sinon"
---


Introduction
------------

Writing tests with Mocha is really fun and satisfying. Combined with `should.js` for expectations/assertions and mocking/stubbing with `sinon.js` I think it becomes very powerful test environment.

In this article I will show you how to get started with test mocking/stubbing by showing an example which stubs out the `get` method on [mikeal/request](https://github.com/mikeal/request). I also
assume you are somewhat familiar with `Node.js` and have it installed.

Before we start create a directory and install the dependencies needed.

    mkdir test_article; cd test_article
    npm install mocha should sinon request async


GET some data
-------------


Here is a function that will get any users public GitHub profile from using the GitHub API. We will use the `async` module to help with the asyncronousness.


```
var request = require('request')
  , async   = require('async');

function getProfile(username, cb){
  async.waterfall([
    function(callback){
      request.get('https://api.github.com/users/' + username, function(err, response, body){
        if (err) return callback(err);
        callback(null, body);
      });
    }
  ], cb)
}

module.exports = getProfile;

getProfile('bulkan', function(result){
  console.log(result);
});
```

We `require` the two packages we need, then define a function which accepts the GitHub _username_ & a _callback_ function.

`async.waterfall` takes an array of functions as its argument then calls them one by one passing the values from that is passed to the `callback` to the next function. For more details read the official description [here](https://github.com/caolan/async#waterfall).

The first function in `async.waterfall` function list does a request to GitHub API passing the `body` to the next function. We dont have have another function so `async.waterfall` will call the callback we passed into
`getProfile` with _err_ and _result_ as its argument. Its a good idea to read the official description of the `waterfall` function.

Last, we export our function as the module so we can use it later.

Tests taste better with Mocha
-----------------------------

To test the above code we can write a Mocha test assuming the above code is in a file named `gh.js`.


```
var getProfile = require('./gh');

describe('User Profile', function(){
  it('can get user profile', function(done){
    getProfile('bulkan', function(err, result){
      if(err) return done(err);

      // simple should.js assertion
      result.should.not.be.empty;
      done();
    });
  });
});
```

We can run the above test via the following line assuming the Mocha test is in a file named `gh_test.js`

`./node_modules/.bin/mocha --require should --ui bdd gh_test.js`

The problem with this test is that each time we run it will do a HTTP GET to GitHub API which will be a slow. The more tests we add that do actual
HTTP requests to third parties will slow the tests even more.  What we can do is we can mock out the request.  


We can change the test code.


```
var request    = require('request')
  , sinon      = require('sinon')
  , getProfile = require('./gh');

describe('User Profile', function(){
  before(function(){
    sinon
      .stub(request, 'get')
      .yields(null, null, JSON.stringify({login: "bulkan"}));
  });

  after(function(){
    request.get.restore();
  });

  it('can get user profile', function(done){
    getProfile('bulkan', function(err, result){
      if(err) return done(err);
      request.get.called.should.be.equal(true);
      result.should.not.be.empty;
      done();
    });
  });
});
```

We add a `before` call that [stubs](https://sinonjs.org/docs/#stubs) out `request.get`.

The `yields` allows us to simulate the call to the callback that is passed to `request.get`. In this case
we return `null` for _err_, `null` for the _response_ and JSON string of a simple object.

The after call restores the default `request.get` method.

Our test case tests that `request.get` was called.

In Node.js `require(..)` loads modules once into a [cache](https://nodejs.org/api/modules.html#modules_caching). As our test case runs first it will load the `request` module first. We use the
reference to the module to be able to stub methods on it. Later on when we load `getProfile` module it will do a `require('request')` call which will retrieve the module from the cache with
the `get` method stubbed out.

I hope this example helps you in your testing.
