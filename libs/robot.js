'use strict';

function Robot() {

	var self = {
		gear : 0,
		rotating : 0
	};



	return self;

}

function World() {

	var directions = [
		{title : 'North',	dx : 0 , dy : -1},
		{title : 'East',	dx : 1 , dy : 0},
		{title : 'South',	dx : 0 , dy : 1},
		{title : 'West',	dx : -1, dy : 0}
	];

	var CLOCKWISE = 1;
	var COUNTERCLOCKWISE = -1;

	var self = {

		robots: [],
		positions : [],
		add: function(robot, at_x, at_y , at_o) {
			this.robots.push( robot );
			this.positions.push( {
				x : at_x,
				y : at_y,
				o : at_o,
			});
		},
		getPosition : function(robot) {
			var which = this.robots.indexOf(robot);
			if (which === -1) {
				return false;
			} else {
				return {
					x : this.positions[which].x,
					y : this.positions[which].y,
					o : this.positions[which].o
				};
			}
		},
		nextRobotState : function(which) {
			this.positions[which].y--;
		},
/*		nextState : function() {
			for (var dossart in this.robots ) {
				if (robots.hasOwnProperty(dossart)) {

				}
			}
		}
*/
	};

	return self;

}


