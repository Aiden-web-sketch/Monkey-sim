var monkey_running,monkey, scene, sceneImage, banana, bananaImage, obstacle, obstacleImage, ground, gameover, gameoverImage;


var bananagroup, bananaImage;
var obstaclesgroup;
var score=0


function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  obstacleImage = loadImage("stone.png")



}


function setup() {
  createCanvas(400, 400);

  monkey = createSprite(100, 340)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1


  bananaImage = loadImage("banana.png")
  sceneImage = loadImage("jungle.jpg")

  ground = createSprite(400, 380, 800, 20)
  bananaGroup = new Group();
  ObstaclesGroup = new Group();
}

var surivaltime = 0



function draw() {
  background(sceneImage);

  monkey.scale=0.1+score/100

if(monkey.isTouching(ObstaclesGroup)){
  text("GameOver",200,200)
  textSize=20
  score=score-2
  ObstaclesGroup.setVelocityXEach(0)
  bananaGroup.setVelocityXEach(0)
  
}
  
  if(monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach()
    score=score+1  
  }
    
     
  
  monkey.changeAnimation("running", monkey_running);

  if (keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -7;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
fill("white")
  text("surival time:" + surivaltime, 100, 50)
  surivaltime = Math.ceil(frameCount / frameRate())
  text("score"+score,50,50)

  spawnbanana()
  spawnObstacle()


  drawSprites();
}


function spawnbanana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(240, 340));
    banana.addImage(bananaImage);
    banana.scale = 0.05
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
        bananaGroup.add(banana);
  }




  

}

function spawnObstacle() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(400, 365, 10, 40);
    obstacle.velocityX = -4;
    obstacle.scale = 0.1
    obstacle.lifetime = 300;
    obstacle.addImage(obstacleImage);
  ObstaclesGroup.add(obstacle)
  }
}
