Meteor.startup(function() {  
  GoogleMaps.load();

});

Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
  	Session.set('map', map);
     console.log("I'm ready!");
     Session.get('map').setCenter(new google.maps.LatLng(37.8136, -144.9631));
     google.maps.event.trigger(Session.get('map'),'resize');
  });
});

Template.home.events({
	'click #search': function (event) {
		console.log("Inside Map response for search with loaded");
		GoogleMaps.ready('map', function(map) {
			center: map.instance.setCenter(new google.maps.LatLng(Session.get('lat'),Session.get('long')));
			google.maps.event.addListenerOnce(map.instance, 'idle', function(){
			// do something when all other changes to the map have completed
			console.log("Redraw map");
			google.maps.event.trigger(map.instance, 'resize');
		});
			
			// return{
			// 	center: map.instance.setCenter(new google.maps.LatLng(Session.get('lat'),Session.get('long'))),
			// 	zoom:8
			// };
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
  },
  newLocation: function(){
	
  }
});