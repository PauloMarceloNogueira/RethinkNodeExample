var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// var r = require('rethinkdbdash')({
// 	port: 28015,
// 	host: 'localhost',
// 	db: 'Collections'
// });


io.on('connection',function(s) {
	socket = s
})

app.get('/', function(req, res){
  res.sendfile('dash.html');
});

app.post('/item', function(req, res){
	
	socket.emit("stats", req.body)
	res.send('recebi');
});



http.listen(3003, function(){
  console.log('listening on *:3003');
});