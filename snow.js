class Snow {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = random(4, 8);
		this.ySpeed = random(1, 3);

		this.xOffset = random(0, 1000);
	}

	display() {
		fill(255);
		circle(this.x, this.y, this.size);
	}
	move() {
		// compute how much we should move
	    var xMove = map( noise(this.xOffset), 0, 1, -1, 1 );
	    this.x += xMove;
		this.xOffset += 0.01;
		this.y += this.ySpeed;

		// implement wrap around
		if (this.x > width)
			this.x = 0;
		if (this.x < 0)
			this.x = width;
		if (this.y > height)
			this.y = random(-100, 0);

		
	}
}