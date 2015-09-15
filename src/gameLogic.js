"use strict";
var drawSetup = function(DocCanvas) {
	GameCanvas.canvas = DocCanvas;
	beginDraw();
}

var registerTimer = function(timerLabel){
	GameCanvas.timer = timerLabel;
}

var incrementTimer = function(){
	if(GameBalls.ballsOn)
		GameCanvas.milliseconds += 10;
	
	GameCanvas.sec = parseInt(GameCanvas.sec);
	GameCanvas.mins = parseInt(GameCanvas.mins);
	GameCanvas.milliseconds = parseInt(GameCanvas.milliseconds);
	
	if(GameCanvas.sec === 60){
		GameCanvas.mins += 1;
		GameCanvas.sec = 0;
	}
	
	if(GameCanvas.milliseconds === 1000){
		GameCanvas.sec += 1;
		GameCanvas.milliseconds = 0;
	}
	
	if(GameCanvas.sec.toString().length < 2){
		GameCanvas.sec = '0' + GameCanvas.sec;
	}
	
	if(GameCanvas.mins.toString().length < 2){
		GameCanvas.mins = '0' + GameCanvas.mins;
	}
	
	GameCanvas.timer.textContent = GameCanvas.mins + ':' + GameCanvas.sec;

}

var beginDraw = function(){
	var center = {x: GameCanvas.canvas.width / 2, y: GameCanvas.canvas.height / 2};
	
	var context = GameCanvas.canvas.getContext('2d');
	
	GameCanvas.reset(context);
	
	BoxBarrier.drawRectangle(GameCanvas.canvas , context);
	
	Pad.drawPad(context);

	GameBalls.drawBalls(context, GameBalls.ballsOn);
	
	GameBalls.checkForBarrierHit();

	GameBalls.checkForBallToBallHit();
	
	incrementTimer();
	
	setTimeout("beginDraw();", 10);
}

var movePad =  function(event) {
	var mousePosition = {x: event.clientX - GameCanvas.canvas.offsetLeft, y: event.clientY - GameCanvas.canvas.offsetTop};
	
	if(Pad.padPosition != mousePosition){
		if(mousePosition.x - Pad.padWidth/2 <= BoxBarrier.left )
			Pad.padPosition.x = BoxBarrier.left + Pad.padWidth/2;
		else if(mousePosition.x + Pad.padWidth/2 >= BoxBarrier.right )
			Pad.padPosition.x = BoxBarrier.right - Pad.padWidth/2;
		else{
			Pad.padPosition.x = mousePosition.x;
		}
	}
}

var touchMovePad =  function(event) {
	var touchPosition = {x: event.targetTouches[0].clientX - GameCanvas.canvas.offsetLeft, y: event.targetTouches[0].clientY - GameCanvas.canvas.offsetTop};
	if(Pad.padPosition != touchPosition){
		if(touchPosition.x - Pad.padWidth/2 <= BoxBarrier.left )
			Pad.padPosition.x = BoxBarrier.left + Pad.padWidth/2;
		else if(touchPosition.x + Pad.padWidth/2 >= BoxBarrier.right )
			Pad.padPosition.x = BoxBarrier.right - Pad.padWidth/2;
		else{
			Pad.padPosition.x = touchPosition.x;
		}
	}
}

var turnOnBalls = function(){

	if(GameBalls.Balls.length === 0){	
		addBall(70, 20, 'blue', 175, 175);
		addBall(360, 1, 'red', 400, 350);
		addBall(-70, -20, 'green', 600, 175);
		
		
		GameBalls.ballsOn = true;
		GameCanvas.milliseconds = 0;
		GameCanvas.mins = 0;
		GameCanvas.sec = 0;
	}	
}

var addBall = function(startAngle, endAngle, color, positionX, positionY){
	var angle = Math.floor((Math.random() * startAngle) + endAngle);
	var radians = angle * (Math.PI/180);
	var xValue = Math.sin(radians) * (BoxBarrier.width/1000);
	var yValue = Math.cos(radians) * (BoxBarrier.width/1000);
	GameBalls.Balls.push(GameBalls.createBall(positionX, positionY, xValue, yValue, color));
}


