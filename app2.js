var r = require('rethinkdbdash')({
	port: 28015,
	host: 'localhost',
	db: 'Collection'
});

var Twit = require('twit')
var T = new Twit({
  consumer_key:         'BjPAJNAurskjfl0cGDacFC5qS',
  consumer_secret:      'A9KtEtD84y1YAU3gAJGh6wHT2FuZAgilcRvTDnCG4ZJkhPmh3z',
  access_token:         '27650229-Fa9rPRhSEAGO18A1MEmt67umspWcTNjuWg3Y9uEaD',
  access_token_secret:  'jSkqJnpflbiPKcaPW6qb7V8RzC7hBsG79vIqJE79TJc3S',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var Item = T.stream('statuses/filter',{track:'ThankYou1D'});

Item.on('tweet', function (tweet) {
	console.log(tweet.text + tweet.user.screen_name);
	r.table('Itens')
	.insert({
		message: tweet.text,
		usuario: tweet.user.screen_name
	})
	.run()
	.then(function(response){
		console.log('Success ',response);
	})
	.error(function(err){
		console.log('error occurred ',err);
});

});

r.table('Itens')
.changes()
.run()
.then(function(cursor){
	cursor.each(console.log);
})
.error(function(err){
	console.log(err);
});
