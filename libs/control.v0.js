function Control() {

	var element = document.getElementById('control');

	var self = {
		paletteClassnamePrefix : 'control-',
		paletteSymbols : {
			'turnLeft'		: '↶',
			'moveFoward'	: '↑',
			'turnRight'	: '↷',
			'moveReward'	: '↓',
			'nothing'	: '0',
		},
		build : function (Game) {
/*
			var view = new XMLHttpRequest();
			view.open('GET', 'lib/control.v0.html' , false);
			view.send();
*/
			var cl = self.paletteClassnamePrefix;
			var palette = '';
			for (var command in self.paletteSymbols) {
				palette += '<li class="'+cl+command+'">'+self.paletteSymbols[command]+'</li>';
			}
			element.innerHTML = /*view.responseText*/ '\
				<ul id="palette">'+palette+'</ul>\
				<ol id="instructions"></ol>\
				<button id="execute">Execute</button>\
			';

			function preExecute() {
				$('.remove-command').remove();
				$('#palette').hide();
				Game.playerRobotRam = self.listCommandInStack();
				Game.trigger('execute');
			}

			document.getElementById('execute').addEventListener('click',preExecute);
			$('#palette').on('click','li', self.addCommandInStack );
			$('#instructions').on('click','.remove-command', self.removeCommandInStack );
		},
		listCommandInStack : function() {
			var stack = [];
			$('#instructions li').each(function() {
				stack.push(this.className.substr(self.paletteClassnamePrefix.length));
			});
			return stack;
		},
		addCommandInStack : function() {
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