var birds = [];
var bird ;
var obs = [] ;
var obs_counter = 0
var tree
var score = 0


function setup() {
  createCanvas(1280, 640);
  bird = new Bird();
  
  obs[0] = new Obstacle();
  var bgd;
  
}

class Bird{
	constructor(){
		this.x = 200;
		this.y = 100;
		this.frame = 0;
		this.speedX = 2;
		this.speedY = 1;
		this.force = 0
		this.gravity = 1
	}
	move(){
	   this.speedY += this.gravity
	   this.speedY -= this.force
	   this.speedY = this.speedY * 0.7
	   this.force = 0
	   this.y += this.speedY 
	   this.frame += 1
	   if (Math.floor(this.frame/2)  > birds.length-1){
	     this.frame = 0
	  }
	}
	show(){
		image(birds[Math.floor(this.frame/2)], this.x, this.y, 150, 150);
	}
}

class Obstacle{
	constructor(pos){
		this.x = width;
		this.width = random(30, 60)
		if (pos == 'upper'){
			this.pos = 'upper'
			this.y = 0;
			this.length = random(height/5, height/3);		
		}
		else if (pos == 'lower'){
			this.pos = 'lower'
			this.y = random(height/3, height*2/3+200);
			this.length = height-this.y;	
		}

		this.speedX = -10;
	}
	move(){
	   this.x += this.speedX 
	   if (this.x < 0){
	   obs.splice(0,1)
	   }
	}
	
	hit(bird){
		if (this.x <= bird.x + 150 && this.x + this.width > bird.x) {
			if (this.pos == 'upper' && this.length >= bird.y + 25) {
				return true
			}
			if (this.pos == 'lower' && this.y <= bird.y - 25) {
				return true
			}
			return false
		}

	}
	
	show(){
		image(vine, this.x, this.y, this.width, this.length);
	}
}


function mousePressed(){
   bird.force += 30

}



function preload()
{
  // load image
  bdg = loadImage("resource/forest.jpeg");
  vine = loadImage("resource/vine.png");
  for (let i=0; i<5; i++) {
    birds[i] = loadImage(`resource/flyingbird-${i}.png`);
  }
}

function draw() {
  obs_counter += 1
  background(bdg, [10])  
  if (obs_counter > 40) {
	  	obstacle_pos = random(10, 100);
	  	if (obstacle_pos>80){
	  	   obs.push(new Obstacle('upper'));
	      obs_counter = 0;
	  	}
	  	else if (obstacle_pos>60) {
	  	   obs.push(new Obstacle('lower'));
	  	}
	  	else if (obstacle_pos>30) {
	  	   obs.push(new Obstacle('upper'));
	  	   obs.push(new Obstacle('lower'));
	  	}
      obs_counter = 0;
  }
  bird.move();
  bird.show();
  for (let ob of obs){
    ob.move()
    ob.show()
    if (ob.hit(bird)) {
    	score -= 100
    }
    
  }

	score += 1
	textSize(32);
   fill(255, 255, 255);
   text(`score: ${Math.floor(score/20)}`, 50, 60);
	//text("word", 50, 60);
  
}