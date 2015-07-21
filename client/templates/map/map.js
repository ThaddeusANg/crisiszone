Meteor.startup(function() {  
  GoogleMaps.load();

});

Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {

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
});

Template.home.events({
	'click #search': function (event) {
		console.log("Inside Map response for search with loaded");
		GoogleMaps.ready('map', function(map) {
			center: map.instance.setCenter(new google.maps.LatLng(Session.get('lat'),Session.get('long')));
	 });	
	}
});

Template.map.helpers({  
  mapOptions: function() {
  	console.log("latitude: "+Session.get('lat'));
  	console.log("longitude: "+Session.get('long'));
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(Session.get('lat'),Session.get('long')),
        zoom: 8
      };
    }
  }
});