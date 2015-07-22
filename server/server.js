
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});

  Meteor.methods({
    getLocalCrisis: function(lat, lon){
      
      console.log('called search');
      //Session.set('emailSubject',"No Crisis");
      //Session.set('emailBody',"There are no crises in the immediate area. User's last known position is lat: "+Session.get('lat')+", long: "+Session.get('long'));
      try {
        //svar response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat='+lat+'&lon='+lon+'&radius=5');
        var response = HTTP.get('http://api.sigimera.org/v1/crises.json?auth_token=EtcYxoBYskcMo-cVeC8k&lat=-10.9949&lon=162.5624&radius=50');
        //var response = HTTP.get('http://api.sigimera.org/v1/crises.json?auth_token=EtcYxoBYskcMo-cVeC8k&lat='+lat+'&lon='+lon+'&radius=50');
        var obj = JSON.stringify(response);
        if(obj){
          console.log('detected crises'+response.data[0].dc_title);
          return response.data[0].dc_title;
          //Session.set('emailBody',"Crisis in the immediate area. User's last known position is lat: "+Session.get('lat')+", long: "+Session.get('long')+". Please see report from GDACS.  "+response.data[0].dc_title);
          //Session.set('emailSubject',"Detected Crisis");
          var obj = JSON.stringify(response);
        }else{
          console.log("no crises");
      }
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
