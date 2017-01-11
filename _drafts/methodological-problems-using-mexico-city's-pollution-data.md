---
layout: post
title: "Methodological problems using Mexico City's pollution data"
date: 2011-01-10 18:00 -05:00
categories: en
lang: en
---

Pollution in Mexico City has been a problem for decades.
I remember my childhood in the early 1990s as a time of always-grey skies, cheap leaded petrol, and almost believable tales of [birds falling dead from the sky](http://articles.chicagotribune.com/1986-02-04/news/8601090418_1_pollution-levels-mexico-city-dead-birds).
In 1992, Mexico City earned the dubious distinction of the most polluted city on the planet.
Many inhabitants of the city were outraged[^1].

Nowadays the skies are mostly blue and the situation is much improved, which is a real achievement considering the rather inauspicious location of Mexico City in a closed valley more than 2 km above sea level[^2].
This improvement was no coincidence.
Tough actions followed the worst years of the pollution crisis, including closing down an oil refinery, moving certain factories outside the city and forcing all cars to install catalytic converters and do stringent twice-yearly emission controls.

<img src="{{ site.baseurl }}/img/blog/simat.png" class="img-responsive center-block" alt="Setting the bridging header in Xcode">

However, the most forward-looking reaction was perhaps the creation of a city-wide pollution measurement system in 1986, which is now known as [SIMAT](http://www.aire.cdmx.gob.mx).
The system is acknowledged as a big success and is widely used.
For one, if the pollution levels reach a certain level on a given day, restrictions on car circulation are imposed for the following day.
This means that most people in Mexico City check the pollution levels more frequently than the weather forecast[^3].

While the raw pollution data is generally regarded as accurate and reliable, it has some quirks:
* Pollution measuring stations have moved *very* frequently and the number of stations has constantly fluctuated.
* Not all pollutants are measured at every station.
* Stations are regularly offline for maintenance.

All of the above means that many (most?) users of Mexico City's pollution data use it incorrectly **including the Mexico City and the Mexican federal governments**.
This blog post documents a few examples of what I think are the main incorrect uses of the data and hopefully helps others to use it better.

## Statistically weak statistics

An intergovernmental working group known as the *[Comisión Ambiental de la Megalópolis](http://www.gob.mx/comisionambiental)* (the Environmental Commission for the Megalopolis) issues environmental alerts based on the maximum pollution level in the city.
This is statistically suspect: the more stations that are online, the more likely that a local pollution spike will be detected and an environmental alert will be issued.
*In turn, this creates a perverse incentive for the government to reduce the number of pollution measuring stations and to locate them away from polluted areas.*

For instance, the station in Xalostoc (an industrial area in the Northeast of the metropolitan area) is often the most polluted in the city.
If this station is (temporarily) offline, the chances of a pollution alert being declared decrease substantially.
I am certain that adding more stations, particularly in other industrial areas such as Cuautitlán Izcalli, Iztapalapa, or the Toluca or Mezquital valleys, would cause the number of pollution alerts to increase.

For other example of statistically weak statistics, consider the [pretty mosaics](http://www.aire.cdmx.gob.mx/default.php?opc='aqBhnmOkYw==') showing the maximum pollutant data for every day during the past years.
They also use only the maximum and fail to take into account the general increase in the number of stations throughout the years.

## Not interpolating holes in the data

Raw pollutant levels are hard to grasp for non-scientists.
Thus, the government of Mexico (like most other governments) has defined a *pollution index* called IMECA.
Its value is calculated independently for every pollutant (CO, CO2, NO2, ozone, PM10, PM2.5, etc.), but the only number that is easily available and widely broadcast to the population is the maximum for all pollutants[^4].

When you consider this issue together with the fact that not all stations measure all pollutants, another problem becomes apparent: the IMECA value for each station is only really a lower bound (as opposed to its actual but unknown value) and *they cannot be interpolated*.
And yet, they are directly interpolated by most where I have seen them used, including the otherwise great [Hoyo de Smog](https://hoyodesmog.diegovalle.net/) and the [Netatmo](https://www.netatmo.com/) app.

As another example, 

## Appendix: getting the data

* The best page to parse real-time data per pollutant: http://www.aire.cdmx.gob.mx/mapa-concentraciones/mapa.php
* Archived data from 1986: http://www.aire.cdmx.gob.mx/default.php?opc='aKBhnmI='&opcion=Zg==

---------

[^1]: but the cynical nature of *chilangos* made more than a few wear it with pride...
[^2]: No other megacity is in a similarly difficult location.
[^3]: which is perhaps not a surprise considering the predictably mild weather of Mexico City
[^4]: which is another case of statistically weak statistics...