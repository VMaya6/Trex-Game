var trex, trexRun, trexCollide;
var groundimage, ground, invisiground;
var clouds; 
var o1,o2,o3,o4,o5,o6;
var obstaclesGroup,cloudsGroup;
var PLAY,END,GameState;
var restart1,restart,gameOver,gameOver1;
var score=0;
var ScheckPoint,Sdie,Sjump;
function preload() {
  trexRun=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollide=loadImage("trex_collided.png");
  
  groundimage=loadImage("ground2.png");
  
  clouds=loadImage("cloud.png");
  
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  restart1=loadImage("restart.png");
  gameOver1=loadImage("gameOver.png");
  ScheckPoint=loadSound("checkPoint.mp3");
  Sdie=loadSound("die.mp3");
  Sjump=loadSound("jump.mp3");
}  
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,20,50);
  trex.addAnimation("trex1",trexRun);
  trex.addAnimation("trex2",trexCollide);
  trex.scale=0.5;
  ground=createSprite(width/2,height-20,width,20);
  ground.addImage(groundimage);
  invisiground=createSprite(width/2,height-15,width,5);
  invisiground.visible=false;
  obstaclesGroup=createGroup()
  cloudsGroup=createGroup()
  PLAY=1;
  END=0;
  GameState=PLAY;
  trex.setCollider("circle",0,0,35)
gameOver = createSprite(300,150);
restart = createSprite(300,100);
gameOver.addImage("gameOver",gameOver1);
gameOver.scale = 0.5;
restart.addImage("restart",restart1);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(100,200,255);
  text("Score:"+score,450,20);
if (GameState===PLAY){
 ground.velocityX=-5
  if (ground.x<0){
    ground.x=ground.width/2;
  }
   score = score + Math.round(getFrameRate()/60);
  if ((keyDown("space")||keyDown(UP_ARROW))&&trex.y>159){
    trex.velocityY=-12;
     Sjump.play();
                         }
  trex.velocityY=trex.velocityY+1;
  if (score>0&&score%100===0){
    ScheckPoint.play()
  }
  spawnClouds();
  spawnObstacle();
  if (obstaclesGroup.isTouching(trex)){
    GameState=END
    Sdie.play();
  }
   
}
else if(GameState===END){
 gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex2",trexCollide);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  
 
}
  trex.collide(invisiground);
   if(mousePressedOver(restart)) {
    reset();  
}  
    drawSprites();
}
function reset(){
  GameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("trex1",trexRun);
  
  score = 0;
  
}
function spawnClouds() {
  if (frameCount%60===0){
    var cloud=createSprite(600,120,20,10);
    cloud.y=Math.round(random(80,120));
    cloud.velocityX=-3;
    cloud.addImage(clouds);
    cloud.scale=0.5; 
   cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudsGroup.add(cloud);
  }
}
function spawnObstacle() {
  if (frameCount%60===0){
    var obstacle=createSprite(600,166,10,40);
    obstacle.velocityX=-6;
  
  var x=(Math.round(random(1,6)));
  switch(x) {
    case 1:obstacle.addImage(o1);
      break;
    case 2:obstacle.addImage(o2);
      break;
    case 3:obstacle.addImage(o3);
      break;
    case 4:obstacle.addImage(o4);
      break;
    case 5:obstacle.addImage(o5);
      break;
    case 6:obstacle.addImage(o6);
      break;
      default:break;
    }
    obstacle.scale=0.5;
    obstaclesGroup.add(obstacle);
  }
}
