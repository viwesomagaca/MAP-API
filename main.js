$(document).ready(function() {
var availableSchools = document.getElementById('projects').innerHTML;
var template = Handlebars.compile(availableSchools);


  var search_array = [];
  var cityData;
  $.ajax({
    url: "https://developer.nrel.gov/api/windexchange/schoolprojects?api_key=BpwET3I8qcPGHgBcgcECMNuYXfDVEz3zwKN00w1f",
    type: "GET"
  }).then(function(data) {
 document.querySelector(".list-schools").innerHTML = template({
   school: data
 });
    cityData = data;
    console.log(cityData);
    var map1 = myMap(51.508742, -0.120850,1)

    data.forEach(function(result) {
      myMarker(result.Latitude, result.Longitude, map1);
    });
     });



  function myMap(Latitude, Longitude,zoom) {

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

  $("#search").click(function() {

    var searchCity = $("#findCity").val();


    var myCity = cityData.filter(function(item) {
      return item.City.toLowerCase().trim() === searchCity.toLowerCase().trim();
    })

    for(var i = 0; i< myCity.length; i++){
      var foundCity = myCity[i];
      if(foundCity){
        var map1 = myMap(foundCity.Latitude, foundCity.Longitude,18);
        myMarker(foundCity.Latitude, foundCity.Longitude,map1);
      } else if(!foundCity){
        alert("City not found!");
      }
            console.log(foundCity);
    }




  });
});
