let r1, r2, r3;
let curAngle;
let type;
let x1, y1, x2, y2, x3, y3;
let numLights = 60;
let lights = [];
let ornaments = [];
let snowflakes = [];
let audio, amp, level;
let font;
let angle = 0;

function preload() {
	audio = loadSound('Ariana Grande - Santa Tell Me.mp3');
	font = loadFont('LobsterTwo-Italic.ttf')
}

function setup() {
	createCanvas(600, 650);
	amp = new p5.Amplitude();
	noiseDetail(24);
	textAlign(CENTER);
	textFont(font);

	for (let i = 0; i < 50; i++) {
		snowflakes.push(new Snow(random(width), random(-height, 0)));
	}
	ornaments.push(new Light(310, 300, 30, 0));
	ornaments.push(new Light(270, 375, 30, 0));
	ornaments.push(new Light(340, 400, 30, 0));
	ornaments.push(new Light(290, 470, 30, 0));
	ornaments.push(new Light(215, 525, 30, 0));
	ornaments.push(new Light(360, 530, 30, 0));
}

function draw() {
	background(170, 227, 186);
	// snow in the background
	for (let i = 0; i < snowflakes.length; i++) {
		snowflakes[i].display();
		snowflakes[i].move();
	}

	// light strings
	stroke(0)
	strokeWeight(5);
	noFill();
	arc(width/4, -270, width, height, 0, PI * 3/4);
	arc(width/2, -220, width, height, 0, PI * 3/4);
	arc(width * 3/4, -230, width, height, 0, PI);
	r = width/2;
	curAngle = 0 - PI/2;

	// x = diameter * sin(currentAngle) + xOffset
	// y = diameter * cos(currentAngle) + yOffset
	for (let i = 0; i < numLights; i++) {
		type = Math.floor(random(0, 3));
		x1 = r * sin(curAngle) + width/4;
		y1 = r * cos(curAngle) - 250;
		lights.push( new Light(x1, y1, 25, type) );

		x2 = r * sin(curAngle) + width/2;
		y2 = r * cos(curAngle) - 200;
		lights.push( new Light(x2, y2, 25, type) );

		x3 = r * sin(curAngle) + width * 3/4;
		y3 = r * cos(curAngle) - 210;
		lights.push( new Light(x3, y3, 25, type) );

		curAngle += 2.5*PI/numLights;
	}

	level = amp.getLevel();
	level = map(level, 0, 1, 0, 255);
	level *= random(10, 14); // do some math to get a good range for controlling the color
	// console.log(level)

	for (let i = 0; i < numLights; i++) {
		lights[i].display(level);
	}

	// tree
	noStroke();
	fill(27, 105, 49);
	triangle(width/2, 220, 250, 325, 350, 325);
	triangle(width/2, 270, 200, 450, 400, 450);
	triangle(width/2, 320, 150, 575, 450, 575);
	fill(66, 44, 0);
	rect(width/2 - 25, 575, 50, 75);
	// tree strings
	generateTreeStrings();

	// star
	stroke(180);
	fill(255, 215, 0);
	push();
	translate(width/2, 220);
	rotate(angle);
	star(0, 0, 12, 30, 5);
	pop();
	angle += 0.005;

	// band name
	fill(255);
	textSize(48);
	text("The Blackberry Poets", width/2, height/4);
	textSize(24);
	text("Little Drummer Boy", width/2, height/4 + 30);

	// ground
	fill(255)
	noStroke();
	ellipse(width/4, height, 400, 50)
	ellipse(width*3/4, height, 300, 60)

	for (let i = 0; i < ornaments.length; i++) {
		ornaments[i].display(level);
	}


}

function mousePressed() {
	// console.log(mouseX, mouseY);
	if (!audio.isPlaying())
		audio.play();
	else
		audio.stop();
}

function generateTreeStrings() {
	stroke(180);
	strokeWeight(2);
	line(215, 575, 405, 500); // silver
	line(194, 500, 390, 435);
	line(208, 435, 358, 375);
	line(242, 375, 333, 333);
	stroke(255, 215, 0);
	line(256, 312, 322, 270); // gold
	stroke(180);
	line(252, 320, 322, 268);
	stroke(255, 215, 0);
	line(205, 575, 408, 505); // gold
	line(192, 505, 388, 430);
	line(206, 438, 355, 370);
	line(246, 368, 336, 336);	
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
