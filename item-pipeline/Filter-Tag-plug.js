'use strict'

var Plug = require('./Plug')


module.exports = function (r) {
	return new Plug('Tag',function(item,next){
		setTimeout(function(){
			item.tag = [];
			r.db('Collections').table('Filters')	
			.run(function(err,result) {
				if(item.message.indexOf(result[0].text) >= 0) {
					item.tag = result[0].filtername
				}else{
					item.tag = ""
				}
			})
			next(item,this)
		}.bind(this),10000)
	})
}
