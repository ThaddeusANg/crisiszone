Meteor.startup(function() {  
  GoogleMaps.load();
});

// Session.set('changeMap', 0);
// var mapDep=new Tracker.Dependency;


Tracker.autorun(function() {  
  GoogleMaps.ready('map',function(map){
    google.maps.event.trigger(map.instance,'resize');  
  });

});

Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
  });
});

Template.search.events({
  'click #search': function (event) {
    GoogleMaps.ready('map', function(map) {
      center: map.instance.setCenter(
        new google.maps.LatLng(
          Session.get('lat'),
          Session.get('long')));
      
      var populationOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map.instance,
        center: new google.maps.LatLng(Session.get('lat'),Session.get('long')),
        radius: 10000
      };

      cityCircle = new google.maps.Circle(populationOptions);
      google.maps.event.trigger(map.instance,'resize');
    }); 
  }
});

Template.map.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});
