/**
 * Created by Luis Alonso Murillo Rojas on 11/12/16.
 */

/* Global definitions */
var map;
var route;
var fireStationMarker;
var currentFireCoordinates;
var gpsMarker;
var reportMarker;

var fireIcon;
var fireStationIcon;
var markerIcon;
var markerArea;
var reportMarkerLocation = { 'latitude':0.0, 'longitude':0.0 }

/* Interface function with the client app */

//@function displayWildfiresDetails
//Funtion that parse the MODIS data an send it to the corresponding mobile clients
//@param {double} lat (latitude) of the fire point
//@param {double} lng (longitude) of the fire point
//@param {double} birghtness value of the fire point
//@param {double} scan value
//@param {double} track value
//@param {String} adquisitionTime from the satellite
//@param {String} satellite identification
//@param {integer} confidence value
//@param {String} version of the data
//@param {double} bright_t31 value
//@param {double} frp value
//@param {String} daynight value
function displayWildfiresDetails(lat, lng, brightness, scan, track, adquisitionTime, satellite, confidence, version, bright_t31, frp, daynight) {
    var jsonMODIS = {"LATITUDE":lat,
        "LONGITUDE":lng,
        "BRIGHTNESS":brightness,
        "SCAN":scan,
        "TRACK":track,
        "ADQUISITION_TIME":adquisitionTime,
        "SATELLITE":satellite,
        "CONFIDENCE":confidence,
        "VERSION":version,
        "BRIGHT_T31":bright_t31,
        "FRP":frp,
        "DAYNIGHT":daynight};
    try {
        mobile.getMODISData(JSON.stringify(jsonMODIS));
    } catch(err) {
        console.log("Error trying to invoke mobile method");
    }
}

//@function setUserCurrentLocation
//Funtor that centers the map to the current a given point provided by the clients
//@param {double} latitued
//@param {double} longitude
function setUserCurrentLocation(latitude, longitude) {

    // Center map on Location
    map.setView(L.latLng(latitude, longitude), 8);

    // Initialize marker if null
    if ( gpsMarker == null ){
        gpsMarker = L.marker([latitude, longitude], {icon: markerIcon});
        gpsMarker.addTo(map);
    }

    try {
        mobile.notifyCurrentLocation();
    } catch (err) {
        console.log("Error trying to invoke mobile method");
    }
}

//@function mobileShowDetails
//Function that notify the client when is the time to show the detail information of a given fire point
function mobileShowDetails() {
    try {
        mobile.showWildfireDetails();
    } catch(err) {
        console.log("Error trying to invoke mobile method");
    }
}

//@function setRouteFromTwoPoints
//Function that sets the route from a point A to a point B
//@param {double} latitudeA of the point A
//@param {double} longitudeA of the point A
//@param {double} latitudeB of the point B
//@param {double} longitudeB of the point B
function setRouteFromTwoPoints(latitudeA, longitudeA, latitudeB, longitudeB) {
    route.setWaypoints([
        L.latLng(latitudeA, longitudeA),
        L.latLng(latitudeB, longitudeB)
    ]);
}

//@function removeRoute
//Function that removes the route from the map
function removeRoute() {
    route.setWaypoints([]);
}

function addReportLocation( latitude, longitude ){

    // Center map on Location
    map.setView(L.latLng(latitude, longitude), 8);

    // Initialize marker if null
    if ( reportMarker == null ){
        reportMarker = L.marker([latitude, longitude], {icon: markerArea, draggable:'true'});
        reportMarkerLocation.latitude = latitude;
        reportMarkerLocation.longitude = longitude;
        reportMarker.addTo(map);
        console.log("latitude: " + reportMarkerLocation.latitude);
        console.log("longitude: " + reportMarkerLocation.longitude);
        reportMarker.on("dragend",function(ev){
            var position = ev.target.getLatLng();
            reportMarkerLocation.latitude = position.lat;
            reportMarkerLocation.longitude = position.lng;
            console.log("latitude: " + reportMarkerLocation.latitude);
            console.log("longitude: " + reportMarkerLocation.longitude);
        });
    }
}

function prepareReportLocation(){
    console.log("prepareReportLocation");
    console.log(reportMarkerLocation.latitude);
    console.log(reportMarkerLocation.longitude);
    mobile.reportLocation(reportMarkerLocation.latitude, reportMarkerLocation.longitude);
}

function addFireStationMark(latitude, longitude) {
    fireStationMarker = L.marker([latitude, longitude], {icon: fireStationIcon});
    fireStationMarker.addTo(map);
}

function removeFireStationMark() {
    if (fireStationMarker == null){
        return;
    }

    fireStationMarker.removeFrom(map);
}

/* Pop up functions */

