'use strict';

app.searchView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_searchView
// END_CUSTOM_CODE_searchView
(function(parent) {
    var searchViewModel = kendo.observable({
        fields: {
            checkout: '',
            checkin: '',
            time: '',
            destination: '',
            departure: '',
        },
        submit: function() {
            // TODO: Verify form data
            //$.getJSON("http://divvapi.parkshark.nl/apitest.jsp?action=plan&to_lat=52.368104267594056&to_lon=4.856208655327167&dd=28&mm=12&yy=2013&h=12&m=50&dur=2&opt_routes=y&opt_routes_ret=n&opt_am=n&opt_rec=y",
            //          null,
            //          function (Console.log(data)));
            var locations = [];
            geolocate([searchViewModel.fields.departure, searchViewModel.fields.destination], 0, locations, function () {
                app.departure = { lat: locations[0].lat(), lng: locations[0].lng() };
                app.destination = { lat: locations[1].lat(), lng: locations[1].lng() };
                app.day = 7;
                app.month = 11;
                app.year = 2015;
                $.getJSON("http://divvapi.parkshark.nl/apitest.jsp?action=plan" +
                          "&to_lat=" + app.destination.lat +
                          "&to_lon=" + app.destination.lng + 
                          "&dd=" + app.day +
                          "&mm=" + app.month + 
                          "&yy=" + app.year +
                          "&h=18&m=50&dur=2&opt_routes=y&opt_routes_ret=n&opt_am=n&opt_rec=y",
                          null,
                          function (data, textStatus, req) {
                    	app.parkingData = data;
		                app.mobileApp.navigate('components/parkingOptionsView/view.html');
            	});
            });
        }
    });

    parent.set('searchViewModel', searchViewModel);
})(app.searchView);

var geocoder = new google.maps.Geocoder();

function geolocate(addresses, i, locations, doNext) {
    if (addresses.length == i) {
        doNext(locations);
        return;
    }
	geocoder.geocode({'address': addresses[i]}, function(results, status) {
    	if (status == google.maps.GeocoderStatus.OK) {
            locations[i] = results[0].geometry.location;
        } else {
            console.log("Something went wrong");
            return;
        }
        geolocate(addresses, i+1, locations, doNext);
    });
}

// START_CUSTOM_CODE_searchViewModel
// END_CUSTOM_CODE_searchViewModel
