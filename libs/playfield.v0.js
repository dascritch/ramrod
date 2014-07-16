function Playfield() {
	var element = document.getElementById('playfield');

	var self = {
		build : function (Game) {
			var bulk = '';
			for (var v = 0 ; v < 5 ; v++) {
				bulk += '<p>';
				for (var h = 0 ; h < 5 ; h++) {
					bulk += '<span></span>';
				}
				bulk += '</p>';
			}
			// adding bot
			bulk += '<b>⇑</b>';

			element.innerHTML = bulk;
		},

		init : function(Game) {
			Game.addTrigger('start', self.build);
		}
	}

	return self;

}
