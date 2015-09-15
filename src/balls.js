"use strict";
var GameBalls = {
	ballsOn: false,
	Balls: [],
	createBall: function(x, y, vx, vy, color) {
		var ball = {
			positionX: x,
			positionY: y,
			vx: vx,
			vy: vy,
			color: color,
			originX: x,
			originY: y,
			radius: (BoxBarrier.width * 0.1) / 2,
			padHits: 0
		};
		return ball;
	},
	drawBalls: function(context){
		for (var x in this.Balls){
			context.save();
			context.beginPath();
			context.arc(this.Balls[x].positionX, this.Balls[x].positionY, this.Balls[x].radius, 0, 2 * Math.PI, false);
			context.fillStyle = this.Balls[x].color;
			context.fill();
			context.closePath();
			context.restore();
			this.Balls[x].positionX += this.Balls[x].vx;
			this.Balls[x].positionY += this.Balls[x].vy;
		}
	},
	checkForBarrierHit: function(){
		for(var x in GameBalls.Balls){		
			checkLeftBarrierHit(x);
			checkRightBarrierHit(x);
			checkBottomBarrierHit(x);
			checkPadHit(x);
			checkBallOutOfBounds(x);
		}
	},
	checkForBallToBallHit: function(){
		checkForBallCollision();
	}
};


