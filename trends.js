// Trace flood count data
var flood_count = {
    x: flood.map(row => row.BEGIN_YEAR),
    y: flood.map(row => row.FLOOD_COUNT),
    mode: 'lines+markers',
    type: 'scatter'
  };

  // creating an array of trace
  var data1 = [flood_count];
  
  // Defining Layout
  var layout1 = {
    title: "Flood count from 1999 to 2019",
    xaxis:{title:'Year'},
    yaxis:{title:'Occurence'}
  };
  
  // Trace 2 for the flood damage Data
  var flood_propDamage = {
    x: flood.map(row => row.BEGIN_YEAR),
    y: flood.map(row => row.DAMAGE_PROPERTY/1000),
    name: "Property Damage",
    mode: 'lines+markers',
    type: 'scatter'
  };
  var flood_cropDamage = {
    x: flood.map(row => row.BEGIN_YEAR),
    y: flood.map(row => row.DAMAGE_CROPS/1000),
    name: "Crop Damage",
    mode: 'lines+markers',
    type: 'scatter'
  };
   // creating an array of trace
   var data2 = [flood_propDamage,flood_cropDamage];
  
   // Defining Layout
   var layout2 = {
     title: "Flood Damages from 1999 to 2019",
     xaxis:{title:'Year'},
     yaxis:{title:'Damage in Dollars'},
     height: 600
   };
  
   // Trace 3 for the flood death and injuries Data
  var flood_injuries = {
    x: flood.map(row => row.BEGIN_YEAR),
    y: flood.map(row => row.TOTAL_INJURIES),
    name: "Injuries",
    mode: 'lines+markers',
    type: 'scatter'
  };
  var flood_deathtoll = {
    x: flood.map(row => row.BEGIN_YEAR),
    y: flood.map(row => row.DEATH_TOLL),
    name: "Death Toll",
    mode: 'lines+markers',
    type: 'scatter'
  };
   // creating an array of trace
   var data3 = [flood_injuries,flood_deathtoll];
  
   // Defining Layout
   var layout3 = {
     title: "Flood Damages from 1999 to 2019",
     xaxis:{title:'Year'},
     yaxis:{title:'Count'},
     height: 500
   };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot1", data1, layout1);
  Plotly.newPlot("plot2", data2, layout2);
  Plotly.newPlot("plot3", data3, layout3);
  