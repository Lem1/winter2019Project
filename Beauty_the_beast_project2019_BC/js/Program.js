const gameelementes={lockedLocation:true,
                   LOCKEDROOM:7, // Locked room location 
                   items: ["torchlight","rose", "gold","teacup", "key"]   
};
let mapLocation = 4;//starting location in the map

// special items placed in three location in the map
let itemLocations = [0,1,2, 5,6];
//Array to store carrying items
let backpack = [];
//Initialize the player's input
let playersInput = "";
//Initialize the gameMessage
let gameMessage = "";
//Create an array of actions the game understands
let actionsIKnow = ["north", "east", "south", "west", "take", "use", "drop"];
let action = ""; //and a variable to store the current action
//An array of items the game understands
let itemsIKnow = ["torchlight","rose", "gold","teacup", "key"];
//and a variable to store the current item
let item = "";
//The element referance on the html page 
let image = document.querySelector("img");
let output = document.querySelector("#output");
let input = document.querySelector("#input");
let save = document.querySelector("#save");
let resotre= document.querySelector("#restart");
let restart=document.querySelector("#replay");
let button = document.querySelector("#but1");
let cheatsheet = document.querySelector("#chetsheet");
let displayPlay=document.querySelector("#play12");
let StartScr=document.querySelector("#startScreen");  
let imgbuttonDisplay= document.querySelector("#display");
let playstart=document.querySelector("#palyScreen");
let x=document.querySelector("#cheatsheet");
let gameOver=document.querySelector("#gameOver");
let help=document.querySelector("#help");
let usehelp=document.querySelector("#helpOut");
//button click event listenner
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
save.addEventListener("click",saveGameState,false);
resotre.addEventListener("click",restorGameState, false);
restart.addEventListener("click",restartGame, false);
displayPlay.addEventListener("click",palygameScreen,false);
displayPlay.addEventListener("click",soundplay,false);
help.addEventListener("click",helpplay,false);
//  diretions in the map
const map=[];
map[0] = "Talking to the objects.";
map[1] = "an open mystery gate.";
map[2] = "Tiptoeing on the stairway.";
map[3] = "Sitting in front of the candle light.";
map[4] = "Wondering around BEAST castel.";
map[5] = "Hello, anybody here.";
map[6] = "beautiful castle.";
map[7] = "Beauty get locked up.";
map[8] = "The gate locked behind you.";
//images beauty and the beast
const images = [];
images[0] = "theObjects.jpg";
images[1] = "opengate.jpg";
images[2] = "stairway.jpg";
images[3] = "candlesLights.jpg";
images[4] = "protected.jpg";
images[5] = "frontDoor.jpg";
images[6] = "shandeliers.jpg";
images[7] = "locked_up.png";
images[8] = "colsedGate.jpg";
//Blocked path info
const blockedPathMessages = [];
blockedPathMessages[0] = "The objects do not let you to pass";
blockedPathMessages[1] = "You don’t have the way out once you enter";
blockedPathMessages[2] = "You will wake up the beast, can't do that .";
blockedPathMessages[3] = "you can’t leave without  the light.";
blockedPathMessages[4] = "enter north, east, south, west, take, use, drop";
blockedPathMessages[5] = "The door locks shut.";
blockedPathMessages[6] = "you can’ walk under the crystal chandeliers, it will fall on you.";
blockedPathMessages[7] = "No way to go out it is locked";
blockedPathMessages[8] = "You can’t pass without a key.";
//To hide the cheat sheet using arrow function 
let showTechSheet= ()=>{
    "use strict";
  if (x.style.display ==="block") {
    x.style.display ="none";  
  } else {
    x.style.display ="block";
  }
};
cheatsheet.addEventListener("click",showTechSheet, false);
//Display the player's location
function clickHandler()
{
  playGame();
}
function render()
{
   //Render the location
   output.innerHTML = map[mapLocation];
   image.src = "./images/" + images[mapLocation];

   //Display an item if there's one in this location
   //1. Loop through all the game items
   for(var i = 0; i < gameelementes.items.length; i++)
   {
     //Find out if there's an item at this location
     if(mapLocation === itemLocations[i])
     {
       //Display it
       output.innerHTML
       += "<br>You see a <strong>"
       + gameelementes.items[i]
       + "</strong> here.";
     }
       
   }

   //Display the game message
   output.innerHTML += "<br><em>" + gameMessage + "</em>";

   //Display the player's backpack contents
   if(backpack.length !== 0)
   {
     output.innerHTML += "<br>You are carrying: " + backpack.join(", ");
   }
}
render();
// save the game postion on local storage and items 
function saveGameState()
{
   const  savedValue= [mapLocation,backpack]; 
    const jsonString= JSON.stringify(savedValue);
     localStorage.setItem("savedInfo", jsonString);
    return this.savedInfo;
}
// restore the game from local storage 
function restorGameState()
{
  const restoreInfo = JSON.parse(localStorage.getItem('savedInfo'));
   mapLocation=restoreInfo[0];
    backpack= restoreInfo[1];
   
    render();
    playGame();
    
}
function playGame()
{
   //Get the player's input and convert it to lowercase
   playersInput = input.value;
   playersInput = playersInput.toLowerCase();
   //Reset these variables from the previous turn
   gameMessage = "";
   action = "";
   //Figure out the player's action
   for(i = 0; i < actionsIKnow.length; i++)
{
  if(playersInput.indexOf(actionsIKnow[i]) !== -1)
  {
    action = actionsIKnow[i];
    console.log("player's action: " + action);
    break;
  }
}
//Figure out the item the player wants
for(i = 0; i < itemsIKnow.length; i++)
{
  if(playersInput.indexOf(itemsIKnow[i]) !== -1)
  {
    item = itemsIKnow[i];
    console.log("player's item: " + item);
  }
}
//Choose the correct action
switch(action)
{
  case "north":
    if(mapLocation >= 3)
    {
      mapLocation -= 3;
    }
    else
    {
      gameMessage = blockedPathMessages[mapLocation];
    }
    break;

  case "east":
    if(mapLocation % 3 != 2)
    {
          mapLocation += 1;
        
        if(mapLocation==gameelementes.LOCKEDROOM && gameelementes.lockedLocation) // to block the locked room 
            {
                gameMessage="you need a key to open it";
                mapLocation -= 1;
                
            }
       if (mapLocation==gameelementes.LOCKEDROOM){
           document.getElementById("endgame").style.display="block";
            playstart.style.display="none";
            imgbuttonDisplay.style.display="none";
           
           overgame();
       }
    }
    else
    {
      gameMessage = blockedPathMessages[mapLocation];
    }
    break;

  case "south":
    if(mapLocation < 6)
    {
       
      mapLocation += 3;
        if(mapLocation==gameelementes.LOCKEDROOM && gameelementes.lockedLocation) // to block the locked room 
            {
               gameMessage="you need a key to open it";
                mapLocation -= 3; 
            }
    }
    else

      {
        gameMessage = blockedPathMessages[mapLocation];
      }
      break;

    case "west":
      if(mapLocation % 3 != 0)
      {
        mapLocation -= 1;
          
          if(mapLocation==gameelementes.LOCKEDROOM && gameelementes.lockedLocation) // to block the locked room 
            {
                gameMessage="you need a key to open it";
                mapLocation += 1;
                
            }
      }
      else
      {
        gameMessage = blockedPathMessages[mapLocation];
      }
      break;
    case "take":
      takeItem()
      break;

    case "drop":
      dropItem();
      break;

    case "use":
      useItem();
      break;
    default:
      gameMessage = "I don't understand that.";
  }

  //Render the game
  render();
}
// start over the game from the oreginal postion  
function restartGame()
{
  console.log("restart called"); 
    gameMessage= "";
    backpack = [];
    mapLocation=4;
    item="";
    render(); 
}
function takeItem()
{
   //Find the index number of the item in the items array
   var itemIndexNumber = gameelementes.items.indexOf(item);

   //Does the item exist in the game world and is it at the player's current location?
   if(itemIndexNumber !== -1
   && itemLocations[itemIndexNumber] === mapLocation)
   {
     gameMessage = "You take the " + item + ".";

     //Add the item to the player's backpack
     backpack.push(item);

     //Remove the item from the game world
     gameelementes.items.splice(itemIndexNumber, 1);
     itemLocations.splice(itemIndexNumber, 1);

     //Display in the console for testing
     console.log("World items: " + gameelementes.items);
     console.log("backpack items: " + backpack);
   }
   else
   {
     //Message if the player tries to take an item that isn't in the current location
     gameMessage = "You can't do that.";
   }
}
function dropItem()
{
   //Try to drop the item only if the backpack isn't empty
   if(backpack.length !== 0)
   {
     //Find the item's array index number in the backpack
     var backpackIndexNumber = backpack.indexOf(item);
     //The item is in the backpack if the backpackIndexNumber isn't -1
     if(backpackIndexNumber !== -1)
     {
      //Tell the player that the item has been dropped
      gameMessage = "You drop the " + item + ".";

      //Add the item from the backpack to the game world
      gameelementes.items.push(backpack[backpackIndexNumber]);
      itemLocations.push(mapLocation);

      //Remove the item from the player's backpack
      backpack.splice(backpackIndexNumber, 1);
     }
     else
     {
       //Message if the player tries to drop something that's not in the backpack
       gameMessage = "You can't do that.";
     }
   }
   else
   {
     //Message if the backpack is empty
     gameMessage = "You're not carrying anything.";
   }
}

