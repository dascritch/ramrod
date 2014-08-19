"use strict";

/**
  A content an Item in the world,
  at a given position and in a given direction
*/
function createContent(item, position, orientation) {

	if(orientation === undefined) {
		orientation = 0;
	}

	function getPosition() { return position }
	function getOrientation() { return orientation }
	function getItem() { return item }

	return {
		getItem:		getItem,
		getPosition:	getPosition,
		getOrientation: getOrientation
	}
}

function createContentFromDto(dto) {
	return createContent("a", "b", "c");
}