'use strict';

(function Game() {

	var self = {
		events 			: { },
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
		playerRobotRamLength : 6,

		actualMoveInSequence : 0,
		totalMovesInLevel : 0,

		i18n : {}
	};

	var internal = {};
	internal.control = new Control();
	internal.playfield = new Playfield();

	internal.player = new Robot();
	
	internal.world = createWorld();
	internal.i18n = new i18n();
	for (var item in internal) {
		internal[item].init(self);
	}

	var playingRobots = [ internal.player ];

	self.trigger('start');
	return self;
})();

