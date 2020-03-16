---
title: "Mocking a function that returns a (bluebird) Promise"
date: "2014-04-28"
tags: ["node.js", "mocha", "sinon.js", "should.js", "javascript", "promise", "bluebird"]
slug: "mocking_function_that_returns_promise"

---

With Sinon.JS mocking functions are quite easy. Here is how to stub a function
that returns a Promise.

Demonstrated with a potato quality example. Imagine the following code is in a file named
`db.js`

```
var Promise = require('bluebird');

module.exports.query = function query(q) {
  return Promise.resolve([
    {
      username: 'bulkan',
      verified: true
    }
  ])
}
```

Using `bluebird` we simulate a database query which returns a Promise that is
resolved with an Array of Objects.

Imagine the following code located in `users.js`;

```
var db = require('./db');

module.exports.getVerified = function getVerified(){
  return db.query('select * from where verified=true');
}
```

The mocha unit test for the above which stubs out `db.query`  that is called
in `users.js`;

```
var db = require('./db')
  , should  = require('chai').should()
  , sinon = require('sinon')
  , users;

describe('Users', function(){
  var sandbox, queryStub;

  beforeEach(function(){
    sandbox = sinon.sandbox.create();
    queryStub = sandbox.stub(db, 'query');
    users = require('./users');
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('getVerified should return a resolved Promise', function(){
    queryStub.returns(Promise.reject('still resolved'));
    var p = users.getVerified();
    p.isResolved().should.be.true;
    return p;
  });
})
```

In the `beforeEach` and `afterEach` functions of the test we create a sinon
sandbox which is slightly over kill for this example but it allows you to stub
out a few methods without worrying about manually restoring each stub later on as
you can just restore the whole sandbox as demonstrated in the `afterEach`.

There is one test case that tells the `queryStub` to return a Promise that is rejected.
Then test that the promise that `users.getVerified` returns is resolved. Mocha now
will wait until Promises that are returned from `it`s to resolve.

Sorry about the potato quality example, been trying to think of a better example. Any suggestions ?

Hope this helps.
