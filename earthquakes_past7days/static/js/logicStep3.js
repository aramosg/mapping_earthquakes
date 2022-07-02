console.log("Workingss");

// Create the map object with a center and zoom level.
//let map = L.map("mapid").setView([40.7, -94.5], 4); //lat, long, zoom level (scale is 0 to 18)
//let map = L.map("mapid").setView([40.7, -94.5], 4); //lat, long, zoom level (scale is 0 to 18) // Module 13.4.1 -- adjusting to zoom in LA, zoom level 14

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY,
  }
);

// Module 13.5.6 - Adding another map
let satelliteStreets = L.tileLayer( "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

//Module 13.5.6 - Adding the maps to the base map -- this is another way to initialize a map, see line 5 as well
let map = L.map( "mapid", {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

L.control.layers( baseMaps ).addTo( map ); // // Pass our map layers into our layers control and add the layers control to the map.

function styleInfo( feature ) {
  return {
    opacity: 1, 
    fillOpacity: 1,
    fillColor: getColor( feature.properties.mag ),
    color: "#000000",
    radius: getRadius( feature.properties.mag ),
    stroke: true,
    wight: 0.5
  };
}

function getColor( magnitude ) {
  if( magnitude > 5 ) {
    return "#ea2c2c";
  }
  
  if( magnitude > 4 ) {
    return "#ea822c";
  }

  if( magnitude > 3 ) {
    return "#ee9c00";
  }

  if( magnitude > 2 ) {
    return "#eecc00";
  }

  if( magnitude > 1 ) {
    return "#d4ee00";
  }

  return "#98ee00";
}

function getRadius( magnitude ) {
  if( magnitude === 0 ) {
    return 1;
  }

  return magnitude * 4;
}


let myStyle = {
  color: "blue",
  weight: 1,
  fillColor: "yellow"
};

d3.json( "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" ).then( function( data ) {
  console.log( data );
  L.geoJson( data, {
    pointToLayer: function( feature, latlang ) {
      console.log( data );
      return L.circleMarker( latlang );
    },
    style: styleInfo,
    onEachFeature: function( feature, layer ) {
      layer.bindPopup( "Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo( map );
});

/*
d3.json( "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" ).then( function( data ) {
  console.log( data );
  L.geoJson( data , {
    style: myStyle,
    onEachFeature: function( feature, layer ) {
      console.log( layer );
      layer.bindPopup( "<h2>Neighborhood: " + feature.properties.AREA_NAME + "</h2>" );
    }
  }).addTo( map );
});
*/




















//Module 13.5.5
/*
let torontoData = "torontoRoutes.json";
d3.json( torontoData ).then( function( data ) {
  console.log( data );
  L.geoJson( data ).addTo( map );
});
*/

// Module 13.5.5 - SKILL DRILL
//let torontoData = "torontoRoutes.json";

// creating a style for the lines
/*
let myStyle = {
  color: "yellow",
  weight: 2
};
*/

/*
d3.json( torontoData ).then( function( data ) {
  console.log( data );
  L.geoJson( data, {
    //color: "yellow",
    //weight: 2,
    style: myStyle, // we pass the style object, instead of specifying the properties one by one
    onEachFeature: function( feature, layer ) {
      console.log( layer );
      layer.bindPopup( "<h2>Airline: " + feature.properties.airline + "</h2><hr><h3>Detination: " + feature.properties.dst + "</h3>" );
    }
  }).addTo( map );
});
*/

// Module 13.5.2 - Mapping a GeoJSON point
/*
let sanFranAirport = {
  "type": "FeatureCollection", "features": [{
    "type": "Feature",
    "properties": {
      "id": "3469",
      "name": "San Francisco International Airport",
      "city": "San Francisco",
      "country": "United States",
      "faa": "SFO",
      "icao": "KSFO",
      "alt": "13",
      "tz-offset": "-8",
      "dst": "A",
      "tz": "America/Los_Angeles"},
      "geometry": {
        "type": "Point",
        "coordinates": [-122.375, 37.61899948120117]
      }
    }
  ]};
*/

  // Module 13.5.3 - Airport data - this is supposed to be in Github and I should be using thr github URL
/*
  let airportData = "./majorAirports.json"
  d3.json( airportData ).then( function( data ) {
    console.log( data );
    //Creating a GeoJSON layer with the retrieved data
    L.geoJson( data ).addTo( map )
  });
*/

  // SKILL DRILL -  Module 13.5.3 - Airport data - this is supposed to be in Github and I should be using thr github URL
  /*  
  let airportData = "majorAirports.json";

    d3.json( airportData ).then( function( data ) {
      console.log( data );
      //Creating a GeoJSON layer with the retrieved data
      L.geoJson( data, {
        onEachFeature: function( feature, layer ) {
          console.log( layer );
          layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2><hr><h3>Airport name: " + feature.properties.name + "</h3>");
        }
    }).addTo( map );
  });
  */

  //L.geoJSON( sanFranAirport ).addTo( map );

  //Now adding (binding) a pop up
/*
  L.geoJSON( sanFranAirport, {
    pointToLayer: function( feature, latlang ){
      console.log( feature );
      return L.marker( latlang )
      .bindPopup( "<h2>" + feature.properties.name + "</h2><hr>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>"  );
    }
  }).addTo( map );
*/

// Module 13.5.2 - Using the onEachFeature method for adding GeoJSON data
/*
L.geoJson( sanFranAirport, {
  onEachFeature: function( feature, layer ){
    console.log( layer );
    layer.bindPopup( "<h2>" + feature.properties.name + "</h2><hr>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>" );
  }
}).addTo( map );
*/



// SKILL DRILL Module 13.5.2 - Using the onEachFeature method for adding GeoJSON data
/*
L.geoJson( sanFranAirport, {
  onEachFeature: function( feature, layer ){
    console.log( layer );
    layer.bindPopup( "<h2>Airport code: " + feature.properties.faa + "</h2><hr>" + "<h3>Airport name" + feature.properties.name + "</h3>" );
  }
}).addTo( map );
*/

// Module 13.4.3 - Mapping lines
/*
let line = [
  [33.9416, -118.4085], //comment
  [37.6213, -122.3790], 
  [40.7899, -111.9791],
  [47.4502, -122.3088]
];

L.polyline( line, {
  color: "yellow"
}).addTo( map );
*/

// Module 13.4.2 - SKILL DRILL
/*
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
*/


// Module 13.4.1 - Adding a single marker
//let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Module 13.4.2 - An array containing each city's location, state, and population.
//let cityData = cities;

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
/*
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
*/


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




// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);
