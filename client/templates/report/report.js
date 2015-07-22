Template.report.helpers({
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
		console.log(from+":"+to+":"+subject+":"+text);
		Meteor.call('sendEmail',
          to,
          from,
          subject,
          text);     

		alert("Message is sent");
	}
});

