function Control() {

	var element = document.getElementById('control');

	var self = {
		paletteClassnamePrefix : 'control-',
		paletteSymbols : {
			'turnLeft'		: '↶',
			'moveFoward'	: '↑',
			'turnRight'		: '↷',
			'moveBackward'	: '↓',
			'noOperation'	: '…',
		},
		ramLength : 0,
		tileEmptyInStack : '<li class="notyet"><b>?</b></li>',

		build : function (Game) {
			self.Game = Game;

			var cl = self.paletteClassnamePrefix;

			element.innerHTML = /*view.responseText*/ '\
				<ul id="palette"></ul>\
				<ol id="instructions"></ol>\
				<button id="backspace" title="'+ Game.i18n.removeLastCommand +'">\
					<b>⌫</b>\
					<span>'+ Game.i18n.removeLastCommand +'</span>\
				</button>\
				<button id="upload" title="'+ Game.i18n.uploadCommands +'">\
					<b>⇒</b>\
					<span>'+ Game.i18n.uploadCommands +'</span>\
				</button>\
				<button id="execute" title="'+ Game.i18n.executeCommands +'">\
					<b>⎆</b>\
					<span>'+ Game.i18n.executeCommands +'</span>\
				</button>\
				<span>\
					0 moves\
				</span>\
			';
			var $palette = $('#palette');
			var $instructions = $('#instructions');
			for (var command in self.paletteSymbols) {
				$palette.append( '<li class="'+cl+command+'" title="'+Game.i18n.commands[command]+'">'+
									'<b>'+self.paletteSymbols[command]+'</b>'+
									'<span>'+Game.i18n.commands[command]+'</<span>'+
								'</li>' );
			}

			self.ramLength = Game.playerRobotRamLength;

			for (var i = 0 ; i < self.ramLength ; i++) {
				$instructions.append(self.tileEmptyInStack);
			}

			$palette.on('click','li', self.addCommandInStack );
			$('#backspace').on('click', self.removeCommandInStack );
		},

		updateCursor : function() {
			$('.activeCommand').removeClass('activeCommand');
		 	$('#instructions li.notyet').eq(0).addClass('activeCommand');
		 },
		canEdit : function() {
			$(element).addClass('editable')
			self.updateCursor();
		},
		cannotEdit : function() {
			$(element).removeClass('editable')
			$('.activeCommand').removeClass('activeCommand');
		},
		listCommandInStack : function() {
			var stack = [];
			$('#instructions li').each(function() {
				stack.push(this.className.match(self.paletteClassnamePrefix + "(\\S*).*")[1]);
			});
			return stack;
		},
		preUpload : function() {
			self.cannotEdit();
			self.setUploadEnabled(false);
			self.setExecutionEnabled();
			self.Game.playerRobotRam = self.listCommandInStack();
			self.Game.trigger('upload');
		},
		setUploadEnabled : function(enabled) {
			var uploadButton = $('#upload');

			if(enabled) {
				uploadButton.on('click',self.preUpload);
				uploadButton.addClass('enabled');
			} else {
				uploadButton.off('click',self.preUpload);
				uploadButton.removeClass('enabled');
			}
		},
		setExecutionEnabled: function() {
			var executeButton = $('#execute');
			executeButton.on('click', self.execute);
			executeButton.addClass('enabled');
		},
		execute : function() {
			console.log("gui asking for execution");
			self.Game.trigger("robot.execute");
		},
		addCommandInStack : function() {
			if ($('#instructions li.yet').size() >= self.ramLength) {
				alert('TOO MUCH');
				return ;
			}
			var $li = $(this).clone();
			$li.addClass('yet');
		 	$('#instructions li.notyet').eq(0).replaceWith($li);
		 	self.updateCursor();
		 	if ($('#instructions li.yet').size() == self.ramLength) {
				$('#palette').addClass('nomore');
		 		self.setUploadEnabled(true);
		 	}
		},
		removeCommandInStack : function() {
			$('#instructions li.yet:last').replaceWith(self.tileEmptyInStack);
			self.updateCursor();

			if ($('#instructions li.yet').size() < self.ramLength) {
		 		$('#palette').removeClass('nomore');
		 		self.setUploadEnabled(false);
		 	}
		},
		levelWin : function(Game) {
			$('#control').empty().html(Game.i18n.youWin+'<p><button id="nextlevel">'+Game.i18n.goNextLevel+'</button></p>')
		},
		init : function(Game) {
			Game.addTrigger('start', self.build);
			Game.addTrigger('start', self.canEdit);
			Game.addTrigger('robot.uploaded', self.setExecutionEnabled);
			Game.addTrigger('levelWin', self.levelWin);
		}
	}

	return self;
}