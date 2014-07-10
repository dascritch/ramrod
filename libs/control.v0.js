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
		tileEmptyInStack : '<li class="notyet">?</li>',

		build : function (Game) {
			var cl = self.paletteClassnamePrefix;

			element.innerHTML = /*view.responseText*/ '\
				<ul id="palette"></ul>\
				<ol id="instructions"></ol>\
				<button id="backspace"><b>⌫</b>'+ Game.i18n.removeLastCommand +'</button>\
				<button id="execute">'+ Game.i18n.executeCommands +'</button>\
			';
			var $palette = $('#palette');
			var $instructions = $('#instructions');
			for (var command in self.paletteSymbols) {
				$palette.append( '<li class="'+cl+command+'"><b>'+self.paletteSymbols[command]+'</b> '+Game.i18n.commands[command]+'</li>' );
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

		canEdit : function() {
			$(element).addClass('editable')
		},
		cannotEdit : function() {
			$(element).removeClass('editable')
		},
		listCommandInStack : function() {
			var stack = [];
			$('#instructions li').each(function() {
				stack.push(this.className.substr(self.paletteClassnamePrefix.length));
			});
			return stack;
		},
		addCommandInStack : function() {
			if ($('#instructions li[class!="notyet"]').size() >= self.ramLength) {
				alert('TOO MUCH');
				return ;
			}
			var $li = $(this).clone();
		 	$('#instructions li.notyet').eq(0).replaceWith($li);
		 	if ($('#instructions li[class!="notyet"]').size() == self.ramLength) {
		 		$('#palette').hide();
		 	}
		},
		removeCommandInStack : function() {
			$('#instructions li[class!="notyet"]:last').replaceWith(self.tileEmptyInStack);
			if ($('#instructions li[class!="notyet"]').size() < self.ramLength) {
		 		$('#palette').show();
		 	}
		},

		execute : function(Game) {
			//alert('e000');
		},

		init : function(Game) {
			Game.addTrigger('start', self.build);
			Game.addTrigger('start', self.canEdit);
			Game.addTrigger('execute', self.execute);
		}
	}

	return self;
}