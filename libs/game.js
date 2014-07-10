'use strict';

(function Game() {

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

	var internal = {};
	internal.control = new Control();
	internal.player = new Robot();
	internal.world = new World();
	for (var item in internal) {
		internal[item].init(self);
	}

	var playingRobots = [ internal.player ];

	self.trigger('start');
	return self;
})();

