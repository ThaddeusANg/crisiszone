  // initialize session variables
Session.set('loadData',false);
Session.setDefault('loc', 0);
Meteor.subscribe("userData");


Template.home.helpers({
  'showContacts': function(){
    Session.set('userJson', Meteor.users.find({ "emails.address" : Session.get('email')}));
    return Meteor.users.find({ "emails.address" : Session.get('email')});
  },
  'username':function(){
    return Meteor.user().username;
  },
    'contName':function(){
    return Meteor.user().profile.cont;
  },
    'contEmail':function(){
    return Meteor.user().profile.cont_email;
  }
});

Template.home.events({
});

//end client
