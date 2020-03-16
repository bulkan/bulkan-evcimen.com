---
title: "AngularJS & Popup Windows"
status: "published"
date:  "2014-04-14"
tags: ["node.js", "angularjs"]
slug: "angularjs_popup_windows_express"
---

Popup windows are extremely annoying hence most modern browsers block them, agreeably so.
That being said one use of popup windows is when doing OAuth. Showing the OAuth authorization dialog in a
popup window as not to confuse the user.

If there is a better or different way please comment below.

All the code can be found at [angular-popup](https://github.com/bulkan/angular-popup).

Here is how I solved it using a simple `express 4` application and the accompanying AngularJS.

The [express code](https://github.com/bulkan/angular-popup/blob/master/index.js) is very simple it just creates two routes.
The root/index route renders the view to bootstrap the [angular application](https://github.com/bulkan/angular-popup/blob/master/public/js/app.js).

The angular app has one default route `/` with its controller set to `PopupCtrl`. In the template [popup.html](https://github.com/bulkan/angular-popup/blob/master/public/partials/popup.html)
using `ng-click` we call the function bound on the `$scope` called `showPopup`. This is the code for `PopupCtrl`;

Read the inline comments;

```
popupApp.controller('PopupCtrl', ['$scope', '$window', '$interval', function PopupCtrl($scope, $window, $interval) {
  'use strict';

  // assign the current $scope to $window so that the popup window can access it
  $window.$scope = $scope;


  $scope.showPopup = function showPopup(){
    // center the popup window
    var left = screen.width/2 - 200
        , top = screen.height/2 - 250
        , popup = $window.open('/popup', '', "top=" + top + ",left=" + left + ",width=400,height=500")
        , interval = 1000;

    // create an ever increasing interval to check a certain global value getting assigned in the popup
    var i = $interval(function(){
      interval += 500;
      try {

        // value is the user_id returned from paypal
        if (popup.value){
          $interval.cancel(i);
          popup.close();
        }
      } catch(e){
        console.error(e);
      }
    }, interval);

  }
}]);
```

We tell the popup to load up the `/popup` URL which our express app will render the server side [jade template](https://github.com/bulkan/angular-popup/blob/master/views/popup.jade).

    extends layout

    block content
        <h1>I'm a popup</h1>

        script.
            setTimeout(function(){
                window.opener.$scope.says = 'teapot';
                window.value = true;
            }, 2000);


The template above is simple enough. All it does is after two seconds assing to `window.value` to indicate to the `$interval` that
the popup has done something _important_. The popup also assigns a value to `window.opener.$scope` which is the `$scope` that was assigned
in PopupCtrl.

As we have used `ng-model` in the default routes [template](https://github.com/bulkan/angular-popup/blob/master/public/partials/popup.html)
a we will see the text _teapot_ appear in the text input.

Hope this makes sense.
