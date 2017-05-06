/**
 * Created by luisalonsomurilloalonso on 11/12/16.
 */

var map = L.map('map').setView([10.07568504578726, -84.31182861328125], 8);

 L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
 	maxZoom: 18
 }).addTo(map);

var wmsLayer = L.tileLayer.wms('https://firms.modaps.eosdis.nasa.gov/wms/c6?', {
  layers:'fires24',
  transparent: true,
  format: 'image/png'
}).addTo(map);
