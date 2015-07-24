  // initialize session variables
Session.keys={};
Session.set('loadData',false);
Session.setDefault('loc', 0);
Session.set('loginResponse', false);


function login(email, password){
  console.log("email"+email+" password: "+password+"User below");
  console.log(Meteor.user());
  Meteor.loginWithPassword(email, password, function(err){
    if (err){
      console.log('---login failed---'+err);
    }else{
      Session.set('loginResponse', "Done");
      console.log('---login failed---');
      console.log(this.userId);

      if (Router.current().route.name === 'login') {
        // if we are on the login route, we want to redirect the user
        return Router.go('home');
      }
    //   if(!this.userId){
    //     console.log('---login rejected---');
    //     Router.go('search');
    //   }else{
    //   console.log('---login succeeded FROM"+this.userId+"---');
    // }
    }
  });
}

function callSigimera(lat, lon){
        Meteor.call('getLocalCrisis',lat, lon,function(err, result){
        if (err){
          console.log('---call failed---');
        }else{
          Session.set('localcrisis', result);
          console.log(result);
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
  console.log('---end call---');
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
      console.log("current user below");
      console.log(Meteor.user());


          Session.set('lat',template.find('#lat').value);
          Session.set('long',template.find('#long').value);
          //Session.set('crisisResponse', Meteor.call('getLocalCrisis',Session.get('lat'), Session.get('long')));
          callSigimera(Session.get('lat'), Session.get('long'));

          Deps.autorun(function (c) {
            var result = Session.get('emailBody');
            if (!result) return;
            c.stop();
            console.log("afteremailBody"+Session.get('emailBody'));
          });

          Router.go('home');
        },
    'click #panic': function(event, template){
      event.preventDefault();
      Meteor.subscribe("userData");
      login(template.find('#email').value, template.find('#password').value);

        callSigimera(Session.get('lat'), Session.get('long'));

        var from = Meteor.user().emails[0].address+"";
        var to = Meteor.user().profile.cont_email+","+
          Meteor.user().profile.cont_phone+"@"+
          Meteor.user().profile.cont_carrier;


        Deps.autorun(function (c) {
          var result = Session.get('emailBody');
          var loginResponse = Session.get('loginResponse');
          if (!result||!loginResponse) return;
          else{
            c.stop();
            var subject = Session.get('emailSubject');
            var text =  Meteor.user().profile.cont+", "+ 
              Meteor.user().username+" has sent you a message. "+
              Session.get('emailBody');
            
            Meteor.call('setupEmail',
              Meteor.user().profile.mail.gmailAcct,
              Meteor.user().profile.mail.gmailPswd
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
