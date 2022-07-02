console.log("Working");

// Create the map object with a center and zoom level.
//let map = L.map("mapid").setView([40.7, -94.5], 4); //lat, long, zoom level (scale is 0 to 18)
let map = L.map("mapid").setView([34.0522, -118.2437], 14); //lat, long, zoom level (scale is 0 to 18) // Module 13.4.1 -- adjusting to zoom in LA, zoom level 14

// Module 13.4.1 - Adding a single marker
//let marker = L.marker([34.0522, -118.2437]).addTo(map);

//Module 13.4.1 - changing the marker for a circle
L.circle([34.0522, -118.2437], {
  color: "black",
  fillColor: "yellow",
  filOpacity: 0.5,
  radius: 300, //meters
}).addTo(map);

// Skill drill - Module 13.4.1
L.circleMarker([34.0522, -118.2437], {
  color: "red",
  fillColor: "#ffffa1",
  radius: 300, //meters
}).addTo(map);

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
  "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
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
