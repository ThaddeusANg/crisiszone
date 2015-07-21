  // initialize session variables
Session.set('loadData',false);
Session.setDefault('loc', 0);
Session.set('loginResponse', false);
Session.set('currentEmail',"dummy");

function login(email, password){
      console.log("email"+email+" password: "+password);
        Meteor.loginWithPassword(email, password, function(err){
        if (err){
          console.log('---login failed---');
        }else{
          Session.set('loginResponse', true);
          Session.set('currentEmail',email);
          console.log('---login succeeded---');
        }
      });
}



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
    'click #search': function (event,template) {
      // increment the counter when button is clicked
      event.preventDefault();
      login(template.find('#email').value, template.find('#password').value);

        if (Session.get('loadData') ==false){
          console.log('inside');   
        }
      console.log('clicked on search button');
      Meteor.call('getLocalCrisis',Session.get('lat'), Session.get('long'));
      Router.go('home');
    },
    'click #register': function (event) {
      // increment the counter when button is clicked
      event.preventDefault();
      Router.go('registration');
    }
  });

//end client
