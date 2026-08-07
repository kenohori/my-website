---
layout: post
title: "Configurando CGAL con Qt5 y QGLViewer en Mac"
date: 2016-05-18 19:30 -05:00
categories: es
lang: es
locale_en: "/en/2016/05/18/configuring-cgal-with-qt5-and-qglviewer-on-mac.html"
locale_es: "/es/2016/05/18/configuring-cgal-with-qt5-and-qglviewer-on-mac.html"
---

<img src="{{ site.baseurl }}/img/blog/lcc-demo.png" class="img-fluid center-block" alt="Nuevo proyecto en Xcode">

CGAL dejó de dar soporte a Qt4 con la versión 4.7 en octubre. Pero ay, su fórmula de [Homebrew](http://brew.sh) no se ha actualizado para reflejar esto. En términos prácticos esto significa que *no puedes usar aplicaciones Qt con CGAL*, incluyendo todos los bonitos demos de GUI de CGAL que vienen listos para usar de fábrica (en su versión de Homebrew). Esto es malo si quieres construir tus propias aplicaciones de GUI, o usar los demos como tutorial o como base para tu propio código.

Recientemente pasé algún tiempo tratando de hacer funcionar el demo de Linear Cell Complex en Mac con el mínimo de complicaciones. Como ese demo requiere Qt5 y QGLViewer, el mismo procedimiento debería funcionar para muchos otros demos, así que decidí documentarlo aquí. Sin embargo, ten en cuenta que esta solución requiere que desenlaces Qt4 para poder enlazar Qt5, lo que romperá cualquier fórmula de Homebrew que dependa de `qt`[^1].

Así que, primero desenlaza Qt4 (es decir, elimina los enlaces simbólicos que Homebrew crea en `/usr/local`) usando:

{% highlight shell %}
$ brew unlink qt
{% endhighlight %}

Después, instala y enlaza Qt5. Como Qt5 entra en conflicto con Qt4 y por lo tanto normalmente no se pretende enlazarlo simbólicamente en `/usr/local`, necesitas usar `--force`:

{% highlight shell %}
$ brew install qt5
$ brew link qt5 --force
{% endhighlight %}

Homebrew quiere mantener su propia jerarquía en `/usr/local`, pero el script de CMake para Qt5 asume que los `mkspecs` y `plugins` de Qt5 son accesibles desde la carpeta raíz. Así que, crea un par de enlaces simbólicos desde **la versión más reciente de Qt5** en el `Cellar` de Homebrew (actualmente 5.6.1-1) en `/usr/local`[^2]:

{% highlight shell %}
ln -s /usr/local/Cellar/qt5/5.6.1-1/mkspecs /usr/local/mkspecs
ln -s /usr/local/Cellar/qt5/5.6.1-1/plugins /usr/local/plugins
{% endhighlight %}

Después, modifiqué la fórmula de Homebrew para QGLViewer para cambiar su dependencia de `qt` a `qt5`[^3]. Algo similar podría hacerse para otras fórmulas que dependen de `qt`. Para esto, primero edita la fórmula:

{% highlight shell %}
$ brew edit libqglviewer
{% endhighlight %}

Y cambia `depends_on "qt"` a `depends_on "qt5"`. Si no has configurado un editor de texto para Homebrew, usarás `vim` por defecto. Así que presiona `I` para cambiar al modo de inserción, cambia lo que necesites, después presiona `ESC` para salir del modo de inserción, y luego escribe `:wq` para guardar y salir.

Ahora que la fórmula ha sido modificada, puedes instalar QGLViewer (o cualquier otra fórmula que necesites) compilándola desde el código fuente usando:

{% highlight shell %}
$ brew install libqglviewer --build-from-source
{% endhighlight %}

Finalmente, puedes descargar CGAL e instalarlo desde el código fuente. Mi forma preferida de hacer esto es ir a una carpeta apropiada en tu computadora y clonar el repositorio de CGAL:

{% highlight shell %}
$ git clone https://github.com/CGAL/cgal.git
{% endhighlight %}

Luego configurarlo usando la GUI de CMake[^4] y compilarlo e instalarlo usando `make`:

{% highlight shell %}
$ cmake-gui .
$ make
$ sudo make install
{% endhighlight %}

En la GUI de CMake deberías poder seleccionar las opciones que necesitas, incluyendo `WITH_CGAL_Qt5` y `WITH_demos`.

<img src="{{ site.baseurl }}/img/blog/cmake.png" class="img-fluid center-block" alt="Nuevo proyecto en Xcode">

**Actualización 27 jul 2016**: Se agregaron instrucciones para enlazar simbólicamente los `mkspecs` y `plugins` de Qt5, y una nota sobre `cmake-gui`.

---

[^1]: Idealmente, debería ser posible compilar CGAL con un Qt5 no enlazado usando `-L/usr/local/opt/qt5/lib` y `-I/usr/local/opt/qt5/include`. Sin embargo, esto no me funciona a mí. Por favor avísame si logras hacer que esto funcione.
[^2]: Gracias a stephane-lb en <https://github.com/Homebrew/legacy-homebrew/issues/29938> por el consejo. Esto podría resolverse usando las rutas de Qt de CMake, pero ay, no pude lograr que funcionaran.
[^3]: O mejor aún, haz una rama de la fórmula y cámbiala ahí.
[^4]: Para ser honestos, es bastante molesto: el paquete de CMake de Homebrew no incluye su GUI. Así que quizás quieras instalar la versión oficial .pkg (que no causa problemas de compatibilidad con Homebrew) o usar el `cmake` de línea de comandos con los parámetros `-D` apropiados.
