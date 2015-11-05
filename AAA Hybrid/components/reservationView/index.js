'use strict';

app.reservationView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_reservationView
// END_CUSTOM_CODE_reservationView
(function(parent) {
    var reservationViewModel = kendo.observable({
        fields: {
            cvv: '',
            year: '',
            month: '',
            cardnumber: '',
            card: '',
            email: '',
            phone: '',
            fullname: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('reservationViewModel', reservationViewModel);
})(app.reservationView);

// START_CUSTOM_CODE_reservationViewModel
// END_CUSTOM_CODE_reservationViewModel