var Server = require('./source/server');

var server = new Server();

var io = server.sockio.listen(app.listen(8099), {log: false});
console.log("Server started on port " + 8099);


sever.app.use(express.static(__dirname + "/public"));

server.app.get('/create/:search',function(req,res) {
	var search = req.param('search');
	var Item = server.T.stream('statuses/filter',{track: search});
	Item.on('tweet', function (tweet) {
		//console.log(tweet.text + tweet.user.screen_name);
		server.r.table('Itens')
		.insert({
			message: tweet.text,
			usuario: tweet.user.screen_name
		})
		.run()
		.then(function(response){
			//console.log('Success ',response);
		})
		.error(function(err){
			console.log('error occurred ',err);
		});

	});
});
server.app.get('/',function(req,res) {
	server.r.table('Itens').changes().run().then(function(cursor) {
		cursor.each(function(err,result) {
			io.sockets.emit("stats", item);
			//res.send(result);
		})
	});
});

server.app.get('/user/:user',function(req,res) {
	server.r.table('Itens').run().then()
})
