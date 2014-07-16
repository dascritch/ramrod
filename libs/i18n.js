function i18n() {

	var self = {
		messages : {
			"commands" 			: {
				"turnLeft"		: "turn left",
				"moveFoward"	: "move foward",
				"turnRight"		: "turn right",
				"moveBackward"	: "move backward",
				"noOperation"	: "no operation",
			},
			"removeLastCommand"	: "Remove",
			"uploadCommands"	: "Upload",
			"executeCommands"	: "Execute !",
			"youWin"			: "You win !!!",
			"goNextLevel"		: "Go to next level !"
		},
		init : function(Game) {
			Game.i18n = self.messages;
		}

	}

	return self;

}