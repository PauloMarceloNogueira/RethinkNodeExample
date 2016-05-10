'use strict'

var Plug = require('./Plug')

module.exports = new Plug('Sentiment',function(item,next){
		setTimeout(function(){
			var prob = Math.random();
			if (prob< 0.5){
				item.sentiment = 'positive';
			}else{
				item.sentiment = 'negative';
			}
			next(item,this);
		}.bind(this),1000)

	})