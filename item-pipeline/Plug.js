'use strict';

module.exports = class Plug{
	constructor(identifier,actionFunction){
		this.identifier = identifier;
		this.actionFunction = actionFunction;
		this.in = this.actionFunction;

	}

	turnOff(){
		this.in = function(item,next){
			next();
		}
	}

	turnOn(){
		this.in = this.actionFunction;
	}
};