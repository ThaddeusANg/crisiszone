  // initialize session variables
Session.keys={};
Session.set('loadData',false);
Session.setDefault('loc', 0);
Session.set('loginResponse', false);
Meteor.subscribe("userData");

function callSigimera(lat, lon){
        Meteor.call('getLocalCrisis',lat, lon,function(err, result){
        if (err){
          console.log('---call failed---');
        }else{
          Session.set('localcrisis', result);
          if(result.statusCode==200){
            console.log('---call returned valid crisis---');
            Session.set('reportShort',result.data[0].dc_title);
            Session.set('emailBody',"User's last known position is lat: "+
              Session.get('lat')+", long: "+
              Session.get('long')+". Please see report from GDACS.  "+
              result.data[0].dc_title);
            Session.set('emailSubject',"Emergency Message from CrisisZone");
          }else{
            console.log('---call returned no valid crisis---');
            Session.set('reportShort', "No Detected Crises Nearby.");
            Session.set('emailBody',
              "User's last known position is lat: "+
              Session.get('lat')+", long: "+
              Session.get('long')+".  No Detected Crises Nearby.");
            Session.set('emailSubject',"Message from CrisisZone");
          }
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

  Template.search.helpers({
  'location': function () {
    navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
  },
  'lat':function(){
      return Session.get('lat');
    },
  'long':function(){
      return Session.get('long');
    },
    'username': function () {
      return Meteor.user().username;
    },
    'email':function(){
      return Meteor.user().emails[0].address;
    },
    'cont':function(){
      return  Meteor.user().profile.cont;
    },
    'cont_email':function(){
      return  Meteor.user().profile.cont_email;
    },
    'cont_phone':function(){
      return  Meteor.user().profile.cont_phone;
    }, 
    'cont_carrier':function(){
      return  Meteor.user().profile.cont_carrier;
    },
    'mandrillKey':function(){
      return Meteor.user().profile.mail.mandrillKey;
    }
});


  Template.search.events({
    'click #search': function (event,template) {
      // increment the counter when button is clicked
      event.preventDefault();

      Session.set('lat',template.find('#lat').value);
      Session.set('long',template.find('#long').value);

      callSigimera(Session.get('lat'), Session.get('long'));

      Deps.autorun(function (c) {
        var result = Session.get('emailBody');
          if (!result) return;
          c.stop();
        });
      Router.go('home');
      },

      'click #panic': function(event, template){
      event.preventDefault();

      callSigimera(Session.get('lat'), Session.get('long'));

      var from = Meteor.user().emails[0].address+"";
      var to = Meteor.user().profile.cont_email+","+
        Meteor.user().profile.cont_phone+"@"+
        Meteor.user().profile.cont_carrier;

      Deps.autorun(function (c) {
          var result = Session.get('emailBody');
          if (!result) return;
          else{
            c.stop();
            var subject = Session.get('emailSubject');
            var text =  Meteor.user().profile.cont+", "+ 
              Meteor.user().username+" has sent you a message. "+
              Session.get('emailBody');
            
            Meteor.call('setupEmail',
              Meteor.user().profile.mail.mandrillKey
            );

            Meteor.call('sendEmail',
              to,
              from,
              subject,
              text);     
          
             alert("Message is sent");
           }
         });
    },
    'click #register': function (event) {
      // increment the counter when button is clicked
      event.preventDefault();
      Router.go('registration');
    },
  });

//end client
