'use strict'

var request = require('request');
var Plug = require('./Plug')

module.exports =  new Plug('Init',function(item,next){
	setTimeout(function(){
		next(item,this);
	}.bind(this),1000)
})