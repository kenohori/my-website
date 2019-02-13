---
layout: post
title: "Swift 3 and OpenGL"
date: 2016-11-05 16:17 -05:00
categories: en
lang: en
---

<div class="row">
	<div class="col-sm-4 col-xs-4"><img src="{{ site.baseurl }}/img/blog/swift.svg" class="img-fluid center-block" alt="Setting the build settings in Xcode"></div>
	<div class="col-sm-8 col-xs-8"><img src="{{ site.baseurl }}/img/blog/opengl.svg" class="img-fluid center-block" alt="Setting the build settings in Xcode"></div>
</div>

Learning Swift has long been in my to-do list. So, when I recently undertook the project to write a CityGML viewer for Mac (to be released soon), I decided the time to learn Swift was now. Fortuitously, Apple had just released Swift 3, and since I like shiny new things, I decided to learn Swift 3 directly.

However, I soon realised that Apple's documentation is very spotty. Despite the new look of the documentation pages, *almost all sample code and examples still use Objective-C*. Moreover, interacting with low-level C APIs like OpenGL is more than a little complex, requiring several conversions and the use of pointer-like data types.

Thus, I hope to document a few of the issues that stumped me and how I solved them. In this post, I will explain how to draw OpenGL to an NSOpenGLView or to a custom NSView. For more info, see Apple's [documentation](https://developer.apple.com/library/content/documentation/GraphicsImaging/Conceptual/OpenGL-MacProgGuide/opengl_drawing/opengl_drawing.html) (which uses Objective-C). Heads up to [this](http://stackoverflow.com/questions/25981553/cvdisplaylink-with-swift) Stack Overflow question and answers for how this works with Swift 2.

## Using NSOpenGLView

The easiest way to draw OpenGL is to subclass `NSOpenGLView`. In this way, most things are managed for you automatically. So, you probably need to set up a class like this:

{% highlight swift %}
import Cocoa
import OpenGL
import GLKit

class OpenGLView: NSOpenGLView {
  var displayLink: CVDisplayLink?
}
{% endhighlight %}

Afterwards, create the `init?()` method and set up the OpenGL pixel format, context and swap interval there.

{% highlight swift %}
required init?(coder: NSCoder) {
  super.init(coder: coder)
  
  let attributes: [NSOpenGLPixelFormatAttribute] = [
    UInt32(NSOpenGLPFAAccelerated),
    UInt32(NSOpenGLPFAColorSize), UInt32(32),
    UInt32(NSOpenGLPFADoubleBuffer),
    UInt32(NSOpenGLPFAOpenGLProfile),
    UInt32(NSOpenGLProfileVersion3_2Core),
    UInt32(0)
  ]
  self.pixelFormat = NSOpenGLPixelFormat(attributes: attributes)
  self.openGLContext = NSOpenGLContext(format: pixelFormat, share: nil)
  self.openGLContext?.setValues([1], for: NSOpenGLCPSwapInterval)
  
}
{% endhighlight %}

Then, create the `prepareOpenGL()` method and its callback. This will be called before the first render and is meant to initialise the state of OpenGL. In this example, we set up `CVDisplayLink` so that a callback function is called to render every new frame.

Note the pointer types `UnsafePointer`, `UnsafeMutablePointer` and `UnsafeMutableRawPointer`, and how `unsafeBitCast` is used in order to convert the `UnsafeMutableRawPointer` to an instance of the current class. This is necessary in order to call any methods.

