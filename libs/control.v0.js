function Control() {

	var element = document.getElementById('control');

	var self = {
		paletteClassnamePrefix : 'control-',
		paletteSymbols : {
			'turnLeft'		: '↶',
			'moveFoward'	: '↑',
			'turnRight'		: '↷',
			'moveReward'	: '↓',
			'noOperation'	: '…',
		},
		ramLength : 0,
		tileEmptyInStack : '<li class="notyet"><b>?</b></li>',

		build : function (Game) {
			var cl = self.paletteClassnamePrefix;

			element.innerHTML = /*view.responseText*/ '\
				<ul id="palette"></ul>\
				<ol id="instructions"></ol>\
				<button id="backspace"><b>⌫</b><span>'+ Game.i18n.removeLastCommand +'</span></button>\
				<button id="execute"><b>⎆</b><span>'+ Game.i18n.executeCommands +'</span></button>\
			';
			var $palette = $('#palette');
			var $instructions = $('#instructions');
			for (var command in self.paletteSymbols) {
				$palette.append( '<li class="'+cl+command+'">'+
									'<b>'+self.paletteSymbols[command]+'</b>'+
									'<span>'+Game.i18n.commands[command]+'</<span>'+
								'</li>' );
			}

			self.ramLength = Game.playerRobotRamLength;

			for (var i = 0 ; i < self.ramLength ; i++) {
				$instructions.append(self.tileEmptyInStack);
			}

			function preExecute() {
				self.cannotEdit();
				Game.playerRobotRam = self.listCommandInStack();
				Game.trigger('execute');
			}

			document.getElementById('execute').addEventListener('click',preExecute);
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
				stack.push(this.className.substr(self.paletteClassnamePrefix.length));
			});
			return stack;
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
		 		$('#palette').hide();
		 	}
		},
		removeCommandInStack : function() {
			$('#instructions li.yet:last').replaceWith(self.tileEmptyInStack);
			self.updateCursor();

			if ($('#instructions li.yet').size() < self.ramLength) {
		 		$('#palette').show();
		 	}
		},

		execute : function(Game) {
			//alert('e000');
		},
		executeMove : function(Game) {
			$('.activeCommand').removeClass('activeCommand');
		 	$('#instructions li').eq(Game.actualMoveInSequence).addClass('activeCommand');
		},
		executeMyMove : function(Game) {
			// Game.totalMovesInLevel;
		},
		levelWin : function(Game) {
			$('#control').empty().html(Game.i18n.youWin+'<p><button id="nextlevel">'+Game.i18n.goNextLevel+'</button></p>')
		},
		init : function(Game) {
			Game.addTrigger('start', self.build);
			Game.addTrigger('start', self.canEdit);
			Game.addTrigger('execute', self.execute);
			Game.addTrigger('levelWin', self.levelWin);
		}
	}

	return self;
}