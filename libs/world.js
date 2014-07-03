'use strict';

var FACING_NORTH = 0;
var FACING_EAST = 1;
var FACING_SOUTH = 2;
var FACING_WEST = 3;

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
		slabs : [],
		addRobot: function(robot, at_x, at_y , at_o) {
			this.robots.push( robot );
			this.positions.push({
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
			var future_x = this.positions[which].x + orientation.dx * robot.gear;
			var future_y = this.positions[which].y + orientation.dy * robot.gear;
			if (! this.isWalled(future_x,future_y)) { 
				this.positions[which].x = future_x;
				this.positions[which].y = future_y;
			}
			robot.clearPorts();
		},
		nextState : function() {
			for (var which in this.robots ) {
				if (this.robots.hasOwnProperty(which)) {
					this.robots[which].execute();
					this._nextWhichRobotState(which);
				}
			}
		},
		defaultSlab : {
			willDie		: false,
			canAccess	: true,
			dx			: 0,
			dy			: 0
		},
		typeOfSlabs : {
			'start'					: {},
			'finish'				: {willFinish : true },
			'wall'					: {canAccess : false},
			'deadly'				: {willDie : true},
			'conveyorBeltToNorth'	: { dy : -1 },
		},
		coordinatesToKey : function(x,y) {
			return x.toString()+','+y.toString();
		},
		declareSlab : function(type, x, y) {
			self.slabs[this.coordinatesToKey(x, y)] = type;
		},
		addWall : function(x, y) {
			this.declareSlab('wall',x,y)
		},
		isWalled : function(x, y){
			return self.slabs[this.coordinatesToKey(x, y)] === 'wall';
		}
	};

	return self;
}
