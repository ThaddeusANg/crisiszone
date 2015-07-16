Session.set('loadData',false);

Tracker.autorun(function() {  
console.log(Session.get('loadData'));
  if (Session.get('loadData') ==false) {
  console.log('inside');    
    var crisissearch = Meteor.subscribe("crisissearch");
    Session.set('searching', ! crisissearch.ready());
    Session.set('loadData',true);
  }
});

  // counter starts at 0
  Session.setDefault('loc', 0);
  Session.set

function foundLocation(location) {
  Session.set('lat',location.coords.latitude);
  Session.set('long',location.coords.longitude);
}

function noLocation() {
  alert('no location');
}

  Template.body.helpers({
    'click button': function() {

    }
  });

  Template.home.helpers({
  'location': function () {
    navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
  },
  'crisis': function () {
      return CrisisCollection.find();
    },
    'lat':function(){
      return Session.get('lat');
    },
    'long':function(){
      return Session.get('long');
    }

});

  Template.home.events({
    'click #search': function () {
      // increment the counter when button is clicked
      console.log('clicked on search button');
      Meteor.call('getLocalCrisis',Session.get('lat'), Session.get('long'));
    }
  });

//end client
