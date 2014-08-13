"use strict";

function createPosition(x, y) {
	
	function getX() { return x }
	function getY() { return y }

	function equal(position) { return (position.getX() == x) && (position.getY() == y) }

	/**
	  Direction :
	    0
	  3 + 1
	    2
	**/
	function translate(direction) {
		return createPosition(
			x + Math.round(Math.sin(direction * Math.PI / 2)),
			y + Math.round(-Math.cos(direction * Math.PI / 2))
		)
	}

	return {
		getX:		getX,
		getY:		getY,
		translate: 	translate,
		equal:		equal
	}
}