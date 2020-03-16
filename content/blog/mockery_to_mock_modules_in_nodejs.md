---
title: "Using mockery to mock modules for Node.js testing"
date: "2014-04-24"
tags: ["node.js", "mocha", "sinon.js", "should.js", "request", "javascript", "mockery"]
slug: "using_mockery_to_mock_modules_nodejs"

---


In a [previous article](https://bulkan-evcimen.com/testing_with_mocha_sinon) I wrote about mocking methods on the [request module](https://github.com/mikeal/request).

`request` also supports another workflow in which you directly call the imported module;

    var request = require('request');

    request({
      method: 'GET',
      url: 'https://api.github.com/users/bulkan'
    }, function(err, response, body){
      if (err) {
        return console.err(err);
      }

      console.log(body);
    })


You pass in an [options object](https://github.com/mikeal/request#requestoptions-callback) specifying properties like the HTTP method
to use and others such as `url`, `body` & `json`.

Here is the example from the [previous article](https://bulkan-evcimen.com/testing_with_mocha_sinon) updated to use `request(options)`;


    var request = require('request');

    function getProfile(username, cb){
      request({
        method: 'GET',
        url: 'https://api.github.com/users/' + username
      }, function(err, response, body){
        if (err) {
          return cb(err);
        }
        cb(null, body);
      });
    }

    module.exports = getProfile;

Its not that big of a change. To unit test the `getProfile` function we will need
to mock out `request` module that is being imported by the module that `getProfile`
is defined in.  This where [mockery](https://github.com/mfncooper/mockery) comes in.
It allows us to change what gets returned when a module is imported.

Here is a mocha test case using mockery. This assumes that the above code is in a file named `gh.js`.

    var sinon = require('sinon')
      , mockery = require('mockery')
      , should = require('chai').should();

    describe('User Profile', function(){
      var requestStub, getProfile

      before(function(){
        mockery.enable({
          warnOnReplace: false,
          warnOnUnregistered: false,
          useCleanCache: true
        });

        requestStub = sinon.stub();

        // replace the module `request` with a stub object
        mockery.registerMock('request', requestStub);

        getProfile = require('./gh');
      });

      after(function(){
        mockery.disable();
      });

      it('can get user profile', function(done){
        requestStub.yields(null, {statusCode: 200}, {login: "bulkan"});

        getProfile('bulkan', function(err, result){
          if(err) {
            return done(err);
          }
          requestStub.called.should.be.equal(true);
          result.should.not.be.empty;
          result.should.have.property('login');
          done();
        });
      });
    })



`mockery` _hijacks_ the `require` function and replaces modules with our mocks. In the above code
we register a `sinon` stub to be returned when `require('request')` is called. Then we configure
the mock in the test using the method `.yield` on the stub to a call the callback
function passed to `request` with `null` for the _error_, an object for the `response` and another object
for the `body`.

You can write more tests


Hope this helps.
