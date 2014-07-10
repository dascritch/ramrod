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

		build : function (Game) {
			var cl = self.paletteClassnamePrefix;

			element.innerHTML = /*view.responseText*/ '\
				<ul id="palette"></ul>\
				<ol id="instructions"></ol>\
				<button id="execute">Execute</button>\
			';
			var $palette = $('#palette');
			for (var command in self.paletteSymbols) {
				$palette.append( '<li class="'+cl+command+'">'+self.paletteSymbols[command]+' '+command+'</li>' );
			}

			self.ramLength = Game.playerRobotRamLength;

			function preExecute() {
				$('.remove-command').remove();
				$('#palette').hide();
				Game.playerRobotRam = self.listCommandInStack();
				Game.trigger('execute');
			}

			document.getElementById('execute').addEventListener('click',preExecute);
			$palette.on('click','li', self.addCommandInStack );
			$('#instructions').on('click','.remove-command', self.removeCommandInStack , Game );
		},

		listCommandInStack : function() {
			var stack = [];
			$('#instructions li').each(function() {
				stack.push(this.className.substr(self.paletteClassnamePrefix.length));
			});
			return stack;
		},
		addCommandInStack : function() {
			if ($('#instructions li').size() >= self.ramLength) {
				alert('TOO MUCH');
				return ;
			}
			var $li = $(this).clone().append('<button type="button" class="remove-command">×</button>');
		 	$('#instructions').append($li);
		},
		removeCommandInStack : function() {
			$(this).closest('li').remove();
		},

		execute : function(Game) {
			//alert('e000');
		},

		init : function(Game) {
			Game.addTrigger('start', self.build);
			Game.addTrigger('execute', self.execute);
		}
	}

	return self;
}