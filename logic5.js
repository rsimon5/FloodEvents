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
    group1a = L.featureGroup(),
    group2a = L.featureGroup(),
    group3a = L.featureGroup(),
    group4a = L.featureGroup(),
    control = L.control.layers(baseMaps, null).addTo(myMap);
    ;

    markerClusters.addTo(myMap);
    m = []

    for ( var i = 0; i < cities.length; ++i )
    {
        if (cities[i].DAMAGE_PROPERTY.slice(-1) == "K"){
            damage = cities[i].DAMAGE_PROPERTY.slice(0,-1) * 1000
        };
        if (cities[i].DAMAGE_PROPERTY.slice(-1) == "M"){
            damage = cities[i].DAMAGE_PROPERTY.slice(0,-1) * 1000000
        };       
        var popup = cities[i].BEGIN_LOCATION +
                  '<br/><b>Date: </b> ' + cities[i].MONTH_NAME + " " + cities[i].BEGIN_DAY + ", " + cities[i].BEGIN_YEAR +
                  '<br/><b>Type: </b> ' + cities[i].EVENT_TYPE +
                  '<br/><b>Cause: </b> ' + cities[i].FLOOD_CAUSE +
                  '<br/><b>Damage: $</b> ' + damage;
                  

        if (damage == 0){
        var m = L.marker([cities[i].BEGIN_LAT, cities[i].BEGIN_LON])
                      .bindPopup( popup );
        };
        if (damage > 0){
        var m = L.circle([cities[i].BEGIN_LAT, cities[i].BEGIN_LON], {
                          stroke: false,
                          fillOpacity: 0.4,
                          color: "aqua",
                          fillColor: "aqua",
                          radius: damage/200
                        //   markerSize(cities[i].DAMAGE_PROPERTY)
                        }).bindPopup( popup );
                    };
      m.addTo(cities[i].EVENT_TYPE == "Flash Flood" ? group1a 
      : cities[i].EVENT_TYPE == "Flood" ? group2a 
      : cities[i].EVENT_TYPE == "Coastal Flood" ? group3a
      : group4a);
                    
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

    control.addOverlay(group1, 'Flash Floods');
    control.addOverlay(group2, 'Floods');
    control.addOverlay(group3, 'Coastal Floods');
    control.addOverlay(group4, 'Coastal Floods');
    control.addTo(myMap);
  

  
  // // Overlays that may be toggled on or off
  // var overlayMaps = {
  //   Floods: markerClusters
  // };


//myMap.addLayer(markerClusters); 

// L.control.layers(baseMaps).addTo(myMap);



// markerClusters.addTo(myMap);
// controlgroups.addTo(myMap);
