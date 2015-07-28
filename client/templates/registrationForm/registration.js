function mandrill(flag){ 
  var invalid = $('#mandrill'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
} 

function emailError(flag){ 
  var invalid = $('#emailError'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
} 
 
function pswdUser(flag){ 
  var invalid = $('#pswdUser'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
} 
  
function pswdLength(flag){ 
  var invalid = $('#pswdLength'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
} 
 
function pswdNum(flag){ 
  var invalid = $('#pswdNum'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
} 

function pswdUpper(flag){ 
  var invalid = $('#pswdUpper'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
} 

function pswdLower(flag){ 
  var invalid = $('#pswdLower'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
} 

function pswdMatch(flag){ 
  var invalid = $('#pswdMatch'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
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
            "mandrillKey":template.find('#mandrillKey').value
          }
        }
      };

      var valid=true;
      if(user.profile.mail.mandrillKey!='0ABKt9imBFE7ZziZWc1M0Q'){
            valid=false;
            mandrill(valid);
          }else
          mandrill(true);

      if(user.password.length<8){
            valid=false;
            pswdLength(valid);
          }else
          pswdLength(true);

          if(user.email==""){
            valid=false;
            emailError(valid);
          }else
          emailError(true);

          if(user.password==user.username){
            valid=false;
            pswdUser(valid)
          }else
          pswdUser(true);

          if(user.password!=template.find('#rtpassword').value){
            valid=false;
            pswdMatch(valid);
          }else
          pswdMatch(true);

          re = /[0-9]/;
          if(!re.test(user.password)) {
            valid= false;
            pswdNum(valid);
          }else
          pswdNum(true);

          re = /[a-z]/;
          if(!re.test(user.password)) {
            valid = false;
            pswdLower(valid);
          }else
          pswdLower(true);


          re = /[A-Z]/;
          if(!re.test(user.password)) {
            valid =  false;
            pswdUpper(valid);
          }else
          pswdUpper(true);

        if(valid){
          var response = Meteor.call('validate',user);
          alert("User Account Registered");
        }
}
});

Template.registration.rendered = function(){ 
  pswdNum(true);
  pswdUpper(true);
  pswdLower(true);
  pswdUser(true);
  pswdLength(true);
  pswdMatch(true);
  emailError(true);
  mandrill(true);
} 
