/**
 * Created by luisalonsomurilloalonso on 05/05/16.
 */

var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
    attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
var map = new L.Map('map').addLayer(osm).setView(L.latLng(10.07568504578726, -84.31182861328125), 8);

/* Forest types for Costa Rica */
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi18_tipos_bosque_costa_rica_2015',
  styles: 'bi18_tipos_bosque_costa_rica_2015',
  transparent: true,
  format: 'image/png'
}).addTo(map);
