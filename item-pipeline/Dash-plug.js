'use strict'

var request = require('request');

var Plug = require('./Plug')
module.exports = new Plug('Dash',function(item,next){
	setTimeout(function(){
		next(item,this);
	}.bind(this),1000)

	try{
		request.post('http://localhost:3002/item', {form:item},function(err,res){})
	}catch(err){}
})