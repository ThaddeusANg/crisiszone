if (Meteor.isClient) {
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
      event.preventDefault();

        console.log('called search');
    
    try {
      var response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k');
      console.log("Content"+response);
      CrisisCollection.insert(response);
    } catch(error) {
      console.log(error);
    }

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
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

//end client
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
        console.log('called search');
    
    try {
      var response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k');
      console.log("Content"+response);
      CrisisCollection.insert(response);
    } catch(error) {
      console.log(error);
    }
    /*  _.each(names, function (name) {
        Players.insert({name: name,score: Math.floor(Random.fraction() * 10) * 5});
          });
  */
    });

  Meteor.publish('crisissearch', function() {
    console.log('called search');
    
    try {
      var response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k');
      console.log("Content"+response);
      CrisisCollection.insert(response);
    } catch(error) {
      console.log(error);
    }
});

}