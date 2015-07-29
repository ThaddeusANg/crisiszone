smtp = {
    username: "do_not_reply@crisiszone.com",   // eg: server@gentlenode.com
    password: '0ABKt9imBFE7ZziZWc1M0Q',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.mandrillapp.com',  // eg: mail.gandi.net
    port: 25
  }

Meteor.startup(function(){
  process.env.MAIL_URL = 'smtp://' + 
    encodeURIComponent(smtp.username) + ':' + 
    encodeURIComponent(smtp.password) + '@' + 
    encodeURIComponent(smtp.server) + ':' + 
    smtp.port;

  Accounts.emailTemplates.from = 'Crisiszone <no-reply@crisiszone.com>';
  Accounts.emailTemplates.siteName = 'Crisiszone';
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address';
  };

  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'click on the following link to verify your email address: ' + url;
  };

});


Meteor.methods({
  'setupEmail':function( mandrillKey){
    smtp.password=mandrillKey;
    console.log("Set up email URL with custom Key");
    process.env.MAIL_URL = 'smtp://' + 
      encodeURIComponent(smtp.username) + ':' + 
      encodeURIComponent(smtp.password) + '@' + 
      encodeURIComponent(smtp.server) + ':' + 
      smtp.port;
  },
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    //actual email sending method
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});