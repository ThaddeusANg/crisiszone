  // initialize session variables
Session.set('loadData',false);
Session.setDefault('loc', 0);
Meteor.subscribe("userData");

var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        this.render('search');
        return pause();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['settings', 'anotherPriveRoute']
});
Template.home.helpers({
  'showContacts': function(){
    Session.set('userJson', Meteor.users.find({ "emails.address" : Session.get('email')}));
    return Meteor.users.find({ "emails.address" : Session.get('email')});
  },
  'username':function(){
    console.log(Meteor.user())
    return Meteor.user().username;
  },
    'contName':function(){
    return Meteor.user().profile.cont;
  },
    'contEmail':function(){
    return Meteor.user().profile.cont_email;
  },
  'gmailAcct':function(){
    return Meteor.user().profile.mail.gmailAcct;
  },
    'gmailPswd':function(){
    return Meteor.user().profile.mail.gmailPswd;
  },
  
});

Template.home.events({
    'click #report': function (event,template) {
      // increment the counter when button is clicked
        event.preventDefault();
        // var contuser = Meteor.users.findOne({_id: this.userId}).emails.address;
        console.log('Sent Mail');
        var from = Meteor.user().emails[0].address+"";
        var to = Meteor.user().profile.cont_email+"";
        var subject = Session.get('emailSubject');
        var text =  Meteor.user().profile.cont+", "+ 
          Meteor.user().username+" has sent you a message. "+
          Session.get('emailBody');

        Meteor.call('setupEmail',
          Meteor.user().profile.mail.gmailAcct,
          Meteor.user().profile.mail.gmailPswd);

        Meteor.call('sendEmail',
          to,
          from,
          subject,
          text);     

    alert("Message is sent");
    }
});

//end client