function useItem()
{
   //1. Find out if the item is in the backpack

   //Find the item's array index number in the backpack
   //var backpackIndexNumber = backpack.indexOf(item);

   //If the index number is -1, then it isn't in the backpack.
   //Tell the player that he or she isn't carrying it.
   if(backpackIndexNumber === -1)
   {
     gameMessage = "You're not carrying it.";
   }

    if (backpack.includes(item)){
        var backpackIndexNumber = backpack.indexOf(item);
    }
    else
        {
            backpackIndexNumber !== -1;
        }
   //If there are no items in the backpack, then
   //tell the player the backpack is empty
   if(backpack.length === 0)
   {
     gameMessage += " Your backpack is empty";
   }

   //2. If the item is found in the backpack
   //figure out what to do with it
   if(backpackIndexNumber !== -1)
   {
     switch(item)
     {
       case "rose":
         gameMessage = "The rose, which was truly an enchanted rose.";
         break;

       case "key":
         if(mapLocation === 6 ||mapLocation ===4 || mapLocation === 8 )
         {
           gameMessage
             = "You unlock the room !";
             gameelementes.lockedLocation=false;
         }
         else
         {
           gameMessage
             = "using the key in the wrong place.";
         }
         break;

       case "torchlight":
         if(mapLocation === 1)
         {
           gameMessage = "you filled the room with bright light.";

           //Remove the item from the player's backpack
           backpack.splice(backpackIndexNumber, 1);
         }
       else
             
         {
           gameMessage
             = "you drop your torchlight and the ligh is out";
         }
         break; 
         case "teacup":
             gameMessage="teapot and her baby teacup will chat with all day";
         
             break;
         case "gold":
             gameMessage ="golden box and the locked room ";
         break;
        
      }
   }
}
// start screen  function 
function palygameScreen(){
     StartScr.style.display= "none";
     playstart.style.display="block";
   imgbuttonDisplay.style.display="block";
}
//sound play in the start room 
function soundplay(){
    let sound = new Audio();
    sound.src= "./images/birds013.mp3";
    sound.play();
}
//focus eneter cureser 
input.addEventListener("keyup", function(event)
{
    if (event.keyCode===13){
        event.preventDefault();
        button.click();
    }
    
});
//game over animation using greensock
function overgame()
{
     TweenLite.to(gameOver, 2, {rotationX:360, transformOrigin:"0% 50% -50%",left:400, ease:Bounce.easeOut, delay:1});
      
      
}
//help button function 
function helpplay(){
  if ( usehelp.style.display=="block") {
     usehelp.style.display ="none";  
  } else {
     usehelp.style.display ="block";
  }
   
}


