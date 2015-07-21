  // initialize session variables
Session.set('loadData',false);
Session.setDefault('loc', 0);

// Tracker.autorun(function() {  
// console.log('Session.loadData'+Session.get('loadData'));

//   if (Session.get('loadData') ==false){
//     console.log('inside');   
//   }
// });



function foundLocation(location) {
  Session.set('lat',location.coords.latitude);
  Session.set('long',location.coords.longitude);
}

function noLocation() {
  alert('no location');
}

  Template.body.helpers({
    'click button': function() {
      //unused
    }
  });

  Template.search.helpers({
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

  Template.search.events({
    'click #search': function (event) {
      // increment the counter when button is clicked
      event.preventDefault();
        if (Session.get('loadData') ==false){
          console.log('inside');   
        }
      console.log('clicked on search button');
      Meteor.call('getLocalCrisis',Session.get('lat'), Session.get('long'));
      Router.go('home');
    }
  });

//end client
