---
layout: post
title: "Problemas metodológicos al usar los datos de contaminación de la Ciudad de México"
date: 2017-01-10 22:08 -05:00
categories: es
lang: es
locale_en: "/en/2017/01/10/methodological-problems-using-mexico-city's-pollution-data.html"
locale_es: "/es/2017/01/10/methodological-problems-using-mexico-city's-pollution-data.html"
---

<a href="https://commons.wikimedia.org/wiki/File:AerialViewMexicoCity.jpg"><img src="{{ site.baseurl }}/img/blog/mexico-city.jpg" class="img-fluid center-block" alt="Contaminación en la Ciudad de México"></a>

La contaminación en la Ciudad de México ha sido un problema durante décadas.
Recuerdo mi infancia a principios de los años 90 como una época de cielos siempre grises, gasolina con plomo barata e historias casi increíbles de [aves que caían muertas del cielo](http://articles.chicagotribune.com/1986-02-04/news/8601090418_1_pollution-levels-mexico-city-dead-birds).
En 1992, la Ciudad de México obtuvo el dudoso honor de ser la ciudad más contaminada del planeta.
Muchos habitantes de la ciudad se indignaron[^1].

Hoy en día los cielos son mayormente azules y la situación ha mejorado mucho, lo cual es un logro real considerando la poco afortunada ubicación de la Ciudad de México en un valle cerrado a más de 2 km sobre el nivel del mar[^2].
Esta mejora no fue coincidencia.
Tras los peores años de la crisis de contaminación vinieron acciones enérgicas, incluyendo el cierre de una refinería de petróleo, el traslado de ciertas fábricas fuera de la ciudad y la obligación de que todos los autos instalaran convertidores catalíticos y se sometieran a estrictos controles de emisiones dos veces al año.

<img src="{{ site.baseurl }}/img/blog/simat.png" class="img-fluid center-block" alt="SIMAT">

Sin embargo, la reacción más previsora fue quizá la creación en 1986 de un sistema de monitoreo de contaminación para toda la ciudad, ahora conocido como [SIMAT](http://www.aire.cdmx.gob.mx).
El sistema es reconocido como un gran éxito y se usa ampliamente.
Por ejemplo, si los niveles de contaminación alcanzan cierto nivel en un día dado, se imponen restricciones a la circulación de autos para el día siguiente.
Mucha gente en la Ciudad de México revisa los niveles de contaminación con más frecuencia que el pronóstico del tiempo[^3].

Si bien los datos crudos de contaminación son generalmente considerados precisos y confiables, tienen algunas peculiaridades:
* Las estaciones de monitoreo de contaminación se han movido *muchas veces* y el número de estaciones ha fluctuado constantemente.
* No todos los contaminantes se miden en todas las estaciones.
* Las estaciones se desconectan regularmente para mantenimiento.

Todo lo anterior significa que muchos (¿la mayoría?) de los usuarios de los datos de contaminación de la Ciudad de México los usan incorrectamente **incluyendo los gobiernos de la Ciudad de México y el federal mexicano**.
Este post de blog documenta un par de malos ejemplos que muestran lo que creo que son los principales usos incorrectos de los datos y ojalá ayude a otros a usarlos mejor.

## Estadísticas estadísticamente débiles

Un grupo de trabajo intergubernamental conocido como la *[Comisión Ambiental de la Megalópolis](http://www.gob.mx/comisionambiental)* emite alertas ambientales basadas en el nivel máximo de contaminación en la ciudad.
Esto es estadísticamente sospechoso: cuantas más estaciones estén en línea, más probable es que se detecte un pico local de contaminación y se emita una alerta ambiental.
*A su vez, esto crea un incentivo perverso para que el gobierno reduzca el número de estaciones de monitoreo de contaminación y las ubique lejos de las áreas contaminadas.*

Por ejemplo, la estación en Xalostoc (una zona industrial al noreste de la zona metropolitana) suele ser la más contaminada de la ciudad.
Si esta estación está (temporalmente) fuera de línea, las posibilidades de que se declare una alerta de contaminación disminuyen sustancialmente.
Estoy seguro de que si se integraran más estaciones al sistema, particularmente en otras zonas industriales como Cuautitlán Izcalli, Iztapalapa, o los vecinos valles de Toluca o del Mezquital (que también son parte de la megalópolis), provocaría que el número de alertas de contaminación aumentara.

Como otro ejemplo de estadísticas estadísticamente débiles, considera los [bonitos mosaicos](http://www.aire.cdmx.gob.mx/default.php?opc='aqBhnmOkYw==') que muestran los datos máximos de contaminantes de cada día durante los últimos años.
También usan solo el máximo y no toman en cuenta el aumento general en el número de estaciones a lo largo de los años.

## No manejando correctamente los huecos en los datos

Los niveles crudos de contaminantes son difíciles de entender para los no especialistas.
Por lo tanto, el gobierno de México (como la mayoría de los otros gobiernos) ha definido un *índice de contaminación* llamado IMECA.
Su valor se calcula independientemente para cada contaminante (CO, CO<sub>2</sub>, NO<sub>2</sub>, ozono, PM<sub>10</sub>, PM<sub>2.5</sub>, etc.), pero el único número que está fácilmente disponible y se difunde ampliamente a la población es el máximo de todos los contaminantes por estación[^4].

Cuando consideras este asunto junto con el hecho de que no todas las estaciones miden todos los contaminantes, otro problema se vuelve evidente: el valor de IMECA de cada estación es en realidad solo un límite inferior (en contraposición a su valor real pero desconocido) y **estos valores no pueden interpolarse**.
Y sin embargo, son interpolados directamente por la mayoría de los servicios, incluyendo el por lo demás excelente [Hoyo de Smog](https://hoyodesmog.diegovalle.net/) y la aplicación de [Netatmo](https://www.netatmo.com/).
Esta es una forma completamente equivocada de proporcionar datos de contaminación en cada ubicación[^5].

<div class="row">
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/simat-coyoacan-1.png" class="img-fluid center-block" alt="SIMAT Coyoacán 1"></div>
	<div class="col-sm-6 col-xs-6"><img src="{{ site.baseurl }}/img/blog/simat-coyoacan-2.png" class="img-fluid center-block" alt="SIMAT Coyoacán 2"></div>
</div>

Como otro mal ejemplo, considera los mapas que se muestran en el sitio web de SIMAT.
Aparentemente, mi alcaldía de origen, Coyoacán (rodeada en rojo), es más limpia que el área circundante, ¿verdad?
En realidad, las estaciones de monitoreo de la alcaldía no miden PM<sub>10</sub>, que es el principal contaminante en estos fríos días de invierno[^6].
Esto es doblemente engañoso en la vista de alcaldías/municipios que se muestra a la derecha, donde (de nuevo) las alcaldías/municipios con menos estaciones y que miden menos contaminantes generalmente se muestran como más limpias.

Quizá algún día termine creando mi propio mapa de contaminación en tiempo real. Ese sería un buen proyecto pequeño.

## Apéndice: obteniendo los datos

* [La mejor página para analizar los datos en tiempo real por contaminante](http://www.aire.cdmx.gob.mx/mapa-concentraciones/mapa.php)
* [Datos archivados desde 1986](http://www.aire.cdmx.gob.mx/default.php?opc='aKBhnmI='&opcion=Zg==)

---------

[^1]: pero la naturaleza cínica de los *chilangos* hizo que más de unos cuantos lo llevaran con orgullo...
[^2]: Ninguna otra megaciudad está en una ubicación igualmente difícil.
[^3]: lo cual quizá no es una sorpresa considerando el clima predeciblemente templado de la Ciudad de México
[^4]: que es otro caso de estadísticas estadísticamente débiles...
[^5]: Una solución todavía simple pero mucho mejor: interpolar los valores de IMECA por contaminante, y después usar el máximo en todas partes.
[^6]: debido a las [inversiones térmicas](https://en.wikipedia.org/wiki/Inversion_(meteorology)) que atrapan la contaminación en el valle
