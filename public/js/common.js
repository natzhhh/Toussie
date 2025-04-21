document.getElementById("playingForm").style.display = "none";
document.getElementById("ready").style.display = "none";
document.getElementById("start").style.display = "none";

var roomValue;
var nameValue;

var socket = io();
var roomForm = document.getElementById('roomForm');
var inputCRoom = document.getElementById('inputCRoom');
var playingName = document.getElementById("playingName");
var multyPlayerScreen = document.getElementById('multyPlayerScreen');
var firstLayout = document.getElementById('firstLayout');
var secondLayout = document.getElementById('secondLayout');
var ready = document.getElementById('ready');
var playingForm = document.getElementById('playingForm');
var start = document.getElementById('ready');
 

      
      
var waiting = 0; 
var gameStarted;

     

function showAndHide() {
    var x = document.getElementById('SectionName');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
  }

  function multyPlay(){
   
    document.getElementById("allthethings").style.display = "none";
    document.getElementById("playingForm").style.display = "block";
    secondLayout.style.display = "none";

  }

  roomForm.addEventListener('submit', function(e) {
    e.preventDefault();  
    
    if (inputCRoom.value) {
      roomValue = inputCRoom.value;
      nameValue = playingName.value;
      inputCRoom.value = '';
      playingName.value ='';
    }

   
    socket.emit('roomCreate', {room: roomValue, name: nameValue},(error) => {
      if (error) {
          alert(error);
      }
    });
    

    firstLayout.style.display = "none";
    secondLayout.style.display = "block";
    
  

     
   
  }); 


function gameHasNotStarted(roomValue){
 
  setTimeout(function() {
   ready.style.display="block";
 
  }, 3000);
 
     
  // secondCard.style.display="block";

}

ready.addEventListener("click", function(e){
  e.preventDefault();
  ready.style.display="none";
  playingForm.style.display="none";
  socket.emit('ready', roomValue);
  });

  //when the players who have joined and ready do not equal
  socket.on('wait', function(msg) {
  
    document.getElementById("playingForm").style.display = "block";
    document.getElementById("playingForm").innerHTML = msg;
    //start.innerHTML= msg;
  
  
  });

// when the players are ready and they start playing the game
  socket.on('start', function(msg) {
    document.getElementById("playingForm").style.display = "block";
    document.getElementById("playingForm").innerHTML = msg;
    setTimeout(function(){
      document.getElementById("playingForm").style.display = "none";
      document.getElementById("start").style.display = "block";
  }, 3000);

});
 
  //when player joined the room after playing started
socket.on('gameWaiting', ({playingCoin, room})=>{    //({out, j}) => {
  if(waiting>=1)
  {
    waiting --;
    newMember =document.getElementById('newMember');
    newMember.innerHTML= room;    
  }
});
//when player joined after the game had started
socket.on('newMember', function(msg){
waiting ++;
 newMember =document.getElementById('newMember');
newMember.innerHTML= msg;

});
//when player joind after gamers are full 
socket.on('createNewRoom', function(msg){
   newMember =document.getElementById('newMember');
  newMember.innerHTML= msg;
  
  });


socket.on('roomName', ({user, text})=>{
var roomName =document.getElementById('newMember');
roomName.innerHTML= text;

gameHasNotStarted(user);

});
  

  