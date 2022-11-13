
// Initialise all the LayerGroups that we'll use.
let layers = {
  TECTONIC_PLATES: new L.LayerGroup(),
  EARTHQUAKES: new L.LayerGroup()
};

// Create a map object.
let myMap = L.map("map", {
  center: [28.644800, 77.216721],
  zoom: 3,
  layers: [
    layers.TECTONIC_PLATES,
    layers.EARTHQUAKES
  ]
});

// Add a tile layer.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let topographicmap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

const quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let quakeData;

const tectonicUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
let tectonicData;

// Fetch the JSON data for the earthquake
d3.json(quakeUrl).then(function (data) {
  quakeData = data;
  plotQuake();

  //Fetch the JSON data for the tectonic plates
  d3.json(tectonicUrl).then(function (tecdata) {
    tectonicData = tecdata;
    plotTectonic();


    let baseMaps = {
      "Street Map": streetmap,
      "Topographic Map": topographicmap
    };

    // Create an overlays object to add to the layer control.
    let overlays = {
      "Tectonic Plates": layers.TECTONIC_PLATES,
      "Earthquakes": layers.EARTHQUAKES,
    };

    // Create a control for our layers, and add our overlays to it.
    L.control.layers(baseMaps, overlays).addTo(myMap);
    //Adding legend to the map

    // Set up the legend.
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (_myMap) {

      let div = L.DomUtil.create('div', 'info legend'),

        depth = [0, 10, 30, 50, 70, 90]


      // Loop through our density intervals and generate a label with a colored square for each interval

      for (var i = 0; i < depth.length; i++) {

        div.innerHTML +=

          '<i style="background:' + markerColor(depth[i] + 1) + '"></i> ' +

          depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');

      }

      return div;


    }
    legend.addTo(myMap);
  });
});
// Define a markerSize function that will give each location a different radius based on the magnitude of earthquake.
function markerSize(mag) {
  return mag * 30000;
}


//Define a marker color function that displays different colour based on the depth of earthquake
function markerColor(Color) {
  if (Color <= 10) {
    return "#f0e68c";
  } else if (Color <= 30) {
    return "#e9967a";
  } else if (Color <= 50) {
    return "#cd5c5c";
  } else if (Color <= 70) {
    return "#c71585";
  } else if (Color <= 90) {
    return "#800080";
  } else {
    return "#000080";
  }
}



//Plotting the Earthquake data
function plotQuake() {
  let coordArr = [];

  //Changing the existing data to an organised data with separate key values for coordinates, magnitude, depth
  quakeData.features.forEach(element => {
    let plotData = {};
    let coord = [];
    coord[0] = element.geometry.coordinates[1];
    coord[1] = element.geometry.coordinates[0];
    plotData.coordinates = coord;
    plotData.magnitude = element.properties.mag;
    plotData.eqDepth = element.geometry.coordinates[2];
    plotData.place = element.properties.place;

    coordArr.push(plotData);
  });

  // Plotting the circles with respect to magnitude and fill colour with respect to earthquake depth
  for (let i = 0; i < coordArr.length; i++) {

    L.circle(coordArr[i].coordinates, {
      fillOpacity: 0.7,
      color: "black",
      fillColor: markerColor(coordArr[i].eqDepth),
      radius: markerSize(coordArr[i].magnitude)
    }).bindPopup(`<h1>Location:${coordArr[i].place}</h1> <hr> 
                  <h3>Magnitude: ${coordArr[i].magnitude}</h3> <hr>
                  <h3>Depth: ${coordArr[i].eqDepth}</h3>`).addTo(layers.EARTHQUAKES);
  }
}

// Plotting the tectonic data 
function plotTectonic() {
  let tecArr = [];

  tectonicData.features.forEach(element => {
    let plottecData = [];
    for (let i = 0; i < element.geometry.coordinates.length; i++) {
      let coordTec = [];
      coordTec[0] = element.geometry.coordinates[i][1];
      coordTec[1] = element.geometry.coordinates[i][0];
      plottecData.push(coordTec);
    }  
    var firstpolyline = new L.polyline(plottecData, {
      color: 'red',
      weight: 3,
      opacity: 0.5
      });
    firstpolyline.addTo(layers.TECTONIC_PLATES)
    tecArr.push(plottecData);
  });

}

