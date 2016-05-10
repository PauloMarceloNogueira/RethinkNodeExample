'use strict'


module.exports = class Pipeline{
	constructor(){
		this.plugs = [];
		this.events = {};

		this.on = this.on.bind(this);
	}
	//Create Plug
	plug(plug){
		this.plugs.push(plug);
	}

	//Send to first plug
	push(item){
		if (this.plugs[0]){
			this.emit('init-item',this.plugs[0].identifier)
			this.emit('init-plug',{'in':false,'out':this.plugs[0].identifier})
			return this.plugs[0].in(item,this.next.bind(this))			
		}
	}

	//Send to Next plug or End (if last plug)
	next(item,plug){
		let left = this.plugs.indexOf(plug);
		let i = this.plugs.indexOf(plug)+1;
		let nextPlug = false
		if (this.plugs[i]){
			nextPlug = this.plugs[i].identifier;
		}
		if (this.plugs[i])
		if (typeof this.plugs[i].in === 'function'){
			this.emit('init-plug',{'in':this.plugs[left].identifier,'out':nextPlug})
			return this.plugs[i].in(item,this.next.bind(this))
		}
		return this.end(item);
	}

	// End of Pipeline
	end(item){
		this.emit('item-out',item)
	}

	on(config){
		const eventName = config.eventName;
		const callback = config.callback;

		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(callback);
	}

	emit(event,item){
		if (this.events[event])
		this.events[event].forEach(function(action){
			return action(item);
		})
	}

}