{% highlight swift %}
override func prepareOpenGL() {
    
  func displayLinkOutputCallback(displayLink: CVDisplayLink, _ now: UnsafePointer<CVTimeStamp>, _ outputTime: UnsafePointer<CVTimeStamp>, _ flagsIn: CVOptionFlags, _ flagsOut: UnsafeMutablePointer<CVOptionFlags>, _ displayLinkContext: UnsafeMutableRawPointer?) -> CVReturn {
      unsafeBitCast(displayLinkContext, to: OpenGLView.self).renderFrame()
      return kCVReturnSuccess
    }

  CVDisplayLinkCreateWithActiveCGDisplays(&displayLink)
  CVDisplayLinkSetOutputCallback(displayLink!, displayLinkOutputCallback, UnsafeMutableRawPointer(Unmanaged.passUnretained(self).toOpaque()))
	CVDisplayLinkStart(displayLink!)
}
{% endhighlight %}

The `renderFrame()` method is called by the callback function in the `CVDisplayLink`. There, you can use any OpenGL drawing functions.

{% highlight swift %}
func renderFrame() {
  CGLLockContext(self.openGLContext.cglContextObj!)
  
  // Draw something...

  CGLFlushDrawable(self.openGLContext.cglContextObj!)
  CGLUnlockContext(self.openGLContext.cglContextObj!)
}
{% endhighlight %}

The draw method should call `renderFrame()` as well.

{% highlight swift %}
override func draw(_ dirtyRect: NSRect) {
  super.draw(dirtyRect)
  renderFrame()
}
{% endhighlight %}

Finally, the `deinit()` method should stop the display link.

{% highlight swift %}
deinit {
  CVDisplayLinkStop(displayLink!)
}
{% endhighlight %}

## Drawing to a custom NSView

Sometimes, NSOpenGLView is not good enough. For instance, NSOpenGLView doesn't support context sharing, which is a problem if you want to create full screen applications. In those cases, you need to subclass `NSView` instead. Apple provides [this](https://developer.apple.com/library/content/samplecode/GLFullScreen/Introduction/Intro.html) piece of sample code for that purpose, but it is also written in Objective-C and way out of date.

Subclassing `NSView` is similar to the previous case. However, you need to keep your own `NSOpenGLPixelFormat` and `NSOpenGLContext`.

{% highlight swift %}
import Cocoa
import OpenGL
import GLKit

class OpenGLView: NSView {
  var pixelFormat: NSOpenGLPixelFormat?
  var openGLContext: NSOpenGLContext?
  
  var displayLink: CVDisplayLink?
}
{% endhighlight %}

The `init?` method can then be pretty much as before, but it is necessary to make it call you own method to initialise OpenGL (`setupDisplayLink()`) and the display link. If you want context sharing, you probably want to create another `init?` method that receives the context to share. Make sure to call `makeCurrentContext()` on the OpenGL context.

{% highlight swift %}
required convenience init?(coder: NSCoder) {
  self.init(coder: coder, context: nil)
}

init?(coder: NSCoder, context: NSOpenGLContext?) {
  // Set up pixel format and context...
  
  super.init(coder: coder)
  openGLContext!.makeCurrentContext()
  setupDisplayLink()
  
  // ...

  NotificationCenter.default.addObserver(self, selector: #selector(reshape), name: NSNotification.Name.NSViewGlobalFrameDidChange, object: self)
}
{% endhighlight %}

The overriden methods to lock the focus and to draw the view should set the view of the context to itself.

{% highlight swift %}
override func lockFocus() {
  super.lockFocus()
  if openGLContext!.view != self {
    openGLContext!.view = self
  }
}

override func draw(_ dirtyRect: NSRect) {
  if openGLContext!.view != self {
    openGLContext!.view = self
  }
  
  // Actually draw something...
  if !CVDisplayLinkIsRunning(displayLink!) {
    drawView()
  }
}
{% endhighlight %}

Finally, the method to draw things (as called by `draw()` or by the display link callback) should do as before, but also make sure to set the current OpenGL context.

{% highlight swift %}
func drawView() {
  CGLLockContext(openGLContext!.cglContextObj!)
  openGLContext!.makeCurrentContext()
  
  // Draw things...

  openGLContext!.flushBuffer()
  CGLUnlockContext(openGLContext!.cglContextObj!)
}
{% endhighlight %}