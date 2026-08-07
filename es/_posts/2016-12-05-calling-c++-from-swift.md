---
layout: post
title: "Llamando C++ desde Swift"
date: 2016-12-05 18:44 -05:00
categories: es
lang: es
locale_en: "/en/2016/12/05/calling-c++-from-swift.html"
locale_es: "/es/2016/12/05/calling-c++-from-swift.html"
---

Cuando recientemente estaba trabajando en [azul](https://github.com/tudelft3d/azul), un visor de CityGML para Mac, mi primer pensamiento fue hacer un proyecto de Swift 3 puro. Pero ay, pronto descubrí que el [XmlParser](https://developer.apple.com/reference/foundation/xmlparser) de Apple es terriblemente lento. En comparación con [val3dity](https://github.com/tudelft3d/val3dity), la primera versión funcional del visor era al menos 10 veces más lenta en el análisis de XML.

La solución a este problema fue bastante simple: usar [pugixml](http://pugixml.org) como backend de análisis de XML en su lugar[^1]. Sin embargo, pugixml está escrito en C++ y por lo tanto no se puede llamar directamente desde Swift. En mi campo de investigación en SIG esto es en realidad un problema muy típico, ya que la mayoría de las bibliotecas útiles están escritas en C/C++ (por ejemplo, Boost, CGAL, GDAL, GEOS). Considerando el tiempo relativamente corto que Swift lleva fuera y su reconocidamente limitado atractivo, sospecho que este es el caso de mucha gente.

Entonces, ¿cómo llamas código de C++ desde Swift 3? Hay diferentes maneras de hacerlo, pero en mi opinión la mejor involucra un doble envoltorio de Objective-C++ con un header de Objective-C puro.

## Un doble envoltorio

Usaré ejemplos tomados directamente de azul. Así que, asumiendo que tienes una clase de C++ `CityGMLParser`, simplemente necesitas crear un header de Objective-C `CityGMLParserWrapperWrapper.h`:

{% highlight objective_c %}
struct CityGMLParserWrapper;

@interface CityGMLParserWrapperWrapper: NSObject {
  struct CityGMLParserWrapper *parserWrapper;
}

- (id) init;
- (void) dealloc;
{% endhighlight %}

Nota que usamos una declaración adelantada del primer envoltorio `CityGMLParserWrapper` y almacenamos un *puntero* a él en el segundo envoltorio. De esta manera, podemos mantener el header como Objective-C puro y así llamarlo desde Swift.

A continuación, definimos su implementación en un Objective-C++ `CityGMLParserWrapperWrapper.mm`:

{% highlight objective_c %}
#import "CityGMLParserWrapperWrapper.h"
#import "CityGMLParser.hpp"

struct CityGMLParserWrapper {
  CityGMLParser *parser;
};

@implementation CityGMLParserWrapperWrapper

- (id) init {
  if (self = [super init]) {
    parserWrapper = new CityGMLParserWrapper();
    parserWrapper->parser = new CityGMLParser();
  } return self;
}

- (void) dealloc {
  delete parserWrapper->parser;
  delete parserWrapper;
}
{% endhighlight %}

Nota que `CityGMLParser` es la clase de C++, y que necesitamos crear los dos niveles de envoltorio en `init` y eliminarlos (al estilo C++) en el `dealloc`. Este archivo puede contener tanto C++ como Objective-C++ lo permita.

<img src="{{ site.baseurl }}/img/blog/bridging-header.png" class="img-fluid center-block" alt="Configurando el bridging header en Xcode">

Finalmente, probablemente necesites añadir un *bridging header* que contenga la declaración de importación de tu envoltorio doble para que pueda ser usado en Swift. Si usas Xcode, esto debe configurarse en la pestaña Build Settings de la configuración del proyecto. Simplemente necesita contener algo como:

{% highlight objective_c %}
#import "CityGMLParserWrapperWrapper.h"
{% endhighlight %}

## Pasando información entre código de C++ y de Swift

Ahora, probablemente necesitarás pasar información entre el código de C++ y el de Swift. Esto es relativamente sencillo, pero es una de las áreas donde Swift ofrece poco azúcar sintáctico.

Si estás usando un tipo de datos [POD](http://en.cppreference.com/w/cpp/concept/PODType), esto es lo más fácil. Solo añade getters y setters apropiados en tu envoltorio doble. Estos deberían hacer llamadas de la forma `return parserWrapper->parser->...` o `parserWrapper->parser->... = ...`.

Así que veamos directamente algo un poco más difícil: cómo leer un arreglo u otra secuencia de elementos contiguos en memoria de tamaño conocido.

### Un par de arreglos

En mi código de C++, tengo un par de arreglos que guardan la caja delimitadora que rodea mis datos:

{% highlight cpp %}
float minCoordinates[3];
float maxCoordinates[3];
{% endhighlight %}

Para acceder a estos, tengo un par de declaraciones de métodos en mi envoltorio de Objective-C:

{% highlight objective_c %}
- (float *) minCoordinates;
- (float *) maxCoordinates;
{% endhighlight %}

Nota que devolveremos un *puntero*. Esta será la dirección del primer elemento de cada arreglo. Entonces, la implementación de estos métodos es sencilla:

{% highlight objective_c %}
- (float *) minCoordinates {
  return parserWrapper->parser->minCoordinates;
}

- (float *) maxCoordinates {
  return parserWrapper->parser->maxCoordinates;
}
{% endhighlight %}

### Iteradores

Ahora veamos un ejemplo más complejo. En azul, necesitaba una forma de obtener estructuras de datos mucho más complejas que fueron creadas en C++. Estas estructuras de datos consistían en `std::lists` de clases personalizadas que contenían varios atributos.

En tales casos donde no sabes exactamente dónde podrían estar almacenadas las cosas[^2], la forma más fácil de transferir información es definiendo iteradores personalizados y pasando la información objeto por objeto y atributo por atributo.

Así que, en mi código de C++ creé varios iteradores como este:

{% highlight cpp %}
std::list<CityGMLObject>::const_iterator currentObject;
{% endhighlight %}

Entonces, en el envoltorio doble definí los métodos apropiados para inicializar, avanzar y comprobar si el iterador ha terminado:

{% highlight objective_c %}
- (void) initialiseObjectIterator;
- (void) advanceObjectIterator;
- (BOOL) objectIteratorEnded;
{% endhighlight %}

Estos pueden implementarse simplemente llamando a las respectivas funciones de iterador de C++:

{% highlight objective_c %}
- (void) initialiseObjectIterator {
  parserWrapper->parser->currentObject = parserWrapper->parser->objects.begin();
}

- (void) advanceObjectIterator {
  ++parserWrapper->parser->currentObject;
}

- (BOOL) objectIteratorEnded {
  if (parserWrapper->parser->currentObject == parserWrapper->parser->objects.end()) {
    return true;
  } return false;
}
{% endhighlight %}

### Cadenas de texto

Ahora, veamos cómo extraer variables de C++ un poco más complejas como `std::strings` u otros tipos que pueden extraerse como bloques contiguos de memoria que no tienen una longitud fija.

En el caso de un `std::string`, el truco es usar su representación en C como un `const char *` y también recibir un lugar donde pasar su longitud al código de Swift. Un getter en el envoltorio doble puede entonces verse así:

{% highlight objective_c %}
- (const char *) currentObjectTypeWithLength: (unsigned long *)length;
{% endhighlight %}

Nota que usamos un `unsigned long` ya que eso es equivalente a un `UInt` de Swift. La implementación sería así:

{% highlight objective_c %}
- (const char *) currentObjectTypeWithLength: (unsigned long *)length {
  *length = parserWrapper->parser->currentObject->type.size();
  return parserWrapper->parser->currentObject->type.c_str();
}
{% endhighlight %}

A diferencia de los otros ejemplos, el código de Swift no es trivial y por lo tanto también lo explicaré:

{% highlight swift %}
var objectTypeLength: UInt = 0
let firstElementOfObjectTypeBuffer = UnsafeRawPointer(cityGMLParser.currentObjectType(withLength: &objectTypeLength))
let objectTypeData = Data(bytes: firstElementOfObjectTypeBuffer!, count: Int(objectTypeLength)*MemoryLayout<Int8>.size)
objects.last!.type = String(data: objectTypeData, encoding: .utf8)!
{% endhighlight %}    
      
Hay algunas cosas que ver aquí. Primero definimos la variable donde almacenaremos la longitud de la cadena `objectTypeLength` y la pasamos como un puntero usando `&objectTypeLength`. El valor de retorno se convierte inmediatamente a un `UnsafeRawPointer`.

Entonces, usamos el `Data` de Swift para almacenar el contenido del buffer en la ubicación del puntero devuelto. Y finalmente, podemos crear una `String` de Swift usando los datos del buffer.

---

[^1]: que también se usa en val3dity
[^2]: o es engorroso averiguarlo
