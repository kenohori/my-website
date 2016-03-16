---
layout: post
title: "Using CGAL and Xcode"
# date: 2016-03-18 23:45
categories: en
lang: en
---

For my research, I regularly need to write code to make various geometric computations on GIS datasets. Most of the time, I first use a simple library to read GIS formats (e.g. [GDAL](http://gdal.org)) into something usable, and then I put everything into structures from [CGAL](http://www.cgal.org), the Computational Geometry Algorithms Library. That allows me to do more complex stuff.

Overall, CGAL is *great*. It has a rather steep learning curve and it's only available in C++[^1], but it's free for open source software[^2], fast and numerically robust. I consider it the single most important tool I use for my job. If I had no choice, I could find some kind (bad) substitute for everything else I use daily, but there's *nothing* quite like CGAL.

As a Mac user, my IDE of choice is Xcode. It's certainly possible to use CGAL by editing your code in vi/emacs and building from the command line, as many others do, but I personally find it quite painful, especially for debugging. On the other hand, Xcode and CGAL work together like a charm.

### Getting all the requirements right

CGAL is a big piece of machinery with a lot of dependencies. The exact ones depend on your CGAL configuration and the packages you use, but you can expect at least the following three:

* [boost](http://www.boost.org), which is a gigantic heap of C++ libraries and pretty much defined the standards used by C++11 and C++14. 
* [GMP](https://gmplib.org), which provides arbitrary-precision arithmetic for those nasty geometric computations. You probably want to install it with its C++ extension, GMPXX.
* [MPFR](http://www.mpfr.org), which extends GMP by ensuring correct rounding.

There are many other things that might be nice to have, such as [Qt](http://www.qt.io) and [OpenGL](https://www.opengl.org) for all the graphical demos, [MPFI](https://perso.ens-lyon.fr/nathalie.revol/software.html) for interval arithmetic, and many others.

Luckily, most of these are trivial to install on Mac using [Homebrew](http://brew.sh). If you have Homebrew (and you really should), installing a basic version of CGAL with its basic dependencies is as simple as:

{% highlight shell %}
	brew install cgal
{% endhighlight %}

Some additional dependencies might work by 

### To cmake or not to cmake?

CGAL comes with various scripts (in the `CGAL/bin` folder) that help you use [CMake](https://cmake.org) in order to create platform and compiler independent configuration files for your own code. If fact, If you've ever compiled CGAL yourself, you most likely already used CMake for this.

When asked to generate a `Makefile` for [Make](https://www.gnu.org/software/make/), CMake works great. In fact, it's what I use in order to distribute my own [code]({{ site.baseurl }}/en/code/) and make sure it works everywhere. Except on Windows, that is. Some day I might spend some time to fix that, but it's not trivial and I'm not very motivated to do it.

CMake can also many other kinds of configuration files, including Xcode projects and Visual Studio projects. However, the Xcode projects it generates frankly suck, at least where CGAL is concerned. The last time I tried them, they used the external build option in Xcode, which basically means downgrading Xcode to a glorified text editor[^3]. You lose all of its nifty features.

### Making your own Xcode projects

So, if you're anything like me, you'll quickly disregard CGAL's cmake scripts altogether and just start from a clean Xcode project. The instructions here are for Xcode 7, but they are pretty much the same in all recent versions.

<img src="{{ site.baseurl }}/img/blog/xcode-1.png" class="img-responsive center-block" alt="Welcome window in Xcode">

First, start by creating a new project (File > New > Project, or from the welcome window). Depending on what you plan to do, it can be any kind of project, but for simple things I prefer a Command Line Tool, which is found under OS X > Application. If you want something with a GUI, you probably should go for a Cocoa Application.

<img src="{{ site.baseurl }}/img/blog/xcode-2.png" class="img-responsive center-block" alt="New project in Xcode">

Once you've given your project a name, make sure that the language is set to C++ and click Next. Then decide where to save it, select if you want to create a local [Git](https://git-scm.com)[^4] repository for it and you're done. You're confronted with the main Xcode window.

<img src="{{ site.baseurl }}/img/blog/xcode-3.png" class="img-responsive center-block" alt="Targets in Xcode">

In short, Xcode works on the basis of *projects* and *targets*. I won't go into it in detail, but while the project contains all your stuff, a target has the aim to create a given executable from some of your files. I would recommend you to modify things at the target level.

So make sure you've selected the only target in your project

[^1]: There are unofficial bindings for Python available (and apparently abandoned?), but they don't work well. CGAL's design is based on templated [Traits](http://www.cantrip.org/traits.html), which generate custom data structures and algorithms at compilation time. This system makes it hard to create generic bindings.
[^2]: There's a dual licensing system (open source & commercial). On the open source side, many packages are licensed under the LGPL, some under the GPL.
[^3]: And Xcode is not a very good text editor.
[^4]: Unless you are saving your project in an already versioned directory, e.g. a GitHub repository that you already created and cloned for this purpose, I highly recommend you do this. Git is also *great*. But that's a topic for a another blog post.