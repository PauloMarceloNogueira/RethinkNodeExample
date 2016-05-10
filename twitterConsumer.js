var r = require('rethinkdbdash')({
	port: 28015,
	host: 'localhost',
	db: 'Collections'
});
var Twit = require('twit')
var T = new Twit({
	consumer_key: 'BjPAJNAurskjfl0cGDacFC5qS',
	consumer_secret: 'A9KtEtD84y1YAU3gAJGh6wHT2FuZAgilcRvTDnCG4ZJkhPmh3z',
	access_token: '27650229-Fa9rPRhSEAGO18A1MEmt67umspWcTNjuWg3Y9uEaD',
	access_token_secret: 'jSkqJnpflbiPKcaPW6qb7V8RzC7hBsG79vIqJE79TJc3S'
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

