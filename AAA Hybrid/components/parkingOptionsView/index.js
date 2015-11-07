'use strict';

app.parkingOptionsView = kendo.observable({
    onShow: function() {
        
        loadlist(filter(app.parkingData.result.reccommendations));
        
    },
    afterShow: function() {}
});

var filter = function(arr) {
    var result = [];
    
    var last_pt_duration = 5;
    for (var i = 0; i < arr.length; i++) {
        var x = arr[i];
        
        if (x.cost === 0 || x.dist_in_meters > 10000) {
            continue;
        }
        
        var row = {};
        row.index = i;
        row.name = x.name;
        row.address = x.address;
        row.cost = x.cost;
        row.distance = "";
        if (x.dist_in_meters < 1000) {
            row.distance = x.dist_in_meters.toString() + " m";
        } else {
            var km = x.dist_in_meters/1000;
            row.distance = km.toFixed(2).toString() + " km";
        }
        
        if (x.reccommended_pt_route && x.reccommended_pt_route.duration) {
            row.pt_duration = Math.round(x.reccommended_pt_route.duration / 60);
			last_pt_duration = row.pt_duration;
        } else {
            row.pt_duration = last_pt_duration + "+";
        }
        
        
        result.push(row);
    }
    
    return result; 
};

var loadlist = function(results) {
    		console.log(results);
            var customtemplate = '<a href="components/optionView/view.html?id=#:data.index#">' +
                        '<div class="optionIcn optionCar"></div>'+
                        '<div class="optionContent">'+
                            '<p><strong>#:data.name#</strong></p>' +
                            '<p>#:data.address# (#:data.distance#)</p>' +
                            '<p>' +
                                '<div class="cost"></div>' +
                                '<span class="sorted">#:data.cost#</span>' +
                                '<div class="time"></div>' +
                                '<span>#:data.pt_duration# min</span>' +
                            '</p></div></a>';
            
            $("#searchResults").kendoMobileListView({
            template : customtemplate,
            dataSource: kendo.data.DataSource.create(results),
            style: 'inset'
        });
    
};
