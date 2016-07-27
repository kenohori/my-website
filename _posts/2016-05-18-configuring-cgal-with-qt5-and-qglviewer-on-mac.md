---
layout: post
title: "Configuring CGAL with Qt5 and QGLViewer on Mac"
date: 2016-05-18 19:30 -05:00
categories: en
lang: en
---

<img src="{{ site.baseurl }}/img/blog/lcc-demo.png" class="img-responsive center-block" alt="New project in Xcode">

CGAL dropped support for Qt4 with version 4.7 in October. But alas, its [Homebrew](http://brew.sh) formula hasn't been updated to reflect this. In practical terms this means *you can't use Qt apps with CGAL*, including all the nice CGAL GUI demos out of the (homebrewed) box. This is bad if you want to build your own GUI applications, or use the demos as a tutorial or a base for your own code.

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

Homebrew wants to keep its own hierarchy in `/usr/local`, but CMake's Qt5 script assumes that Qt5's `mkspecs` and `plugins` are accessible from the root folder. So, make a couple of symlinks from **the latest Qt5 version** in the Homebrew `Cellar` (currently 5.6.1-1) in `/usr/local`[^2]:

{% highlight shell %}
ln -s /usr/local/Cellar/qt5/5.6.1-1/mkspecs /usr/local/mkspecs
ln -s /usr/local/Cellar/qt5/5.6.1-1/plugins /usr/local/plugins
{% endhighlight %}

Next, I modified the Homebrew formula for QGLViewer in order to change its dependency from `qt` to `qt5`[^3]. Something similar could be done for other formulae that depend on `qt`. For this, first edit the formula:

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

Then configuring it using the CMake GUI[^4] and compiling and installing it using `make`:

{% highlight shell %}
$ cmake-gui .
$ make
$ sudo make install
{% endhighlight %}

In the CMake GUI you should be able to select the options that you need, including `WITH_CGAL_Qt5` and `WITH_demos`.

<img src="{{ site.baseurl }}/img/blog/cmake.png" class="img-responsive center-block" alt="New project in Xcode">

**Update 27 Jul 2016**: Added instructions to symlink Qt5's `mkspecs` and `plugins`, and a note about `cmake-gui`.

---

[^1]: Ideally, it should be possible to compile CGAL with an unlinked Qt5 using `-L/usr/local/opt/qt5/lib` and `-I/usr/local/opt/qt5/include`. However, this doesn't work for me. Please let me know if you manage to get this working.
[^2]: Thanks to stephane-lb in <https://github.com/Homebrew/legacy-homebrew/issues/29938> for the tip. This might be solvable using CMake's Qt paths, but alas I couldn't get them to work.
[^3]: Or better yet, make a branch of the formula and change it there.
[^4]: Rather annoyingly, Homebrew's CMake package doesn't include its GUI. So you might want want to install the official .pkg version (which causes no compatibility issues with Homebrew) or use the command line `cmake` with the appropriate `-D` parameters.