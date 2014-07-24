"use strict";

QUnit.module("This test is not in a module :( ...");

test( "Robot", function() {
	ok( typeof Robot === "function", "Robot Model Exists" );

});


test( "World initialisation",function() {

	//Given
	var world = createWorld();

	//When
	//Nothing is done

	//Then
	ok( world.robots.length === 0, "New worlds have no robots");
	ok( world.slabs.length === 0, "New worlds have no robots");

});

test( "Adding robots in a world",function() {

	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 1,1);
	//Then
	ok( world.robots.length === 1, "There is one robot in the world");
	deepEqual( world.robots[0] , robot, "the first robot is the only added robot");
	var position = world.getPosition(robot);
	ok( position.x === 1 , " eh les gars ! on a retrouvé Maurice ! ");
	ok( position.y === 1 , " eh ouais, c'est bien Maurice! ");

});

test( "Gearing north",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 1,1 , 0);
	robot.gear = 1;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	ok( position.x === 1 , " eh les gars ! on a retrouvé Maurice ! ");
	ok( position.y === 0 , " eh ouais, c'est bien Maurice! ");
});

test( "Rotating to east",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 1,1 , FACING_NORTH);
	robot.gear = MOVING_FOWARD;
	robot.rotating = ROTATING_CLOCKWISE;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	ok( position.x === 2 , " x is now increased");
	ok( position.y === 1 , " y didn't change");
});

test( "Rotating to west",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 10, 20 , FACING_NORTH);
	robot.gear = MOVING_FOWARD;
	robot.rotating = ROTATING_COUNTERCLOCKWISE;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	ok( position.x === 9 , " x is now decreased");
	ok( position.y === 20 , " y didn't change");
});

test( "u turn to facing south",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 2, 2 , FACING_NORTH);
	robot.gear = MOVING_FOWARD;
	robot.rotating = ROTATING_UTURN;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	ok( position.x === 2 , " x didn't change");
	ok( position.y === 3 , " y increased");
});

test( "from east to north",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 2, 2 , FACING_WEST);
	robot.rotating = ROTATING_CLOCKWISE;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	ok( position.o === FACING_NORTH , " seeing the North");
});

test( "rear gear seeing north",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 2, 2 , FACING_NORTH);
	robot.gear = MOVING_REWARD;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	equal( position.y , 3 , " y increased");
});

test( "robot's registers are reseted at next state",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 2, 2 , FACING_NORTH);
	robot.gear = MOVING_REWARD;
	robot.rotating = ROTATING_CLOCKWISE;
	world._nextWhichRobotState(0);
	//Then
	equal( robot.gear , MOVING_NO , " not moving ");
	equal( robot.rotating , MOVING_NO , " not rotating ");
});

test( "programming robot move foward",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 2, 2 , FACING_NORTH);
	robot.ram = ['moveFoward'];
	robot.execute();
	world._nextWhichRobotState(0);
	//Then
	var position = world.getPosition(robot);
	ok( position.x === 2 , " x is now increased");
	ok( position.y === 1 , " y didn't change");
	equal( robot.gear , MOVING_NO , " not moving ");
	equal( robot.rotating , MOVING_NO , " not rotating ");
});


test( "programming robot move foward , turn right, move foward",function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addRobot(robot, 2, 2 , FACING_NORTH);
	robot.ram = ['moveFoward' , 'turnLeft' , 'moveBackward'];
	for (var i = robot.ram.length ; i > 0  ; i--) {
		/*robot.execute();
		world._nextWhichRobotState(0);*/
		world.nextState();
	}
	//Then
	var position = world.getPosition(robot);
	equal( position.x , 3 , " x is now increased");
	equal( position.y , 1 , " y didn't change");
	equal( robot.gear , MOVING_NO , " not moving ");
	equal( robot.rotating , MOVING_NO , " not rotating ");
});

test( "Adding walls to a world", function() {

	//Given
	var world = createWorld();
	var WALL_1_X = 10;
	var WALL_1_Y = 20;
	var WALL_2_X = 30;
	var WALL_2_Y = 40;
	var WALL_3_X = 50;
	var WALL_3_Y = 60;

	//When
	world.addWall(WALL_1_X, WALL_1_Y);
	world.addWall(WALL_2_X, WALL_2_Y);

	//Then
	ok( world.isWalled(WALL_1_X, WALL_1_Y), "Wall 1 found");
	ok( world.isWalled(WALL_2_X, WALL_2_Y), "Wall 2 found");
	ok( !world.isWalled(WALL_3_X, WALL_3_Y) , "Wall 3 not found");

});

test( "walls outside path aren't interfering", function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	//When
	world.addWall(10, 2);
	world.addRobot(robot, 2, 3 , FACING_NORTH);
	robot.ram = ['moveFoward'];
	world.nextState();
	//Then
	var position = world.getPosition(robot);
	equal( position.x , 2 , " not moving laterally");
	equal( position.y , 2 , " stopped by the wall");
});

test( "bumping in the wall", function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	var position;
	//When
	world.addWall(2, 2);
	world.addRobot(robot, 2, 3 , FACING_NORTH);
	robot.ram = ['moveFoward'];
	world.nextState();
	//Then
	position = world.getPosition(robot);
	equal( position.x , 2 , " not moving laterally");
	equal( position.y , 3 , " stopped by the wall");

	robot.ram = ['moveBackward'];
	world.nextState();
	position = world.getPosition(robot);
	equal( position.x , 2 , " laterally");
	equal( position.y , 4 , " vertically");
});

test ('coordinates x and y to a string for key' , function() {
	var world = createWorld();
	equal(world._coordinatesToKey(5,-9) , '5,-9' , "ok for syntax");
});

test( "invalid Declare Slab", function() {
	//Given
	var world = createWorld();
	//When
	ok( !world.declareSlab('inexisting',2, 2) , "castorama doesnt have it" );
	ok( !world.isSlab('inexisting',2,2) , " type of slab inexisting not instalable ");
});

test( "isFinished", function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	var position;
	//When
	world.declareSlab('finish',2, 2);
	world.addRobot(robot, 2, 4 , FACING_NORTH);
	ok( !robot.isFinished , " Robot not winner yet ");
	ok( !world.isFinished , " Not a single winner yet ");
	robot.ram = ['moveFoward','moveFoward'];

	world.nextState();
	ok( !robot.isFinished , " Robot not winner yet ");
	ok( !world.isFinished , " Not a single winner yet ");

	world.nextState();
	ok( robot.isFinished , " This robot has finished ");
	ok( world.isFinished , " Not a single winner yet ");
});

test( "no more moves when play finished", function() {
	//Given
	var world = createWorld();
	var robot = new Robot();
	var position;
	//When
	world.declareSlab('finish',2, 2);
	world.addRobot(robot, 2, 4 , FACING_NORTH);
	ok( !robot.isFinished , " Robot not winner yet ");
	ok( !world.isFinished , " Not a single winner yet ");
	robot.ram = ['moveFoward','moveFoward','moveFoward'];

	world.nextState();
	ok( !robot.isFinished , " Robot not winner yet ");
	ok( !world.isFinished , " Not a single winner yet ");

	world.nextState();
	world.nextState();
	position = world.getPosition(robot);
	equal( position.x , 2 , "horizontal");
	equal( position.y , 2 , "vertical");
});