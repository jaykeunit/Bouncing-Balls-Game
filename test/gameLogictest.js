describe('paddleGameFunctionTest', function () {
	it('canary is passing', function () {
		expect(true).to.be.eql(true);
	});
	
	beforeEach(function(){
		this.canvas = {
			width: 400,
			height: 800,
			offsetTop: 0,
			offsetLeft: 0,
			getContext: function(dimensionString) {
				return dimensionString;
			}
		};
		this.event = {
			clientX: 10,
			clientY: 10
		};
		GameCanvas.canvas = this.canvas;
		GameBalls.ballsOn = false;
		
	})

	it('test ballCollision transfers velocity', function(){
		GameBalls.Balls = [];

		var ball = {
			vx: 10,
			vy: 10,
			radius: 10
		};
		GameBalls.Balls.push(ball);

		var ball = {
			vx: 5,
			vy: 5,
			radius: 10
		};
		GameBalls.Balls.push(ball);
		
		var testerBall = {
			vx: 10,
			vy: 10,
			radius: 10
		};
		
		ballCollision(GameBalls.Balls[0], GameBalls.Balls[1]);

		expect(GameBalls.Balls[1]).to.be.eql(testerBall);
	});

	it('test checkForBallCollision calls ballCollision when a collision happens', function(){
		GameBalls.Balls = [];

		var ball = {
			positionX: 2,
        	positionY: 2,
        	radius: 30
		};

		GameBalls.Balls.push(ball);

		var ball = {
			positionX: 1,
        	positionY: 1,
        	radius: 30
		};

		GameBalls.Balls.push(ball);

		var tester = false;
		ballCollision = function(){
			tester = true;
		}

		checkForBallCollision(0);
		expect(tester).to.be.eql(true);
	});

	it('test that checkForHit decreases ball radius by .75 after 10 hits', function(){
		GameBalls.Balls = [];
		var ball = {
			positionX: 50,
			positionY: 9,
			vx: 10,
			vy: -10,
			radius: 1,
			padHits: 9
		};
		Pad = {
			padPosition: {x: 50, y: 10},
			padWidth: 10
		};
		BoxBarrier = {
			left: 0,
			right: 100,
			bottom: 10
		};
		GameBalls.Balls.push(ball);
		checkPadHit(0);
		expect(GameBalls.Balls[0].radius).to.be.eql(.75);
	});
	
	it('check increment GameCanvas.timer correctly adds one GameCanvas.sec at 1000 ms, with 0 padding', function(){
		GameBalls.ballsOn = false;
		GameCanvas.timer = {textContent: ''};
		GameCanvas.milliseconds = 1000;
		GameCanvas.sec = 0;
		GameCanvas.mins = 0;
		
		incrementTimer();
		expect(GameCanvas.sec).to.be.eql('01');
	});
	
	it('check increment GameCanvas.timer correctly adds one min at 60 seconds, , with 0 padding', function(){
		GameBalls.ballsOn = true;
		GameCanvas.timer = {textContent: ''};
		GameCanvas.milliseconds = 0;
		GameCanvas.sec = 60;
		GameCanvas.mins = 0;
		
		incrementTimer();
		expect(GameCanvas.mins).to.be.eql('01');
	});
	
	it('check increment GameCanvas.timer increments millisecons', function(){
		GameBalls.ballsOn = true;
		GameCanvas.timer = {textContent: ''};
		GameCanvas.milliseconds = 0;
		GameCanvas.sec = 0;
		GameCanvas.mins = 0;
		
		incrementTimer();
		expect(GameCanvas.milliseconds).to.be.eql(10);
	});
	
	it('check registerTimer sets GameCanvas.timer ', function(){
		GameCanvas.timer = '';
		registerTimer('im a GameCanvas.timer');
		expect(GameCanvas.timer).to.be.eql('im a GameCanvas.timer');
	});
	
	it('test checkPadHit recognizes ball hits the pad and changes y direction', function(){
		GameBalls.Balls = [];
		var ball = {
			positionX: 50,
			positionY: 9,
			vx: 2,
			vy: -2,
			radius: 0
		};
		Pad = {
			padPosition: {x: 50, y: 10},
			padWidth: 10
		};
		BoxBarrier = {
			left: 0,
			right: 100,
			bottom: 10
		};
		GameBalls.Balls.push(ball);
		
		checkPadHit(0);
		expect(GameBalls.Balls[0].vy).to.be.eql(2.7);
		
	});
	
	it('test checkBallOutOfBounds recognizes ball is out of bound and removes ball, forth if branch', function(){
		GameBalls.Balls = [];
		var ball = {
			positionX: 10,
			positionY: 0,
			vx: 10,
			vy: 10,
			radius: 0
		};
		Pad = {
			padPosition: {x: 100, y: 10},
		};
		BoxBarrier = {
			left: 0,
			right: 100,
			bottom: 10
		};
		GameBalls.Balls.push(ball);
		
		checkBallOutOfBounds(0);
		expect(GameBalls.Balls.length).to.be.eql(0);
		
	});
	
	it('test checkBottomBarrierHit recognizes collision with bottom wall and redirects y direction, third if branch', function(){
		GameBalls.Balls = [];
		var ball = {
			positionX: 10,
			positionY: 10,
			vx: 10,
			vy: 10,
			radius: 0
		};
		Pad = {
			padPosition: {x: 100, y: 0},
		};
		BoxBarrier = {
			left: 0,
			right: 100,
			bottom: 0
		};
		GameBalls.Balls.push(ball);
		
		checkBottomBarrierHit(0);
		expect(GameBalls.Balls[0].vy).to.be.eql(-10);
		
	});
	
	it('test checkRightBarrierHit recognizes collision with right wall and redirects x direction, second if branch', function(){
		GameBalls.Balls = [];
		var ball = {
			positionX: 200,
			positionY: 10,
			vx: 10,
			vy: 0,
			radius: 0
		};
		Pad = {
			padPosition: {x: 100, y: 0},
		};
		BoxBarrier = {
			left: 0,
			right: 100
		};
		GameBalls.Balls.push(ball);
		
		checkRightBarrierHit(0);
		expect(GameBalls.Balls[0].vx).to.be.eql(-10);
		
	});
	
	it('test checkLeftBarrierHit recognizes collision with left wall and redirects x direction, first if branch', function(){
		GameBalls.Balls = [];
		var ball = {
			positionX: -10,
			positionY: 10,
			vx: -10,
			vy: 0,
			radius: 0
		};
		Pad = {
			padPosition: {x: 100, y: 0},
		};
		BoxBarrier = {
			left: 0,
			right: 100
		};
		GameBalls.Balls.push(ball);
		
		checkLeftBarrierHit(0);
		expect(GameBalls.Balls[0].vx).to.be.eql(10);
		
	});
		
	it('test add ball correctly adds a ball', function(){
		BoxBarrier = {
			width:600
		};
		GameBalls.createBall = function(x, y, vx, vy, color){
			var ball = 'im a ball';
			return ball;
		}
		GameBalls.Balls = [];
				
		addBall(10, 20, 'color', 0, 0);
		expect(GameBalls.Balls.length).to.be.eql(1);
	});
	
	it('check turnOn balls creates and adds 3 balls into GameBalls.Balls Array', function(){
		BoxBarrier = {
			width:600
		};
		GameBalls.createBall = function(x, y, vx, vy, color){
			var ball = 'im a ball';
			return ball;
		}
		GameBalls.Balls = [];
		
		var tester = 0;
		addBall = function(){
			tester+=1
		}
		turnOnBalls();
		expect(tester).to.be.eql(3);
	});
	
	it('check touchMovePad correctly sends touch position to pad position', function(){
		this.event = {
			targetTouches:[{clientX: 50}],
		}
		Pad = {
			padPosition: {x: 50, y: 0},
			padWidth: 0
		};
		BoxBarrier = {
			left: 10,
			right: 100
		};
		
		touchMovePad(this.event);
		expect(Pad.padPosition.x).to.be.eql(50);
	})
	
	it('check touchMovePad correctly stops pad position when pad is at left barrier', function(){
		this.event = {
			targetTouches:[{clientX: 0}],
		}
		Pad = {
			padPosition: {x: 100, y: 0},
			padWidth: 20
		};
		BoxBarrier = {
			left: 10,
			right: 0,
		};
		
		touchMovePad(this.event);
		expect(Pad.padPosition.x).to.be.eql(20);
	});
	
	it('check movePad correctly stops pad position when pad is at right barrier', function(){
		this.event = {
			targetTouches:[{clientX: 500}],
		}
		Pad = {
			padPosition: {x: 100, y: 0},
			padWidth: 20
		};
		BoxBarrier = {
			left: 0,
			right: 10,
		};
		
		touchMovePad(this.event);
		expect(Pad.padPosition.x).to.be.eql(0);
	});
		
	it('check movePad correctly updates pad position when pad is within barrier', function(){
		this.event.clientX = 50;
		Pad = {
			padPosition: {x: 50, y: 0},
			padWidth: 0
		};
		BoxBarrier = {
			left: 10,
			right: 100
		};
		
		movePad(this.event);
		expect(Pad.padPosition.x).to.be.eql(50);
	});
	
	it('check movePad correctly stops pad position when pad is at left barrier', function(){
		this.event.clientX = 0;
		Pad = {
			padPosition: {x: 100, y: 0},
			padWidth: 20
		};
		BoxBarrier = {
			left: 10,
			right: 0,
		};
		
		movePad(this.event);
		expect(Pad.padPosition.x).to.be.eql(20);
	});
	
	it('check movePad correctly stops pad position when pad is at right barrier', function(){
		this.event.clientX = 500;
		Pad = {
			padPosition: {x: 100, y: 0},
			padWidth: 20
		};
		BoxBarrier = {
			left: 0,
			right: 10,
		};
		
		movePad(this.event);
		expect(Pad.padPosition.x).to.be.eql(0);
	});
	
	it('check beginDraw calls incrementTimer', function(){
		GameCanvas.reset = function(){}
		Pad.drawPad = function(){}
		BoxBarrier.drawRectangle = function(){}
		GameBalls.drawBalls = function(){}
		checkForHit = function(){}
		checkForBallCollision = function(){}
		window.setTimeout = function(){}
		
		var tester = false;
		incrementTimer= function() {
			tester = true;
		}
		beginDraw();
		expect(tester).to.be.eql(true);
		
	});

	it('check beginDraw calls GameBalls.checkForBallToBallHit ', function(){
		GameCanvas.reset = function(){}
		Pad.drawPad = function(){}
		BoxBarrier.drawRectangle = function(){}
		GameBalls.drawBalls = function(){}
		checkForHit = function(){}
		checkForBallCollision = function(){}
		GameBalls.checkForBarrierHit = function(){}
		incrementTimer = function(){}
		window.setTimeout = function(){}
		
		var tester = false;
		GameBalls.checkForBallToBallHit = function() {
			tester = true;
		}
		beginDraw();
		expect(tester).to.be.eql(true);
		
	});

	it('check beginDraw calls itself using setTimeout', function(){
		GameCanvas.reset = function(){}
		Pad.drawPad = function(){}
		BoxBarrier.drawRectangle = function(){}
		GameBalls.drawBalls = function(){}
		checkForHit = function(){}
		checkForBallCollision = function(){}
		incrementTimer = function(){}
		GameCanvas.timer = 'empty';
		
		var functionName = "beginDraw();"
		var tester = false;
		window.setTimeout = function(func,delay){
			if(func === functionName)
				tester= true;
		};
		
		beginDraw();
		expect(tester).to.be.eql(true);
		
	});
	
	it('check beginDraw calls GameBalls.checkForBarrierHit funciton', function(){
		
		GameCanvas.reset = function(){}
		Pad.drawPad = function(){}
		BoxBarrier.drawRectangle = function(){}
		GameBalls.drawBalls = function(){}
		window.setTimeout = function(){}
		GameBalls.checkForBallToBallHit = function(){}
		incrementTimer = function(){}
		GameCanvas.timer = 'empty';
		
		var tester = false;
		GameBalls.checkForBarrierHit = function(){
			tester = true;
		}
		beginDraw();
		expect(tester).to.be.eql(true);
	});
		
	it('check beginDraw calls GameBalls.drawBalls function', function(){
		
		GameCanvas.reset = function(){}
		checkForHit = function(){}
		Pad.drawPad = function(){}
		BoxBarrier.drawRectangle = function(){}
		window.setTimeout = function(){}
		checkForBallCollision = function(){}
		incrementTimer = function(){}
		GameCanvas.timer = 'empty';
		
		var tester = false;
		GameBalls.drawBalls = function(){
			tester = true;
		}
		beginDraw();
		expect(tester).to.be.eql(true);
		
	});
	
	it('check beginDraw calls BoxBarrier.drawRectangle function', function(){
		
		GameCanvas.reset = function(){}
		GameBalls.drawBalls = function(){}
		checkForHit = function(){}
		Pad.drawPad = function(){}
		window.setTimeout = function(){}
		checkForBallCollision = function(){}
		incrementTimer = function(){}
		GameCanvas.timer = 'empty';
		
		var tester = false;
		BoxBarrier.drawRectangle = function(){
			tester = true;
		}
		beginDraw();
		expect(tester).to.be.eql(true);
		
	});
		
	it('check beginDraw calls Pad.drawPad function', function(){
		
		GameCanvas.reset = function(){}
		BoxBarrier.drawRectangle = function(){}
		GameBalls.drawBalls = function(){}
		checkForHit = function(){}
		window.setTimeout = function(){}
		checkForBallCollision = function(){}
		incrementTimer = function(){}
		GameCanvas.timer = 'empty';
		
		var tester = false;
		Pad.drawPad = function(){
			tester = true;
		}
		beginDraw();
		expect(tester).to.be.eql(true);
		
	});
	
	it('check beginDraw calls GameCanvas.reset function', function (){
		
		BoxBarrier.drawRectangle = function(){}
		GameBalls.drawBalls = function(){}
		checkForHit = function(){}
		window.setTimeout = function(){}
		checkForBallCollision = function(){}
		incrementTimer = function(){}
		GameCanvas.timer = 'empty';
		
		var tester = false;
		GameCanvas.reset = function(theContext){
			tester = true;
		}
		beginDraw();
		expect(tester).to.be.eql(true);
	});
	
	it('check drawSetup calls beginDraw()', function() {
		var tester = false;
		beginDraw = function() {
			tester = true;
		}
		drawSetup(this.canvas);
		expect(tester).to.be.eql(true);
	});
	
	it('check drawSetup passes GameCanvas.canvas variable', function() {
		beginDraw = function() {}
		drawSetup(true);
		expect(GameCanvas.canvas).to.be.eql(true);
	});
});
