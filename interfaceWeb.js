var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
var http = require('http').Server(app);
var io = require('socket.io')(http);

socket = false;

io.on('connection',function(s) {
	socket = s
})

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/create', function(req, res){
  res.sendfile('create.html');
});

app.post('/item', function(req, res){
	res.send('recebi');
	socket.emit("stats", req.body)
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
