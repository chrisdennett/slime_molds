let molds = [];
let num = 4000;
let d;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);

  for (let i = 0; i < num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {
  background(0, 5);
  loadPixels();

  for (let i = 0; i < num; i++) {
    molds[i].update();
    molds[i].display();
  }
}

/*
----- Coding Tutorial by Patt Vira ----- 
Name: Slime Molds (Physarum)
Video Tutorial: https://youtu.be/VyXxSNcgDtg
Connect with Patt: @pattvira
https://www.pattvira.com/

References: 
1. Algorithm by Jeff Jones: https://uwe-repository.worktribe.com/output/980579/characteristics-of-pattern-formation-and-evolution-in-approximations-of-physarum-transport-networks
2. Explanation by Sage Jenson: https://cargocollective.com/sagejenson/physarum
3. Real life Slime Molds: https://www.youtube.com/watch?v=elqwn7k2Wwk


----------------------------------------
*/
