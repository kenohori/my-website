---
layout: post
title: "Mi flujo de trabajo para tesis en LaTeX"
date: 2016-04-02 22:45 +02:00
categories: es
lang: es
locale_en: "/en/2016/04/02/my-latex-thesis-workflow.html"
locale_es: "/es/2016/04/02/my-latex-thesis-workflow.html"
---

Hago casi toda mi [escritura de artículos]({{ site.baseurl }}/en/papers/) en [LaTeX](http://latex-project.org). Sé que tiene sus defectos, pero para artículos sigue siendo fantástico. Una vez que le agarras la onda[^1], todo simplemente funciona. No importa tu necesidad, prácticamente tienes garantizado encontrar un paquete que la resuelva. De hecho, amo LaTeX lo suficiente como para que se me conozca por evitar conferencias y revistas que de otra forma serían buenas, simplemente porque no aceptan manuscritos hechos en LaTeX.

Sin embargo, hacer una tesis completa en LaTeX es otra bestia completamente diferente. En el mejor caso, pasarás mucho tiempo solo esperando a que el documento compile. Es decir, varios minutos, o lo suficiente para ir a por un café y volver a tu computadora solo para seguir esperando. En el peor caso, pasarás mucho más tiempo que eso arreglando una larga lista de errores inescrutables. Si usas muchos paquetes, las cosas *se romperán*---a veces sutilmente y a veces horriblemente. Y aun así, es incomparablemente mejor que la [alternativa](https://en.wikipedia.org/wiki/Microsoft_Word) horrible. No hay discusión.

<div class="row">
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/thesis-cover.jpg" class="img-fluid" alt="Portada frontal de la tesis" /></div>
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/thesis-cover-back.jpg" class="img-fluid" alt="Contraportada de la tesis" /></div>
</div>

Hace poco terminé mi tesis de doctorado ([Alta calidad 200 MB]({{ site.baseurl }}/files/16_thesis.pdf) / [Baja calidad 15 MB]({{ site.baseurl }}/files/16_thesis_lowres.pdf) / [HTML](https://3d.bk.tudelft.nl/ken/en/thesis/)). Excepto por las portadas y las imágenes del interior, se hizo exclusivamente en LaTeX. En general, debo decir que estoy muy satisfecho con el resultado. Sin embargo, las cosas no siempre fueron fáciles. Al elegir entre varias opciones, tuve que tomar decisiones difíciles e incluso desandar mis pasos algunas veces después de que las cosas salieran mal.

No obstante, advertencias y todo, sí creo que tengo una configuración bastante buena. Así que, mientras las cosas siguen frescas en mi mente, intentaré documentar un poco el proceso y dar algunos consejos generales a quienes debaten si/como hacer su tesis en LaTeX, o quizás a cualquiera que busque ideas para un flujo de trabajo más robusto.

Así que, este será un post con opiniones sobre *mi* flujo de trabajo general y los paquetes principales que considero los mejores para una tesis (u otro documento igualmente largo y complejo). No escribiré cómo logré mi diseño (bastante complejo) ni entraré en mucho detalle sobre cada paquete o ajuste aquí.

Mi configuración se basa en Mac OS X y las herramientas disponibles para él, pero intentaré señalar las buenas alternativas de Windows/Linux que conozco (y a veces no conozco ninguna). No todo aplicará a todos, pero espero que algunos encuentren útil esto.

### Copias de seguridad y control de versiones: Time Machine y Git

Primero lo primero. Todos deberían tener copias de seguridad hoy en día. Especialmente cualquiera que quiera escribir cualquier tipo de documento grande. A menos que guardes toda tu información en la nube[^2], no hay excusa. Yo mismo uso [Time Machine](https://en.wikipedia.org/wiki/Time_Machine_(OS_X)), que viene incluido en Mac OS X y hace copias de seguridad incrementales frecuentes. He oído que se supone que Windows puede mantener un historial de archivos, pero también he oído que no funciona bien. Hay opciones estilo Time Machine en Linux (p. ej. Cronopete), pero creo que si eres lo bastante técnico probablemente sea más fácil hacer `rsync` de tus archivos a algún lugar de forma regular.

Sin embargo, tener simplemente una copia de seguridad a veces no es suficiente. Muchas veces me he encontrado queriendo recuperar texto que ya había escrito y borrado. A veces, después de un día de trabajo largo pero improductivo, te das cuenta de que el texto de ayer era mejor que el de hoy en algún aspecto sutil (u obvio). Aunque es posible recuperar copias antiguas de tus archivos de una copia de seguridad, es mucho más inteligente mantener algún tipo de sistema de control de versiones.

<a href="http://xkcd.com/1597/"><img src="http://imgs.xkcd.com/comics/git.png" class="img-fluid center-block" alt="xkcd: Git"></a>

Mi elección para un sistema de control de versiones es clara. [Git](https://git-scm.com) hay que admitir que no es tan fácil de usar, pero está muy por delante de otros sistemas de control de versiones. Personalmente uso [Tower](https://www.git-tower.com) como interfaz gráfica, que es un gran software y tiene 50% de descuento para estudiantes. De hecho, hace que git sea fácil de usar y muy probablemente también más rápido. Para comparar y fusionar diferentes versiones de archivos, uso [Kaleidoscope](http://www.kaleidoscopeapp.com). También es genial y también viene con un descuento académico.

Así que, si decides usar Git, necesitas configurar un repositorio. Aunque puedes decidir hacerlo solo localmente, personalmente prefiero mantener todo también enviado a un repositorio privado de GitHub[^3]. Es una capa extra de seguridad. Además, la mayoría de la gente que he conocido no sabe que GitHub proporciona [planes académicos gratis](https://education.github.com) tanto para individuos como para grupos. Estos te permiten tener algunos repositorios privados. En el [grupo 3D geoinformation](https://3d.bk.tudelft.nl), los usamos mucho.

Como pequeña nota, el control de versiones con Git funciona mejor cuando mantienes *una oración por línea*. Esto hace que comparar y fusionar cambios sea mucho más fácil. Consulta los [otros consejos](https://3d.bk.tudelft.nl/hledoux/blog/rules-happy-latex/) de mi supervisor Hugo en este sentido. Estoy de acuerdo con la mayoría de ellos, pero todos son razonables incluso trabajando totalmente solo y ayudarán a mantener ordenados los documentos de LaTeX. Como regla: haz commits temprano y haz commits a menudo. Justo antes de decidir un gran cambio y al final de tu jornada laboral son buenos momentos para esto.

### Editor de texto: Sublime Text

Estos días uso [Sublime Text](https://www.sublimetext.com) 3. Es un poco lento, tiene un corrector ortográfico horriblemente malo[^4] y no se adapta bien a la interfaz de Mac, pero tiene funciones de edición *geniales*. Después de acostumbrarme a ellas, no creo que pudiera trabajar sin los cursores múltiples. Otra pequeña molestia es que usa [Skim](http://skim-app.sourceforge.net) como lector de PDF. Skim está bien. Es rápido y soporta SyncTeX para ir y venir entre tu código fuente y tu PDF, pero tiene extraños fallos gráficos que encuentro muy molestos.

La otra opción sensata en Mac es [TeXShop](http://pages.uoregon.edu/koch/texshop/). Es bastante genial. Es rápido y viene con un previsualizador de PDF fantástico. Sin embargo, no se acerca a las funciones de edición de texto para usuarios avanzados de Sublime Text.

### Fuentes personalizadas: XeTeX

Entre las diferentes variedades de LaTeX, mi preferida es [XeTeX](http://xetex.sourceforge.net/)[^5]. Básicamente es LaTeX con soporte para Unicode, tipografía avanzada y la posibilidad de cambiar fuentes fácilmente. Si escribes incluso fragmentos cortos de texto en cualquier escritura no latina, también es la única opción sensata. Aunque es un orden de magnitud más lento que el LaTeX simple.

Como quizás sepas, LaTeX usa Computer Modern por defecto. De hecho, si alguna vez has visto un documento en LaTeX, *sabes* cómo se ve. Objetivamente no es una mala tipografía, pero se usa tanto que se ha convertido en la Times New Roman de LaTeX. Es la opción perezosa. Para mí, abrir un artículo escrito en Computer Modern ya me hace menos emocionante leerlo. ¿Por qué no optar por algo un poco más fresco? Minion Pro es hermosa, combina bien con Myriad Pro y con la fuente matemática MnSymbol, y (creo) todavía viene con Adobe Reader. Garamond, Linux Libertine y Palatino son otras buenas opciones seguras.

Yo mismo decidí optar por algo un poco más salvaje, así que compré Feijoa para este propósito, una fuente muy especial hecha por el gran diseñador radicado en Nueva Zelanda [Kris Sowersby](https://klim.co.nz). El estilo display es verdaderamente especial y único. Al mismo tiempo, todos los demás estilos son solo un poquito especiales mientras son geniales para leer. Como nota al margen, también hace Metric, la fuente igualmente hermosa que uso en mi sitio web. Mi segunda opción fue [Alegreya](http://www.huertatipografica.com/en/fonts/alegreya-ht-pro), que también es muy hermosa. Sin embargo, no pude encontrar ninguna fuente matemática apropiada para ella.

Esto me lleva a un consejo importante. Si tienes una cantidad significativa de matemáticas y ecuaciones y decides optar por cualquier otra fuente, solo asegúrate de que puedas encontrar una fuente matemática que vaya bien con ella. Para mí, esta fue Asana Math, que combina bastante bien con Feijoa. Una elección menos importante podría ser una buena fuente monoespaciada para código fuente. Para eso, uso [Pressura](https://www.grillitype.com/typefaces/gt-pressura) de Grilli Type. Mi configuración está abajo:

{% highlight latex %}
\setmainfont[Ligatures=TeX,ItalicFont=Feijoa-MediumItalic,StylisticSet=6]{Feijoa}
\setmonofont[BoldFont=GTPressuraMono-Bold,ItalicFont=GTPressuraMono-LightItalic]{GTPressuraMono-Light}
\setmathfont{Asana-Math.otf}
\newfontfamily\fanciestfont[Ligatures={TeX,Discretionary}]{Feijoa-Display}
\newfontfamily\fancyfont[Ligatures=TeX]{Feijoa-Display}
\newfontfamily\chapternumberfont[Ligatures=TeX,Numbers=Lining]{Feijoa-Display}
{% endhighlight %}

Nota que el paquete que realmente necesitas para modificar fuentes en XeTeX es `fontspec`. Si quieres usar una fuente matemática unicode (p. ej. Asana Math), también necesitarás `unicode-math`.

### Clase base: ¿book, KOMA-script o memoir?

Es posible usar simplemente una de las clases base estándar de LaTeX para tu tesis. Mucha gente se va por `report` o `book`. En general, esto está bien. Sin embargo, si planeas hacer mucha personalización, esta es una receta para el desastre. Cuantos más paquetes uses, mayores son las posibilidades de que entren en conflicto entre ellos.

Por esto, recomendaría empezar desde la clase `scrbook` de KOMA-script o `memoir`. Ambas son muy diferentes. KOMA-script es bastante minimalista, pero tiene funciones útiles para personalizar páginas, encabezados y estilos, y es relativamente fácil de trastear. Su documentación está bien, pero buena suerte navegando por publicaciones de foros alemanes si quieres trastear de verdad con sus entrañas. `Memoir` sigue un enfoque completamente opuesto, intentando acomodar la mayor funcionalidad posible dentro de sí misma. Su documentación es genial, pero entra en conflicto con muchos otros paquetes.

### Otros paquetes clave

Si usas matemáticas, agrega los paquetes de AMS que necesites (p. ej. `amsmath` y `amssymb`). Proporcionan mejores símbolos y entornos matemáticos. `Subfig` es bueno para subfiguras, `algorithm2e` es bueno para algoritmos, `listings`es bueno para componer código, `booktabs` hace tablas más bonitas, `babel` arregla la separación silábica (¡asegúrate de configurar bien el idioma!), y `pdfpages` es bueno para insertar PDF completos (p. ej. para tu portada).

Para depurar, `showlabels` es bueno para mostrar cada etiqueta que configuras y exactamente dónde se coloca. `Showframe` es genial para arreglar el diseño de tu página.

### Gestión de bibliografía

Si necesitas dar seguimiento a un gran número de referencias, necesitarás un gestor de referencias. Hay muchas opciones decentes en línea, pero si eres usuario de Mac que trabaja principalmente con LaTeX, ¿por qué no usar [BibDesk](http://bibdesk.sourceforge.net)? Es genial, gratis y mantiene todas tus referencias en formato BibTeX, listas para insertar en tu tesis usando algo como `natbib`. Solo asegúrate de exportar un archivo BibTeX Mínimo si compartes tu archivo .bib con otros. Probablemente no quieras que todos conozcan tu pensamiento franco sobre los artículos malos.

Mucha gente ahora recomienda usar `biblatex` o `biber`. Probé ambos y tuve una mala experiencia con ellos, así que volví al viejo `natbib`. `Biblatex` es poderoso, pero genera un formato de referencias muy raro (que me desagrada fuertemente). Programarlo de vuelta a una salida sensata es tan engorroso como escribir tus referencias a mano.

### Más adelante: programar un diseño de 1.5 columnas

Así que, creo que esto es suficiente por hoy. Algún otro día explicaré cómo lograr un bonito diseño de 1.5 columnas en LaTeX (bloque de texto + márgenes exteriores anchos para figuras y notas laterales), así como algunas otras curiosidades interesantes de programación en LaTeX.

¡Gracias por leer!

-----

[^1]: Que, hay que admitirlo, puede tomar algo de tiempo…
[^2]: Que si te importa la privacidad, probablemente no deberías. Pero a menos que hayas enojado a mucha gente&mdash;o tu investigación lo haga&mdash;, tu tesis probablemente no sea un gran objetivo de todas formas.
[^3]: Sí, sé que la gente se queja de que hay un poco de monocultivo de GitHub estos días, pero honestamente, lo han logrado al proporcionar con mucho la mejor opción para alojar código de código abierto.
[^4]: En Mac, esto se puede arreglar usando [CheckBounce](https://github.com/phyllisstein/CheckBounce), que reemplaza el corrector ortográfico integrado con el de Mac OS X. Sin embargo, hace que Sublime Text sea mucho más lento.
[^5]: Sé que, estrictamente hablando, XeTeX es un superconjunto de TeX, no de LaTeX. Pero ¿quién usa TeX simple en estos días de todas formas?
