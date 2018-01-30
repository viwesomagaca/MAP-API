$(document).ready(function() {
  var cityData;
  var availableSchools = document.getElementById('projects').innerHTML;
  var template = Handlebars.compile(availableSchools);
  var foundProject = document.getElementById('output').innerHTML;
  var template2 = Handlebars.compile(foundProject);


  $.ajax({
    url: "https://developer.nrel.gov/api/windexchange/schoolprojects?api_key=BpwET3I8qcPGHgBcgcECMNuYXfDVEz3zwKN00w1f",
    type: "GET"
  }).then(function(data) {
    document.querySelector(".list-schools").innerHTML = template({
      school: data
    });
    cityData = data;
    var map1 = myMap(51.508742, -0.120850,3)

    data.forEach(function(result) {
      myMarker(result.Latitude, result.Longitude, map1);
    });
  });

  function myMap(Latitude, Longitude, zoom) {

    var mapOptions1 = {
      center: new google.maps.LatLng(Latitude, Longitude),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map1 = new google.maps.Map(document.getElementById("googleMap1"), mapOptions1);
    return map1;
  }

  function myMarker(Latitude, Longitude, map1) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(Latitude, Longitude),
      draggable: false,
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

  $("#search").click(function() {
    var searchCity = document.getElementById("findCity").value;

    if (searchCity === "") {
      document.getElementById('message').innerHTML = "Please enter your text below";
    } else if (myCity === undefined) {
      document.getElementById('message').innerHTML = "City is not found";

    }else{
      document.getElementById('message').innerHTML = "";
    }
    var myCity = cityData.filter(function(item) {
      return item.City.toLowerCase().trim() === searchCity.toLowerCase().trim();
    })
    document.querySelector(".findMe").innerHTML = template2({
      myCity: myCity
    });

    var map1 = myMap(0, 0, 2);

    myCity.forEach(function(city) {
      myMarker(city.Latitude, city.Longitude, map1);
    })
  });

});
