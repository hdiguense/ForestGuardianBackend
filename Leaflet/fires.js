/**
 * Created by luisalonsomurilloalonso on 11/12/16.
 */

// Define a Proj4Leaflet crs instance configured for British National Grid
// (EPSG:27700) and the resolutions of our base map
var crs = new L.Proj.CRS(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
    {
        resolutions: [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625]
    }
);

 var attr_osm = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>',
   attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
 var osm = new L.TileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
 var map = new L.Map('map', {
   //crs: crs,
   continuousWorld: true,
   worldCopyJump: false
 }).addLayer(osm).setView(L.latLng(10.07568504578726, -84.31182861328125), 8);

var wmsLayer = L.tileLayer.wms('https://firms.modaps.eosdis.nasa.gov/wms/c6?', {
  layers:'fires24',
  transparent: true,
  format: 'image/png'
}).addTo(map);

// -- Display information on click --

// Add an event handler for the map "click" event
map.on('click', function(e) {

    // Build the URL for a GetFeatureInfo
    var url = getFeatureInfoUrl(
                    map,
                    wmsLayer,
                    e.latlng,
                    {
                        'info_format': 'application/json',
                        'propertyName': 'LATITUDE,LONGITUDE,BRIGHTNESS,SCAN,TRACK,ACQ_DATE,ACQ_TIME,SATELLITE,CONFIDENCE,VERSION,BRIGHT_T31,FRP,DAYNIGHT'
                    }
                );

    // Send the request and create a popup showing the response
    reqwest({
        url: url,
        type: 'json',
    }).then(function (data) {
        var feature = data.features[0];
        L.popup()
        .setLatLng(e.latlng)
        .setContent(L.Util.template("<h2>Fire</h2><p>Brightness: {BRIGHTNESS}</p><p>Date: {ACQ_DATE}</p>", feature.properties))
        .openOn(map);
    });

});

/**
 * Return the WMS GetFeatureInfo URL for the passed map, layer and coordinate.
 * Specific parameters can be passed as params which will override the
 * calculated parameters of the same name.
 */
function getFeatureInfoUrl(map, layer, latlng, params) {

    var point = map.latLngToContainerPoint(latlng, map.getZoom()),
        size = map.getSize(),
        bounds = map.getBounds(),
        sw = bounds.getSouthWest(),
        ne = bounds.getNorthEast();
        sw = crs.projection._proj.forward([sw.lng, sw.lat]),
        ne = crs.projection._proj.forward([ne.lng, ne.lat]);

    var defaultParams = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: layer._crs.code,
        styles: '',
        version: layer._wmsVersion,
        format: layer.options.format,
        bbox: [sw.join(','), ne.join(',')].join(','),
        height: size.y,
        width: size.x,
        layers: layer.options.layers,
        query_layers: layer.options.layers,
        info_format: 'text/html'
    };

    params = L.Util.extend(defaultParams, params || {});

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    return layer._url + L.Util.getParamString(params, layer._url, true);

}
