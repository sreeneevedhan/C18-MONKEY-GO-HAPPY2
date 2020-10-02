var monkey, monkey_running;

var banana, bananaImage;

var stoneGroup, stoneImage;

var backGround, jungleImage,invsibleGround;

var gameOver,gameOverImage;
var restart,restartImage;
var play=1;
var end=0;
var gameState=play;
var score;


function preload(){
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
  jungleImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
  stoneImage=loadImage("stone.png");
  
  gameOverImage= loadImage("gameOver.png");
 restartImage=loadImage("restart.png");  
  
}

function setup() {
  createCanvas(600, 300);
  monkey=createSprite(70,235,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  jungle=createSprite(100,100,10,10);
 jungle.addImage("backGround",jungleImage);
  jungle.x = jungle.width /2;
  jungle.velocityX = -6;
  
  invsibleGround=createSprite(300,280,600,10);
  invsibleGround.visible=false;
  
  
  gameOver= createSprite(300,150,20,40);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=1;
  gameOver.visible=false;
  
  restart= createSprite(300,200,30,30);
  restart.addImage("restart",restartImage);
  restart.scale=0.6;
  restart.visible=false;
  
  score=0;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
  
}

function draw() {
  background(220);
  
  if(gameState===play){
 
    if (jungle.x < 100){
    jungle.x = jungle.width/2;
  }
    
     jungle.velocityX=-(8+3*score/10);
    
     if(keyDown("space") && monkey.y>230) {
  monkey.velocityY = -15;
  }
     monkey.velocityY = monkey.velocityY + 0.8;
    
    if(bananaGroup.isTouching(monkey)){
      
      bananaGroup.destroyEach();
      score=score+2;
    }
    switch(score){
        
        case 10:monkey.scale=0.12;
        break;
        case 20:monkey.scale=0.14;
        break;
        case 30:monkey.scale=0.16;
        break;
        case 40:monkey.scale=0.16;
        break;
        case 50:monkey.scale=0.20;
        break;
      default: break;
        
        
    }
    
    if(stoneGroup.isTouching(monkey)){
      
      monkey.scale=0.12;
    }
    if(stoneGroup.isTouching(monkey) && monkey.scale>=  0.1){
      gameState=end;
      
    }
    gameOver.visible=false;
     restart.visible=false;
    
    stone();
   banana();
  }else if(gameState===end){
    
   jungle.velocityX=0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    monkey.velocityY=0;
   monkey.scale=0.1;
    
    if(mousePressedOver(restart)){
    
    reset(); 
     }
    
    gameOver.visible=true;
    restart.visible=true;
  }
   
  monkey.collide(invsibleGround);
  

  
 monkey.depth=jungle.depth;
 monkey.depth=monkey.depth+1;
  console.log(jungle.velocityX);
   drawSprites();
    
  text("Score: "+ score, 50,50);
}

function reset(){
  gameState = play;
  
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  
  
  score = 0;
  
}

  
function stone() {
  
  if (frameCount % 100 === 0) {
    var stone = createSprite(600,240,40,10);
    stone.addImage(stoneImage);
    stone.scale = 0.18;
    stone.velocityX =-(8+3*score/10);
    
    stone.lifetime = 100;
    
    stone.depth = monkey.depth;
    stone.depth = monkey.depth + 1;
    
    stoneGroup.add(stone);
    
  }
  
}

function banana() {
  
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,170,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX =-(8+3*score/10);
    
    banana.lifetime = 100;
    
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
    
  }
  
}


















