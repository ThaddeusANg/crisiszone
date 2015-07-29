  // initialize session variables
Session.keys={};
Session.set('loadData',false);
Session.setDefault('loc', 0);
Session.set('loginResponse', false);

function badLogin(flag){ 
  var invalid = $('#badLogin'); 
  if(flag==true)
    invalid.hide(); 
  else
    invalid.show();
} 

function login(email, password){
  Meteor.loginWithPassword(email, password, function(err){
    if (err){
      badLogin(false);
    }else{
      Router.go('/');
    }
  });
}

  Template.login.helpers({

});

Template.login.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          console.log('Sorry this verification link has expired.')
        }
      } else {
        console.log('Thank you! Your email address has been confirmed.')
      }
    });
  }
};

  Template.login.events({
    'click #login': function (event,template) {
      event.preventDefault();
      login(template.find('#email').value, template.find('#password').value);
    },
    'click #register': function (event) {
      // increment the counter when button is clicked
      event.preventDefault();
      Router.go('registration');
    },
  });

Template.login.rendered = function(){ 
  badLogin(true);
} 
//end client
