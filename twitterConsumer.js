
var Options = require('./settings/settings.js');
var settings = new Options();

var DBSettings = settings.rethinkData();
var TwitSettings = settings.twitData();

var r = require('rethinkdbdash')({
	port: DBSettings.port,
	host: DBSettings.host,
	db: DBSettings.db
});
var Twit = require('twit')
var T = new Twit({
	consumer_key: TwitSettings.consumer_key,
	consumer_secret: TwitSettings.consumer_secret,
	access_token: TwitSettings.access_token,
	access_token_secret: TwitSettings.access_token_secret
});

r.table('search').run(function(err,result) {

	var therm = result[0].therm;
	console.log('Search for ' + result[0].therm);
	var streamItem = T.stream('statuses/filter',{track:therm});
	streamItem.on('tweet',function(tweet) {
		console.log(tweet)
		r.table('Itens')
		.insert({
			message : tweet.text,
			usuario : tweet.user.screen_name,
			created_at	: tweet.created_at,
			id : tweet.id_str,
			profile : tweet.user.profile_image_url,
			network : 'twitter',
			search : therm
		})
		.run()

	})
});
