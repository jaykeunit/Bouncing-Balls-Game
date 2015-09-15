"use strict";
var GameCanvas = {
	canvas: '',
	timer: 0,
	milliseconds: 0,
	mins: 0,
	sec: 0,

	reset: function(context) {
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		context.fillStyle = 'black';
		context.fillRect(0, 0, this.canvas.width, this.canvas.height); 
	},

	drawLine: function(startX, startY, endX, endY, context) {
		context.beginPath();
		context.moveTo(startX, startY);
		context.lineTo(endX, endY); 
		context.stroke();
		context.closePath();
	}
};

 