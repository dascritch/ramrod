"use strict";

function createItem(type) {
	
	function getType() {
		return type;
	}

	return {
		getType : getType
	}
}
