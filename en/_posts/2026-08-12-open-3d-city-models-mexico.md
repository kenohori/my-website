---
layout: post
title: "Open 3D city models for Mexico"
date: 2026-08-12 12:00 -05:00
categories: en
lang: en
locale_es: "/es/2026/08/12/open-3d-city-models-mexico.html"
---

<img src="https://github.com/kenohori/3dcm-mexico/raw/main/paper/figures/snapshot01.jpg" class="img-fluid center-block" alt="3D city model of Mexico City">

Mexico's national mapping agency [INEGI](https://www.inegi.org.mx/) provides topographic and elevation datasets covering the whole country, so I got curious about whether they could be used to create 3D city models using only open data. There's one catch: the topographic dataset is missing two of the most important feature types for 3D city models, namely individual building footprints and road polygons. My method works around this by deriving building footprints directly from the elevation data (subtracting the terrain model from the surface model and region-growing from the resulting heights) and generating road polygons from the empty spaces between city blocks in the topographic data.

The result is a semantically rich [CityJSON](https://www.cityjson.org/) model and a textured OBJ model, including buildings, roads, plant cover, water bodies and terrain. In central-western Mexico City, where I tested the method, the building footprints are often more accurate than those from global datasets (Microsoft, Google), particularly for non-rectilinear landmarks such as the Torre Mayor and the Mexico City World Trade Center.

The work is described in more detail in the paper "[Creating 3D city models of Mexican cities based on open data](https://doi.org/10.5194/isprs-archives-XLVIII-3-W4-2025-3-2026)", presented at the Conference on Geoinformation 2025 in Mérida, Mexico. All the code is open source on [GitHub](https://github.com/kenohori/3dcm-mexico).

I've also made the output data from the paper freely available. It covers the tile of central-western Mexico City in both formats (the CityJSON model plus the OBJ model and its terrain): [e14a39b3.zip]({{ site.baseurl }}/files/e14a39b3.zip).

If you'd like the rest of Mexico City or any other region where high-resolution elevation data is available, or if you'd like to collaborate further on this, [get in touch]({{ site.baseurl }}/en/contact/)!
