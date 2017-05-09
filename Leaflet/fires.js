/**
 * Created by luisalonsomurilloalonso on 11/12/16.
 */

var map = L.map('map').setView([10.07568504578726, -84.31182861328125], 8);

 L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
 	maxZoom: 18
 }).addTo(map);

 var MODISLayer = L.geoJSON().addTo(map);

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

map.on('moveend', function() {
  downloadMODISData();
});

downloadMODISData();
