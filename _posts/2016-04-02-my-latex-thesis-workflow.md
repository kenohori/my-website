---
layout: post
title: "My LaTeX thesis workflow"
date: 2016-04-02 22:45 +02:00
categories: en
lang: en
---

I do almost all my [paper writing]({{ site.baseurl }}/en/papers/) in [LaTeX](http://latex-project.org). I know it has its flaws, but for papers it's still fantastic. Once you get the hang of it[^1], everything just works. No matter your need, you're pretty much guaranteed to find a package that solves it. In fact, I love LaTeX just enough that I have been known to avoid otherwise fine conferences and journals simply because they do not accept manuscripts made in LaTeX.

Doing a whole thesis in LaTeX however is a whole different beast. At best, you will be spending a lot of time just waiting for the document to build. As in several minutes, or enough to go get a coffee and come back to your computer only to continue waiting. At worst, you will be spending much more time than that fixing a long list of inscrutable errors. If you use many packages, things *will* break---sometimes subtly and sometimes horribly. And yet, it's incomparably better than the horrifying [alternative](https://en.wikipedia.org/wiki/Microsoft_Word). No contest there.

<div class="row">
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/thesis-cover.jpg" class="img-fluid" alt="Thesis front cover" /></div>
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/thesis-cover-back.jpg" class="img-fluid" alt="Thesis back cover" /></div>
</div>

I recently finished my PhD thesis ([High-quality 200 MB]({{ site.baseurl }}/files/16_thesis.pdf) / [Low-quality 15 MB]({{ site.baseurl }}/files/16_thesis_lowres.pdf) / [HTML](https://3d.bk.tudelft.nl/ken/en/thesis/)). Except for the covers and the images inside it, it was made exclusively in LaTeX. Overall, I must say I'm very pleased with the result. However, things were not always easy. When choosing among various options, I had to make some hard choices and even retrace my steps a few times after things went wrong.

Nevertheless, caveats and all, I do think that I have a pretty good setup. So, while things are still fresh on my mind, I will try to document the process a bit and give some general hints to those who are debating whether/how to make their thesis in LaTeX, or perhaps anyone who is looking for ideas for a more robust workflow.

So, this will be an opinionated post on *my* general workflow and the main packages that I consider the best for a thesis (or another similarly long and complex document). I will not write how I achieved my (rather complex) layout or go into a lot of detail into every package or setting here.

My setup is based in Mac OS X and the tools that are available for it, but I will try to point to the good Windows/Linux alternatives that I know (and sometimes I don't know of any). Not everything will apply to everyone, but I hope some people will find it useful.

### Backups and versioning: Time Machine and Git

First things first. Everyone should have backups these days. Especially anyone looking to write any kind of big document. Unless you keep all your information in the cloud[^2], there's really no excuse. I myself use [Time Machine](https://en.wikipedia.org/wiki/Time_Machine_(OS_X)), which is included in Mac OS X and makes frequent incremental backups. I've heard Windows is supposed to be able to keep a file history, but I've also heard it doesn't work well. There are Time Machine-y options on Linux (e.g. Cronopete), but I think if you're technical enough it's probably easier to `rsync` your files somewhere on a regular basis.

However, simply having a backup is sometimes not good enough. Many times I have found myself wanting to retrieve text I have already written and deleted. Sometimes after a long but unproductive workday you realise that yesterday's text was better than today's in some subtle (or obvious) way. While it's possible to retrieve old copies of your files from a backup, it's much smarter to keep a versioning system of some kind.

<a href="http://xkcd.com/1597/"><img src="http://imgs.xkcd.com/comics/git.png" class="img-fluid center-block" alt="xkcd: Git"></a>

My choice for a versioning system is clear. [Git](https://git-scm.com) is admittedly not that easy to use, but it's miles ahead of other versioning systems. I personally use [Tower](https://www.git-tower.com) as a GUI, which is a great piece of software and has a 50% student discount. It actually makes git easy to use and most likely faster too. For comparing and merging different versions of files, I use [Kaleidoscope](http://www.kaleidoscopeapp.com). It's also great and also comes with an academic discount.

So, if you decide to use Git, you need to set up a repository. While you may decide to only do so locally, I personally prefer to keep everything pushed to a private GitHub[^3] repository too. It's an extra layer of security. Also, most people I've met don't know that GitHub provides [free academic plans](https://education.github.com) both for individual people and for groups. These allow you keep a few private repositories. At the [3D geoinformation group](https://3d.bk.tudelft.nl), we use them extensively.

As a small note, Git versioning works best when you keep *one sentence per line*. This makes comparing and merging changes much easier. See my supervisor Hugo's [other tips](https://3d.bk.tudelft.nl/hledoux/blog/rules-happy-latex/) in this sense. I agree with most of them, but they're all reasonable even when working entirely by yourself and will help to keep LaTeX documents tidy. As a rule: commit early and commit often. Just before deciding on a big change and at the end of your working day are good times for this.

### Text editor: Sublime Text

These days I use [Sublime Text](https://www.sublimetext.com) 3. It's a little slow, has a horribly bad spell checker[^4] and doesn't conform well to the Mac UI, but it has *great* editing functions. After getting used to them, I don't think I could work without multiple cursors. My other small annoyance is that it uses [Skim](http://skim-app.sourceforge.net) as a PDF reader. Skim is okay. It's fast and supports SyncTeX to go back and forth between your source and PDF, but it has weird graphical glitches which I find very annoying.

The other sensible option on Mac is [TeXShop](http://pages.uoregon.edu/koch/texshop/). It's pretty great. It's fast and comes with a fantastic PDF previewer. However, it doesn't come close to the power user text editing functions in Sublime Text.

### Custom fonts: XeTeX

Among the different flavours of LaTeX, my preferred one is [XeTeX](http://xetex.sourceforge.net/)[^5]. It's basically LaTeX with support for Unicode, advanced typography and the possibility to easily change fonts. If you write even short pieces of text in any non-Latin script, it's also the only sensible option. It's an order of magnitude slower than plain LaTeX though.

As you might know, LaTeX uses Computer Modern by default. In fact, if you've ever seen a document in LaTeX, you *know* how it looks like. Objectively it's not a bad typeface, but it's used so much that it has become the Times New Roman of LaTeX. It's the lazy option. To me, a opening a paper written in Computer Modern already makes me less excited to read it. Why not go for something a little fresher? Minion Pro is beautiful, plays well with Myriad Pro and the MnSymbol math font, and (I believe) still comes with Adobe Reader. Garamond, Linux Libertine, and Palatino are other good, safe options.

I myself decided to go with something a bit wilder, so I bought Feijoa for this purpose, a very special font made by great New Zealand-based designer [Kris Sowersby](https://klim.co.nz). The display style is truly special and unique. At the same time, all the other styles are just a tiny bit special while being great to read. On a sidenote, he also makes Metric, the also beautiful font I use for my website. My second choice was [Alegreya](http://www.huertatipografica.com/en/fonts/alegreya-ht-pro), which is also very beautiful. However, I couldn't find any appropriate math font for it.

This brings me to an important tip. If you have a significant number of math and equations and decide to go for any other font, just make sure that you can find a math font that goes well with it. For me, this was Asana Math, which plays pretty well with Feijoa. A less important choice might be a nice monospaced font for source code. For that, I use Grilli Type's [Pressura](https://www.grillitype.com/typefaces/gt-pressura). My setup is below:

{% highlight latex %}
\setmainfont[Ligatures=TeX,ItalicFont=Feijoa-MediumItalic,StylisticSet=6]{Feijoa}
\setmonofont[BoldFont=GTPressuraMono-Bold,ItalicFont=GTPressuraMono-LightItalic]{GTPressuraMono-Light}
\setmathfont{Asana-Math.otf}
\newfontfamily\fanciestfont[Ligatures={TeX,Discretionary}]{Feijoa-Display}
\newfontfamily\fancyfont[Ligatures=TeX]{Feijoa-Display}
\newfontfamily\chapternumberfont[Ligatures=TeX,Numbers=Lining]{Feijoa-Display}
{% endhighlight %}

Note that the actual package you need to modify fonts in XeTeX is `fontspec`. If you want to use a unicode math font (e.g. Asana Math), you'll also need `unicode-math`.

### Base class: book, KOMA-script or memoir?

It's possible to just use one of the standard LaTeX base classes for your thesis. Many people just go for `report` or `book`. In general, this is fine. However, if you plan to do a lot of customisation, this is a recipe for disaster. The more packages you use, the bigger chances that they'll conflict with each other.

Because of this, I would recommend starting from either the `scrbook` class from KOMA-script or `memoir`. Both are very different. KOMA-script is pretty minimal, but it has handy functions to customise pages, headers, styles and is relatively easy to tinker with. Its documentation is okay, but good luck browsing through German forum posts if you want to really tinker with its innards. `Memoir` follows a completely opposite approach, trying to accommodate as much functionality as possible within itself. Its documentation is great, but it conflicts with many other packages.

### Other key packages

If you use any math, add the AMS packages that you require (e.g. `amsmath` and `amssymb`). They provide better symbols and math environments. `Subfig` is nice for subfigures, `algorithm2e` is nice for algorithms, `listings`is good for typesetting code, `booktabs` makes nicer tables, `babel` fixes hyphenation (make sure to set the language properly!), and `pdfpages` is nice to insert whole PDFs (e.g. for your cover).

For debugging, `showlabels` is nice to show every label you set and exactly where it's placed. `Showframe` is great to fix your page layout.

### Bibliography management

If you need to keep track of a large number of references, you'll need a reference manager. There are many decent online options, but if you're a Mac user who works mostly with LaTeX, why not use [BibDesk](http://bibdesk.sourceforge.net)? It's great, free and keeps all your references in a BibTeX format, ready to insert into your thesis using something like `natbib`. Just make sure that you export a Minimal BibTeX file if you share your .bib file with others. You probably don't want to make your own candid thought on bad papers known to everyone.

Many people are now recommending to use `biblatex` or `biber`. I tried both and had a bad experience with them, so I went back to plain old `natbib`. `Biblatex` is powerful, but it generates a really weird reference format (that I strongly dislike). Programming it back to sensible output is as cumbersome as typing your references by hand.

### Later: programming a 1.5 column layout

So, I think this is enough for today. Some other day I will explain how to get a nice 1.5 column layout in LaTeX (text block + wide outer margins for figures and side notes), as well as a few other interesting tidbits of LaTeX programming.

Thanks for reading!

-----

[^1]: Which admittedly can take some time…
[^2]: Which if you care about privacy, you probably shouldn't. But unless you've made a lot of people angry&mdash;or your research does&mdash;,your thesis is likely not a big target anyway.
[^3]: Yes, I know that people are complaining that there's a bit of a GitHub monoculture these days, but honestly, they've achieved that by providing the best option to host open source code by far.
[^4]: On Mac, this can be fixed by using [CheckBounce](https://github.com/phyllisstein/CheckBounce), which replaces the built-in spell checker with the one in Mac OS X. However, it makes Sublime Text much slower.
[^5]: I know, strictly speaking, XeTeX is a superset of TeX, not of LaTeX. But who uses plain TeX these days anyway?