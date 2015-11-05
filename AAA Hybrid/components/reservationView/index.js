'use strict';

app.reservationView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_reservationView
// END_CUSTOM_CODE_reservationView
(function(parent) {
    var reservationViewModel = kendo.observable({
            cvv: '',
            year: '',
            month: '',
            cardnumber: '',
            card: '',
            email: '',
            phone: '',
            fullname: '',
        autofill: function() {
            this.set("cvv", '522');
            this.set("year", '18');
            this.set("month", '01');
            this.set("cardnumber", '1234 5678 9012 3456');
            this.set("email", 'barrychenqibai@gmail.com');
            this.set("phone", '+31614916528');
            this.set("fullname", 'Barry Chen');
        },
        submit: function() {
              setTimeout(function() {
                alert('Confirmed!');
                window.history.back();
              }, 300);
            
        },
        cancel: function() {}
    });

    parent.set('reservationViewModel', reservationViewModel);
})(app.reservationView);

// START_CUSTOM_CODE_reservationViewModel
// END_CUSTOM_CODE_reservationViewModel