"use strict";

QUnit.module("A World should");

QUnit.test("not contain anyitem at a position where no item has been added", function() {

	//given
	var world = createWorld();
	var position = createPosition(0,0);
	//when
	var items = world.getItemsByPosition(position)

	//then
	ok(items.length === 0, "no item at position (0;0)");
});

QUnit.test("contain anything that has been added at a given position", function() {

	//given
	var world = createWorld();
	var position = createPosition(10,20);
	var direction = 0;
	var item1 = "item1";
	var item2 = 2;

	//when
	world.add(item1, position);
	world.add(item2, position);
	var content = world.getItemsByPosition(position);

	//then
	ok(content.indexOf(item1) != -1, "item1 is contained at this position");
	ok(content.indexOf(item2) != -1, "item2 is contained at this position");
});

QUnit.test("not move items on ticks without reason", function() {

	//given
	var world = createWorld();
	var position = createPosition(10,20);
	var item = "item";

	//when
	world.add(item, position);
	world.tick();
	var content = world.getItemsByPosition(position)

	//then
	ok(content[0] == item);

});

QUnit.test("move running items on tick when noitem is blocking them", function() {

	//given
	var world = createWorld();
	var startPosition = createPosition(10,20);
	var orientation = 3;
	var endPosition = createPosition(9,20);
	var item = { name: "the item", isRunning: function() { return true} };

	//when
	world.add(item, startPosition, orientation);
	world.tick();
	var contentAtEndPosition = world.getItemsByPosition(endPosition);
	var contentAtOldPosition = world.getItemsByPosition(startPosition);

	//then
	equal(contentAtEndPosition[0], item, "The item is at end position");
	equal(contentAtOldPosition.length, 0, "The item is no longer at old position");

});

QUnit.test("not move running items through blocking items", function() {

	//given
	var world = createWorld();
	var startPosition = createPosition(10,20);
	var orientation = 1;
	var endPosition = createPosition(11,20);
	var runningItem = { name: "running item", isRunning: function() { return true} };
	var blockingItem = { name : "running item", isBlocking: function() { return true} };

	//when
	world.add(runningItem, startPosition, orientation);
	world.add(blockingItem, endPosition, 0);
	world.tick();
	var contentAtEndPosition = world.getItemsByPosition(endPosition);
	var contentAtOldPosition = world.getItemsByPosition(startPosition);

	//then
	equal(contentAtEndPosition[0], blockingItem, "The blockingitem is at end position");
	equal(contentAtEndPosition.length, 1, "Only one item is at end position (The blockingitem)");
	equal(contentAtOldPosition[0], runningItem, "The running item is still at old position");

});

QUnit.test("not move running items through blocking items", function() {

	//given
	var world = createWorld();
	var startPosition = createPosition(10,20);
	var orientation = 1;
	var endPosition = createPosition(11,20);
	var runningItem = { name: "running item", isRunning: function() { return true} };
	var blockingItem = { name : "runningitem", isBlocking: function() { return true} };

	//when
	world.add(runningItem, startPosition, orientation);
	world.add(blockingItem, endPosition, 0);
	world.tick();
	var contentAtEndPosition = world.getItemsByPosition(endPosition);
	var contentAtOldPosition = world.getItemsByPosition(startPosition);

	//then
	equal(contentAtEndPosition[0], blockingItem, "The blockingitem is at end position");
	equal(contentAtEndPosition.length, 1, "Only one item is at end position (The blockingitem)");
	equal(contentAtOldPosition[0], runningItem, "The running item is still at old position");

});

QUnit.test("initialize themselves from a dto", function() {

	//given
	var wallDto = {"type":"wall","x":"10","y":"20"};
	var treeDto = {"type":"tree","x":"10","y":"40","o":"1"};
	var worldDto = [wallDto, treeDto];

	var converter = { createItemFromDto: function() {} };
	var mockConverter = sinon.mock(converter);
	mockConverter.expects("createItemFromDto").once().withExactArgs(treeDto);
	mockConverter.expects("createItemFromDto").once().withExactArgs(wallDto);

	var createItemFromDto = function(param) {
		converter.createItemFromDto(param);
	}

    // var tenTwentyPosition = createPosition(10,20);
    // var tenFourtyPosition = createPosition(10,40);

    //when
    var world = createWorld(worldDto, createItemFromDto);

    // var itemsAtTenTwenty = world.getItemsByPosition(tenTwentyPosition);
    // var itemsAtTenFourtyPosition = world.getItemsByPosition(tenFourtyPosition);

    //then

	ok(mockConverter.verify());    
    // equal(itemsAtTenTwenty.length, 1, "there is exactly one item at position (10;20)");
    // equal(itemsAtTenTwenty[0].getType(), "wall", "there is a wall at (10;20)");
    // ok(itemsAtTenTwenty[0].isBlocking(), "created wall is bloking");

    // equal(itemsAtTenFourtyPosition.length, 2, "there are exactly two items at position (10;20)");
    // equal(itemsAtTenFourtyPosition[0].getType(), "tree", "there is a tree at (10;40)");
    // ok(!itemsAtTenFourtyPosition[0].isBlocking(), "created tree is not bloking");
    // equal(itemsAtTenFourtyPosition[1].getType(), "trap", "there is a trap at (10;40)");

});

QUnit.test("tick items in it when ticked", function() {

	//given

	var mockItem = function(){

		var ticked = false;

		return {
			tick : function() { ticked = true; },
			satisfied : function() { return ticked }
		}
	}();

	var world = createWorld();
	var position = createPosition(0,0);

	//when
	world.add(mockItem, position);
	world.tick();

	//then
	ok(mockItem.satisfied(), "item has been ticked");
});