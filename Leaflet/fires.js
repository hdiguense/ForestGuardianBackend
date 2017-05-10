/**
 * Created by luisalonsomurilloalonso on 11/12/16.
 */

var map = L.map('map').setView([10.07568504578726, -84.31182861328125], 8);

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
 	maxZoom: 18
}).addTo(map);

/* Wildfire icon */

var fireIcon = L.icon({
   iconUrl: 'fire.png',
   iconSize:     [32, 37],
   iconAnchor:   [16, 36],
   popupAnchor:  [0, -37]
 });

function onEachFeature(feature, layer) {
  layer.setIcon(fireIcon);
  /* onClick event */
  layer.on('click', function (e) {
    console.log("Fire click!");
  });
}

var MODISLayer = L.geoJSON(null, {
  onEachFeature:onEachFeature
}).addTo(map);

function downloadMODISData() {
  var bounds = map.getBounds();

  var data = new FormData();
  data.append("north", bounds.getNorth());
  data.append("south", bounds.getSouth());
  data.append("east", bounds.getEast());
  data.append("west", bounds.getWest());

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      var geoJSONData = JSON.parse(this.responseText);
      MODISLayer.clearLayers();
      MODISLayer.addData(geoJSONData);
    }
  });

  xhr.open("POST", "http://app.forestguardian.org/modis_data/fires.json");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "300ba138-f388-a8c1-20c9-57f27367e9ba");

  xhr.send(data);
}

function checkZoomLevel() {
  var zoomLevel = map.getZoom();
  console.log("Zoom level: " + zoomLevel);
  if (zoomLevel > 10) {
    console.log("Download the MODIS data");
    downloadMODISData();
  } else {
    console.log("MODISLayer clear layer");
    MODISLayer.clearLayers();
  }
}

map.on('moveend', function() {
  checkZoomLevel();
});

checkZoomLevel();

var wmsLayer = L.tileLayer.wms('https://firms.modaps.eosdis.nasa.gov/wms/c6?', {
  layers:'fires24',
  transparent: true,
  format: 'image/png'
}).addTo(map);
