console.log("Working");

// Create the map object with a center and zoom level.
//let map = L.map("mapid").setView([40.7, -94.5], 4); //lat, long, zoom level (scale is 0 to 18)
let map = L.map("mapid").setView([37.6213, -122.3790], 5); //lat, long, zoom level (scale is 0 to 18) // Module 13.4.1 -- adjusting to zoom in LA, zoom level 14

// Module 13.4.3 - Mapping lines
let line = [
  [33.9416, -118.4085], //comment
  [37.6213, -122.3790], 
  [40.7899, -111.9791],
  [47.4502, -122.3088]
];

// Module 13.4.2 - SKILL DRILL
let myLine = [
  [37.6213, -122.3790], //SFO
  [30.1975, -97.6664], //AUS
  [43.6777, -79.6248], //YYZ
  [40.6413, -73.7781], //JFK
  [19.4361, -99.0719] // CDMX
];

L.polyline( myLine, {
  color: "blue",
  weight: 4,
  opacity: 0.5,
  dashArray: "20, 20"
}).addTo( map );

L.polyline( line, {
  color: "yellow"
}).addTo( map );

// Module 13.4.1 - Adding a single marker
//let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Module 13.4.2 - An array containing each city's location, state, and population.
let cityData = cities;

// Module 13.4.2 - Loop through the cities array and create one marker for each city.
/*
cityData.forEach(function (city) {
  console.log(city);
  //L.marker( city.location ).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
  L.circleMarker( city.location, {
    radius: city.population/100000
  }).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
  .addTo( map );
});
*/

// SKILL DRILL - MODULE 13.4.2
cityData.forEach(function (city) {
  console.log(city);
  //L.marker( city.location ).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
  L.circleMarker( city.location, {
    color: "orange",
    fillColor: "orange",
    weight: 4,
    radius: city.population/200000
  }).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
  .addTo( map );
});



//Module 13.4.1 - changing the marker for a circle
/*
L.circle([34.0522, -118.2437], {
  color: "black",
  fillColor: "yellow",
  filOpacity: 0.5,
  radius: 300, //meters
}).addTo(map);
*/

// Skill drill - Module 13.4.1
/*
L.circleMarker([34.0522, -118.2437], {
  color: "red",
  fillColor: "#ffffa1",
  radius: 300, //meters
}).addTo(map);
*/

// AN ALTERNATIVE -- Create the map object with a center and zoom level.
/*
//This method is useful when we need to add multiple tile layers, or a background image of our map(s), which we will do later in this module.
let map = L.map("mapid", {
    center: [
      40.7, -94.5
    ],
    zoom: 4
  });
  */

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(
  //"https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  //"https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
  "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    //id: "mapbox/dark-v10",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY,
  }
);
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
