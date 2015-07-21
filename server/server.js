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
    
      try {
        //svar response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat='+lat+'&lon='+lon+'&radius=5');
        var response = HTTP.get('http://api.sigimera.org/v1/crises.json?auth_token=EtcYxoBYskcMo-cVeC8k&lat=-10.9949&lon=162.5624&radius=50');
        var obj = JSON.stringify(response);
        if(!obj){
          console.log('no detected crises');
          response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat=-10.9949&lon=162.5624&radius=50');
          Session.set('lat',-10.9949);
          Session.set('long', 162.5624);
          var obj = JSON.stringify(response);
        }else{
        //sconsole.log("Content"+response);
        //CrisisCollection.insert(obj);
      }
      console.log("String JSON:::::"+obj);
      var json=JSON.parse(obj);
      console.log(response.data[0].dc_title);
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

// server code
Mandrill.config({
  username: process.env.MANDRILL_API_USER,  // the email address you log into Mandrill with. Only used to set MAIL_URL.
  key: process.env.MANDRILL_API_KEY  // get your Mandrill key from https://mandrillapp.com/settings/index
  // port: 587,  // defaults to 465 for SMTP over TLS
  // host: 'smtp.mandrillapp.com',  // the SMTP host
  // baseUrl: 'https://mandrillapp.com/api/1.0/'  // update this in case Mandrill changes its API endpoint URL or version
});

// Meteor method code
this.unblock();
try {
  [result = ]Mandrill.<category>.<call>(options, [callback]);
} catch (e) {
  // handle error
}