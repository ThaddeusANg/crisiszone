  // initialize session variables
Session.set('loadData',false);
Session.setDefault('loc', 0);
Meteor.subscribe('userData');

Template.home.helpers({
  'showContacts': function(){
    console.log("email: "+Session.get('email'));
    console.log("password: "+Session.get('password'));
    Session.set('userJson', Meteor.users.find({ "emails.address" : Session.get('email')}));
    return Meteor.users.find({ "emails.address" : Session.get('email')});
  }
});

Template.home.events({
    'click #report': function (event,template) {
      // increment the counter when button is clicked
        event.preventDefault();
        // var contuser = Meteor.users.findOne({_id: this.userId}).emails.address;
        console.log("clicked on report");
        Router.go('report');
    }
});

//end client
