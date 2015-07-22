function validateFields(){
  var emailField = document.getElementById('emailField').value;
  var passField = document.getElementById('passwordField').value;

  var both = $('#email-pass-alert-both');
  var emailEmpty = $('#email-alert');
  var passEmpty = $('#pass-alert');

  if(emailField.length == 0 && passField.length == 0){
    emailEmpty.hide();
    passEmpty.hide();
    both.show();
  }

  else if(emailField.length == 0){
    both.hide();
    passEmpty.hide();
    emailEmpty.show();
  }

  else if(passField.length == 0){
    both.hide();
    emailEmpty.hide();
    passEmpty.show();
  }

  else if(passField.length > 0  && emailField.length > 0){
    both.hide();
    emailEmpty.hide();
    passEmpty.hide();
    window.location.href= "../patient-dashboard/dashboard.html";
  }

}

Template.registration.events({
	 'click #register' : function(event, template) {
      event.preventDefault();
      console.log('register button clicked');
      Session.set('first_name',template.find('#first_name').value);
      Session.set('last_name',template.find('#last_name').value);
      //name info
      Session.set('username',template.find('#username').value);
      Session.set('email',template.find('#email').value);
      Session.set('password',template.find('#password').value);
      Session.set('rtpassword',template.find('#rtpassword').value); 
      //end login info
      
      Session.set('cont',template.find('#cont').value);
      Session.set('cont_email',template.find('#cont_email').value);
      Session.set('cont_phone',template.find('#cont_phone').value);

      Session.set('gmailAcct',template.find('#gmailAcct').value);
      Session.set('gmailPswd',template.find('#gmailPswd').value);

      console.log("username"+Session.get('username')+"email"+Session.get('email')+" password: "+Session.get('password'));
      console.log("first_name"+Session.get('first_name')+" last_name: "+Session.get('last_name'));
      console.log("contact"+Session.get('cont'));
      console.log("cont_email"+Session.get('cont_email')+" cont_phone: "+Session.get('cont_phone'));


      var user={
        "username":Session.get('username'),
        "email":Session.get('email'),
        "password":Session.get('password'),
        "profile":{
          "cont":Session.get('cont'),
          "cont_email":Session.get('cont_email'),
          "cont_phone":Session.get('cont_phone'),
          "mail":{
            "gmailAcct":Session.get('gmailAcct'),
            "gmailPswd":Session.get('gmailPswd')
          }
        }
      };

      //Meteor.call(obj);
        // Trim and validate the input
        if(Session.get('password')==Session.get('rtpassword')){
          Meteor.call('validate',user);
        }else{
          console.log('XXX---ERROR PASSWORD DOES NOT MATCH---XXX')
        }
}
});