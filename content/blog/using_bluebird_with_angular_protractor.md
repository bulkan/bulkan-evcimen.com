---
title: "Using Bluebird With Angular Protractor"
date: "2014-11-11"
tags: ["node.js", "angularjs", "bluebird", "promise", "protractor"]
slug: "using_bluebird_with_angular_protractor"

---

## Async control flow

There are few places where you would want to use a promise. Protractor supports Promises in the `onPrepare`
function but the [example](https://github.com/angular/protractor/blob/master/spec/onPreparePromiseConf.js) uses
Q.

That example `onPrepare` written using Bluebird looks like this;

    var Promise = require('bluebird');

    onPrepare: function(){
      return Promise.delay(2000);
        .then(function(){
          browser.params.password = '12345';
        });
    }



A better example is that the `onPrepare` function can be used to perform some async setup task like
creating a fake User in your database to be able to login.


    var User = require('./models/User');

    onPrepare: function() {
      // returns a Promise
      return User.create({
        username: 'bulkan',
        password': 'igotdis'
      });
    }


### Test structure

Protractor uses [Jasmine 1.3](https://github.com/juliemr/minijasminenode) and has updated it to
[automatically resolve Promises](https://angular.github.io/protractor/#/control-flow).


    describe('Home page', function(){
      it('should have username input', function(){
        var username = element(by.css('#username'));
        expect(username.getText()).not.toBeNull();
      });
    });


`expect` automatically resolves the Promise so there is no need to do the following


    username.getText().then(function(text){
      expect(text).toEqual('bulkan');
    });

Here is another example test that will verify that the home page is rendering Post titles.
This time we have to chain onto the `.then` of the Promises.

    var Promise = require('bluebird'),
        Posts = require('./models/Posts');

    describe('Home Page', function(){
      it('should have a list of posts', function(done){

        browser.get('/');

        var posts = element(by.repeater('post in posts').column('post.title'));

        Promise.cast(posts.map(function(elm){
          return elm.getInnerHtml();
        }))
        .then(function(titles){
          return titles.sort();
        })
        .then(function(titles){
          return Posts.findAll({attributes: 'title', order: 'title'})
            .tap(function(_titles){
              expect(titles).toEqual(_titles);
            })
         })
         .nodeify(done);
      });
    });


We need to `Promise.cast` the `posts.map` as we call `.nodeify` which is a bluebird function.  `nodeify`
helps simplify tests by not needing to explicitly call `done` in the last `then` and in a `catch`

Jasmine supports asynchronous tests by passing in a callback function to an `it`, just like in Mocha.
In the test above we find elements by the repeater. The template used might look like;

    <div ng-repeat="post in posts">
        <h1> {{::post.title}} </h1>
    </div>

There might be an easier/simpler way to do this so please do let me know by commenting below.
