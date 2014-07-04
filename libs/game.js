'use strict';

function game() {

	var self = {
		player			: new Robot(),
		world			: new World(),
		displayWorld	: document.getElementById('world'),
		displayControl	: document.getElementById('control'),
		events 			: {},
		trigger 		: function() {}
	};
	self.playingRobots = [ self.player ];

	return self;
}

var Game = new game();