---
layout: post
title: "Swift 3 y Metal"
date: 2016-11-17 17:04 -05:00
categories: es
lang: es
locale_en: "/en/2016/11/17/swift-3-and-metal.html"
locale_es: "/es/2016/11/17/swift-3-and-metal.html"
---

<div class="row">
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/swift.svg" class="img-fluid center-block" alt="Configurando las opciones de compilación en Xcode"></div>
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/metal.png" class="img-fluid center-block" alt="Configurando las opciones de compilación en Xcode"></div>
</div>

Como continuación del [post anterior](https://3d.bk.tudelft.nl/ken/en/2016/11/05/swift-3-and-opengl.html), quizá también sea útil explicar la forma más fácil de dibujar en una vista de Cocoa usando Metal en lugar de OpenGL[^1]. Y como extra, también explico cómo elegir entre el renderizado con OpenGL o con Metal sobre la marcha.

## Algo de contexto

Apple nunca ha sido diligente a la hora de estar al día con las nuevas versiones de OpenGL (o con las tarjetas gráficas más recientes, para el caso), pero la situación ha llegado a un punto bastante malo. Incluso el hardware más nuevo solo soporta el *vetusto* OpenGL 4.1 de hace seis años. En comparación, Metal está en desarrollo constante y cada WWDC se anuncian un montón de funciones nuevas. Pero quizá por la misma razón hay una escasez de documentación y de ejemplos buenos, introductorios y actualizados[^2].

Ahora, para ser honesto, preferiría usar algo abierto y multiplataforma como [Vulkan](https://www.khronos.org/vulkan), pero sigue sin estar disponible en macOS (y no espero que eso cambie en el futuro). O podría pasarme a Windows. Es broma. Por supuesto que me pasaría a Linux en su lugar.

## Dibujando en un MTKView

Con mucho, la forma más fácil de dibujar en una vista de Cocoa es subclasificar `MTKView`, parte de MetalKit y disponible desde iOS 9 y El Capitan en adelante. Esto es similar a `NSOpenGLView` para OpenGL, y significa que la mayoría de las cosas se gestionan automáticamente por ti. Así que probablemente necesites configurar una clase como esta:

{% highlight swift %}
import Metal
import MetalKit

class MetalView: MTKView {
  var commandQueue: MTLCommandQueue?
  var renderPipelineState: MTLRenderPipelineState?
  var depthStencilState: MTLDepthStencilState?
}
{% endhighlight %}

Después, crea el método `init()` y configura ahí el dispositivo de Metal, las propiedades de MTKView, la cola de comandos, el pipeline de renderizado, los shaders y el depth stencil. Lo mismo si necesitas texturas u otros stencils.

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

Finalmente, crea el método `draw`, que se llamará automáticamente en cada frame, automáticamente con una notificación de la vista o manualmente, dependiendo de cómo configures `isPaused` y `enableSetNeedsDisplay`.

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

## Eligiendo entre el renderizado con Metal o con OpenGL sobre la marcha

Si te emociona el rendimiento de Metal (como a mí) pero quieres soportar hardware de Mac más antiguo que 2012 (como a mí), probablemente quieras elegir sobre la marcha entre subclases personalizadas de `MTKView` y `NSOpenGLView`. De esa manera, probablemente puedas tirar el código de OpenGL en unos pocos años sin reescrituras importantes del código.

Para mí, el primer paso fue aislar todo el código específico de OpenGL y de Metal en estas dos subclases. Después, creé un NSView de marcador de posición simple en Interface Builder y mantuve una referencia a él (aquí `view`). Ahora, cuando tu aplicación se carga puedes hacer algo como esto:

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

Nota algunas cosas. Si quieres soportar las funciones más nuevas de Metal hasta 2016[^3], quieres probar el soporte de Sierra. Mi aplicación falla en 10.11 incluso con hardware compatible con Metal[^4], así que he forzado OpenGL en 10.11 o inferior. La forma más fácil de probar el soporte de Metal es revisar el valor de retorno de `MTLCreateSystemDefaultDevice()`.

Además, sustituir una vista sobre la marcha es algo delicado. Sustituir solo la vista no tendrá ningún efecto, así que necesitas quitarla de su vista padre (en este caso `splitView`, una instancia de `NSSplitView`) y volver a añadir tu subclase de `MTKView` o `NSOpenGLView`.

Finalmente, para que esto funcione necesitas usar diferentes inicializadores en tus subclases de `MTKView` y `NSOpenGLView`. Estos deberían recibir el frame de la vista y otras variables en lugar de una instancia de `NSCoder`.

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

[^1]: Para [mi aplicación](https://github.com/tudelft3d/azul), esto resultó en una mejora de rendimiento de aproximadamente 10 veces en comparación con OpenGL. Tu kilometraje puede variar.

[^2]: La clara excepción a esto son las sesiones de la WWDC 2016 de Apple sobre Adopting Metal. Consulta la [parte 1](https://developer.apple.com/videos/play/wwdc2016/602/) y la [parte 2](https://developer.apple.com/videos/play/wwdc2016/603/). No olvides revisar el código de muestra.

[^3]: ¡¿Por qué Apple no pone números de versión claros?!

[^4]: Al igual que el propio código de muestra de Adopting Metal de Apple...
