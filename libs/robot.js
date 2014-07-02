'use strict';

var ROTATING_CLOCKWISE = 1;
var ROTATING_NO = 0;
var ROTATING_COUNTERCLOCKWISE = -1;
var ROTATING_UTURN = 2;
var MOVING_FOWARD = 1;
var MOVING_NO = 0;
var MOVING_REWARD = -1;


function Robot() {

	var self = {
		gear : MOVING_NO,
		rotating : ROTATING_NO,
		clearPorts : function() {
			this.gear = MOVING_NO;
			this.rotating = ROTATING_NO;
		},
		ram : [],
		procedures : {
			'turnLeft' : function() {
				self.rotating = ROTATING_COUNTERCLOCKWISE;
			},
			'turnRight' : function() {
				self.rotating = ROTATING_CLOCKWISE;
			},
			'moveFoward' : function() {
				self.gear = MOVING_FOWARD;
			},
			'moveReward' : function() {
				self.gear = MOVING_REWARD;
			},
		},
		execute : function() {
			this.procedures[this.ram.shift()]();
		}
	};
/*
nom_de_linstruction = 'turnLeft';
self.instruction[nom_de_linstruction]()*/


	return self;

}

