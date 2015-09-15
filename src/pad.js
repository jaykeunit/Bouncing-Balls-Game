"use strict";
var Pad = {
	padPosition: {x: 136, y: 118},
	padWidth: 60,
	drawPad: function(context) {
		context.save();
		context.lineWidth = 3;
		context.strokeStyle = 'white';
		GameCanvas.drawLine(Pad.padPosition.x - Pad.padWidth / 2, Pad.padPosition.y, Pad.padPosition.x + Pad.padWidth / 2, Pad.padPosition.y ,context);
		context.restore();
	}
};

