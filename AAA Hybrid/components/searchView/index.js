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
            var locations = [];
            var checkin_hhmm = searchViewModel.fields.checkin.split(":");
            var checkout_hhmm = searchViewModel.fields.checkout.split(":");
            var checkin_h = parseInt(checkin_hhmm[0]);
            var checkin_m = parseInt(checkin_hhmm[1]);
            var checkout_h = parseInt(checkout_hhmm[0]);
            var checkout_m = parseInt(checkout_hhmm[1]);
            var hours = checkout_h - checkin_h;
            var minutes = checkout_m - checkin_m;
            if (minutes < 0) {
                hours -= 1;
                minutes += 60;
            }
            var duration = Math.ceil(hours + minutes/60);
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
                          "&h=" + checkin_h +
                          "&m=" + checkin_m + 
                          "&dur=" + duration +
                          "&opt_routes=y&opt_routes_ret=n&opt_am=n&opt_rec=y",
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
