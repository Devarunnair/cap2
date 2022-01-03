const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombie1, zombie2, zombie3, zombie4, sadzombie;
var breakButton;
var backgroundImage;
var rope; 
var zomcon;
var stones = [];
var stone;
var collided = false;
function preload() {
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
  sadzombie = loadImage("./assets/sad_zombie.png");

  backgroundImage = loadImage("./assets/background.png");

  stoneImg = loadImage("./assets/stone.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);


  rope = new Rope(7,{x:245,y:30});

  zombie = createSprite(width / 2, height - 100, 50, 50);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addImage("sad", sadzombie);

  zombie.scale = 0.1;
  zombie.velocityX = 10;

  stone = createSprite(207,285);
  stone.addImage(stoneImg)
  stone.scale = 0.1;

  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);
  Matter.Composite.add(rope.body,stone);

  jointLink = new Link(rope,stone);


  breakButton = createButton("");
  breakButton.position(600,300);  
  breakButton.class("breakbutton");
  breakButton.mousePressed();
  breakButton.mouseClicked(drop);

 
 
}

function draw() {
  background(backgroundImage);
  
   Engine.update(engine)

rope.show()

  for (var stone of stones) {
    stone.show();
    var pos = stone.body.position;
    
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);


    if (distance <= 50) {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
      zombie.changeImage("sad");
      collided = true;
    }

   

  }

  if (zombie.position.x >= width - 300 && !collided) {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300 && !collided) {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}



function drop() {
  rope.break()
}