"use strict";
var BoxBarrier = {
	left: 0,
	right: 0,
	bottom: 0,
	width: 600,
	drawRectangle: function(canvas, context){
		var xCenter = canvas.width / 2;
		var yCenter = canvas.height / 1.2;
		var xDisplacement = 300;
		var yDisplacement = 300;

		this.left = xCenter - xDisplacement + 5;
		this.right = xCenter + xDisplacement - 5;
		this.bottom = yCenter - 5;
		this.width = xDisplacement * 2;
	
		context.save();
		context.lineWidth = 10;
		context.strokeStyle = 'purple';
		GameCanvas.drawLine(xCenter - xDisplacement - 5, yCenter, xCenter + xDisplacement + 5, yCenter, context);
		GameCanvas.drawLine(xCenter - xDisplacement, yCenter, xCenter - xDisplacement, yCenter - yDisplacement, context);
		GameCanvas.drawLine(xCenter + xDisplacement, yCenter, xCenter + xDisplacement, yCenter - yDisplacement, context);
		context.restore();
	}
};

 