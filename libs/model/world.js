"use strict";

function createWorld() {

	var contents = [];

	function add(thing, position, orientation) {

		if(orientation === undefined) {
			orientation = 0;
		}
		var content = createContent(thing, position, orientation);
		contents.push(content);

	}

	function tick() {
		contents.forEach(function(content) {

			var thing = content.getThing();
			if(thing.isRunning && thing.isRunning()) {

				var finalPosition = content.getPosition().translate(content.getOrientation());

				var thingsAtFinalPosition = getThingsByPosition(finalPosition);
				var blockingThingAtFinalPosition = false;

				var nbOfThingsAtFinalPosition = thingsAtFinalPosition.length;				
				for(var j = 0; j < nbOfThingsAtFinalPosition; j++) {
					var thingAtFinalPosition = thingsAtFinalPosition[j];
					if(thingAtFinalPosition.isBlocking && thingAtFinalPosition.isBlocking()) {
						blockingThingAtFinalPosition = true;
						break;
					}
				}

				if(!blockingThingAtFinalPosition) {
					remove(content);				
					add(
						content.getThing(),
						finalPosition,
						content.getOrientation()
					)
				}
			}

		});
	}

	function getThingsByPosition(position) {
		
		var result = [];

		var contentsLength = contents.length;
		for(var i = 0; i < contentsLength; i++) {
			var currentContent = contents[i];
			if(currentContent.getPosition().equal(position)) {
				result.push(currentContent.getThing());
			}
		}

		return result
	}

	function remove(contentToRemove) {
		contents = contents.filter(function(content) {
			return content != contentToRemove
		});
	}

	return {
		add :					add,
		getThingsByPosition:	getThingsByPosition,
		tick:					tick
	}
}

/**
  A content is something in the world,
  at a given position and in a given direction
*/
function createContent(thing, position, orientation) {

	function getPosition() { return position }
	function getOrientation() { return orientation }
	function getThing() { return thing }

	return {
		getThing:		getThing,
		getPosition:	getPosition,
		getOrientation: getOrientation
	}
}
