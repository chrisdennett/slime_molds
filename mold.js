class Mold {
  constructor() {
    // Mold variables
    // const thirdW = width / 3;
    // const thridH = height / 3;
    // this.x = thirdW + random(thirdW);
    // this.y = thridH + random(thridH);
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = 0.5;

    this.heading = random(360);
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    this.rotAngle = 45;
    this.sensorAngle = 45;
    this.sensorDist = 10;

    // Sensor variables
    this.rSensorPos = createVector(0, 0);
    this.lSensorPos = createVector(0, 0);
    this.fSensorPos = createVector(0, 0);
  }

  update() {
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    // Using % Modulo expression to wrap around the canvas
    this.x = (this.x + this.vx + width) % width;
    this.y = (this.y + this.vy + height) % height;

    // bottom right
    if (this.x > width / 2 && this.y > height / 2) {
      this.rotAngle = 45;
      this.sensorAngle = 5;
      this.sensorDist = 200;
    }
    // top left
    else if (this.x < width / 2 && this.y < height / 2) {
      this.rotAngle = 10;
      this.sensorAngle = 45;
      this.sensorDist = 2;
    }
    // top right
    else if (this.x > width / 2 && this.y < height / 2) {
      this.rotAngle = 45;
      this.sensorAngle = 45;
      this.sensorDist = 10;
    }
    // bottom left
    else {
      this.rotAngle = 45;
      this.sensorAngle = 45;
      this.sensorDist = 10;
    }

    // Get 3 sensor positions based on current position and heading
    this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
    this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
    this.getSensorPos(this.fSensorPos, this.heading);

    // Get indices of the 3 sensor positions and get the color values from those indices
    let index, l, r, f;
    index = 4 * floor(this.rSensorPos.y) * width + 4 * floor(this.rSensorPos.x);
    r = pixels[index];

    index = 4 * floor(this.lSensorPos.y) * width + 4 * floor(this.lSensorPos.x);
    l = pixels[index];

    index = 4 * floor(this.fSensorPos.y) * width + 4 * floor(this.fSensorPos.x);
    f = pixels[index];

    // Compare values of f, l, and r to determine movement
    if (f > l && f > r) {
      this.heading += 0;
    } else if (f < l && f < r) {
      if (random(1) < 0.5) {
        this.heading += this.rotAngle;
      }
    } else if (l > r) {
      this.heading += -this.rotAngle;
    } else if (r > l) {
      this.heading += this.rotAngle;
    }
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);

    // line(this.x, this.y, this.x + this.r*3*this.vx, this.y + this.r*3*this.vy);
    // fill(255, 0, 0);
    // ellipse(this.rSensorPos.x, this.rSensorPos.y, this.r*2, this.r*2);
    // ellipse(this.lSensorPos.x, this.lSensorPos.y, this.r*2, this.r*2);
    // ellipse(this.fSensorPos.x, this.fSensorPos.y, this.r*2, this.r*2);
  }

  getSensorPos(sensor, angle) {
    sensor.x = (this.x + this.sensorDist * cos(angle) + width) % width;
    sensor.y = (this.y + this.sensorDist * sin(angle) + height) % height;
  }
}
