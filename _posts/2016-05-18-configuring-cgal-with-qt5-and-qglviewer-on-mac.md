---
layout: post
title: "Configuring CGAL with Qt5 and QGLViewer on Mac"
date: 2016-05-18 19:30
categories: en
lang: en
---

<img src="{{ site.baseurl }}/img/blog/lcc-demo.png" class="img-responsive center-block" alt="New project in Xcode">

CGAL dropped support for Qt4 with version 4.7 in October. But alas, its [Homebrew](http://brew.sh) formula hasn't been updated to reflect this. In practical terms this means that you can't  compile all the nice CGAL GUI demos out of the (homebrewed) box. This is bad if you want to use them as a tutorial or as a base for your own code.

Recently I spent some time trying to get the Linear Cell Complex demo working on Mac with a minimum of fuss. As that demo requires Qt5 and QGLViewer, the same procedure should work for a lot of other demos, so I decided to document it here. However, bear in mind that this solution requires you to unlink Qt4 in order to link Qt5, which will break any homebrewed formulae that depend on `qt`[^1].

So, first unlink Qt4 (i.e. remove its symlinks that Homebrew creates under `/usr/local`) using:

{% highlight shell %}
$ brew unlink qt
{% endhighlight %}

Then, install and link Qt5. Since Qt5 conflicts with Qt4 and is thus not normally meant to be symlinked into `/usr/local`, you need to use `--force`:

{% highlight shell %}
$ brew install qt5
$ brew link qt5 --force
{% endhighlight %}

Next, I modified the Homebrew formula for QGLViewer in order to change its dependency from `qt` to `qt5`[^2]. Something similar could be done for other formulae that depend on `qt`. For this, first edit the formula:

{% highlight shell %}
$ brew edit libqglviewer
{% endhighlight %}

And change `depends_on "qt"` to `depends_on "qt5"`. If you haven't configured a text editor for Homebrew, you'll be using `vim` by default. So, press `I` to change to insert mode, change whatever you need, then press `ESC` to exit insert mode, then type `:wq` to write and quit.

Now that the formula has been modified, you can install QGLViewer (or whatever other formulae you need) by building it from source using:

{% highlight shell %}
$ brew install libqglviewer --build-from-source
{% endhighlight %}

Finally, you can then download CGAL and install it from source. My preferred way to do this is to go to an appropriate folder in your computer and cloning the CGAL repository:

{% highlight shell %}
$ git clone https://github.com/CGAL/cgal.git
{% endhighlight %}

Then configuring it using the CMake GUI and compiling and installing it using `make`:

{% highlight shell %}
$ cmake-gui .
$ make
$ sudo make install
{% endhighlight %}

In the CMake GUI you should be able to select the options that you need, including `WITH_CGAL_Qt5` and `WITH_demos`.

<img src="{{ site.baseurl }}/img/blog/cmake.png" class="img-responsive center-block" alt="New project in Xcode">

---

[^1]: Ideally, it should be possible to compile CGAL with an unlinked Qt5 using `-L/usr/local/opt/qt5/lib` and `-I/usr/local/opt/qt5/include`. However, this doesn't work for me. Please let me know if you manage to get this working.
[^2]: Or better yet, make a branch of the formula and change it there.