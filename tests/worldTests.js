"use strict";

QUnit.module("A World should");

QUnit.test("not contain anything at a position where nothing has been added", function() {

	//given
	var world = createWorld();
	var position = createPosition(0,0);
	//when
	var things = world.getThingsByPosition(position)

	//then
	ok(things.length === 0, "nothing at position (0;0)");
});

QUnit.test("contain anything that has been added at a given position", function() {

	//given
	var world = createWorld();
	var position = createPosition(10,20);
	var direction = 0;
	var thing1 = "thing1";
	var thing2 = 2;

	//when
	world.add(thing1, position);
	world.add(thing2, position);
	var content = world.getThingsByPosition(position);

	//then
	ok(content.indexOf(thing1) != -1, "thing1 is contained at this position");
	ok(content.indexOf(thing2) != -1, "thing2 is contained at this position");
});



QUnit.test("not move things on ticks without reason", function() {

	//given
	var world = createWorld();
	var position = createPosition(10,20);
	var thing = "thing";

	//when
	world.add(thing, position);
	world.tick();
	var content = world.getThingsByPosition(position)

	//then
	ok(content[0] == thing);

});

QUnit.test("move running things on tick when nothing is blocking them", function() {

	//given
	var world = createWorld();
	var startPosition = createPosition(10,20);
	var orientation = 3;
	var endPosition = createPosition(9,20);
	var thing = { name: "the thing", isRunning: function() { return true} };

	//when
	world.add(thing, startPosition, orientation);
	world.tick();
	var contentAtEndPosition = world.getThingsByPosition(endPosition);
	var contentAtOldPosition = world.getThingsByPosition(startPosition);

	//then
	equal(contentAtEndPosition[0], thing, "The thing is at end position");
	equal(contentAtOldPosition.length, 0, "The thing is no longer at old position");

});

QUnit.test("not move running things through blocking things", function() {

	//given
	var world = createWorld();
	var startPosition = createPosition(10,20);
	var orientation = 1;
	var endPosition = createPosition(11,20);
	var runningThing = { name: "running Thing", isRunning: function() { return true} };
	var blockingThing = { name : "runningThing", isBlocking: function() { return true} };

	//when
	world.add(runningThing, startPosition, orientation);
	world.add(blockingThing, endPosition, 0);
	world.tick();
	var contentAtEndPosition = world.getThingsByPosition(endPosition);
	var contentAtOldPosition = world.getThingsByPosition(startPosition);

	//then
	equal(contentAtEndPosition[0], blockingThing, "The blockingThing is at end position");
	equal(contentAtEndPosition.length, 1, "Only one thing is at end position (The blockingThing)");
	equal(contentAtOldPosition[0], runningThing, "The running thing is still at old position");

});