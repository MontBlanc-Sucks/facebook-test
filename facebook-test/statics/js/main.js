var mbs = {
	fbUrl: 'http://apps.facebook.com/social-service-test/',
	gaUrl: 'http://ds-facebook-test.appspot.com/',
	description: 'あなたのfacebook活用度を100点満点で診断します。'
};

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
			FB.api('/me', function(response) {
				jQuery('.me-name').text( response.name + 'さん');
				var points = (function(name){
					var result = 0;
					result = (name.length % 15) + 1;
					return result;
				})(response.name);
				jQuery('.me-points').text( points + '点です');
			});
		}
		else {
			jQuery('#not_login').show();
			jQuery('#login_button').click(function() {
				FB.login(function(response){
					if (response.session) {
						FB.api('/me', function(response) {
							// post
							FB.api('/me/feed', 'post', {
								message: response.name + 'さんが、ソーシャルサービス診断の実施をお勧めしています',
								picture: mbs.gaUrl + 'img/facebook-test-image.png',
								link: mbs.fbUrl,
								description: mbs.description
							}, function(response){
								top.location.href = mbs.fbUrl;
							});
						});
					}
				},
				{ perms : 'read_stream,publish_stream' }
				);
			});
		}
	});
}