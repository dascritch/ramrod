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
		ram : [],
		isFinished : false,

		gear : MOVING_NO,
		rotating : ROTATING_NO,
		clearPorts : function() {
			this.gear = MOVING_NO;
			this.rotating = ROTATING_NO;
		},
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
			'moveBackward' : function() {
				self.gear = MOVING_REWARD;
			},
		},
		execute : function(Game) {
			var currentOpcode = self.ram.shift();
			var currentInstruction = self.procedures[currentOpcode];

			console.log("Executing instruction: ", currentOpcode);

			currentInstruction();

		},
		upload : function(Game) {
			console.log("I'm being uploaded !", Game.playerRobotRam);
			self.ram = Game.playerRobotRam.slice(0);
			Game.trigger('robot.uploaded');
		},
		init : function(Game) {
			Game.addTrigger("upload", self.upload);
			Game.addTrigger("robot.execute", self.execute);
		}
	};
	
	return self;
}

