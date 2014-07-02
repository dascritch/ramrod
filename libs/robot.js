'use strict';

var ROTATING_CLOCKWISE = 1;
var ROTATING_NO = 0;
var ROTATING_COUNTERCLOCKWISE = -1;
var ROTATING_UTURN = 2;
var MOVING_FOWARD = 1;
var MOVING_NO = 0;
var MOVING_REWARD = -1;

var FACING_NORTH = 0;
var FACING_EAST = 1;
var FACING_SOUTH = 2;
var FACING_WEST = 3;

function Robot() {

	var self = {
		gear : MOVING_NO,
		rotating : ROTATING_NO,
		clearPorts : function() {
			this.gear = MOVING_NO;
			this.rotating = ROTATING_NO;
		},
		ram : [],
		procedures : {
			'turnLeft' : function() {
				self.rotating = ROTATING_COUNTERCLOCKWISE;
			},
			'turnRight' : function() {
				self.rotating = ROTATING_CLOCKWISE;
			},
			'moveFoward' : function() {
				self.gear = MOVING_FOWARD;
			},
			'moveReward' : function() {
				self.gear = MOVING_REWARD;
			},
		},
		execute : function() {
			this.procedures[this.ram.shift()]();
		}
	};
/*
nom_de_linstruction = 'turnLeft';
self.instruction[nom_de_linstruction]()*/


	return self;

}

function World() {

	var directions = [
		{title : 'North',	dx : 0 , dy : -1},
		{title : 'East',	dx : 1 , dy : 0},
		{title : 'South',	dx : 0 , dy : 1},
		{title : 'West',	dx : -1, dy : 0}
	];
	var count_directions = directions.length ;

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
		_nextWhichRobotState : function(which) {
			var robot = this.robots[which];
			var o = this.positions[which].o;
			o += robot.rotating;
			o = ( o < 0 )
				? ( o + count_directions )
				: ( o % count_directions );
			var orientation = directions[o];
			this.positions[which].o = o;
			this.positions[which].x += orientation.dx * robot.gear;
			this.positions[which].y += orientation.dy * robot.gear;
			robot.clearPorts();
		},
/*		nextState : function() {
			for (var which in this.robots ) {
				if (robots.hasOwnProperty(which)) {

				}
			}
		}
*/
	};

	return self;

}


