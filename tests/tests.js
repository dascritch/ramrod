
test( "Robot", function() {
	ok( typeof Robot === "function", "Robot Model Exists" );

});


test( "World initialisation",function() {

	//Given
	var world = new World();

	//When
	//Nothing is done

	//Then
	ok( world.robots.length === 0, "New world d'ont have robots");

});

test( "Adding robots in a world",function() {

	//Given
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 1,1);
	//Then
	ok( world.robots.length === 1, "There is one robot in the world");
	deepEqual( world.robots[0] , robot, "the first robot is the only added robot");
	var position = world.getPosition(robot);
	ok( position.x === 1 , " eh les gars ! on a retrouvé Maurice ! ");
	ok( position.y === 1 , " eh ouais, c'est bien Maurice! ");

});


test( "Gearing north",function() {
	//Given
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 1,1 , 0);
	robot.gear = 1;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	ok( position.x === 1 , " eh les gars ! on a retrouvé Maurice ! ");
	ok( position.y === 0 , " eh ouais, c'est bien Maurice! ");	
});

test( "Rotating to east",function() {
	//Given
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 1,1 , FACING_NORTH);
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
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 10, 20 , FACING_NORTH);
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
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 2, 2 , FACING_NORTH);
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
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 2, 2 , FACING_WEST);
	robot.rotating = ROTATING_CLOCKWISE;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	ok( position.o === FACING_NORTH , " seeing the North");
});

test( "rear gear seeing north",function() {
	//Given
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 2, 2 , FACING_NORTH);
	robot.gear = MOVING_REWARD;
	world._nextWhichRobotState(0);
	var position = world.getPosition(robot);
	//Then
	equal( position.y , 3 , " y increased");
});

test( "robot's registers are reseted at next state",function() {
	//Given
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 2, 2 , FACING_NORTH);
	robot.gear = MOVING_REWARD;
	robot.rotating = ROTATING_CLOCKWISE;
	world._nextWhichRobotState(0);
	//Then
	equal( robot.gear , MOVING_NO , " not moving ");
	equal( robot.rotating , MOVING_NO , " not rotating ");
});

test( "programming robot move foward",function() {
	//Given
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 2, 2 , FACING_NORTH);
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
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 2, 2 , FACING_NORTH);
	robot.ram = ['moveFoward' , 'turnLeft' , 'moveReward'];
	for (var i = robot.ram.length ; i > 0  ; i--) {
		robot.execute();
		world._nextWhichRobotState(0);
	}
	//Then
	var position = world.getPosition(robot);
	equal( position.x , 3 , " x is now increased");
	equal( position.y , 1 , " y didn't change");
	equal( robot.gear , MOVING_NO , " not moving ");
	equal( robot.rotating , MOVING_NO , " not rotating ");
});