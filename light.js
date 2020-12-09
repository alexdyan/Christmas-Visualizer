class Light {
	constructor(x, y, size, type) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.type = type;
		this.r = 50;
		this.g = 50;
		this.b = 50;
	}

	display(level) {
		switch (this.type) {
			case 0:
				this.r = level;
				break;
			case 1:
				this.g = level;
				break;
			case 2:
				this.b = level;
				break;
		}
		fill(this.r, this.g, this.b);
		noStroke();
		circle(this.x, this.y, this.size);
	}
}