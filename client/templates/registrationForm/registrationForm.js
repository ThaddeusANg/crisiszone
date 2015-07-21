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

Template.registrationForm.events({
	 'click #register' : function(event, template) {
      event.preventDefault();
      console.log('register button clicked');
      Session.set('email',template.find('#email').value);
      Session.set('password',template.find('#password').value);
      Session.set('rtpassword',template.find('#rtpassword').value); 
      Session.set('first_name',template.find('#first_name').value);
      Session.set('last_name',template.find('#last_name').value);
      Session.set('city',template.find('#city').value);
      Session.set('state',template.find('#state').value);
      Session.set('nickname',template.find('#nickname').value);
      Session.set('age',template.find('#age').value);
      Session.set('illness',template.find('#illness').value);
      Session.set('gender',template.find('#gender').value);
      Session.set('userType',template.find('#userType').value);

      console.log("email"+Session.get('email')+" password: "+Session.get('password'));
      console.log("first_name"+Session.get('first_name')+" last_name: "+Session.get('last_name'));
      console.log("city"+Session.get('city')+" state: "+Session.get('state'));
      console.log("nickname"+Session.get('nickname')+" age: "+Session.get('age'));
      console.log("gender"+Session.get('gender')+" illness: "+Session.get('illness'));
      console.log("user type"+Session.get('userType'));


      var user={
        "username":Session.get('nickname'),
        "email":Session.get('email'),
        "password":Session.get('password'),
        "profile":{
          "first_name":Session.get('first_name'),
          "last_name":Session.get('last_name'),
          "city":Session.get('city'),
          "state":Session.get('state'),
          "age":Session.get('age'),
          "illness":Session.get('illness'),
          "gender":Session.get('gender'),
          "controller":{
            "first_name":"placeholder",
            "last_name":"placeholder",
            "relation":"placeholder"},
          "healthcare":"placeholder",
          "user_type":Session.get('userType'),
          "settings":"value"
        }
      }
      ;

      //Meteor.call(obj);
        // Trim and validate the input
        if(Session.get('password')==Session.get('rtpassword')){
          Meteor.call('validate',user);
        }else{
          console.log('XXX---ERROR PASSWORD DOES NOT MATCH---XXX')
        }
}
});