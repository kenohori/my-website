---
layout: post
title: "Modelos 3D de ciudades abiertos para México"
date: 2026-08-12 12:00 -05:00
categories: es
lang: es
locale_en: "/en/2026/08/12/open-3d-city-models-mexico.html"
locale_es: "/es/2026/08/12/open-3d-city-models-mexico.html"
---

<img src="https://github.com/kenohori/3dcm-mexico/raw/main/paper/figures/snapshot01.jpg" class="img-fluid center-block" alt="Modelo 3D de la Ciudad de México">

El [INEGI](https://www.inegi.org.mx/) tiene datos topográficos y de elevación que cubren todo el país, así que me dio curiosidad saber si podrían usarse para crear modelos 3D de ciudades usando solamente datos abiertos. Hay un detalle: al conjunto de datos topográficos le faltan dos de los tipos de entidades más importantes para los modelos 3D de ciudades: las huellas (*footprints*) de las construcciones y las calles como polígonos. Mi método resuelve esto derivando las huellas de edificios directamente de los datos de elevación (restando el modelo de terreno del modelo de superficie y aplicando crecimiento de regiones a las alturas resultantes) y generando los polígonos de calles a partir de los espacios vacíos entre las manzanas en los datos topográficos.

El resultado es un modelo [CityJSON](https://www.cityjson.org/) con semántica completa y un modelo OBJ con texturas, que incluye edificios, calles, cubierta vegetal, cuerpos de agua y terreno. En el centro-poniente de la Ciudad de México, donde inicialmente probé el método, las huellas de edificios suelen ser más precisas que las de los conjuntos de datos globales (Microsoft, Google), en particular para edificios emblemáticos no rectilíneos como la Torre Mayor y el World Trade Center de la Ciudad de México.

El trabajo se describe con más detalle en el artículo "[*Creating 3D city models of Mexican cities based on open data*](https://doi.org/10.5194/isprs-archives-XLVIII-3-W4-2025-3-2026)", presentado en la Conference on Geoinformation 2025 en Mérida. Todo el código es abierto y está disponible en [GitHub](https://github.com/kenohori/3dcm-mexico).

También he subido los datos de salida del artículo. Cubren la parte centro-poniente de la Ciudad de México que mencioné en el artículo en ambos formatos (el modelo CityJSON, además del modelo OBJ y su terreno): [e14a39b3.zip]({{ site.baseurl }}/files/e14a39b3.zip).

Si quieres el resto de la Ciudad de México o cualquier otra región donde haya datos de elevación de alta resolución, o si te interesa colaborar más en esto, [ponte en contacto]({{ site.baseurl }}/es/contact/)!
