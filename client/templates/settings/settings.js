  // initialize session variables
  Meteor.subscribe("userData");
Session.keys={};
Session.set('loadData',false);
Session.setDefault('loc', 0);
Session.set('loginResponse', false);

  Template.settings.helpers({
    'first_name': function(){
      return Meteor.user().profile.first_name;
    },
    'last_name': function(){
      return Meteor.user().profile.last_name;
    },
    'username': function () {
      return Meteor.user().username;
    },
    'email':function(){
      return Meteor.user().emails[0].address;
    },
    'cont':function(){
      return  Meteor.user().profile.cont;
    },
    'cont_email':function(){
      return  Meteor.user().profile.cont_email;
    },
    'cont_phone':function(){
      return  Meteor.user().profile.cont_phone;
    }, 
    'cont_carrier':function(){
      return  Meteor.user().profile.cont_carrier;
    },
    'mandrillKey':function(){
      return Meteor.user().profile.mail.mandrillKey;
    }
});


  Template.settings.events({
    'click #submit': function (event,template) {
      // increment the counter when button is clicked
      console.log('clicked submit');
      event.preventDefault();
      var update={
        "username":template.find('#username').value,
        "email":template.find('#email').value,
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
      }
      Meteor.call('update', update);
      Router.go('search');
      },

    'click #cancel': function (event) {
      // increment the counter when button is clicked
      event.preventDefault();
      Router.go('search');
    },
  });

//end client
