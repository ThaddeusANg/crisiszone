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
    only: ['home', 'report']
});

Router.configure({
	'layoutTemplate': "layout"
});

Router.route('/search', {
	name: 'search'});

Router.route('/home', {
	name: 'home'
});

Router.route('/footer', {
	name: 'footer'
});

Router.route('/map',{
	name: 'map'
});

Router.route('/registration',{
	name: 'registration'
});

Router.route('/contacts',{
	name: 'contacts'
})

Router.route('/report',{
	name:'report'
})