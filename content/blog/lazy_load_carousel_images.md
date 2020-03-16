---
title: "Lazy Load Twitter Bootstrap Carousel Images"
date: "2013-08-18"
tags: ["jquery", "bootstrap", "twitter", "deferred"]
slug: "lazy_load_bootstrap_carousel_images"

---


Twitter Bootstrap comes with a nice carousel for cycling through images. If you look at the html for the carousel you will notice that the images are loaded on page load. This is fine as long as it contains a few images but what happens if we have 11 jpg''s 500kb each ? One solution I have is to put the carousel in a modal and using jQuery to lazy load the carousel images.

In the following html we have a modal which contains a carousel which loads three images, when the page loads.

<iframe width="100%" height="300" src="https://jsfiddle.net/bulkan/gggur/8/embedded/html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></br>


[Full screen demo](https://jsfiddle.net/bulkan/gggur/8/embedded/result/)

We can add a bit of JavaScript and change the HTML markup to lazy load the carousel images when the modal is launched.

<iframe width="100%" height="300" src="https://jsfiddle.net/bulkan/Kwgrd/30/embedded/html,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></br>

[Full screen demo](https://jsfiddle.net/bulkan/Kwgrd/30/embedded/result/)

In the HTML all that has changed is that a `div` was added that contains an image element that loads an animated GIF of an `ajax-loader` just above the carousel html and the `src` attributes on `img` elements were changed to `data-src`. This way the browser wont load the images on page load.

The JavaScript does a few things. First, it binds/listens to the `show` event on all `divs` with the `modal` class, finds the carousel within it and hidse it. Then for all image elements within the carousel div we look to see if it has a `data-src` attribute, if it does we create a `Deferred` instance.

[Deferreds](https://stackoverflow.com/questions/4866721/what-are-deferred-objects) are a bit advanced topic but here they are used to make sure that the carousel is shown _after_ all images are loaded, hence why the deferred instance is added to an array.

After this, the JavaScript binds/listens to the load event on the `img` element. In this case it uses the `resolved` function on the deferred instance `p` as the callback function. This means that once the image is loaded by the browser, the deferred is marked as resolved/done.

To load the image, the `src` attribute is set to the value of `data-src` and `data-src` is set to an empty value so that this process isnt repeated again if the modal is closed and re-opened later.

The last bit of code is to wait until all of our deferred instances are done. This is done by the [$.when.apply](https://stackoverflow.com/a/14777167) call. [apply](https://stackoverflow.com/a/1986909) is used here as an array needs to be passed as the argument to `$.when`. In the callback function, we hide the `ajax-loader` and `fadeIn` the carousel.

Thats it. Hope this helps. Read the following [deferred.promise](https://api.jquery.com/deferred.promise/) docs for more information on the API.

</br></br>
