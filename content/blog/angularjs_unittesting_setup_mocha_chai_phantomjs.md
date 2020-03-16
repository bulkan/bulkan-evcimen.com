---
title: "Setting up AngularJS unit testing with Chai, Mocha & PhantomJS"
draft: true
date: "2014-06-16"
tags: ["node.js", "angularjs", "chai", "phantomjs", "mocha"]
slug: "angularjs_unit_testing_setup_mocha_chai_phantomjs"

---

## Draft

* create a simple controller using the style guide here
* we will be using angular-ui-router


    angular.module('MyApp')
      .config(function($stateProvider){
        $stateProvider.state('root', {
          url: '/',
          template: '<ui-view></ui-view>',
          controller: 'TodoController'
        })
      })
      .controller('TodoController', function($state, $http){
      });


* npm deps

    npm install phantomjs

* bower


    {
        "directory": "bower_components"
    }


    bower install --save angular angular-ui-router
    bower install --save-dev mocha chai

* create a test

    describe('TodoController', function(){
      it('should load todos from server');
      it('should send a PUT request when a todo is checked off');
    });
* write the runner.html
