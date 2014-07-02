
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


test( "Top Gear",function() {
	//Given
	var world = new World();
	var robot = new Robot();
	//When
	world.add(robot, 1,1 , 0);
	robot.gear = 1;
	world.nextRobotState(0);
	var position = world.getPosition(robot);
	//Then
	ok( position.x === 1 , " eh les gars ! on a retrouvé Maurice ! ");
	ok( position.y === 0 , " eh ouais, c'est bien Maurice! ");	
});