var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var fedTime,lastFed




function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog"); 
  feed.position(350,95); 
  feed.mousePressed(feedDog); 


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  

  //write code to read fedtime value from the database
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  });

 
  
 
  //write code to display text lastFed time here
  fill("black");
  textSize(30);
  text("Food Available:" + foodS,200,500);
  drawSprites();

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }else if(lastFed==0){
    text("LastFeed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30); 

  }
  
  }





//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
