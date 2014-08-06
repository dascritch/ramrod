'use strict';

var Directions = [
	{title : 'North',	dx : 0 , dy : -1},
	{title : 'East',	dx : 1 , dy : 0},
	{title : 'South',	dx : 0 , dy : 1},
	{title : 'West',	dx : -1, dy : 0}
];

Directions.count = 0;
Directions.NORTH = Directions.count++;
Directions.EAST = Directions.count++;
Directions.SOUTH = Directions.count++;
Directions.WEST = Directions.count++;

function createWorld() {

	var playerRobotX;
	var playerRobotY;

	// Position all attributes in Game that are owned by World
	function setupGame(Game) {
		Game.playerRobotRam = [];
		Game.playerRobotRamLength = 6;

		Game.levelWidth = 0;
		Game.levelHeight = 0;

		Game.playerRobotX = 2;
		Game.playerRobotY = 3;
		Game.playerRobotOrientation = Directions[Directions.EAST];
	}

	var slabs = [];

	function _coordinatesToKey(x,y) {
		return x.toString()+','+y.toString();
	}


	var typeOfSlabs = {
		'start'					: {},
		'finish'				: {},
		'wall'					: {},
		'deadly'				: {},
		'conveyorBelt'			: {},
	}

	function declareSlab(type, x, y) {
		if ( type in typeOfSlabs) {
			slabs[_coordinatesToKey(x, y)] = type;
			return true;
		}
		return false;
	}

	function addWall(x, y) {
		declareSlab('wall',x,y)
	}

	function isSlab(type,x,y) {
		return slabs[_coordinatesToKey(x, y)] === type;
	}

	function isWalled(x, y){
		return isSlab( 'wall' , x,y);
	}

	var robots = [];
	var positions = [];

	function addRobot(robot, at_x, at_y , at_o) {
		robots.push( robot );
		positions.push({
			x : at_x,
			y : at_y,
			o : at_o,
		});
	}

	function getPosition(robot) {
		var which = robots.indexOf(robot);
		if (which === -1) {
			return false;
		} else {
			return {
				x : positions[which].x,
				y : positions[which].y,
				o : positions[which].o
			};
		}
	}

	var isFinished = false;

	function _nextWhichRobotState(which) {
		var robot = robots[which];
		if (robot.isFinished) {
			return ;
		}
		var o = positions[which].o;
		o += robot.rotating;
		o = ( o < 0 )
			? ( o + Directions.count )
			: ( o % Directions.count );
		var orientation = Directions[o];
		positions[which].o = o;
		var future_x = positions[which].x + orientation.dx * robot.gear;
		var future_y = positions[which].y + orientation.dy * robot.gear;
		if (! isWalled(future_x,future_y)) {
			positions[which].x = future_x;
			positions[which].y = future_y;
		}

		if (isSlab( 'finish' , future_x , future_y)) {
			robot.isFinished = true;
			isFinished = true;
		}

		robot.clearPorts();
	}

	function nextState() {
		if (isFinished) {
			return ;
		}
		var nbRobots = robots.length;
		for (var i = 0; i<nbRobots; i++) {
			var robot = robots[i];
			robot.execute();
			_nextWhichRobotState(i);
		}
	}

	function init(Game) {
		setupGame(Game);
	}

	return {
		robots: robots,
		slabs: slabs,
		addRobot:addRobot,
		getPosition: getPosition,
		nextState: nextState,
		addWall: addWall,
		isWalled: isWalled,
		declareSlab: declareSlab,
		isSlab: isSlab,
		get isFinished() { return isFinished },
		init: init,


		_coordinatesToKey: _coordinatesToKey,
		_nextWhichRobotState: _nextWhichRobotState

	};
}
