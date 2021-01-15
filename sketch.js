
var bg, bgImage;

var player, monster;

var coin

var score = 0

var PLAY=1

var END=0

var gameState=PLAY

var gameOver,gameOverImage,restart,restartImage

function preload(){
    bgImage = loadImage("images/forest2.png")
    groundImage = loadImage("images/ground.png")
    playerImage = loadAnimation("images/0.png", "images/1.png","images/2.png",
    "images/3.png","images/4.png","images/5.png","images/6.png" ,
    "images/7.png","images/8.png","images/9.png")

    obstacleImage = loadAnimation("images/obstacle1-0.png","images/obstacle1-1.png","images/obstacle1-2.png",
    "images/obstacle1-3.png","images/obstacle1-4.png","images/obstacle1-5.png")

    coinImage = loadImage ("images/coins.png")

    gameOverImage = loadImage ("images/gameOver.png")

    restartImage = loadImage ("images/restart.png")
}




function setup(){
createCanvas(1500,700)

bg = createSprite(600,200,1800,900)
bg.addImage(bgImage)
bg.scale = 5;

ground = createSprite (600,670,2800,20)
ground.addImage(groundImage)
ground.scale = 2

player = createSprite (200,510)
player.addAnimation ("player",playerImage)
player.scale = 1

invisibleGround = createSprite(600,660,2800,10);
invisibleGround.visible = false;
player.setCollider("circle",0,0, 90)
player.debug = true;


obstacleGroup = new Group()
coinsGroup = new Group()

gameOver=createSprite(750,300)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.5
  gameOver.visible=false
  
  
  restart=createSprite(750,350)
  restart.addImage(restartImage)
  restart.scale=0.5
  restart.visible=false
}



function draw(){
  background("white")

  if(gameState == PLAY){
    
  
    console.log(player.y)
  bg.velocityX=-3
  ground.velocityX=-3

  spawnobstacle()

  spawncoins()

  if (bg.x <0){
bg.x = 500
  }

  if (ground.x <0){
    ground.x = 500
      }

      if (keyDown("space") && player.y>=505){

        player.velocityY = -25
      }

      player.velocityY = player.velocityY + 0.8


    if (player.isTouching(coinsGroup)){

     score++
    coinsGroup.destroyEach()

    }

  

  if (player.isTouching(obstacleGroup)){
    gameState = END

    
  }
  } 
  
  else if(gameState==END){
    gameOver.visible = true;
        restart.visible = true;
        
        //set velcity of each game object to 0
        ground.velocityX = 0;
        bg.velocityX = 0;

       player.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);

        obstacleGroup.visible = false;
        player.visible = false;
        coinsGroup.visible = false;
      
        
        //set lifetime of the game objects so that they are never destroyed
        obstacleGroup.setLifetimeEach(-1);
        coinsGroup.setLifetimeEach(-1);
        
        if (mousePressedOver(restart)){
          reset()
        }
    
    }
  
      player.collide(invisibleGround)
  drawSprites()
fill ("white")
textSize(30)
text ("Score: "+ score, 1200,100)

}

function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,600,40,10);
    obstacle.debug = true;
    obstacle.setCollider("circle",0,0, 40)

    obstacle.x = Math.round(random(100,1200));
    obstacle.addAnimation("obstacle",obstacleImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 1000;
    
    
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
  
}

function spawncoins() {
  //write code here to spawn the clouds
  if (frameCount % 400 === 0) {
    var coin= createSprite(600,600,40,10);
    
    coin.x = Math.round(random(100,1500));
    coin.y = Math.round(random(300,500));

    coin.addImage("coin",coinImage);
  coin.scale = 0.2;
  coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 1000;
    
    
    
    //add each cloud to the group
    coinsGroup.add(coin);
  }
  
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  coinsGroup.destroyEach();

  player.visible = true
  obstacleGroup.visible = true;
  coinsGroup.visible = true;

  score = 0;
}