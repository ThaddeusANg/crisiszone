Meteor.subscribe("userData");
Template.report.helpers({
	'contEmail':function(){
		return Meteor.user().profile.cont_email+","+
          Meteor.user().profile.cont_phone+"@"+
          Meteor.user().profile.cont_carrier;
	},
	'emailBody': function(){
		return Meteor.user().profile.cont+", "+ 
          Meteor.user().username+" has sent you a message. "+
          Session.get('emailBody');
	},
	'emailSubject':function(){
		return Session.get('emailSubject');
	}
});

Template.report.events({ 
    'click #report': function (event,template) {
      // increment the counter when button is clicked
        event.preventDefault();
        // var contuser = Meteor.users.findOne({_id: this.userId}).emails.address;
        console.log('Sent Mail');
        var from = Meteor.user().emails[0].address+"";
        var to = template.find('#emailTo').value;
        var subject = template.find('#subject').value;
        var text =  template.find('#body').value;
        Meteor.call('setupEmail',
          Meteor.user().profile.mail.mandrillKey);

        Meteor.call('sendEmail',
          to,
          from,
          subject,
          text);     

    alert("Message sent to "+Meteor.user().profile.cont);
    Router.go('search');
    }
});

