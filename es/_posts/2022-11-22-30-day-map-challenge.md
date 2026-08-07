---
layout: post
title: "#30DayMapChallenge"
date: 2022-11-22 12:47 -05:00
categories: es
lang: es
locale_en: "/en/2022/11/22/30-day-map-challenge.html"
locale_es: "/es/2022/11/22/30-day-map-challenge.html"
---

Contribuí con 3 mapas al esfuerzo conjunto de mi grupo de investigación en el [#30DayMapChallenge](https://30daymapchallenge.com/). Están publicados en el [Twitter](https://twitter.com/tudelft3d) del grupo, pero también enlazo los resultados desde aquí.

## [Día 10: OpenStreetMap](https://3d.bk.tudelft.nl/ken/maps/osm-buildings/)

<img src="{{ site.baseurl }}/img/blog/map-osm.jpg" class="img-fluid center-block" alt="Mapa de edificios de OSM">

Este mapa muestra el número de huellas de edificios disponibles en OpenStreetMap por celda de [H3](https://h3geo.org/). Es interesante ver que algunas regiones del mundo están mucho mejor mapeadas que otras y que los datos no se correlacionan tanto con la población o la riqueza.

El script para generar los datos está disponible [aquí](https://github.com/kenohori/osmium-buildings).

## [Día 21: Conjunto de datos de población de Kontur](https://3d.bk.tudelft.nl/ken/maps/kontur-cities/)

<img src="{{ site.baseurl }}/img/blog/map-kontur.jpg" class="img-fluid center-block" alt="Mapa de las ciudades más grandes de Kontur">

Este mapa muestra las ciudades más grandes del mundo, calculadas de forma independiente a partir del [conjunto de datos de población de Kontur](https://data.humdata.org/dataset/kontur-population-dataset). El primer paso fue clasificar todas las celdas de H3 en urbanas y no urbanas con base en un umbral de densidad de población (5000/km^2 por defecto). Las celdas urbanas se agregan entonces en ciudades siempre que formen regiones casi contiguas (hasta un umbral máximo de separación entre celdas).

Debido a la metodología, es posible generar las ciudades más grandes del mundo usando un estándar uniforme, lo que contrasta con la forma inconsistente en que diferentes países calculan sus propias estadísticas. Si te disgusta la expansión urbana tanto como a mí, te alegrará ver que este mapa muestra la verdadera naturaleza del desarrollo suburbano.

El script para generar los datos está disponible [aquí](https://github.com/kenohori/konturpop).


## [Día 23: Movimiento](https://3d.bk.tudelft.nl/ken/maps/mexico-city/)

<img src="{{ site.baseurl }}/img/blog/map-movement.jpg" class="img-fluid center-block" alt="Mapa de isócronas de la Ciudad de México">

Este mapa, inspirado en [Chronotrains](https://www.chronotrains.com/), muestra qué tan lejos puedes viajar en la Ciudad de México usando el transporte público en una hora, con base en isócronas precalculadas (de 15, 30, 45 y 60 minutos). Las isócronas se calculan para todas las paradas de metro, BRT, tren ligero, tren suburbano y teleférico usando datos del [GTFS estático de la Ciudad de México](https://datos.cdmx.gob.mx/dataset/gtfs) y un método personalizado.

El código para generar el mapa y calcular las isócronas está disponible [aquí](https://github.com/tudelft3d/isochrones-mexico).
