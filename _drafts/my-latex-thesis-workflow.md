---
layout: post
title: "My LaTeX thesis workflow"
# date: 2016-03-18 23:45
categories: en
lang: en
---

I do almost all my paper writing in [LaTeX](http://latex-project.org). I know it has its flaws, but for papers it's just great. Once you get the hang of it[^1], everything pretty much just works. In fact, I love LaTeX just enough that I have been known to avoid otherwise fine conferences and journals simply because they do not accept manuscripts made in LaTeX.

Doing a whole thesis in LaTeX however is a whole different beast. At best, you will be spending a lot of time just waiting for the document to build. As in several minutes, or enough to go get a coffee and come back to your computer only to continue waiting. At worst, you will be spending much more time than that fixing a long list of inscrutable errors. If you use many packages, things *will* break. And yet, it's incomparably better than the usual [alternative](https://en.wikipedia.org/wiki/Microsoft_Word). No contest there.

<div class="row">
	<div class="col-sm-3"></div>
	<div class="col-sm-6"><img src="{{ site.baseurl }}/img/blog/thesis-cover.jpg" class="img-responsive" alt="Ken Arroyo Ohori" /></div>
	<div class="col-sm-3"></div>
</div>

I recently finished my [PhD thesis]({{ site.baseurl }}/files/16_thesis.pdf) (<i class="fa fa-exclamation-triangle" style="font-size:0.7em;"></i> 200 MB PDF). Except for the covers and the images inside it, it was made exclusively in LaTeX. Overall, I must say I'm very pleased with the result. However, things were not always easy. I had to make some hard choices and even retrace my steps a few times.

Nevertheless, caveats and all, I do think I have a pretty good setup. So, while things are still fresh on my mind, I will try to document the process a bit and give some general hints to those who are debating whether/how to make their thesis in LaTeX.

This will be a post on *my* workflow and what I consider the best packages for a thesis (or another such long document). I will not go into a lot of detail. My setup is based exclusively in Mac OS X and the tools that are available for it, but I will try to point to the good Windows/Linux alternatives that I know. Not everything will apply to everyone, but I hope people will find it useful.

### Backups and versioning: Time Machine and Git

First things first.  Everyone should have backups these days. Especially anyone looking to write any kind of big document. Unless you keep all your information in the cloud[^2], there's really no excuse. I myself use [Time Machine](https://en.wikipedia.org/wiki/Time_Machine_(OS_X)), which is included in Mac OS X and makes frequent incremental backups. I've heard Windows is supposed to be able to keep a file history, but I've also heard it doesn't work well. 

### Custom fonts: XeTeX

Among the different flavours of LaTeX, my preferred one is [XeTeX](http://xetex.sourceforge.net/)[^3]. It's basically LaTeX with support for Unicode, advanced typography and the possibility to easily change fonts.

As you might know, LaTeX uses Computer Modern by default. In fact, if you've ever seen a document in LaTeX, you *know* how it looks like. Objectively it's not a bad typeface, but it's used so much that it has become the Times New Roman of LaTeX. It's the lazy option.


### KOMA-script or memoir?

It's possible to just use one of the standard LaTeX base classes for your thesis. Many people just go for 

### Bibliography management




[^1]: Which admittedly can take some time…
[^2]: Which if you care about privacy, you probably shouldn't.
[^3]: I know, strictly speaking, XeTeX is a superset of TeX, not of LaTeX. But who uses plain TeX these days anyway?