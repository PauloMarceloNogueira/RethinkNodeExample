'use strict'


var Pipeline = require('./item-pipeline/Pipeline.js')
var Sentiment = require('./item-pipeline/Sentiment-plug.js')
var RealTime = require('./item-pipeline/RealTime-plug.js')
var FilterTag = require('./item-pipeline/Filter-Tag-plug.js')
var Update = require('./item-pipeline/Update-plug.js')
var Dash = require('./item-pipeline/Dash-plug.js')


var r = require('rethinkdbdash')({
	port: 28015,
	host: 'localhost',
	db: 'Collections'
});


var items = 0


var pipeline = new Pipeline()

var app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendfile('monitor.html');
});

app.get('/plugs', function(req, res){
  res.json(pipeline.plugs.map(function(plug){return plug.constructor.name}));
});

app.get('/turnoff/:i', function(req, res){
	var i = req.param('i');
  pipeline.plugs[i].turnOff()
});

app.get('/turnon/:i', function(req, res){
	var i = req.param('i');
  pipeline.plugs[i].turnOn()
});


var io = require('socket.io')(http);

var socket = false;

io.on('connection',function(s) {
	socket = s
})


var createEventListener = function(eventName) {
	return {
		eventName: eventName, 
		callback: function(item){
			if (socket) {
				socket.emit(eventName,item)
			}
		}
	};
};

pipeline.on(createEventListener('receive-item'));
pipeline.on(createEventListener('init-item'));
pipeline.on(createEventListener('item-out'));
pipeline.on(createEventListener('init-plug'));
pipeline.on(createEventListener('out-plug'));

pipeline.plug(Sentiment)

pipeline.plug(FilterTag(r))

pipeline.plug(Update(r))

pipeline.plug(RealTime)

pipeline.plug(Dash)


r.table('Itens')
.changes()
.run()
.then(function(cursor) {
	cursor.each(function(err,result) {
		if (!result.old_val)
		pipeline.push(result.new_val);
	})
});


// setTimeout(function(){

// 	setTimeout(function(){
// 		pipeline.push({"_id":"5bdea776-22d1-401f-a1c1-4faf73f0679e","created_at":"Tue May 10 12:58:30 +0000 2016","id":"730019180339146753","message":"RT @pesb2012: Brazil politics: Dilma Rousseff the fighter battles on https://t.co/XYgWHLXubC","network":"twitter","profile":"http://pbs.twimg.com/profile_images/1146095361/2a62ccc0-03fc-4ee9-9702-08a13e68896b_normal.png","search":"Dilma","usuario":"zezaestrela"})
// 	},Math.random()*100)
	
// },80)

http.listen(3002, function(){
  console.log('listening on *:3002');
});


