var checkLeftBarrierHit = function(index){
	if(GameBalls.Balls[index].positionX - GameBalls.Balls[index].radius <= BoxBarrier.left && GameBalls.Balls[index].positionY >= Pad.padPosition.y && GameBalls.Balls[index].vx < 0) {
		GameBalls.Balls[index].vx *= -1;
	}
}

var checkRightBarrierHit = function(index){
	if(GameBalls.Balls[index].positionX + GameBalls.Balls[index].radius >= BoxBarrier.right && GameBalls.Balls[index].positionY >= Pad.padPosition.y && GameBalls.Balls[index].vx > 0){
		GameBalls.Balls[index].vx *= -1;
	}
}
var checkBottomBarrierHit = function(index){
	if(GameBalls.Balls[index].positionY + GameBalls.Balls[index].radius >= BoxBarrier.bottom && GameBalls.Balls[index].vy > 0){
		GameBalls.Balls[index].vy *= -1;
	}
}

var checkPadHit = function(index){
	if(GameBalls.Balls[index].positionY - GameBalls.Balls[index].radius < Pad.padPosition.y 
	&& GameBalls.Balls[index].positionX > Pad.padPosition.x - (Pad.padWidth / 2) - 5
	&& GameBalls.Balls[index].positionX < Pad.padPosition.x + (Pad.padWidth / 2) + 5
	&& GameBalls.Balls[index].vy < 0){
		
		GameBalls.Balls[index].vy *= -1;
		GameBalls.Balls[index].vy *= 1.35;
		GameBalls.Balls[index].vx *= 1.35;
		
		GameBalls.Balls[index].padHits += 1;
		if(GameBalls.Balls[index].padHits % 10 === 0){
			GameBalls.Balls[index].radius *= .75;
		}
	}
}

var checkBallOutOfBounds = function(index){
	if(GameBalls.Balls[index].positionY - GameBalls.Balls[index].radius < Pad.padPosition.y - 5){
		GameBalls.Balls.splice(index, 1);
		if(GameBalls.Balls.length === 0)
			GameBalls.ballsOn = false;
	}
}

var checkForBallCollision = function() {
	for(var x in GameBalls.Balls) {
		for(var n in GameBalls.Balls) {
			if(x < n) {
				var xDistance = (GameBalls.Balls[x].positionX - GameBalls.Balls[n].positionX);
				var yDistance = (GameBalls.Balls[x].positionY - GameBalls.Balls[n].positionY);
				var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
				var sumOfRadius = (GameBalls.Balls[x].radius + GameBalls.Balls[n].radius );
				if(distanceBetween < sumOfRadius){
					ballCollision(GameBalls.Balls[x],GameBalls.Balls[n]);
				}	
			}
		}
	}
}

var ballCollision = function(ballOne,ballTwo){
	var ballOneNewX = (ballOne.vx * (ballOne.radius - ballTwo.radius) + (2 * ballTwo.radius * ballTwo.vx)) / (ballOne.radius + ballTwo.radius);
	var ballOneNewY = (ballOne.vy * (ballOne.radius - ballTwo.radius) + (2 * ballTwo.radius * ballTwo.vy)) / (ballOne.radius + ballTwo.radius);
	
	var ballTwoNewX = (ballTwo.vx * (ballTwo.radius - ballOne.radius) + (2 * ballOne.radius * ballOne.vx)) / (ballTwo.radius + ballOne.radius);
	var ballTwoNewY = (ballTwo.vy * (ballTwo.radius - ballOne.radius) + (2 * ballOne.radius * ballOne.vy)) / (ballTwo.radius + ballOne.radius);
	
	ballOne.vx = ballOneNewX;
	ballTwo.vx = ballTwoNewX;
	
	ballOne.vy = ballOneNewY;
	ballTwo.vy = ballTwoNewY;
}
