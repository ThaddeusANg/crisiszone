  // initialize session variables
Session.set('loadData',false);
Session.setDefault('loc', 0);

Template.home.helpers({
  'showContacts': function(){
    console.log("email: "+Session.get('email'));
    console.log("password: "+Session.get('password'));
    Session.set('userJson', Meteor.users.find({ "emails.address" : Session.get('email')}));
    return Meteor.users.find({ "emails.address" : Session.get('email')});
  },    
});

Template.home.events({
    'click #report': function (event) {
      // increment the counter when button is clicked
        event.preventDefault();
        console.log("clicked on report");
        console.log("Test from report"+Session.get('crisisResponse'));
    var from = 'thaddeus.a.ng@gmail.com';
    var to = "thaddeus.a.ng@gmail.com";
    var name = "Email Name";
    var subject = Session.get('emailSubject')+"";
    var text =  Session.get('emailBody')+"";

    console.log("subject:" +subject);
    console.log("text:" +text);
    Meteor.call('sendEmail',
          to,
          from,
          subject,
          text);     

    alert("Message is sent");
    }
});

//end client
