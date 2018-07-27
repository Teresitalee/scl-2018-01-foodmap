

var map;
      var infowindow;

      function initMap() {
        var pyrmont = {lat: -33.047238, lng: -71.61268849999999 };

        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();

        var service = new google.maps.places.PlacesService(map);
        service.textSearch({
          location: pyrmont,
          radius: 500,
          type: ['store']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

      const firstScreen = () => {
        let loadFScreen = document.getElementById('container');
        loadFScreen.innerHTML =
          `<div id="logo" class="text-center">
            <img src="assets/img/logo.png" class="img-fluid loading" alt="Responsive image">
          </div>`;
      };

// Create the search box and link it to the UI element.
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});

var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

    // Por cada lugar , tienes un icono y estrella
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

    // Crea un marker para cada lugar
    markers.push(new google.maps.Marker({
    map: map,
    icon: icon,
    title: place.name,
   position: place.geometry.location
   }));

if (place.geometry.viewport) {
  // Only geocodes have viewport.
  bounds.union(place.geometry.viewport);
} else {
  bounds.extend(place.geometry.location);
}
});
map.fitBounds(bounds);
});



    