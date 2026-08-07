---
layout: post
title: "Programación independiente de la dimensión usando plantillas de C++"
date: 2016-07-10 14:39 -05:00
categories: es
lang: es
locale_en: "/en/2016/07/10/dimension-independent-programming-using-c++-templates.html"
locale_es: "/es/2016/07/10/dimension-independent-programming-using-c++-templates.html"
---

<img src="{{ site.baseurl }}/img/blog/simplex.jpg" class="img-fluid center-block" alt="Símplices de varias dimensiones">

Es uno de esos dilemas típicos de la programación.
La sabiduría popular (entre programadores) dicta que tu código puede ser eficiente pero inflexible, o flexible pero intensivo en recursos.
Intentar hacer ambas cosas casi siempre falla *espectacularmente*.

Sin embargo, de vez en cuando uno encuentra una excepción bastante asombrosa, que a primera vista puede parecer casi magia.
Es decir, hasta que aprendes cómo funciona a nivel técnico.
Por ejemplo, hace varios años me dejó perplejo cómo [DTrace](http://dtrace.org/)---un buen framework de rastreo---logra alcanzar [cero sobrecarga](http://dtrace.org/blogs/brendan/2011/02/18/dtrace-pid-provider-overhead/) cuando no está habilitado.

Un tiempo después, tuve un sentimiento similar sobre cómo los [mapas combinatorios](http://doc.cgal.org/latest/Combinatorial_map/index.html) de CGAL logran ser a la vez rápidos y completamente independientes de la dimensión.
La respuesta está en una ingeniosa *meta-programación con plantillas* usando plantillas recursivas de C++11, una solución que después incorporé extensamente en mi [trabajo de doctorado](https://3d.bk.tudelft.nl/ken/en/thesis/).

La meta-programación con plantillas es una técnica que usa plantillas para generar ciertas estructuras de datos o realizar ciertas computaciones durante la compilación de un programa en lugar de durante su ejecución.
Esta técnica se usa normalmente como una forma de apoyar la programación genérica definiendo funciones que pueden manejar indistintamente diferentes tipos de datos.
Por ejemplo, a menudo uso [este](http://www.cplusplus.com/forum/articles/9645/) ingenioso pedazo de código para parsear fácilmente números a diferentes tipos de datos.

{% highlight c++ %}
template <typename T>
T string_to_number (const std::string &text, T def_value) {
  std::stringstream ss;
  for (std::string::const_iterator i = text.begin(); i != text.end(); ++i)
    if (isdigit(*i) || *i=='e' || *i=='-' || *i=='+' || *i=='.') ss << *i;
  T result;
  return ss >> result ? result : def_value;
}
{% endhighlight %}

Sin embargo, aparte de este uso común, las plantillas también pueden usarse para crear estructuras de datos y algoritmos complejos independientes del tipo y de la dimensión.
CGAL hace esto usando la técnica de programación [Traits](http://accu.org/index.php/journals/442), que explota las declaraciones `typedef` de C++ para crear tipos personalizados.
Como ejemplo, usé este tipo de enfoque en mi tesis para convertir conjuntos de datos de *n* dimensiones en unos de *(n+1)* dimensiones.
Los tipos de los conjuntos de datos de *n* y *(n+1)* dimensiones se derivan automáticamente con base en *n*, que se pasa como parámetro de plantilla en tiempo de compilación.
Como la programación en dimensiones altas suele estar fuertemente limitada por el tiempo de CPU durante la ejecución, **esto efectivamente trae lo mejor de ambos mundos: independencia de la dimensión y velocidad**.

{% highlight c++ %}
template <unsigned int dimension>
class Linear_cell_complex_extruder_with_range {
public:
  typedef typename Linear_cell_complex<dimension>::type Lower_dimensional_cell_complex;
  typedef typename Linear_cell_complex<dimension+1>::type Higher_dimensional_cell_complex;
  typedef Linear_cell_complex_extruder_with_range<dimension> Self;
  
private:
  Lower_dimensional_cell_complex ldcc;
  Higher_dimensional_cell_complex hdcc;
};
{% endhighlight %}

Sin embargo, para explotar realmente este tipo de mecanismo en la programación independiente de la dimensión, necesitas *plantillas recursivas*.
Con ellas, puedes construir una estructura de datos compleja o resolver un problema iterando dimensión por dimensión en tiempo de compilación.

Consideremos un ejemplo similar a uno usado en mi tesis, una estructura de datos donde queremos almacenar un valor (representado aquí por un `float`, pero puede ser una estructura de datos arbitrariamente compleja por sí misma) para cada objeto (representado aquí por un puntero `Object *`) de cada dimensión.
Esencialmente, esto sería un `std::map<Object *, float>`.
Primero, definimos un `struct` personalizado llamado `Value_map_of_dimension`, que almacena el mapa de valores para una sola dimensión (parametrizada con plantilla).
Nota el uso de `typedef` para definir `type` antes de usarlo.

{% highlight c++ %}
template <unsigned int dimension>
struct Values_map_of_dimension {
public:
  typedef std::map<Object *, float> type;
  type values_map;
};
{% endhighlight %}

Después, usamos un `struct` parametrizado con plantilla que define `Values_map_tuple_per_dimension_up_to`, que almacenará una tupla dependiente de la dimensión de las estructuras de datos anteriores donde cada elemento de la tupla contendrá una instancia de `Value_map_of_dimension`.
Aquí, el primer parámetro de plantilla es la dimensión y el segundo es la tupla, que se inicializa con una vacía.

{% highlight c++ %}
template <unsigned int dimension, class Result = std::tuple<>>
struct Values_map_tuple_per_dimension_up_to;
{% endhighlight %}

Este `struct` se especializa usando una plantilla recursiva que antepone a la tupla una instancia de `Values_map_of_dimension` para la `dimension` actual y se llama a sí misma con `dimension-1`.

{% highlight c++ %}
template <unsigned int dimension, class ... Result>
struct Values_map_tuple_per_dimension_up_to<dimension, std::tuple<Result ...>> {
  typedef typename Values_map_tuple_per_dimension_up_to<dimension - 1, 
    std::tuple<Values_map_of_dimension<dimension>, Result ...>>::type type;
};
{% endhighlight %}

Finalmente, este `struct` se especializa aún más con una condición de terminación para la dimensión 0, donde la tupla se devuelve tal cual.

{% highlight c++ %}
template <class ... Result>
struct Values_map_tuple_per_dimension_up_to<0, std::tuple<Result ...>> {
  typedef std::tuple<Values_map_of_dimension<0>, Result ...> type;
};
{% endhighlight %}

Para que el compilador construya esta estructura de datos correctamente, es crucial asegurarse de que el último `struct` sea una especialización más completa de `Values_map_tuple_per_dimension_up_to`.
Por lo tanto, debería tener un parámetro de plantilla menos que el anterior.
