  // Add a tile layer
  var Streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
  })

  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// // Only one base layer can be shown at a time
var baseMaps = {
    Street: Streets,
    Tiles: tiles,
    Light: light,
    Dark: dark
  };

  var myMap = L.map(map, {
    center: [40, -98.5],
    zoom: 4.3,
    layers: [Streets]
  });
    // Create a new marker cluster group
    var markerClusters = new L.markerClusterGroup().addTo(myMap),
    group1 = L.featureGroup.subGroup(markerClusters).addTo(myMap),
    group2 = L.featureGroup.subGroup(markerClusters).addTo(myMap),
    group3 = L.featureGroup.subGroup(markerClusters).addTo(myMap),
    group4 = L.featureGroup.subGroup(markerClusters).addTo(myMap),
    group5 = L.featureGroup.subGroup(markerClusters).addTo(myMap),
    group6 = L.featureGroup.subGroup(markerClusters).addTo(myMap),
    group7 = L.featureGroup.subGroup(markerClusters).addTo(myMap),
    group1a = L.featureGroup(),
    group2a = L.featureGroup(),
    group3a = L.featureGroup(),
    group4a = L.featureGroup(),
    group5a = L.featureGroup(),
    group6a = L.featureGroup(),
    group7a = L.featureGroup(),
    control = L.control.layers(baseMaps, null).addTo(myMap);
    ;

    markerClusters.addTo(myMap);

    for ( var i = 0; i < cities.length; ++i )
    {
      if (cities[i].DAMAGE_PROPERTY.slice(-1) == "K"){
        pdamage = cities[i].DAMAGE_PROPERTY.slice(0,-1) * 1000
      };
      if (cities[i].DAMAGE_PROPERTY.slice(-1) == "M"){
        pdamage = cities[i].DAMAGE_PROPERTY.slice(0,-1) * 1000000
      };
      if (cities[i].DAMAGE_CROPS.slice(-1) == "K"){
      cdamage = cities[i].DAMAGE_CROPS.slice(0,-1) * 1000
      };
      if (cities[i].DAMAGE_CROPS.slice(-1) == "M"){
      cdamage = cities[i].DAMAGE_CROPS.slice(0,-1) * 1000000
      };
      var popup = cities[i].BEGIN_LOCATION +
                  '<br/><b>Date: </b> ' + cities[i].MONTH_NAME + " " + cities[i].BEGIN_DAY + ", " + cities[i].BEGIN_YEAR +
                  '<br/><b>Type: </b> ' + cities[i].EVENT_TYPE +
                  '<br/><b>Cause: </b> ' + cities[i].FLOOD_CAUSE +
                  '<br/><b>Property Damage: $</b>' + pdamage +
                  '<br/><b>Crop Damage: $</b>' + cdamage;
                
      var m = L.marker([cities[i].BEGIN_LAT, cities[i].BEGIN_LON])
                      .bindPopup( popup );

      m.addTo(cities[i].FLOOD_CAUSE == "Heavy Rain" ? group1a 
      : cities[i].FLOOD_CAUSE == "Heavy Rain / Snow Melt" ? group2a 
      : cities[i].FLOOD_CAUSE == "Heavy Rain / Burn Area" ? group3a
      : cities[i].FLOOD_CAUSE == "Ice Jam" ? group4a
      : cities[i].FLOOD_CAUSE == "Dam / Levee Break" ? group5a
      : cities[i].FLOOD_CAUSE == "Planned Dam Release" ? group6a 
      : group7a);
                    
      // markerClusters.addLayer(m);
      // m.addTo()
      // if (cities[i].EVENT_TYPE == "Flash Flood"){
      //   ([cities[i].BEGIN_LAT, cities[i].BEGIN_LON])
      //   .bindPopup( popup ));
      // }
      // if (cities[i].EVENT_TYPE == "Flood"){
      //   group2a.push(L.marker([cities[i].BEGIN_LAT, cities[i].BEGIN_LON])
      //   .bindPopup( popup ));
      // }
      // if (cities[i].EVENT_TYPE == "Coastal Flood"){
      //   group3a.push(L.marker([cities[i].BEGIN_LAT, cities[i].BEGIN_LON])
      //   .bindPopup( popup ));
      // }
      // if (cities[i].EVENT_TYPE == "Lakeshore Flood"){
      //   FlashFlood.push(L.marker([cities[i].BEGIN_LAT, cities[i].BEGIN_LON])
      //   .bindPopup( popup ));
      }

    

    group1a.addTo(group1);
    group2a.addTo(group2);
    group3a.addTo(group3);
    group4a.addTo(group4);
    group5a.addTo(group5);
    group6a.addTo(group6);
    group7a.addTo(group7);

    control.addOverlay(group1, 'Heavy Rain');
    control.addOverlay(group2, 'Heavy Rain / Snow Melt');
    control.addOverlay(group3, 'Heavy Rain / Burn Area');
    control.addOverlay(group4, 'Ice Jam');
    control.addOverlay(group5, 'Dam / Levee Break');
    control.addOverlay(group6, 'Planned Dam Release');
    control.addOverlay(group7, 'Not Stated');
    control.addTo(myMap);
  

  
  // // Overlays that may be toggled on or off
  // var overlayMaps = {
  //   Floods: markerClusters
  // };


//myMap.addLayer(markerClusters); 

// L.control.layers(baseMaps).addTo(myMap);



// markerClusters.addTo(myMap);
// controlgroups.addTo(myMap);
