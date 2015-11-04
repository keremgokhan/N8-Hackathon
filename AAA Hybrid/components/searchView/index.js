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
            app.mobileApp.navigate('components/parkingOptionsView/view.html');
        }
    });

    parent.set('searchViewModel', searchViewModel);
})(app.searchView);

// START_CUSTOM_CODE_searchViewModel
// END_CUSTOM_CODE_searchViewModel