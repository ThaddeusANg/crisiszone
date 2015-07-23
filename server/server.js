
Meteor.publish("userData", function () {
  console.log("Checking before publish"+this.userId);
  if (this.userId) {
    console.log(this.userId);
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
        var valid=true;
          if(user.password.length<8){
            valid=false;
            console.log('XXX---ERROR PASSWORD LENGTH REQUIREMENT IS 8 CHARACTERS---XXX')
          }
          if(user.email==""){
            valid=false;
            console.log('XXX---ERROR MUST ENTER AN EMAIL ADDRESS---XXX')
          }
          if(user.password==user.username){
            valid=false;
            console.log('XXX---ERROR PASSWORD MAY NOT EQUAL USERNAME---XXX')
          }

          re = /[0-9]/;
          if(!re.test(user.password)) {
            console.log('XXX---ERROR PASSWORD MUST CONTAIN A NUMBER---XXX')
            valid= false;
          }

          re = /[a-z]/;
          if(!re.test(user.password)) {
            console.log('XXX---ERROR PASSWORD MUST CONTAIN LOWER CASE LETTERS---XXX')
            valid = false;
          }

          re = /[A-Z]/;
          if(!re.test(user.password)) {
            console.log('XXX---ERROR PASSWORD MUST CONTAIN UPPER CASE LETTERS---XXX')
            VALID =  false;
          }

          if(valid){
            Accounts.createUser(user);
          }
        } catch(error) {
        console.log(error);
      }
    }
  });
