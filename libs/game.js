'use strict';

function game() {

	var self = {
		displayWorld	: document.getElementById('world'),
		displayControl	: document.getElementById('control'),
		events 			: { 'pushNextStateButton' :  [ self.world.nextState ] },
		trigger 		: function(triggerName) {
			if (self.events[triggerName] !== undefined) {
				for(var index in self.events[triggerName]) {
					this.events[triggerName][index](self)
				}
			}
		},
		addTrigger		: function(triggerName,launchFunction) {
			this.events[triggerName].push(index);
		}
	};
	self.player = new Robot(self);
	self.playingRobots = [ self.player ];
	self.world = new World(self);

	return self;
}

var Game = new game();
