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
		i18n : {
			commands: {
				'turnLeft'		: 'turn left',
				'moveFoward'	: 'move foward',
				'turnRight'		: 'turn right',
				'moveReward'	: 'move reward',
				'noOperation'	: 'no operation',
			},
			executeCommands : 'Execute !'
		}
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

