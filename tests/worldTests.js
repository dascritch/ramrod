"use strict";

QUnit.module("A World should");

QUnit.test("Initialize game's attributes when it is initialized", function() {

	//given
	var aWorld = createWorld();
	var mockGame = {

		playerRobotX: undefined,
		playerRobotY: undefined,

		levelWidth: undefined,
		levelHeight: undefined,

	};

	//when
	aWorld.init(mockGame);

	//then
	notDeepEqual(mockGame.playerRobotY, undefined, "player robot Y has been initialized");
	notDeepEqual(mockGame.playerRobotX, undefined, "player robot X has been initialized");
	notDeepEqual(mockGame.levelWidth, undefined, "level width has been initialized");
	notDeepEqual(mockGame.levelHeight, undefined, "level height Y has been initialized");

});
