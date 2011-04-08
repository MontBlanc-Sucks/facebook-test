(function() {
	var e = document.createElement('script');
	e.async = true;
	e.src = document.location.protocol +
		'//connect.facebook.net/ja_JP/all.js';
	document.getElementById('fb-root').appendChild(e);
}());
window.fbAsyncInit = function() {
	FB.init({
		appId: '178960655485002',
		status: true,
		cookie: true,
		xfbml: true
	});
	FB.getLoginStatus(function(response) {
		if (response.session) {
			jQuery('#login').show();
			// logined action
		}
		else {
			jQuery('#not_login').show();
			jQuery('#login_button').click(function() {
				FB.login(function(response){
					if (response.session) {
						top.location.href = 'http://apps.facebook.com/social-service-test/';
					}
				});
			});
		}
	});
}