$(document).ready(function() {

  var search_array = [];

  function myMap() {
    var mapOptions1 = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map1 = new google.maps.Map(document.getElementById("googleMap1"), mapOptions1);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(51.508742, -0.120850),
      draggable: true,
      animation: google.maps.Animation.DROP,
      map: map1
    });
    marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

myMap();

$("#search").click(function() {
  $.ajax({
    url: "https://developer.nrel.gov/api/windexchange/schoolprojects?api_key=BpwET3I8qcPGHgBcgcECMNuYXfDVEz3zwKN00w1f",
    type: "GET"
  }).then(function(data) {
    console.log(data);

    var mapOptions1 = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map1 = new google.maps.Map(document.getElementById("googleMap1"), mapOptions1);

    data.forEach(function(result){
      console.log(result);


      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(result.Latitude, result.Longitude),
        draggable: true,
        animation: google.maps.Animation.DROP,
        map: map1
      });
      marker.addListener('click', toggleBounce);


    })

  })
});
});
