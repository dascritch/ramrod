function Control(Game) {

	var element = document.getElementById('control');

	var self = {
		build : function (Game) {
/*
			var view = new XMLHttpRequest();
			view.open('GET', 'lib/control.v0.html' , false);
			view.send();
*/
			element.innerHTML = /*view.responseText*/ '\
				<ul id="palette">\
					<li class="control-turnLeft">↶</li>\
					<li class="control-moveFoward">↑</li>\
					<li class="control-turnRight">↷</li>\
					<li class="control-moveReward">↓</li>\
				</ul>\
				<ol id="instructions">\
				</ol>\
				<button id="execute">Execute</button>\
			';
			document.getElementById('execute').addEventListener('click',function() {
				 Game.trigger('execute');
			});
			$('#palette').on('click','li', self.addCommandInStack );
			$('#instructions').on('click','.remove-command', self.removeCommandInStack );
		},
		addCommandInStack : function() {
			var $li = $(this).clone().append('<button type="button" class="remove-command">×</button>');
		 	$('#instructions').append($li);
		},
		removeCommandInStack : function() {
			$(this).closest('li').remove();
		},
		execute : function(Game) {
			alert('e000');
		}
	}

	Game.addTrigger('start', self.build);
	Game.addTrigger('execute', self.execute);
	return self;
}