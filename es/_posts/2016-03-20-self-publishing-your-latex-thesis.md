---
layout: post
title: "Autoeditar tu tesis (en LaTeX)"
date: 2016-03-20 23:41 +01:00
categories: es
lang: es
locale_en: "/en/2016/03/20/self-publishing-your-latex-thesis.html"
locale_es: "/es/2016/03/20/self-publishing-your-latex-thesis.html"
---

<div class="row">
	<div class="col-sm-3 col-xs-3"></div>
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/thesis-cover.jpg" class="img-fluid" alt="La portada de mi tesis" /></div>
	<div class="col-sm-3 col-xs-3"></div>
</div>

Hace poco terminé mi tesis de doctorado sobre el modelado de información geográfica en dimensiones superiores ([Alta calidad 200 MB]({{ site.baseurl }}/files/16_thesis.pdf) / [Baja calidad 15 MB]({{ site.baseurl }}/files/16_thesis_lowres.pdf) / [HTML](https://3d.bk.tudelft.nl/ken/en/thesis/)). Perdón por la promoción descarada, pero créeme, esto de verdad es relevante para lo que quiero decir.

### ¿Por qué?

Escribí mi tesis completamente en LaTeX, lo que significa que con el uso correcto de ciertos paquetes de LaTeX y algunos ajustes simples de parámetros, pude crear un documento que cumple con todos mis requisitos académicos y todas mis preferencias personales[^1], se ve compuesto profesionalmente y está prácticamente listo para imprimir[^2]. Así que aquí va la pregunta... ¿por qué debería enviarlo a una editorial? ¿Por qué no hacerlo todo yo mismo, autoeditar y ordenar tantas copias como necesite?

Si eres un poco maniático del control (como yo), estoy seguro de que verás inmediatamente el atractivo de esta opción. Subir unos pocos PDF (contenido y portada), pagar en línea y recibir una caja de libros en tu casa u oficina. Pero también hay muchos beneficios secundarios. Puedes obtener fácilmente un número ISBN, ordenar copias adicionales en línea, poner tu libro a la [venta](http://www.lulu.com/shop/ken-arroyo-ohori/higher-dimensional-modelling-of-geographic-information/paperback/product-22605113.html) en varias tiendas en línea, indexar tu tesis en Google Books, y mucho más. ¡También suele ser más rápido que una editorial regular!

Así que, como quizás ya hayas adivinado, **decidí autoeditar**, y después de haber recibido la versión final de mi tesis el viernes pasado, **la recomiendo ampliamente**. Sin embargo, mientras investigaba esta opción, noté que había poca información en internet sobre la autoedición de tu tesis (en LaTeX)[^3], así que mi caso fue prácticamente un experimento[^4]. Aquí pretendo usar mi experiencia positiva para animar a otros a hacer lo mismo.

### ¿Por qué no?

Hay muchas razones. Si necesitas mucha ayuda para componer tu libro (p. ej. porque es feo porque está hecho en Word), si no estás contento con las opciones predeterminadas de LaTeX pero no te sientes cómodo cambiándolas (p. ej. porque sientes que la vas a regar o porque simplemente no hay tiempo para jugar con ellas), o si tu universidad es inflexible con una plantilla que simplemente no puedes recrear (ni siquiera pidiendo ayuda en [TeX Exchange](http://tex.stackexchange.com)), no vayas por esta opción.

Además, vale la pena notar que las empresas de autoedición no ofrecen el mismo tipo de flexibilidad que las editoriales tradicionales de tesis. Por ejemplo, las editoriales tradicionales de tesis te permiten bajar mucho tus costos de impresión juntando todas tus páginas a color. Con la autoedición, normalmente es todo en blanco y negro o todo a color. Como otro ejemplo, mi universidad requiere que una lista de proposiciones[^5] se imprima en una hoja de papel aparte. Como este servicio no lo ofrecía la empresa de autoedición que elegí, tuve que imprimirlas por separado[^6].

<div class="row">
	<div class="col-sm-3 col-xs-3"></div>
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/propositions.png" class="img-fluid img-thumbnail" alt="Mis proposiciones, con líneas de corte en A4" /></div>
	<div class="col-sm-3 col-xs-3"></div>
</div>

### ¿Qué empresa de autoedición?

Hay varias empresas de autoedición y distribución en línea, cuya disponibilidad depende de dónde vivas. Con base en las reseñas que encontré en línea y algunas pequeñas presiones de [Hugo](https://3d.bk.tudelft.nl/hledoux/), mi supervisor de doctorado, decidí optar por [Lulu.com](http://www.lulu.com). La calidad es genial, los precios son razonables y está disponible en los Países Bajos (entre muchos otros países). El hecho de que tanto el libro de HoTT como JOSIS la usen también jugó un papel importante en mi decisión.

### ¿Cómo?

Si usas LaTeX, todo el proceso es razonablemente fácil. Estos son los pasos clave:

#### 1. Elige una empresa de autoedición

Buena calidad, precio decente, envíos rápidos y, por supuesto, una que entregue en tu país. Como mencioné, opté por [Lulu.com](http://www.lulu.com). Estoy muy contento con ellos.

#### 2. Elige un tamaño de papel, tipo de papel y precios

Elige entre los tamaños de papel y tipos de papel disponibles. Como decidí un diseño con muchas figuras y notas en los márgenes, opté por *crown quarto* (18.90 x 24.58 cm), un formato de papel británico que es un poco más grande y más cuadrado que el tamaño B5 más usado en los Países Bajos. Por una casualidad del destino, también es el tamaño pequeño que se usa en la serie de tesis [A+BE](http://www.bk.tudelft.nl/en/research/graduate-school-a-be/join-the-phd-thesis-series/) de mi facultad. Nota que B5 no está disponible en Lulu.com.

Para el papel, como tengo muchas figuras a color, opté por impresión a todo color en un bonito papel brillante de 118 g/m<sup>2</sup>. Debo decir que el resultado se ve genial.

#### 3. Revisa las plantillas y reglas

Descarga las plantillas de papel disponibles en tu editorial. Esto es importante por dos razones: (i) saber los márgenes mínimos que debes usar, y (ii) saber qué tamaño debe tener el PDF que envías. Las explicaré en orden.

(i) Durante el proceso de impresión, tus páginas generalmente se recortan de un tamaño mayor. Este suele ser un proceso semiautomático, así que hay cierto grado de variación entre páginas y entre copias del libro. En el peor caso, si pones cosas importantes demasiado cerca de los márgenes, podrían terminar siendo recortadas. Tener un diseño que se vea desbalanceado es un problema común.

(ii) Si quieres un elemento en el diseño que llegue a los márgenes de tus páginas recortadas (p. ej. tus bonitas imágenes de portada o un índice de pestañas), necesitarás enviar un documento ligeramente más grande que el tamaño final (recortado). Esto se conoce como full-bleed.

#### 4. Configura el tamaño de papel correcto en tu documento de LaTeX

Cómo hacer esto correctamente depende de tu clase base. Usé `koma-script` y el paquete `geometry` para cambiarlo[^7]. Esta configuración también funciona bien con la clase base `book`. Para `memoir`, es mejor usar las macros creadas específicamente para ese propósito. Consulta [aquí](http://tex.stackexchange.com/questions/39273/customizing-page-size-in-memoir).

Así que, sin más preámbulos, aquí hay un ejemplo de mi tesis. Sin full bleed:

{% highlight tex %}
\usepackage[includemp,
            paperwidth=18.90cm,
            paperheight=24.58cm,
            top=2.170cm,
            bottom=3.510cm,
            inner=2.1835cm,
            outer=2.1835cm,
            marginparwidth=4cm,
            marginparsep=0.4cm]{geometry}
{% endhighlight %}

Y con full bleed (margen de corte de 1/8 de pulgada, como requiere Lulu.com):

{% highlight tex %}
\usepackage[includemp,
            paperwidth=19.54cm,
            paperheight=25.22cm,
            layoutwidth=18.90cm,
            layoutheight=24.58cm,
            layouthoffset=0.32cm,
            layoutvoffset=0.32cm,
            top=2.170cm,
            bottom=3.510cm,
            inner=2.1835cm,
            outer=2.1835cm,
            marginparwidth=4cm,
            marginparsep=0.4cm]{geometry}
{% endhighlight %}

#### 5. Sube el PDF de tu contenido, obtén el ancho del lomo y corrige errores

Simplemente sube tu archivo PDF generado con el contenido de tu tesis. Lulu.com (y la mayoría de las demás) usa este archivo para generar su propio PDF listo para imprimir, que puedes descargar y deberías revisar a fondo. Este proceso puede cambiar muchas cosas en tu archivo, como aplanar transparencias y cambiar colores no imprimibles por otros. Lulu.com también te alerta de problemas en tu archivo, como fuentes faltantes, imágenes de baja resolución, dibujos de línea con líneas muy delgadas, etc.

En el caso de mi tesis, no tuve errores pero sí varias advertencias. Con base en ellas, decidí rehacer algunas figuras, redibujando algunas imágenes de baja resolución que había tomado de otras fuentes, engrosando algunas líneas, etc.

Una vez que hayas subido tu PDF, también obtendrás una medida muy importante: **el ancho de tu lomo**. Esto es lo que usas para crear una bonita portada que envuelva tu tesis. Así que ahora puedes crear una portada con ancho = 2*(ancho del papel+margen de corte)+ancho del lomo, y alto = alto del papel+margen de corte.

<img src="{{ site.baseurl }}/img/blog/cover-wrap.jpg" class="img-fluid center-block" alt="La portada de mi tesis: envolvente">

#### 6. Aplanar transparencias

Una cosa que también noté fue que todas mis bonitas figuras que incluían transparencia se veían muy feas. Tras buscar un poco en línea, descubrí que este es un problema común con la mayoría de las imprentas, sean de autoedición o no.

Buscando una solución automatizada, la mejor que encontré fue un proceso de dos pasos que primero convierte de PDF a Postscript (.ps) y luego de Postscript de vuelta a PDF. Para la mejor compatibilidad, opté por un PDF versión 1.3 que se envió a Lulu.com.

Mac OS X incluye `pdf2ps` de línea de comandos. Sin embargo, descubrí que genera archivos enormes bastante feos. Se rasteriza un montón de cosas. Como sugiere [Stefaan Lippens](http://stefaanlippens.net/pdf2ps_vs_pdftops), `pdftops` es una alternativa mucho mejor. Rasteriza menos, generando así un archivo mucho más pequeño. ¡Y además es más rápido!

Sin embargo, `pdftops` no está incluido en Mac OS X. Pero, si tienes [Homebrew](http://brew.sh), puedes instalarlo fácilmente escribiendo:

{% highlight shell %}
	$ brew install poppler
{% endhighlight %}

Luego, solo genera un archivo Postscript de tu tesis usando:

{% highlight shell %}
	$ pdftops -r 600 thesis.pdf thesis.ps
{% endhighlight %}

Aquí, opté por una rasterización de 600 DPI donde era necesario. Esto es lo que creo que Lulu.com es capaz de soportar actualmente. Sin embargo, para que sea a prueba de futuro, en realidad generé mi PDF a 1000 DPI.

Finalmente, puedes convertir tu archivo Postscript generado de vuelta a PDF 1.3 usando:

{% highlight shell %}
	$ ps2pdf13 thesis.ps thesis-v13.pdf
{% endhighlight %}

Yo no usaría este PDF para distribución en línea, pero debería ser bueno para imprimir. Personalmente recomiendo hacer lo mismo con tu portada (si está en PDF), para que reciba el mismo tratamiento.

#### 7. Sube los PDF de contenido y portada, obtén un ISBN y revisa todo

Ahora que tienes PDF listos para imprimir, súbelos. Luego descarga los PDF generados por el sistema, que ahora deberían verse casi iguales a los que subiste.

Una vez que verifiques que todo está bien, sigue el proceso de publicación y obtén un ISBN para tu tesis. Al mismo tiempo, deberías poder obtener un código de barras que puedas poner en tu portada.

Como no quiero poner cosas ajenas en mi portada, agregué el código de barras en la última página impresa (de la que me aseguré de que abriera a la izquierda). También agregué el ISBN arriba del colofón, junto con otros detalles sobre la publicación.

#### 8. Sube y prueba

Ahora que tienes el PDF final, súbelo. Como siempre, descarga el PDF generado por el sistema. Vale la pena ser extra minucioso esta vez, ya que a menos que detectes algún error, este será el archivo que se envíe a imprimir.

Si todo se ve bien, puedes continuar con el proceso de publicación. **Te recomiendo encarecidamente que ordenes una prueba impresa en esta etapa**. Las cosas pueden verse diferentes en papel. Por ejemplo, encontré varias figuras que quería cambiar, descubrí que mis márgenes internos eran demasiado pequeños y no estaba *nada* contento con los colores de mi portada.

#### 9. Correcciones finales, subida e impresión

Con base en los problemas que detecté en la prueba impresa, hice varios cambios. En este punto, *el proceso ideal sería subir otro PDF y ordenar otra prueba con tus cambios*[^8]. Sin embargo, la fecha límite de mi defensa de doctorado se acercaba rápido. No había tiempo para una segunda prueba.

Así que, con la mayor confianza posible en esta versión, hice público el proyecto del libro, lo puse a la [venta](http://www.lulu.com/shop/ken-arroyo-ohori/higher-dimensional-modelling-of-geographic-information/paperback/product-22605113.html) en la tienda de Lulu.com, y comencé los trámites para que se indexara en Google Books y para tenerlo a la venta en Amazon.com. Lo más importante: ordené las 40 copias de la tesis que necesitaba.

### Veredicto final

Después de hacer el pedido el domingo por la noche, todas las copias de mi tesis llegaron el viernes por la mañana en 3 cajas (¡muy pesadas!). ¡Qué rápido! La mitad del tiempo de entrega habitual de una imprenta estándar de tesis aquí.

La calidad es *genial*. Genial en el sentido de *genial como un libro de arte de mesa de café*. El precio fue similar al que habría esperado de imprentas estándar de tesis por una impresión de calidad un tanto menor. La precisión del recorte fue muy buena, al contrario de lo que otros reseñadores en línea habían publicado antes.

Así que, en resumen, muy recomendable.

-----

[^1]: En la medida en que los requisitos académicos y mis preferencias personales no entren en conflicto. Afortunadamente, [mi universidad](http://www.tudelft.nl) es bastante sensata y solo tuve que ceder en muy poco.
[^2]: Esto también puede ser cierto para ti si eres un usuario perfeccionista de software de publicación como Adobe InDesign o si usas Word y simplemente no te importa cómo se ve tu libro (lo cual estará bastante mal).
[^3]: De hecho, había algunos fanáticos de MS Word (sí, existen) disuadiendo activamente a los usuarios de LaTeX de autoeditar. Dejaré una diatriba más larga para otra ocasión, pero si te importa **en lo más mínimo** una composición tipográfica bonita, no envíes tu documento de Word directamente a imprimir.
[^4]: Los dos ejemplos más cercanos que pude encontrar fueron el [libro de HoTT](http://homotopytypetheory.org/book/) y los volúmenes de [JOSIS](http://www.josis.org), ambos los admiro enormemente como excelentes ejemplos de ciencia abierta. El libro de HoTT se escribió en un proceso fantásticamente colectivo usando GitHub. Solo mira [este video](https://vimeo.com/68761218). JOSIS es una gran revista de SIG de acceso abierto dirigida por voluntarios. Aún no he tenido la oportunidad de enviarles algo, ¡pero espero hacerlo pronto!
[^5]: Un aspecto extremadamente anticuado (como de la Edad Media) de las tesis en los Países Bajos. Básicamente, tu tesis va acompañada de una lista de proposiciones, algunas de las cuales están relacionadas con tu tesis y otras no. La idea es que tú, como futuro científico, deberías ser capaz de formular hipótesis que puedan servir como base para el debate y la investigación futura. Personalmente, las encuentro muy geniales. Otros las odian.
[^6]: Con base en el consejo de [Jonas Teuwen](http://fa.its.tudelft.nl/~teuwen/), simplemente fui a una copistería y lo hice. Si te preguntas, lo hice con los buenos chicos de [Sieca](http://www.sieca.nl), que me ayudaron a encontrar un papel que hiciera juego con la tesis (prueba) y siempre hacen cosas de buena calidad.
[^7]: Sí, sé que esta combinación no es particularmente recomendada. El paquete `typearea` sería mejor, pero me causó problemas en otros lugares.
[^8]: Como no pude hacer una segunda prueba, sí encontré algunos problemas de diseño (muy menores) en las tesis impresas. Pero nada importante (hasta ahora).
