  // initialize session variables
Session.keys={};
Session.set('loadData',false);
Session.setDefault('loc', 0);
Session.set('loginResponse', false);


function login(email, password){
  console.log("email"+email+" password: "+password+"User below");
  console.log(Meteor.user());
  Meteor.loginWithPassword(email, password, function(err){
    if (err){
      console.log('---login failed---'+err);
    }else{
      Session.set('loginResponse', "Done");
      console.log('---login response---');
      console.log(Meteor.user());

      if (!err) {
        return Router.go('search');
      }
    }
  });
}

  Template.login.helpers({

});


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

//end client
