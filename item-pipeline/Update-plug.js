'use strict'
var Plug = require('./Plug')

module.exports = function(r){
 return new Plug('Update',function(item,next){
		r.db('Collections').table('Itens').filter({'id':item.id})
		.update({sentiment: item.sentiment,tag : item.tag})
		.run(function(err, result) {
	        if (err) throw err;
	    });
	    setTimeout(function(){
	    	next(item,this);
	    }.bind(this),2000)
		
	})

}