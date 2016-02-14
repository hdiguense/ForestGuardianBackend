
function initialize() {

    //Map parametrs
    var mapOptions_place = {
        zoom: 10,
        center: new google.maps.LatLng(41.154, -73.328),
        mapTypeId: google.maps.MapTypeId.ROADMAP,

        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        scaleControl: false,
        scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        scrollwheel: false
    }

    //map
    var map_place = new google.maps.Map(document.getElementById("map_place"), mapOptions_place);

    //category
    var Bank_place = '/assets/icon/Bank.png';
    var Cafe_place = '/assets/icon/Cafe.png';
    var Cinema_place = '/assets/icon/Cinema.png';
    var Club_place = '/assets/icon/Club.png';
    var Park_place = '/assets/icon/Park.png';
    var Port_place = '/assets/icon/Port.png';
    var Post_place = '/assets/icon/Post.png';
    var Shop_place = '/assets/icon/Shop.png';
    var Showplace_place = '/assets/icon/Showplace.png';
    var Sport_place = '/assets/icon/Sport.png';

    //positions
    var point_place = new google.maps.LatLng(41.154, -73.328);

    //markers
    var marker_place = className = 'Cafe';
    var marker_place = new google.maps.Marker({
        position: point_place,
        map: map_place,
        category: Cafe_place,
        icon: Cafe_place,
        title: "point_place"
    });
};

    
    