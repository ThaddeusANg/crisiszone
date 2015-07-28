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
    }
  });
