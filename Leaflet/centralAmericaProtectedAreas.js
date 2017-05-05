/**
 * Created by luisalonsomurilloalonso on 05/05/16.
 */

var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
    attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
var map = new L.Map('map').addLayer(osm).setView(L.latLng(10.07568504578726, -84.31182861328125), 8);

/* Protected areas for Costa Rica */
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi08_areas_prote_costa_rica_2014',
  styles: 'bi07_areas_prote_belice_2014',
  transparent: true,
  format: 'image/png'
}).addTo(map);

/* Protected areas for Honduras*/
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi11_areas_prote_honduras_2014',
  styles: 'bi07_areas_prote_belice_2014',
  transparent: true,
  format: 'image/png'
}).addTo(map);

/* Protected areas for El Salvador*/
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi09_areas_prote_salvador_2014',
  styles: 'bi07_areas_prote_belice_2014',
  transparent: true,
  format: 'image/png'
}).addTo(map);

/* Protected areas for Belice*/
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi07_areas_prote_belice_2014',
  styles: 'bi07_areas_prote_belice_2014',
  transparent: true,
  format: 'image/png'
}).addTo(map);

/* Protected areas for Panama*/
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi13_areas_prote_panama_2014',
  styles: 'bi07_areas_prote_belice_2014',
  transparent: true,
  format: 'image/png'
}).addTo(map);

/* Protected areas for Guatemala*/
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi10_areas_prote_guatemala_2014',
  styles: 'bi07_areas_prote_belice_2014',
  transparent: true,
  format: 'image/png'
}).addTo(map);

/* Protected areas for Caribbean*/
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi01_areas_protegidas_caribe_2008',
  styles: 'bi01_areas_protegidas_caribe_2008',
  transparent: true,
  format: 'image/png'
}).addTo(map);

/* Protected areas for Nicaragua*/
var wmsLayer = L.tileLayer.wms('http://138.68.63.173/geoserver/ows?', {
  layers:'bi12_areas_prote_nicaragua_2014',
  styles: 'bi07_areas_prote_belice_2014',
  transparent: true,
  format: 'image/png'
}).addTo(map);
