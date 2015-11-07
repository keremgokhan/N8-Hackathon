'use strict';

app.parkingOptionsView = kendo.observable({
    onShow: function() {
        
        loadlist(app.parkingData.result.reccommendations);
        
    },
    afterShow: function() {}
});

var loadlist = function(results) {
            var customtemplate = '<a href="components/optionView/view.html">' +
                        '<div class="optionIcn optionCar"></div>'+
                        '<div class="optionContent">'+
                            '<p><strong>#:data.name#</strong></p>' +
                            '<p>#:data.address# (#:data.dist_in_meters# m)</p>' +
                            '<p>' +
                                '<div class="cost"></div>' +
                                '<span class="sorted">#:data.cost#</span>' +
                                '<div class="time"></div>' +
                                '<span>5 min</span>' +
                            '</p></div></a>';
            
            $("#searchResults").kendoMobileListView({
            template : customtemplate,
            dataSource: kendo.data.DataSource.create(results),
            style: 'inset'
        });
    
};
