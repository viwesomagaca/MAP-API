$(document).ready(function(){

  $(".search").click(function(){
  $.ajax({
    url:"https://developer.nrel.gov/api/windexchange/schoolprojects?api_key=BpwET3I8qcPGHgBcgcECMNuYXfDVEz3zwKN00w1f",
    type:"GET"
  }).then(function(data){
    console.log(data);
  })

});
});
