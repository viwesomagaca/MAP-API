$(document).ready(function() { //Populate the document and tell it to be ready
  var cityData; //define the variable
  var availableSchools = document.getElementById('projects').innerHTML; //compile handlebars templates
  var template = Handlebars.compile(availableSchools);
  var foundProject = document.getElementById('output').innerHTML;
  var template2 = Handlebars.compile(foundProject);

  $.ajax({ //ajax call that retrieves data from the API
    url: "https://developer.nrel.gov/api/windexchange/schoolprojects?api_key=BpwET3I8qcPGHgBcgcECMNuYXfDVEz3zwKN00w1f",
    type: "GET"
  }).then(function(data) {
    document.querySelector(".list-schools").innerHTML = template({ //Populating handlebars template
      school: data
    });
    cityData = data;

    var map1 = myMap(cityData[0].Latitude, cityData[0].Longitude, 3) //Renders the map when the page loads

    data.forEach(function(result) { //loop through data from API and call marker function,
      myMarker(result.Latitude, result.Longitude, map1); //pass the results and values from the marker function parameters in order to render them for the first time
    });

    cityData.forEach(function(myCity) {
      $('#schoolitem' + myCity.ID).click(function(schoolName) {
        var map1 = myMap(myCity.Latitude, myCity.Longitude, 15);
        myMarker(myCity.Latitude, myCity.Longitude, map1);
      })
    })
  });

  function myMap(Latitude, Longitude, zoom) { //Renders the map on the browser
    var mapOptions1 = {
      center: new google.maps.LatLng(Latitude, Longitude),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map1 = new google.maps.Map(document.getElementById("googleMap1"), mapOptions1);
    return map1;
  }

  function myMarker(Latitude, Longitude, map1) { //function that renders markers on the map
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(Latitude, Longitude),
      draggable: false,
      animation: google.maps.Animation.DROP,
      map: map1
    });
    marker.addListener('click', toggleBounce);
  }


  function toggleBounce() { //Function that controls the markers to bounce and toggle as well as animation
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  $("#search").click(function() { //Event listener that listens to the search button
    var searchCity = document.getElementById("findCity").value;
    var getMsg = document.getElementById('message');
    if (searchCity === "") {
      return map1;
    } else if (searchCity === undefined) {
      return map1;
    }

    console.log("######", searchCity);
    var myCity = cityData.filter(function(item) { //Filters the according to cities available on the data
      return item.City.toLowerCase().trim() === searchCity.toLowerCase().trim(); //returns the cities found and trim to remove white spaces
    })
    document.querySelector(".findMe").innerHTML = template2({ //Targets the template and populate it to display the address of the city searched
      myCity: myCity
    });

    var map1 = myMap(myCity[0].Latitude, myCity[0].Longitude, 10); //Define variable to carry map function the starts of longitude and latitude as well as pass zoom number.

    myCity.forEach(function(city) { //Looping through data from filtering and renders markers in all the education projects/institutions found
      myMarker(city.Latitude, city.Longitude, map1);
    })
  });
  document.getElementById('findCity').innerHTML = ""; //clears the textbox
});
