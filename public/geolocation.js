<!-- Geolcation -->
function geolocation(){
  //  var x = document.getElementById("demo");
  //  var y = document.getElementById("ip");
   var ip;

   // Find location with geolocation
   navigator.geolocation.getCurrentPosition(function(position) {
    //  x.innerHTML = "Geolocation: " +
    //  "<br>Latitude: " + position.coords.latitude +
    //  "<br>Longitude: " + position.coords.longitude;
   },
   // If user denies access to geolocation use ip address instead
   function (error) {
     if (error.code == error.PERMISSION_DENIED)
     $.get("http://ipinfo.io", function(response) {
         ip = response.ip;
         $.get("http://ipinfo.io/" + ip, function(responce) {
          //  y.innerHTML = "Ip adress: " + ip +
          //  "<br>Latitude: " + response.loc.split(',')[0] +
          //  "<br>Longitude: " + response.loc.split(',')[1];
         }, "jsonp");
     }, "jsonp");
   });
 }
