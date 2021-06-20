//Create variables here
var dog ,dog_img, dogHappy;
var database;
var foodS , foodStock;

function preload()
{
	//load images here
  dog_img = loadImage("images/dog.png");
  dogHappy = loadImage("images/dogh.png");
}

function setup() {
   database = firebase.database();
	createCanvas(500, 500);
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(250,200,10,10);
  dog.addImage(dog_img);
  dog.scale = 0.2;

}


function draw() {  
  background(rgb(46,139,87))
  drawSprites();

  textSize(30);
  text("Press up arrow to feed the dog ",75,300);
  fill("black");
 
  if(foodS !== 0)
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dog_img);
    }
  
    if(keyWentUp(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogHappy);
    }
  }


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
