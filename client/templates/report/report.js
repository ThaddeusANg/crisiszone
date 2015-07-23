Meteor.subscribe("userData");
Template.report.helpers({
	'contEmail':function(){
		return Meteor.user().profile.cont_email;
	},
	'emailBody': function(){
		return Session.get('emailBody');
	},
	'emailSubject':function(){
		return Session.get('emailSubject');
	}
});

Template.report.events({ 
    'click #contactBtn': function(event,template) {
		event.preventDefault();
		console.log('Sent Mail');
		var from = 'do_not_reply@Crisiszone.com';
		var to = template.find('#email-field').value;
		var subject = template.find('#subject-field').value;
		var text =  template.find('#msg-field').value;
		Meteor.call('sendEmail',
          to,
          from,
          subject,
          text);     

		alert("Message is sent");
	}
});

