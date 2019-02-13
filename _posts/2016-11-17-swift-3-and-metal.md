---
layout: post
title: "Swift 3 and Metal"
date: 2016-11-17 17:04 -05:00
categories: en
lang: en
---

<div class="row">
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/swift.svg" class="img-fluid center-block" alt="Setting the build settings in Xcode"></div>
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/metal.png" class="img-fluid center-block" alt="Setting the build settings in Xcode"></div>
</div>

As a follow-up to the [previous post](https://3d.bk.tudelft.nl/ken/en/2016/11/05/swift-3-and-opengl.html), perhaps it's also helpful to explain the easiest way to draw to a Cocoa view using Metal rather than OpenGL[^1]. And as a bonus, I also explain how to select OpenGL or Metal rendering on the fly.

## Some background

Apple has never been diligent in keeping up with new OpenGL versions (or the latest graphics cards for that matter), but the situation has reached a pretty bad point. Even the newest hardware supports only *six-year-old* OpenGL 4.1. By comparison, Metal is under constant development and has tons of new features announced every WWDC. But perhaps for the same reason there's a dearth of documentation and good, introductory level and up-to-date examples[^2].

Now, to be honest, I'd prefer to use something open and cross-platform like [Vulkan](https://www.khronos.org/vulkan), but it's still a no-show on macOS (and I don't expect it to change in the future). Or I could switch to Windows. Just kidding. I'd of course switch to Linux instead.

## Drawing to an MTKView

By far the easiest way to draw to a Cocoa view is to subclass `MTKView`, part of MetalKit and available from iOS 9 and El Capitan onwards. This is similar to `NSOpenGLView` for OpenGL, and it means that most things are managed for you automatically. So, you probably need to set up a class like this:

{% highlight swift %}
import Metal
import MetalKit

class MetalView: MTKView {
  var commandQueue: MTLCommandQueue?
  var renderPipelineState: MTLRenderPipelineState?
  var depthStencilState: MTLDepthStencilState?
}
{% endhighlight %}

Afterwards, create the `init()` method and set up the Metal device, MTKView properties, command queue, render pipeline, shaders and depth stencil there. The same goes if you need textures or other stencils.

{% highlight swift %}
required init(coder: NSCoder) {
  
  super.init(coder: coder)
  
  // Device
  device = MTLCreateSystemDefaultDevice()
  
  // View
  clearColor = MTLClearColorMake(1.0, 1.0, 1.0, 1)
  colorPixelFormat = .bgra8Unorm
  depthStencilPixelFormat = .depth32Float
  
  // Command queue
  commandQueue = device!.makeCommandQueue()
  
  // Render pipeline
  let library = device!.newDefaultLibrary()!
  let vertexFunction = library.makeFunction(name: "vertexTransform")
  let fragmentFunction = library.makeFunction(name: "fragmentLit")
  let renderPipelineDescriptor = MTLRenderPipelineDescriptor()
  renderPipelineDescriptor.vertexFunction = vertexFunction
  renderPipelineDescriptor.fragmentFunction = fragmentFunction
  renderPipelineDescriptor.colorAttachments[0].pixelFormat = colorPixelFormat
  renderPipelineDescriptor.depthAttachmentPixelFormat = depthStencilPixelFormat
  do {
    renderPipelineState = try device!.makeRenderPipelineState(descriptor: renderPipelineDescriptor)
  } catch {
    Swift.print("Unable to compile render pipeline state")
    return
  }
  
  // Depth stencil
  let depthSencilDescriptor = MTLDepthStencilDescriptor()
  depthSencilDescriptor.depthCompareFunction = .less
  depthSencilDescriptor.isDepthWriteEnabled = true
  depthStencilState = device!.makeDepthStencilState(descriptor: depthSencilDescriptor)
}
{% endhighlight %}

Finally, create the `draw` method, which will be called either automatically every frame, automatically with a view notification or manually, depending on how you set up `isPaused` and `enableSetNeedsDisplay`.

{% highlight swift %}
override func draw(_ dirtyRect: NSRect) {
    let commandBuffer = commandQueue!.makeCommandBuffer()
    let renderPassDescriptor = currentRenderPassDescriptor!
    let renderEncoder = commandBuffer.makeRenderCommandEncoder(descriptor: renderPassDescriptor)
    
    renderEncoder.setFrontFacing(.counterClockwise)
    renderEncoder.setDepthStencilState(depthStencilState)
    renderEncoder.setRenderPipelineState(renderPipelineState!)
    
    // Draw something...
    
    renderEncoder.endEncoding()
    let drawable = currentDrawable!
    commandBuffer.present(drawable)
    commandBuffer.commit()
  }
{% endhighlight %}

## Selecting Metal or OpenGL rendering on the fly

If you're excited about the performance of Metal (like me) but want to support Mac hardware older than 2012 (like me), you probably want to select between custom subclasses of `MTKView` and `NSOpenGLView` on the fly. In that way, you can probably throw away the OpenGL code in a few years without major code rewrites.

For me, the first step was to isolate all OpenGL- and Metal-specific code into these two subclasses. After that, create a simple placeholder NSView in Interface Builder and kept a reference to it (here `view`). Now, when your application loads you can do something like this:

{% highlight swift %}
func applicationDidFinishLaunching(_ aNotification: Notification) {
  
  let processInfo = ProcessInfo.processInfo
  let sierraOrHigher = processInfo.isOperatingSystemAtLeast(OperatingSystemVersion(majorVersion: 10, minorVersion: 12, patchVersion: 0))
  if sierraOrHigher, let defaultDevice = MTLCreateSystemDefaultDevice() {
    let metalView = MetalView(frame: splitView.subviews[1].frame, device: defaultDevice)
    metalView.controller = self
    splitView.removeArrangedSubview(splitView.arrangedSubviews[1])
    splitView.insertArrangedSubview(metalView, at: 1)
    view = metalView
    window.makeFirstResponder(metalView)
  } else {
    let attributes: [NSOpenGLPixelFormatAttribute] = [
      UInt32(NSOpenGLPFAAccelerated),
      UInt32(NSOpenGLPFAColorSize), UInt32(24),
      UInt32(NSOpenGLPFADoubleBuffer),
      UInt32(NSOpenGLPFADepthSize), UInt32(32),
      UInt32(0)
    ]
    let pixelFormat = NSOpenGLPixelFormat(attributes: attributes)
    let openGLView = OpenGLView(frame: splitView.subviews[1].frame, pixelFormat: pixelFormat)
    openGLView!.controller = self
    splitView.removeArrangedSubview(splitView.arrangedSubviews[1])
    splitView.insertArrangedSubview(openGLView!, at: 1)
    view = openGLView
    window.makeFirstResponder(openGLView)
  }
}
{% endhighlight %}

Note a few things. If you want to support the newest Metal features as of 2016[^3], you want to test for Sierra support. My application crashes on 10.11 even on Metal-compatible hardware[^4], so I've forced OpenGL on 10.11 or lower. The easiest way to test for Metal support is to check the return of `MTLCreateSystemDefaultDevice()`.

Also, substituting a view on the fly is tricky business. Substituting only the view will not have any effect, so you need to remove it from its parent view (in this case `splitView`, an instance of `NSSplitView`) and re-add your subclass of `MTKView` or `NSOpenGLView`.

Finally, for this to work you need to use different initialisers in your `MTKView` and `NSOpenGLView` subclasses. These should receive the view's frame and other variables rather than an instance of `NSCoder`.

{% highlight swift %}
// In the MTKView subclass:
override init(frame frameRect: CGRect, device: MTLDevice?) {
  super.init(frame: frameRect, device: device)
  // Same as before...
}

// In the NSOpenGLView subclass:
override init?(frame: NSRect, pixelFormat: NSOpenGLPixelFormat?) {
  super.init(frame: frame, pixelFormat: pixelFormat)
  // Same as before...
}
{% endhighlight %}

----

[^1]: For [my application](https://github.com/tudelft3d/azul), this resulted in a roughly 10x performance improvement over OpenGL. Your mileage may vary.

[^2]: The clear exception to this is Apple's Adopting Metal 2016 WWDC sessions. See [part 1](https://developer.apple.com/videos/play/wwdc2016/602/) and [part 2](https://developer.apple.com/videos/play/wwdc2016/603/). Don't forget to check out the sample code.

[^3]: Why is Apple not putting clear version numbers?!

[^4]: As does Apple's own Adopting Metal Sample code...