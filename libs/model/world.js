"use strict";

			// var position = createPosition(content.x, content.y);
			// var item = createItem(content.type);
			// add(item, position, content.orientation); 


function createWorld(worldDto, createContentFromDto) {

	var contents = [];

	if(worldDto != undefined ) {

		worldDto.forEach(function(content) {
			contents = createContentFromDto(content);
		});

	}

	function add(item, position, orientation) {

		var content = createContent(item, position, orientation);
		contents.push(content);

	}

	function tick() {

		contents.forEach(function(content) {
			var item = content.getItem();

			if(item.tick) {
				item.tick();
			}
		})
		
		contents.forEach(function(content) {

			var item = content.getItem();
			if(item.isRunning && item.isRunning()) {

				var finalPosition = content.getPosition().translate(content.getOrientation());

				var itemsAtFinalPosition = getItemsByPosition(finalPosition);
				var blockingItemAtFinalPosition = false;

				var nbOfItemsAtFinalPosition = itemsAtFinalPosition.length;				
				for(var j = 0; j < nbOfItemsAtFinalPosition; j++) {
					var itemAtFinalPosition = itemsAtFinalPosition[j];
					if(itemAtFinalPosition.isBlocking && itemAtFinalPosition.isBlocking()) {
						blockingItemAtFinalPosition = true;
						break;
					}
				}

				if(!blockingItemAtFinalPosition) {
					remove(content);				
					add(
						content.getItem(),
						finalPosition,
						content.getOrientation()
					)
				}
			}

		});
	}

	function getItemsByPosition(position) {
		
		var result = [];

		var contentsLength = contents.length;
		for(var i = 0; i < contentsLength; i++) {
			var currentContent = contents[i];
			if(currentContent.getPosition().equal(position)) {
				result.push(currentContent.getItem());
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
		getItemsByPosition: 	getItemsByPosition,
		tick:					tick
	}
}
