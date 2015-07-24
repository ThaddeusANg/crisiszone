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
      var user={
        "username":template.find('#username').value,
        "email":template.find('#email').value,
        "password":template.find('#password').value,
        "profile":{
          "first_name":template.find('#first_name').value,
          "last_name":template.find('#last_name').value,
          "cont":template.find('#cont').value,
          "cont_email":template.find('#cont_email').value,
          "cont_phone":template.find('#cont_phone').value,
          "cont_carrier":template.find('#cont_carrier').value,
          "mail":{
            "gmailAcct":template.find('#gmailAcct').value,
            "gmailPswd":template.find('#gmailPswd').value
          }
        }
      };

      //Meteor.call(obj);
        // Trim and validate the input
        if(template.find('#password').value==template.find('#rtpassword').value){
          var response = Meteor.call('validate',user);
          Deps.autorun(function (c) {
            console.log(response);
            if (!response) return;
            c.stop();
            console.log(response);
            if(response=="registered"){
              Router.go('login');
            }else{
              alert(response);
            }
          });
          
        }else{
          console.log('XXX---ERROR PASSWORD DOES NOT MATCH---XXX')
        }
}
});