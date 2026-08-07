---
layout: post
title: "Usando CGAL y Xcode"
date: 2016-03-16 17:42 +01:00
categories: es
lang: es
locale_en: "/en/2016/03/16/using-cgal-and-xcode.html"
locale_es: "/es/2016/03/16/using-cgal-and-xcode.html"
---

<div class="row">
	<div class="col-sm-9 col-xs-9"><img src="{{ site.baseurl }}/img/blog/cgal-logo.png" class="img-fluid center-block" alt="Logotipo de CGAL"></div>
	<div class="col-sm-3 col-xs-3"><img src="{{ site.baseurl }}/img/blog/xcode-logo.jpg" class="img-fluid center-block" alt="Logotipo de Xcode"></div>
</div>

Nota: las instrucciones a continuación asumen que vas a enlazar las bibliotecas de CGAL, que solía ser la única forma posible de usar CGAL. A partir de CGAL 5, puedes usar el modo más simple de solo cabeceras.

Para mi investigación, necesito escribir código con regularidad para hacer varios cómputos geométricos sobre conjuntos de datos de SIG. La mayoría de las veces, primero uso una biblioteca sencilla para leer formatos SIG (p. ej. [GDAL](http://gdal.org)), y luego meto todo en estructuras de [CGAL](http://www.cgal.org), la Biblioteca de Algoritmos de Geometría Computacional. Eso me permite hacer las cosas más complejas.

En general, CGAL es *genial*. Tiene una curva de aprendizaje bastante pronunciada y solo está disponible en C++[^1], pero es gratis para software de código abierto[^2], rápido y numéricamente robusto. Lo considero la herramienta más importante que uso para mi trabajo. Si no tuviera opción, podría encontrar algún sustituto (malo) para todo lo demás que uso a diario, pero no hay *nada* como CGAL.

Como usuario de Mac, mi IDE favorito es Xcode. Ciertamente es posible usar CGAL editando tu código en `vi` o `emacs` y compilando desde la línea de comandos con `cmake` y `make`, como hacen muchos otros, pero personalmente me resulta bastante doloroso para código complejo, especialmente al depurar. Por otro lado, Xcode y CGAL funcionan muy bien juntos. Es decir, si *no usas los proyectos de Xcode generados por CMake y en su lugar creas los tuyos propios*.

Crear tus propios proyectos de Xcode para CGAL es fácil, pero nunca encontré un post que explicara bien cómo hacer que CGAL funcione correctamente en tu Mac y en Xcode, así que lo resolví todo por prueba y error. Este es mi intento de hacer la vida un poco más fácil a otros usuarios de CGAL en Mac.

### Cómo preparar todos los requisitos

CGAL es una maquinaria grande con muchas dependencias. Las exactas dependen de tu configuración de CGAL y de los paquetes que uses, pero puedes esperar al menos las tres siguientes:

* [boost](http://www.boost.org), que es un montón gigantesco de bibliotecas de C++ y prácticamente definió cómo se ven hoy C++11 y C++14.
* [GMP](https://gmplib.org), que proporciona aritmética de precisión arbitraria para esos cómputos geométricos complicados. Probablemente quieras instalarlo con su extensión de C++, GMPXX.
* [MPFR](http://www.mpfr.org), que extiende GMP asegurando un redondeo correcto.

Hay muchas otras cosas que pueden ser buenas de tener, como [Qt](http://www.qt.io) y [OpenGL](https://www.opengl.org) para todas las demos gráficas, [MPFI](https://perso.ens-lyon.fr/nathalie.revol/software.html) para aritmética de intervalos, y muchas más.

Afortunadamente, la mayoría de estas son triviales de instalar en Mac usando [Homebrew](http://brew.sh). Si tienes Homebrew (y de verdad deberías), instalar una versión básica de CGAL y sus dependencias usando Homebrew es tan simple como:

{% highlight shell %}
	$ brew install cgal
{% endhighlight %}

Algunas dependencias adicionales podrían funcionar pasando parámetros adicionales a `brew install cgal`, como `--with-imaging` para instalar el soporte de Qt de CGAL (así como Qt, si no lo tienes). Sin embargo, mi suerte con eso ha sido muy irregular. En especial, la situación actual con Qt5 no es buena.

Si necesitas soporte para otras dependencias (p. ej. QGLViewer), necesitas usar una versión de punta de CGAL o tienes cualquier otro requisito especial, creo que es mejor descargar el código fuente de CGAL y compilarlo desde cero. Asumiendo que has cumplido con todas las dependencias (p. ej. instalando cada una con `brew install`), es pan comido. Solo ve a tu carpeta de CGAL descargada/clonada y:

{% highlight shell %}
	$ cmake .
	$ make
	$ sudo make install
{% endhighlight %}

Si las cosas no funcionan de inmediato, probablemente sea mejor usar `cmake-gui .` en su lugar. Puedes obtenerlo instalando CMake desde el instalador oficial (en lugar de homebrew). Después de eso, puedes prácticamente borrar todo lo demás de `cmake` y reemplazarlo con las versiones de homebrew.

### ¿Cmake o no cmake?

CGAL viene con varios scripts (en la carpeta `CGAL/bin`) que te ayudan a usar [CMake](https://cmake.org) para crear archivos de configuración independientes de plataforma y compilador para tu propio código. De hecho, si alguna vez has compilado CGAL tú mismo, muy probablemente ya usaste CMake de forma similar.

Cuando se le pide que genere un `Makefile` para [Make](https://www.gnu.org/software/make/), CMake funciona genial. Es lo que hago para compilar CGAL mismo y también lo que uso para distribuir mi propio [código]({{ site.baseurl }}/en/code/) y asegurarme de que funcione en todos lados. Excepto en Windows, claro. Algún día podría dedicarle tiempo a arreglarlo, pero CGAL en Windows no funciona tan bien y no estoy muy motivado para hacerlo.

CMake también puede generar muchos otros tipos de archivos de configuración, incluidos proyectos de Xcode y proyectos de Visual Studio. Sin embargo, los proyectos de Xcode que genera francamente apestan, al menos en lo que respecta a CGAL. La última vez que los probé, usaban la opción de compilación externa en Xcode, lo que básicamente significa degradar a Xcode a un editor de texto glorificado[^3] que llama a `make` y te devuelve los resultados. Básicamente pierdes todas sus funciones geniales. También intentan enlazar todo tipo de cosas innecesarias.

### Crea tus propios proyectos de Xcode

Así que, si eres parecido a mí, rápidamente descartarás por completo los scripts de cmake de CGAL y simplemente empezarás con un proyecto limpio de Xcode. Las instrucciones de aquí son para Xcode 7, pero son prácticamente las mismas en todas las versiones recientes.

<img src="{{ site.baseurl }}/img/blog/xcode-1.png" class="img-fluid center-block" alt="Ventana de bienvenida en Xcode">

Primero, empieza creando un nuevo proyecto (File > New > Project, o desde la ventana de bienvenida). Dependiendo de lo que planees hacer, puede ser cualquier tipo de proyecto, pero para cosas simples prefiero una **Command Line Tool**, que se encuentra en OS X > Application. Si quieres algo con una interfaz gráfica nativa de Mac, probablemente deberías optar por una **Cocoa Application**.

<img src="{{ site.baseurl }}/img/blog/xcode-2.png" class="img-fluid center-block" alt="Nuevo proyecto en Xcode">

Una vez que le hayas dado un nombre a tu proyecto, asegúrate de que el lenguaje esté configurado en C++ y haz clic en Next. Luego decide dónde guardarlo, selecciona si quieres crear un repositorio local de [Git](https://git-scm.com)[^4] para él y listo. Entonces te encontrarás con la ventana principal de Xcode.

### Configura bien los ajustes de compilación

<img src="{{ site.baseurl }}/img/blog/xcode-3.png" class="img-fluid center-block" alt="Targets en Xcode">

En resumen, Xcode funciona sobre la base de *proyectos* y *targets*. No entraré en detalle, pero mientras el proyecto contiene todas tus cosas, un target tiene el objetivo de crear un ejecutable determinado (o biblioteca, plugin, etc.) con base en algunos de los archivos del proyecto. Un proyecto puede tener muchos targets. Algunos de los ajustes a nivel de proyecto se heredan a sus targets, pero te recomendaría modificar las cosas directamente a nivel de target.

Así que después de seleccionar el proyecto, cambia el menú desplegable de la derecha para asegurarte de que hayas seleccionado el target (el único en tu proyecto). Debe tener el mismo nombre que tu proyecto, pero un ícono negro con apariencia de Terminal en lugar del ícono azul de plano de Application de tu proyecto. Ahí, en la pestaña **Build Settings**, encontrarás un *montón* de opciones en varias categorías.

<img src="{{ site.baseurl }}/img/blog/xcode-4.png" class="img-fluid center-block" alt="Configurando los ajustes de compilación en Xcode">

Muchas de ellas no importan demasiado, pero algunas pueden alterar por completo tu target, así que si no sabes qué significa algo, generalmente dejaría la mayoría de las opciones con sus valores predeterminados. Sin embargo, hay algunas que merecen una mención adicional:

* **Build Options > Compiler for C/C++/Objective-C**: Hoy en día, la única opción disponible por defecto es Apple LLVM 7.0. Eso no dice mucho, pero básicamente significa usar alguna versión de clang que Apple bifurcó de LLVM 3.6 (¿o quizás 3.7?). En teoría, es posible modificar Xcode para usar GCC[^5], pero como Apple se aleja cada vez más de GCC, no creo que ese sea el camino. Clang es un compilador mucho mejor que GCC de todas formas. Es más rápido, da errores mucho más útiles, genera mejor código y su desarrollo no está atascado por un código viejo y absurdidades en general[^6].
* **Search Paths > Framework Search Paths**: Si has instalado algunas bibliotecas dinámicas en forma de Mac Frameworks (en lugar de Mach-O .dylibs), es posible que quieras agregar `/Library/Frameworks` aquí.
* **Search Paths > Header Search Paths**: En la mayoría de los casos, deberías agregar `/usr/local/include` aquí.
* **Search Paths > Library Search Paths**: En la mayoría de los casos, deberías agregar `/usr/local/lib` aquí.
* **Apple LLVM 7.0 - Language > C Language Dialect**: Me gusta usar el estándar moderno `c11` aquí, pero no es muy importante.
* **Apple LLVM 7.0 - Language - C++ > C++ Language Dialect**: Aquí deberías elegir con cuidado según tu código y los paquetes que uses. La apuesta más segura probablemente sea `GNU++98`, pero los paquetes más nuevos funcionarán mejor (o solo) con `GNU++11` o `C++11`, o incluso `GNU++14` o `C++14`. Para que mi código sea a prueba de futuro, ahora trato activamente de usar `C++14` tanto como sea posible. Personalmente creo que es más agradable usar el estándar más nuevo `C++14` y evitar las variantes `GNU++` compatibles con GCC.
* **Apple LLVM 7.0 - Language - C++ > C++ Standard Library**: Me gusta `libc++`. Es genial y está hecha por los chicos de LLVM. Creo que también es más rápida que la `libstdc++` de los chicos de GCC.

Después, ve a la pestaña **Build Phases** del mismo target. Aquí deberías agregar todas las bibliotecas dinámicas con las que tu código necesitará enlazarse. Así que abre el menú desplegable **Link Binary With Libraries** y haz clic en el signo de **+** de abajo.

<img src="{{ site.baseurl }}/img/blog/xcode-5.png" class="img-fluid center-block" alt="Enlazando bibliotecas dinámicas en Xcode">

Obtendrás una hoja en cascada que contiene todos los Mac OS X Frameworks estándar contenidos en `/System/Library/Frameworks`. También obtendrás todas las bibliotecas dinámicas contenidas en `/usr/lib`. Así que en la ventana podrías encontrar algunas útiles usadas en CGAL, como OpenGL.framework. Sin embargo, a menos que hayas cambiado los directorios de instalación predeterminados de CGAL y sus dependencias, **no** estarán ahí.

<img src="{{ site.baseurl }}/img/blog/xcode-6.png" class="img-fluid center-block" alt="Eligiendo frameworks y bibliotecas para agregar en Xcode">

Así que, en su lugar, haz clic en el botón **Add Other…** y obtendrás una ventana estándar de Open de Finder. Como las bibliotecas que instalaste están en `/usr/local/lib` por defecto y ese directorio está oculto por defecto, solo escribe shift+command+g (⇧⌘G) para **Go** (ir) a una carpeta y escribe `/usr/local/lib`. Hay autocompletado.

<img src="{{ site.baseurl }}/img/blog/xcode-7.png" class="img-fluid center-block" alt="Eligiendo frameworks y bibliotecas para agregar en Xcode">

Ahí deberías seleccionar todas las bibliotecas que tus paquetes de CGAL necesiten. Selecciona todas las que necesites usando la tecla ⌘. Para lo básico, serían:

* libboost_system.dylib or libboost_system-mt.dylib
* libboost_thread.dylib or libboost_thread-mt.dylib
* libCGAL_Core.dylib
* libCGAL.dylib
* libgmp.dylib
* libmpfr.dylib

Puede que notes que estos son en realidad symlinks a los archivos reales. Desafortunadamente, Xcode hará que tu código apunte a los *archivos reales* en su lugar. Esto significa que cuando actualices tus dependencias, tu proyecto de Xcode ya no compilará. Solo revisa qué bibliotecas enlazadas están rotas (se resaltarán en rojo) y vuelve a agregarlas. *¡Si conoces una mejor solución para esto, házmelo saber!*

### Una prueba sencilla

Con este tipo de configuración, deberías poder compilar cualquier código de CGAL. Solo como ejemplo, hagamos un pequeño texto que use el gran paquete Linear Cell Complex de [Guillaume Damiand](http://liris.cnrs.fr/guillaume.damiand/). Así que sustituye el contenido de `main.cpp` con:

{% highlight c++ %}
#include <CGAL/Linear_cell_complex.h>

int main(int argc, const char * argv[]) {
  CGAL::Linear_cell_complex<3> lcc3;
  return 0;
}
{% endhighlight %}

<img src="{{ site.baseurl }}/img/blog/xcode-8.png" class="img-fluid center-block" alt="Compilando en Xcode: 20 advertencias">

Si intentas compilar (⌘B), debería funcionar (¡genial!), pero habrá un montón de advertencias. 20 advertencias en mi caso. Esto no es necesariamente un problema. Si quieres ignorarlas, deberías poder empezar feliz a desarrollar tu código de CGAL. Sin embargo, me canso de ver estas advertencias y de preguntarme para siempre si son un error en mi código o en CGAL.

### Deshazte de las advertencias

Así que, en su lugar, deshagámonos de ellas haciendo algunos pequeños cambios adicionales en los ajustes de compilación del target. Otra vez, haz clic en tu proyecto en la parte superior izquierda, selecciona el target correcto, haz clic en la pestaña **Build Settings** y desplázate hasta la sección titulada **Apple LLVM 7.0 - Warnings - All languages**.

<img src="{{ site.baseurl }}/img/blog/xcode-9.png" class="img-fluid center-block" alt="Eliminando advertencias en Xcode">

Los ajustes exactos que necesitas cambiar pueden variar. Pero estos son los dos cambios que suelo hacer:

* Implicit Conversion to 32 Bit Type: No
* Uninitialized Variables: Yes

Así que, si intentas compilar de nuevo el pequeño fragmento de código que probamos antes, también debería compilar sin advertencias. ¡Listo!

<img src="{{ site.baseurl }}/img/blog/xcode-10.png" class="img-fluid center-block" alt="Compilando en Xcode: sin advertencias">

Si encuentras algún error en estas instrucciones o si tienes mejores ideas, por favor [házmelo saber]({{ site.baseurl }}/en/contact/). Estaré feliz de actualizar el documento y hacer correcciones.

-----

[^1]: Hay bindings no oficiales disponibles para Python (¿y aparentemente abandonados?), pero no funcionan bien. El diseño de CGAL se basa en [Traits](http://www.cantrip.org/traits.html) con plantillas, que generan estructuras de datos y algoritmos personalizados en tiempo de compilación. Este sistema hace difícil crear bindings genéricos.
[^2]: Hay un sistema de licencias dual (código abierto y comercial). En el lado de código abierto, muchos paquetes están bajo la LGPL, algunos bajo la GPL.
[^3]: Y Xcode no es un muy buen editor de texto.
[^4]: A menos que estés guardando tu proyecto en un directorio ya versionado, p. ej. un repositorio de GitHub que ya creaste y clonaste para este propósito, te recomiendo mucho que hagas esto. Git también es *genial*. Pero ese es tema de otro post de blog.
[^5]: Aunque no lo he probado desde Xcode 7. Consulta [aquí](http://hamelot.io/programming/add-gcc-compiler-to-xcode-6/) una buena guía para esto.
[^6]: Busca las historias del soporte de Objective-C en GCC. Entenderás lo que quiero decir.
