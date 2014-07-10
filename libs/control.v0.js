function Control(Game) {

	var element = document.getElementById('control');

	var self = {
		paletteClassnamePrefix : 'control-',
		build : function (Game) {
/*
			var view = new XMLHttpRequest();
			view.open('GET', 'lib/control.v0.html' , false);
			view.send();
*/
			var cl = self.paletteClassnamePrefix;
			element.innerHTML = /*view.responseText*/ '\
				<ul id="palette">\
					<li class="'+cl+'turnLeft">↶</li>\
					<li class="'+cl+'moveFoward">↑</li>\
					<li class="'+cl+'turnRight">↷</li>\
					<li class="'+cl+'moveReward">↓</li>\
				</ul>\
				<ol id="instructions">\
				</ol>\
				<button id="execute">Execute</button>\
			';
			document.getElementById('execute').addEventListener('click',self.preExecute);
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
		preExecute : function() {
			$('.remove-command').remove();
			$('#palette').hide();
			Game.playerRobotRam = self.listCommandInStack();
			Game.trigger('execute');
		},
		execute : function(Game) {
			//alert('e000');
		}
	}

	Game.addTrigger('start', self.build);
	Game.addTrigger('execute', self.execute);
	return self;
}