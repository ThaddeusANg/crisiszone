var response;    

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    Meteor.users.update({}, {$set : { "resume.loginTokens" : [] }}, {multi:true});
    this.ready();
  }
});

  Meteor.methods({
    clean: function(){
      if(this.userId){
        Meteor.users.update({}, {$set : { "resume.loginTokens" : [] }}, {multi:true});
      console.log("Purge active accounts");
  }else{
    console.log("---no active accounts");
  }
    },
    getLocalCrisis: function(lat, lon){
      
      console.log('called search');
      try {
       var response = HTTP.get(
        'http://api.sigimera.org/v1/crises.json?auth_token=e4YjdoAEMxgDg8E2wdnJ&lat='+
        lat+'&lon='+
        lon+'&radius=50');

        console.log(response.statusCode);
          //console.log('detected crises'+response.data[0].dc_title);
          return response;

    } catch(error) {
      console.log(error);
    }
  },
    validate: function(user){
      console.log('called validate');
      try {
            Accounts.createUser(user);
          } catch(error) {
            console.log(error);
      }
    },
    update: function(update){
      Meteor.users.update(
        {_id:Meteor.user()._id}, 
        {$set:{
          "username":update.username, 
          "email":update.email,
          "profile.first_name":update.profile.first_name,
          "profile.last_name":update.profile.last_name,
          "profile.cont":update.profile.cont,
          "profile.cont_email":update.profile.cont_email,
          "profile.cont_carrier":update.profile.cont_carrier,
          "profile.mail.mandrillKey":update.profile.mail.mandrillKey
        }
      });
      console.log(Meteor.user());
    }
  });

Accounts.onCreateUser(function(options, user) {
  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);

  return user;
});

Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    console.log('email not verified');

    return false; // the login is aborted
  }
  return true;
}); 