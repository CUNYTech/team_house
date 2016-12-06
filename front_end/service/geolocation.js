function geolocation(){
   var x = document.getElementById("demo");
   var y = document.getElementById("ip");
   var ip;
   var geocoder = new google.maps.Geocoder;

   // Find location with geolocation
   navigator.geolocation.getCurrentPosition(function(position) {
     console.log("Latitude : %s", position.coords.latitude);
     console.log("Longitude : %s", position.coords.longitude);
     var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            if(results[0]) {
              let postalCode = results[0].address_components.find(function (component) {
              return component.types[0] == "postal_code";
              });
              console.log(postalCode.long_name);
            } else {
                console.log('No results found');
            }
        } else {
            console.log("Error");
        }
    });
   },
   // If user denies access to geolocation use ip address instead
   function (error) {
     if (error.code == error.PERMISSION_DENIED)
     $.get("http://ipinfo.io", function(response) {
         ip = response.ip;
         $.get("http://ipinfo.io/" + ip, function(responce) {
          //  y.innerHTML = "Ip adress: " + ip +        
        console.log("Latitude : %s", response.loc.split(',')[0]);
        console.log("Longitude : %s", response.loc.split(',')[1]);
        var latlng = new google.maps.LatLng(response.loc.split(',')[0], response.loc.split(',')[1]);

        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if(status == google.maps.GeocoderStatus.OK) {
                if(results[0]) {
                    let postalCode = results[0].address_components.find(function (component) {
                    return component.types[0] == "postal_code";
                });
                console.log(postalCode.long_name);
                } else {
                    console.log('No results found');
                }
            } else {
                console.log("Error");
            }
        });
         }, "jsonp");
     }, "jsonp");
   });
 }
