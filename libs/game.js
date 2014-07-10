'use strict';

function game() {

	var self = {
		events 			: { /*'pushNextStateButton' :  [ self.world.nextState ]*/ },
		trigger 		: function(triggerName) {
			if (self.events[triggerName] !== undefined) {
				for(var index in self.events[triggerName]) {
					this.events[triggerName][index](self)
				}
			}
		},
		addTrigger		: function(triggerName,launchFunction) {
			if (this.events[triggerName] === undefined) {
				this.events[triggerName] = [];
			}
			this.events[triggerName].push(launchFunction);
		},
		playerRobotRam : [],
	};

	var player = new Robot(self);
	var playingRobots = [ self.player ];
	var world = new World(self);
	var control = new Control(self);

	self.trigger('start');
	return self;
}

var Game = new game();
