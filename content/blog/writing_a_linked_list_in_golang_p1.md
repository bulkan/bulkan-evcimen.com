---
title: "Writing a Linked List using Go - part one"
date: "2013-05-30"
tags: ["linked list", "golang", "go"]
slug: "writing_linked_list_using_golang_part_one"

---

In this article series I will briefly talk about Linked Lists then go about implementing one using [Go](https://golang.org). This is both a learning exercise for me to get comfortable using Go and to possibly help other developers transition into becoming a Go programmer. That being said please bear in mind I am still learning Go so excuse the code.

Also, Go already has a [linked list](https://golang.org/pkg/container/list/) implemented so better use that in your production code.

Lets begin with a quick refresher on linked lists and for a more detailed analysis read this [PDF](https://cslibrary.stanford.edu/103/LinkedListBasics.pdf) by Stanford University.

That being said have a look at the following diagram.

<img src="https://i.imgur.com/gVLWlWn.jpg" width="50%" title="Drawn with a Faber-Castell Ambition in pearwood"/>

A linked list is a simple data structure that is used as the basis for other complex data structures. They are comprised of _nodes_ each containing some _data_ field and a reference field to the next node in the list. In the diagram above our nodes contain an integer field as the data. With this information let us write out the code for a node.

If we were using an Object Oriented language like Python then we could just create a class to represent the node. But Go is a procedural language and it does not have classes. That being said it does have a something similar called [struct type](https://golang.org/ref/spec#Struct_types) which we can use to encapsulate the fields of a node.

```
type node struct {
    data int
    next *node
}
```

Here we define a new struct with a `data` field of type `int`. The `next` field has a type of a `pointer to a node`. Remember pointers store the memory address of the type it is pointing too.

Next up we, need to write the functions to insert and remove nodes into the list. Like I wrote previously Go does not have classes hence you would assume that there wont be methods, but you would be surprisingly wrong. Go has a feature of being able to associate functions with structs [methods](https://gobyexample.com/methods).

Here is what I mean.

EDIT
----

As per the [feedback](https://www.reddit.com/r/golang/comments/1fdfud/im_learning_go_so_i_started_writing_a_linked_list/ca9ci1k) on reddit Ive simplified the `AddToHead` method

<script src="https://gist.github.com/bulkan/5677425.js"></script>

We first create a new struct with a field that is the pointer to the beginning of the linked list. All linked lists need this first reference to able to do any operations on it.

Then we create a method called `AddToHead` and associate it with the `LinkedList` struct. This method will create a `node` with the `data` that is passed in and then add this node to head of the list. What happens;

* when the list is empty ?
* when there is at least one node in the list (its not a empty list) ?

We handle the first case by checking if the head of the list `ll.head` is `nil` which is the [zeroed](https://golang.org/doc/effective_go.html#allocation_new) value for a pointer in Go. If `ll.head` is `nil` we can just assign `ll.head` to our `tmp` node.

If `ll.head` is not `nil` we have at least one node in the linked list so we cant just just assign `tmp` to `ll.head` as we would lose the references to the rest of the linked list and all of the data. First we have to set the `tmp` nodes `next` reference to `ll.head` to not lose this reference, then reassign `ll.head` to `tmp`.

I hope this makes sense. Ive pushed this code onto a repository on GitHub called [goll](https://github.com/bulkan/goll). Once you clone the repository run the following command to checkout the branch containing the code in this article.

`git checkout -b part_one`

Once this is branch is checked out look at the tests in `ll_test.go`

In the next post we will look at removing nodes from our linked list and possibly adding another method to insert in sort order.
