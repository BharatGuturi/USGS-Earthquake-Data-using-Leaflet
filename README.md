# leaflet-challenge
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualise their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. 

This project focusses on visualising the USGS data that will allow them to better educate the public and other government organisations (and hopefully secure more funding) on issues facing our planet.

# Summary
In this project, a visualisation is created after extracting the data from USGS GeoJSON. The earthquake data is plotted for the last 7 days (or the chosen number of days) with diameter of each circle representing the magnitude of the earthquake. Additionally, tectonic plates have been plotted with the user interactive interface to choose the type of map. 

# Instructions:

To run this repo, execute the following commands:
1) Git clone https://github.com/BharatGuturi/USGS-Earthquake-Data-using-Leaflet.git
2) Browse html in Leaflet-Part-1/index.html to view the earthquake visualisation for the last 1 week. Each circle depicts the location of earthquake. The size of the circle represents the magnitude of earthquake. Colour of circle depicts the depth of earthquake.
3) To know additional details of the earthquake, click on the circle.
4) Browse html in Leaflet-Part-1/index.html to view the earthquake visualisation for the last 1 week and tectonic plates. This consists of 2 maps: Street map and topographic map. Select the option as required.

# Web Pages:

1) Earthquake depths with Legend

<p align="center"><img src='https://github.com/BharatGuturi/USGS-Earthquake-Data-using-Leaflet/blob/main/Output/earthquake_depths_and_legend.png' width = 80% ></p>  

2) Earthquake layers with Street view and techtonic plates

<p align="center"><img src='https://github.com/BharatGuturi/USGS-Earthquake-Data-using-Leaflet/blob/main/Output/2.png' width = 80% ></p> 

3) Earthquake layers with Topographic view and techtonic plates

<p align="center"><img src='https://github.com/BharatGuturi/USGS-Earthquake-Data-using-Leaflet/blob/main/Output/3.png' width = 80% ></p> 

# References:

https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
