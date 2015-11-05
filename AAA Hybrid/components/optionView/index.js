'use strict';

app.optionView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_optionView

function removeAllActives() {
    
}

$("body").on("click", ".touch", function(e) {
    $(".active").removeClass("active"); 
    $(this).parent().addClass("active");
});
// END_CUSTOM_CODE_optionView