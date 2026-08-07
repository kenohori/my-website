---
layout: post
title: "Swift 3 y OpenGL"
date: 2016-11-05 16:17 -05:00
categories: es
lang: es
locale_en: "/en/2016/11/05/swift-3-and-opengl.html"
locale_es: "/es/2016/11/05/swift-3-and-opengl.html"
---

<div class="row">
	<div class="col-sm-4 col-xs-4"><img src="{{ site.baseurl }}/img/blog/swift.svg" class="img-fluid center-block" alt="Configurando las opciones de compilación en Xcode"></div>
	<div class="col-sm-8 col-xs-8"><img src="{{ site.baseurl }}/img/blog/opengl.svg" class="img-fluid center-block" alt="Configurando las opciones de compilación en Xcode"></div>
</div>

Aprender Swift había estado durante mucho tiempo en mi lista de pendientes. Así que, cuando recientemente emprendí el proyecto de escribir un visor de CityGML para Mac (que se lanzará pronto), decidí que el momento de aprender Swift era ahora. Afortunadamente, Apple acababa de lanzar Swift 3, y como me gustan las cosas nuevas y brillantes, decidí aprender Swift 3 directamente.

Sin embargo, pronto me di cuenta de que la documentación de Apple es muy irregular. A pesar del nuevo aspecto de las páginas de documentación, *casi todo el código de muestra y los ejemplos todavía usan Objective-C*. Además, interactuar con APIs de C de bajo nivel como OpenGL es más que un poco complejo, ya que requiere varias conversiones y el uso de tipos de datos similares a punteros.

Por lo tanto, espero documentar algunos de los problemas que me dejaron atascado y cómo los resolví. En este post, explicaré cómo dibujar OpenGL en un NSOpenGLView o en un NSView personalizado. Para más información, consulta la [documentación](https://developer.apple.com/library/content/documentation/GraphicsImaging/Conceptual/OpenGL-MacProgGuide/opengl_drawing/opengl_drawing.html) de Apple (que usa Objective-C). Echa un vistazo a [esta](http://stackoverflow.com/questions/25981553/cvdisplaylink-with-swift) pregunta y respuestas de Stack Overflow sobre cómo funciona esto con Swift 2.

## Usando NSOpenGLView

La forma más fácil de dibujar OpenGL es subclasificar `NSOpenGLView`. De esta manera, la mayoría de las cosas se manejan automáticamente por ti. Así que probablemente necesites configurar una clase como esta:

{% highlight swift %}
import Cocoa
import OpenGL
import GLKit

class OpenGLView: NSOpenGLView {
  var displayLink: CVDisplayLink?
}
{% endhighlight %}

Después, crea el método `init?()` y configura ahí el formato de píxeles, el contexto y el intervalo de intercambio de OpenGL.

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

Después, crea el método `prepareOpenGL()` y su callback. Esto se llamará antes del primer render y tiene como objetivo inicializar el estado de OpenGL. En este ejemplo, configuramos `CVDisplayLink` para que se llame a una función callback que renderice cada nuevo frame.

Nota los tipos de puntero `UnsafePointer`, `UnsafeMutablePointer` y `UnsafeMutableRawPointer`, y cómo `unsafeBitCast` se usa para convertir el `UnsafeMutableRawPointer` en una instancia de la clase actual. Esto es necesario para poder llamar cualquier método.

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

El método `renderFrame()` es llamado por la función callback en el `CVDisplayLink`. Ahí, puedes usar cualquier función de dibujo de OpenGL.

{% highlight swift %}
func renderFrame() {
  CGLLockContext(self.openGLContext.cglContextObj!)
  
  // Draw something...

  CGLFlushDrawable(self.openGLContext.cglContextObj!)
  CGLUnlockContext(self.openGLContext.cglContextObj!)
}
{% endhighlight %}

El método de dibujo debería llamar también a `renderFrame()`.

{% highlight swift %}
override func draw(_ dirtyRect: NSRect) {
  super.draw(dirtyRect)
  renderFrame()
}
{% endhighlight %}

Finalmente, el método `deinit()` debería detener el display link.

{% highlight swift %}
deinit {
  CVDisplayLinkStop(displayLink!)
}
{% endhighlight %}

## Dibujando en un NSView personalizado

A veces, NSOpenGLView no es suficiente. Por ejemplo, NSOpenGLView no soporta compartir contexto, lo cual es un problema si quieres crear aplicaciones de pantalla completa. En esos casos, necesitas subclasificar `NSView` en su lugar. Apple proporciona [este](https://developer.apple.com/library/content/samplecode/GLFullScreen/Introduction/Intro.html) pedazo de código de muestra para ese propósito, pero también está escrito en Objective-C y muy desactualizado.

Subclasificar `NSView` es similar al caso anterior. Sin embargo, necesitas conservar tu propio `NSOpenGLPixelFormat` y `NSOpenGLContext`.

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

El método `init?` puede entonces ser prácticamente igual que antes, pero es necesario hacer que llame tu propio método para inicializar OpenGL (`setupDisplayLink()`) y el display link. Si quieres compartir contexto, probablemente quieras crear otro método `init?` que reciba el contexto a compartir. Asegúrate de llamar `makeCurrentContext()` en el contexto de OpenGL.

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

Los métodos sobreescritos para bloquear el foco y para dibujar la vista deberían establecer la vista del contexto como el propio view.

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

Finalmente, el método para dibujar cosas (llamado por `draw()` o por el callback del display link) debería hacer lo mismo que antes, pero también asegurarse de establecer el contexto actual de OpenGL.

{% highlight swift %}
func drawView() {
  CGLLockContext(openGLContext!.cglContextObj!)
  openGLContext!.makeCurrentContext()
  
  // Draw things...

  openGLContext!.flushBuffer()
  CGLUnlockContext(openGLContext!.cglContextObj!)
}
{% endhighlight %}