//@function addWildfireMessage
//Function that creates a popup message with some info related to the pressed fire point
//@param {double} latitude
//@param {double} longitude
//@param {double} brightness value of the wildfire
//@param {double} temperature value of the place where the fire is located
//@param {double} humidity value of the place where the fire is located
function addWildfireMessage(latitude, longitude, brightness, temperature, humidity) {
    var popup = L.popup({offset: L.point(0, -37)})
        .setLatLng(L.latLng(latitude, longitude))
        .setContent('<b>Incendio</b>' +
            '<br>Intensidad: ' + brightness +
            '<br>Temperatura: ' + temperature + " &#8451;" +
            '<br>Humedad: ' + humidity + "%" +
            '<br><a href="javascript:mobileShowDetails();">Detalles</a>')
        .openOn(map);
}

function removeWildfireMessage() {
    map.closePopup();
}

//Callback that will the called each time a fire marker is creator on the map.
//@param {Object} feature
//@param {Layer} layer where the marker are been displayed
function onEachFeature(feature, layer) {
    layer.setIcon(fireIcon);
    /* onClick event */
    layer.on('click', function (e) {
        displayWildfiresDetails(e.latlng.lat,
            e.latlng.lng,
            e.target.feature.properties.brightness,
            e.target.feature.properties.scan,
            e.target.feature.properties.track,
            e.target.feature.properties.acquisition_time,
            e.target.feature.properties.satellite,
            e.target.feature.properties.confidence,
            e.target.feature.properties.version,
            e.target.feature.properties.bright_t31,
            e.target.feature.properties.frp,
            e.target.feature.properties.daynight);
    });
}
//@function downloadMODISData
//Function that downloads the MODIS data from the backend
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
            try {
                var geoJSONData = JSON.parse(this.responseText);
                MODISLayer.clearLayers();
                MODISLayer.addData(geoJSONData);
            } catch (err) {
                console.log("Error downloading the MODIS data");
            }
        }
    });

    xhr.open("POST", "http://app.forestguardian.org/modis_data/fires.json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "300ba138-f388-a8c1-20c9-57f27367e9ba");

    xhr.send(data);
}

/* Map events functions */

//@function checkZoomLevel
//Function that check the the zoom level of the map in order to decide if display or not the datailed MODIS data
function checkZoomLevel() {
    var zoomLevel = map.getZoom();
    console.log("Zoom level: " + zoomLevel);
    if (zoomLevel > 11) {
        console.log("Download the MODIS data");
        downloadMODISData();
    } else {
        console.log("MODISLayer clear layer");
        MODISLayer.clearLayers();
    }
}


$(function() {
    var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
        attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
    var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
    map = new L.Map('map').addLayer(osm).setView(L.latLng(10.07568504578726, -84.31182861328125), 8);

    /* MODIS data layers */

    //Data from the backend
    var MODISLayer = L.geoJSON(null, {
        onEachFeature:onEachFeature
    }).addTo(map);

    //NASA's WMS service
    var wmsLayer = L.tileLayer.wms('https://firms.modaps.eosdis.nasa.gov/wms/c6?', {
        layers:'fires24',
        transparent: true,
        format: 'image/png'
    }).addTo(map);


    /* Routing */
    route = L.Routing.control({
        waypoints: [],
        routeWhileDragging: false,
        createMarker: function() { return null; },
        router: L.Routing.graphHopper('c06e05f1-cd2f-4c9d-921c-06d634c9c8e9')
    });
    route.addTo(map);

    /* Fire station mark */
    fireStationIcon = L.icon({
        iconUrl: '/assets/firemen.png',
        iconSize:     [32, 37],
        iconAnchor:   [16, 36],
        popupAnchor:  [0, -37]
    });

    markerIcon = L.icon({
        iconUrl: '/assets/marker-gps.png',
        iconSize:     [16, 16],
        iconAnchor:   [8, 8],
        popupAnchor:  [0, -37]
    });

    markerArea = L.icon({
        iconUrl: '/assets/marker-area.png',
        iconSize:     [180, 180],
        iconAnchor:   [90, 90],
        popupAnchor:  [0, 0]
    });


    /* Wildfire icon */

    fireIcon = L.icon({
        iconUrl: '/assets/fire.png',
        iconSize:     [32, 37],
        iconAnchor:   [16, 36],
        popupAnchor:  [0, -37]
    });

    /* MODIS geoJSON */

    var geojsonLayer = new L.GeoJSON.AJAX("/modis_data/fires.json", {
        onEachFeature: onEachFeature
    });

    geojsonLayer.addTo(map);

    //Capturing the moveend event from the map
    map.on('moveend', function() {
        checkZoomLevel();
    });
    //Initial check action

});
