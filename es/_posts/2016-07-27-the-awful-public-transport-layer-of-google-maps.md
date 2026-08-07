---
layout: post
title: "La terrible capa de transporte público de Google Maps"
date: 2016-07-27 00:16 -05:00
categories: es
lang: es
locale_en: "/en/2016/07/27/the-awful-public-transport-layer-of-google-maps.html"
locale_es: "/es/2016/07/27/the-awful-public-transport-layer-of-google-maps.html"
---

Hace dos días, Google lanzó una nueva versión de Google Maps. La mayoría de la gente parece estar de acuerdo en que es una buena mejora de un servicio que ya era genial. Cuando lo vi, inmediatamente me encantó el aspecto más limpio y la legibilidad mejorada.

<img src="{{ site.baseurl }}/img/blog/new-google-maps.png" class="img-fluid center-block" alt="El nuevo Google Maps">

Es decir, hasta que activé la capa de transporte público y vi que sigue tan fea y mal diseñada como siempre.

Como alguien a quien le apasionan tanto los mapas como el transporte público, esto es decepcionante. Han pasado más de 10 años desde que Google Transit apareció por primera vez en Google Labs y casi 9 años desde que se integró a Google Maps. Y así que decidí escribir un post de 'name and shame' para ver cuánto tiempo le toma a Google poner sus mapas de transporte público a la altura.

Entre otros problemas, la capa de tránsito de Google Maps sufre de líneas discontinuas, que se cruzan entre sí y entrecortadas, demasiado énfasis en las calles, etiquetas mal colocadas y mal coloreadas que a menudo son ilegibles, repetidas o faltantes, una falta de nombres de líneas y estaciones en la mayoría de los niveles de zoom, y una falta total del aspecto limpio de la capa estándar de Google Maps. En los países de Map Maker la información también es terriblemente inconsistente, con estaciones duplicadas, categorías equivocadas, nombres mal escritos, diferentes estilos de capitalización y mucha información superflua (por ejemplo, 'Metro xxx' para referirse a una estación llamada xxx).

Pero no te fíes solo de mi palabra. Mejor échale un vistazo a las capturas de pantalla de abajo, que comparan la bastante buena capa de transporte público en Apple Maps[^1] (arriba) con la terrible de Google Maps (abajo) en varias ciudades y a diferentes escalas. Estoy seguro de que tú también verás una multitud de problemas.

### Berlin

<img src="{{ site.baseurl }}/img/blog/berlin-apple.png" class="img-fluid center-block" alt="Berlin en Apple Maps">
<br />
<img src="{{ site.baseurl }}/img/blog/berlin-google.png" class="img-fluid center-block" alt="Berlin en Google Maps">

### London

<img src="{{ site.baseurl }}/img/blog/london-apple.png" class="img-fluid center-block" alt="London en Apple Maps">
<br />
<img src="{{ site.baseurl }}/img/blog/london-google.png" class="img-fluid center-block" alt="London en Google Maps">

### Mexico City

<img src="{{ site.baseurl }}/img/blog/mexico-city-apple.png" class="img-fluid center-block" alt="Mexico City en Apple Maps">
<br />
<img src="{{ site.baseurl }}/img/blog/mexico-city-google.png" class="img-fluid center-block" alt="Mexico City en Google Maps">

### Montreal

<img src="{{ site.baseurl }}/img/blog/montreal-apple.png" class="img-fluid center-block" alt="Montreal en Apple Maps">
<br />
<img src="{{ site.baseurl }}/img/blog/montreal-google.png" class="img-fluid center-block" alt="Montreal en Google Maps">

### New York City

<img src="{{ site.baseurl }}/img/blog/new-york-apple.png" class="img-fluid center-block" alt="New York City en Apple Maps">
<br />
<img src="{{ site.baseurl }}/img/blog/new-york-google.png" class="img-fluid center-block" alt="New York City en Google Maps">

### Rio de Janeiro

<img src="{{ site.baseurl }}/img/blog/rio-apple.png" class="img-fluid center-block" alt="Rio de Janeiro en Apple Maps">
<br />
<img src="{{ site.baseurl }}/img/blog/rio-google.png" class="img-fluid center-block" alt="Rio de Janeiro en Google Maps">

### San Francisco

<img src="{{ site.baseurl }}/img/blog/san-francisco-apple.png" class="img-fluid center-block" alt="San Francisco en Apple Maps">
<br />
<img src="{{ site.baseurl }}/img/blog/san-francisco-google.png" class="img-fluid center-block" alt="San Francisco en Google Maps">

### Sydney

<img src="{{ site.baseurl }}/img/blog/sydney-apple.png" class="img-fluid center-block" alt="Sydney en Apple Maps">
<br />
<img src="{{ site.baseurl }}/img/blog/sydney-google.png" class="img-fluid center-block" alt="Sydney en Google Maps">

----

[^1]: La verdad, esta es una de las pocas áreas donde Apple Maps está significativamente por delante de Google Maps. Aunque la cobertura de Apple Maps es bastante irregular.
