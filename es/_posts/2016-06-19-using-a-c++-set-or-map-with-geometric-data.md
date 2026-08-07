---
layout: post
title: "Usando un map o set de C++ con datos geométricos"
date: 2016-06-19 18:25 -05:00
categories: es
lang: es
locale_en: "/en/2016/06/19/using-a-c++-set-or-map-with-geometric-data.html"
locale_es: "/es/2016/06/19/using-a-c++-set-or-map-with-geometric-data.html"
---

Uno de los bloques de construcción más típicos de las computaciones geométricas eficientes es un *índice espacial*. Usando un índice espacial, es posible realizar muchas operaciones simples rápidamente, como obtener un conjunto de puntos únicos. Tal operación puede usarse luego para cosas como construir una estructura de datos topológica o indexar objetos más complejos.

<a href="https://commons.wikimedia.org/wiki/File:RTree-Visualization-3D.svg"><img src="{{ site.baseurl }}/img/blog/rtree.svg" class="img-fluid center-block" alt="Un R-tree en 3D"></a>

Sin embargo, implementar correctamente un índice espacial es un desastre y, francamente, es excesivo para muchas aplicaciones prácticas. Y aún así, las computaciones sin uno pueden ser *increíblemente lentas*. Así que a menudo recurro a un truco rápido---usar un `set` o `map` de la biblioteca estándar de C++ con una función de comparación personalizada. Un `set` o `map` ofrece acceso a sus elementos en tiempo logarítmico, muy parecido a la mayoría de los índices espaciales, y funciona de fábrica para los tipos de datos simples de toda la vida como `float` o `int`. Además, para poder usarlo con cualquier clase con la que estés trabajando, solo necesita un functor de comparación personalizado[^1] que defina un ordenamiento de sus elementos[^2].

Así que veamos un ejemplo de un código en el que estoy trabajando actualmente. Un `Point_d` de CGAL es una estructura de datos simple para un punto de *d* dimensiones. Personalmente quiero usar este tipo de puntos para acceder rápidamente a objetos geométricos únicos ubicados en esas posiciones, así que creé un functor de comparación personalizado para ellos. Ordena los puntos primero por su dimensión y luego lexicográficamente por sus coordenadas:

{% highlight c++ %}
struct Point_d_comparator {
  bool operator()(const Point_d &p1, const Point_d &p2) const {
    
    if (p1.dimension() < p2.dimension()) return true;
    if (p1.dimension() > p2.dimension()) return false;
    
    Point_d::Cartesian_const_iterator p1_coordinate = p1.cartesian_begin()
    Point_d::Cartesian_const_iterator p2_coordinate = p2.cartesian_begin();
    while (p1_coordinate != p1.cartesian_end()) {
      if (*p1_coordinate < *p2_coordinate) return true;
      if (*p1_coordinate > *p2_coordinate) return false;
      ++p1_coordinate;
      ++p2_coordinate;
    } return false;
  }
};
{% endhighlight %}

En un ejemplo simple, tal functor de comparación puede usarse para definir un conjunto de puntos únicos (según se definen por sus coordenadas). Por ejemplo, esto te permite asignar identificadores únicos a una ubicación.

{% highlight c++ %}
std::set<Point_d, Point_d_comparator> vertices;
{% endhighlight %}

En un ejemplo más complejo, el mismo functor de comparación puede usarse para indexar un conjunto de aristas (según se definen por un par único de puntos inicio-fin). Personalmente uso este tipo de estructura para enlazar un conjunto de polígonos adyacentes por sus aristas comunes y para comprobar si tal conjunto forma un cuasi-manifold en 3D. ¡Ten en cuenta que debes asegurarte de insertar los dos puntos extremos en un orden bien definido, como el más pequeño lexicográficamente primero!

{% highlight c++ %}
std::map<Point_d, std::map<Point_d, int, Point_d_comparator>, Point_d_comparator> edges;
{% endhighlight %}

Para una futura entrada de blog, cómo hacer algo similar con un `unordered_map` de C++11 más eficiente (tiempo constante) y una función de hash personalizada.

---

[^1]: Un functor es un objeto que se comporta como una función. En C++, un functor es una `class` o `struct` que hace esto sobrecargando el operador (). A diferencia de los punteros a función, son rápidos ya que se generan en tiempo de compilación.
[^2]: La mayoría de las personas eligen imitar el valor del operador < (menor que), que es lo que `set` y `map` hacen con los tipos simples.
