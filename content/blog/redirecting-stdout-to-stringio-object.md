---
title: "Redirecting stdout to StringIO object"
date: "2007-11-04"
tags: ["python"]
slug: "redirecting-stdout-to-stringio-object"

---

So how do you redirect everything written to stdout and store it somewhere but also print it out to stdout? This was asked on #python and i answered it.<br /><br />To access the stdout file object you need to import the sys module. Redirecting stdout to a StringIO object works because all functions that write to stdout expect the write() method of a file-like object, which StringIO has (along with read, seek etc). So here is the code;


<script src="https://gist.github.com/24771.js"></script>

</font><br /><br />So here is a quick breakdown line by line:<br /><br /><ul><br /><li>Lines 1 and 2 are used to import the required modules.</li><br /><li>Then we subclass StringIO and create an attribute to hold the reference to stdout.</li><br /><li>In Line 9 we overwrite the write method of the StringIO baseclass which does only one additional thing of writing back out to the original stdout, then it calls the baseclasses write method to store the string again.</li><br /><li>Then also overwrite the read method that does one additional thing of seeking to the start of the StringIO object and then writing it all out back to stdout.</li><br /></ul><br /><br /><br/>
