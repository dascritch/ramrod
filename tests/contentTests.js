"use strict";

QUnit.module("A content should");

QUnit.test("be initialized from a json string", function() {

	//given
	var treeDto = {"type":"wall","x":"10","y":"40","o":"1"};

	//when
	var content = createContentFromDto(treeDto);

	//then
	equal(content.getPosition().getX(), 10, "content create at proper x position");
	equal(content.getPosition().getY(), 40, "content create at proper x position");
	equal(content.getOrientation(), 1, "content create with proper orientation");
	equal(content.getItem().getType(), "wall", "created item is a wall");
	ok(content.getItem().isBlocking(), "created item is bloking");
});
