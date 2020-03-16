---
title: "Using Express Router instead of express-namespace"
date: "2014-06-09"
tags: ["node.js", "express", "javascript"]
slug: "using_express_router_instead_of_express_namespace"

---

express 4.0 has been out for a while and it seems people are still using
[express-namespace](https://www.npmjs.org/package/express-namespace). According to
npm it had 183 downloads on the 8th of June.

express-namespace hasnt been updated in nearly two years and it can now be
replaced with the Router that comes with express 4.

Also I've found that the middleware mounting on namespace roots would mount it
at the the application level. This is else that the router solves as it allows
you to seperate out __routes__ into different modules with its own middleware.

Here is the example from express-namespace written using the Router in express 4.0.


    var express = require('express'),
        forumRouter = express.Router(),
        threadRouter = express.Router(),
        app = express();

    forumRouter.get('/:id/((view)?)', function(req, res){
      res.send('GET forum ' + req.params.id);
    });

    forumRouter.get('/:id/edit', function(req, res){
      res.send('GET forum ' + req.params.id + ' edit page');
    });


    forumRouter.delete('/:id', function(req, res){
      res.send('DELETE forum ' + req.params.id);
    });

    app.use('/forum', forumRouter);

    threadRouter.get('/:id/thread/:tid', function(req, res){
      res.send('GET forum ' + req.params.id + ' thread ' + req.params.tid);
    });

    forumRouter.use('/', threadRouter);

    app.listen(3333);


A little bit more typing but easier to explain to others and no monkey patching
weirdness of express-namespace.

The routes are more little more explicitly defined.

Hope this helps.
