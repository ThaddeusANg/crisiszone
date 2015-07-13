if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('loc', 0);

function foundLocation(location) {
  Session.set('loc','lat: '+location.coords.latitude+', lan: '+ location.coords.longitude);
}

function noLocation() {
  alert('no location');
}

  Template.body.helpers({
    tasks: [
    {"metadata":"test"}
    ]
  });

  Template.home.helpers({
  'location': function () {
    navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
    return Session.get('loc');
  }
});

//end client
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}