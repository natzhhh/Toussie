   var roomValue;
   var nameValue;
   var patternValue;
   let winnerNotFound = true;
   

      var socket = io();
      var form3 = document.getElementById('form3');
      var inputCRoom = document.getElementById('inputCRoom');
      var playingName = document.getElementById("playingName");
      //var playingJName = document.getElementById("playingName");
      //var form2 = document.getElementById('form2');
      //var inputJRoom = document.getElementById('inputJRoom');
      var multyPlayerScreen = document.getElementById('multyPlayerScreen');
  
      //var choosePattern = document.getElementById('choosePattern');
      //var changePattern = document.getElementById('changePattern');
      var ready = document.getElementById('ready');
      var start = document.getElementById('start');
      var playingForm = document.getElementById('playingForm');
   
      let  cardMatrixCopy = [];
      let rowClosed=0;
      let columnClosed=0;
      let diagonalClosed=0;
        var r1 = 0;
             var r2 = 0;
             var r3 = 0;
           var r4 = 0;
             var r5 = 0;
            var c1 = 0;
             var c2 = 0;
             var c3 = 0;
            var c4 = 0;
            var c5 = 0;
             var d1 = 0;
             var d2 = 0;
             var rectangle =0;
             var finished = 0;  
             var ballCounter = 0;
      
            var waiting = 0;
      
      
      var gameStarted;
      
      var trueBingo = false;
      var coinPlayer = 15;
      
     
      //  var randomCardTwo = document.getElementById('randomCardTwo');
  var randomCard = document.getElementById('randomCard');
  
    var firstCard = document.getElementById('firstCard');
    var playAgain1 = document.getElementById('playAgain');
    //document.getElementById("changePattern").style.display = "none";
    document.getElementById("thiredLayout").style.display = "none";
      
   firstCard.style.display="none";
   document.getElementById("showBall").style.display = "none";
  
    randomCard.style.display="none";
    playAgain1.style.display="none";
 


     
  
  
            

  form3.addEventListener('submit', function(e) {
    e.preventDefault();  
    
    if (inputCRoom.value) {
      roomValue = inputCRoom.value;
      nameValue = playingName.value;
      inputCRoom.value = '';
      playingName.value ='';
    }

   
    socket.emit('roomCreate', roomValue);
   /* if (input.value) {
        ivalue2 = input.value;
      
      input.value = '';
    }
    socket.emit('create', {room: ivalue, message: ivalue2});

    ***/
   
    multyPlayerScreen.style.display = "none";
    
     
   
  }); 


function gameHasNotStarted(roomValue){
 
  playingForm.style.display="block";
  document.getElementById("thiredLayout").style.display = "block";
  ready.style.display="block";
     
  // secondCard.style.display="block";

        

}

ready.addEventListener("click", function(e){
  e.preventDefault();
  document.getElementById("thiredLayout").style.display = "none";
  ready.style.display="none";
  playingForm.style.display="none";
  socket.emit('ready', roomValue);
  });
 
  //when player joined the room after playing started
socket.on('gameWaiting', ({playingCoin, room})=>{    //({out, j}) => {
  if(waiting===1)
  {
    newMember =document.getElementById('newMember');
    newMember.innerHTML= room;    
    coinBank(playingCoin,1);
    waiting = 0;
  }
});

socket.on('newMember', function(msg){
waiting ++;
 newMember =document.getElementById('newMember');
newMember.innerHTML= msg;


});
socket.on('roomName', function(msg){
var roomName =document.getElementById('roomName');
roomName.innerHTML= msg;

gameHasNotStarted(msg);

});
  


  
  socket.on('chosenPattern', function(pattern) {
  
    var  gameDiv = document.getElementById("gameDiv");
  gameDiv.style.display="block";
    gameDiv.innerHTML="Your Playing Pattern: " + pattern;
    patternValue = pattern;

  });
  socket.on('start', function(msg) {
   
    start.style.display="block";
   
  start.innerHTML= msg;

 firstCard.style.display="block";
 let card = new generateCard();
  cardMatrix = card.generateMatrix();
  cardMatrixCopy = cardMatrix;

 $("#cardBut1").prop("value", cardMatrix[0][0]);
 $("#cardBut2").prop("value", cardMatrix[1][0]);
 $("#cardBut3").prop("value", cardMatrix[2][0]);
 $("#cardBut4").prop("value", cardMatrix[3][0]);
 $("#cardBut5").prop("value", cardMatrix[4][0]);
 $("#cardBut6").prop("value", cardMatrix[0][1]);
 $("#cardBut7").prop("value", cardMatrix[1][1]);
 $("#cardBut8").prop("value", cardMatrix[2][1]);
 $("#cardBut9").prop("value", cardMatrix[3][1]);
 $("#cardBut10").prop("value", cardMatrix[4][1]);
 $("#cardBut11").prop("value", cardMatrix[0][2]);
 $("#cardBut12").prop("value", cardMatrix[1][2]);
 // $("#cardBtn13").prop("value", cardMatrix[2][2]);
 $("#cardBut14").prop("value", cardMatrix[3][2]);
 $("#cardBut15").prop("value", cardMatrix[4][2]);
 $("#cardBut16").prop("value", cardMatrix[0][3]);
 $("#cardBut17").prop("value", cardMatrix[1][3]);
 $("#cardBut18").prop("value", cardMatrix[2][3]);
 $("#cardBut19").prop("value", cardMatrix[3][3]);
 $("#cardBut20").prop("value", cardMatrix[4][3]);
 $("#cardBut21").prop("value", cardMatrix[0][4]);
 $("#cardBut22").prop("value", cardMatrix[1][4]);
 $("#cardBut23").prop("value", cardMatrix[2][4]);
 $("#cardBut24").prop("value", cardMatrix[3][4]);
 $("#cardBut25").prop("value", cardMatrix[4][4]);
    
 
         randomCard.style.display="block";
         document.getElementById("bingoButton").style.display="block";
        

});


/*****socket.on('ballTurn', function(ball) {
 
                  
 if(winnerNotFound){
  task(ball,patternValue,cardMatrixCopy);
 }




  
});************/


socket.on('ballTurn', ({out, j}) => {
 
  setTimeout( function() {   
 
  task(out,patternValue,cardMatrixCopy);

}, 2000 * j); 

});



socket.on('wait', function(msg) {
  
  start.style.display="block"
  start.innerHTML= msg;


});
socket.on('winner', function(msg) {
  document.getElementById("love").style.display = "block";
  document.getElementById("love").innerHTML = msg;
  winnerNotFound= false;
  document.getElementById("bingoButton").style.display= "none";
 // document.getElementById("playAgain").style.display = "block";
});
socket.on('winnerScore', function(score){
coinBank(score,2);
});
socket.on('scoreStarter', function(playingCoin){
 coinBank(playingCoin,1);
});

function coinBank(score,indicator){
 if(indicator===2){
  var winningPrize = 5*score;
  coinPlayer = coinPlayer + winningPrize;
  document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
 }
 if(indicator===1){
  coinPlayer = coinPlayer-score;
  if(coinPlayer<=0){
    document.getElementById("coinBank").innerHTML="you have insuficiant coin wacth Ads and make coin to play";
    setTimeout( function() {
      coinPlayer =coinPlayer + 15;
      document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
      gameHasNotStarted(roomValue);
    }, 8000);   
  }else{
    document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
    gameHasNotStarted(roomValue);
  }

 }
}




/**************function myPattern(roomValue){
 //****var cards = document.getElementById('cards');
 var pattern = document.getElementById('pattern');
     multyPlayerScreen.style.display = "none";
     choosePattern.style.display = "block";
     

    choosePattern.addEventListener('submit', function(e){
         e.preventDefault();
        patternValue = pattern.value;
       socket.emit('chosenPattern', {room: roomValue, message: patternValue});
 
        var gameDiv = document.getElementById("gameDiv");
        choosePattern.style.display = "none";
        gameDiv.style.display="block";
    
         ready.style.display="block";
     
     // secondCard.style.display="block";

            });
       
  }*************/

   
  
  /*********************************************************
   * *******************************************************
   * ***************************************************************************
   * *****************************************************************************
   */
  
  
  //event listner for Bingo button


  function whenBingoClicked(){
    document.getElementById("love").style.display="block";
    
    if(trueBingo===true){
     
      socket.emit('theWinner', {room: roomValue, message: playingName});
     document.getElementById("love").innerHTML = "Good Bingo Bro!";  
    
  }
  
   if(trueBingo===false){
  document.getElementById("love").innerHTML = "Bad Bingo Looser!"; 
  } 
  }
  
  
  
  
  
  //chanege button color for cards
  function change(cardButId){
    
      var btn = document.getElementById(cardButId).style.backgroundColor; 
      //var btn = document.getElementById(cardButId);
      if (btn == "red") {
          document.getElementById(cardButId).style.background = "grey";
      } else {
          document.getElementById(cardButId).style.background = "red";
      }
  
     
  
  }
  
  
  
  
  
  
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  
  function task(out,pattern,cardMatrixCopy) {
  
  
  
    
  
   
        //document.getElementById("love").innerHTML = out;
  
       ballCounter ++;

     //  document.getElementById("showBall").innerHTML = out;
     //  document.getElementById("showBall").style.display = "block";
    
      //document.getElementById("showBall").style.display = "block";
    if(winnerNotFound){
      document.getElementById("showBall").innerHTML = out;
      document.getElementById("showBall").style.display = "block";
    }
    else {
      document.getElementById("showBall").innerHTML = "wait until the last ball light up";
    }
      
      /***************************
    for making bingo bord change color 
     *************************************/
              
    if(out.startsWith("B")){
         result = out.toLocaleLowerCase();
             
             document.getElementById(result).style.color = "blue"; 
             
       }
       else if(out.startsWith("I")){
         result = out.toLocaleLowerCase();
             document.getElementById(result).style.color = "red";  
       }
       else if(out.startsWith("N"))
       {
        result = out.toLocaleLowerCase();
             document.getElementById(result).style.color = "black"; 
       }
          else if (out.startsWith("G")){
           result = out.toLocaleLowerCase();
             document.getElementById(result).style.color = "blue";
       }
          else if (out.startsWith("O")){
          result = out.toLocaleLowerCase();
             document.getElementById(result).style.color = "purple";
       }
       else {
           result = out.toLocaleLowerCase();
           document.getElementById(result).innerHTML = "b";  
       }
    
        
          /*************************************************
        for checking closing
        *******************************/
        //for closing the card1
  
  
        
       if(out===("B"+cardMatrixCopy[0][0])||out===("B"+cardMatrixCopy[0][1])||out===("B"+cardMatrixCopy[0][2])||out===("B"+cardMatrixCopy[0][3])||out===("B"+cardMatrixCopy[0][4]))
       {
           r1++;
           
       }
       if(out===("I"+cardMatrixCopy[1][0])||out===("I"+cardMatrixCopy[1][1])||out===("I"+cardMatrixCopy[1][2])||out===("I"+cardMatrixCopy[0][3])||out===("I"+cardMatrixCopy[1][4]))
       {
           r2++;
          
       }
        if(out===("N"+cardMatrixCopy[2][0])||out===("N"+cardMatrixCopy[2][1])||out===("N"+cardMatrixCopy[2][3])||out===("N"+cardMatrixCopy[2][4]))
       {
           r3++;
          
       }
       (out===("G"+cardMatrixCopy[3][0])||out===("G"+cardMatrixCopy[3][1])||out===("G"+cardMatrixCopy[3][2])||out===("G"+cardMatrixCopy[3][3])||out===("G"+cardMatrixCopy[3][4]))
       {
           r4++;
          
       }
       (out===("O"+cardMatrixCopy[4][0])||out===("O"+cardMatrixCopy[4][1])||out===("O"+cardMatrixCopy[4][2])||out===("O"+cardMatrixCopy[4][3])||out===("O"+cardMatrixCopy[4][4]))
       {
           r5++;
         
       }
        if(out===("B"+cardMatrixCopy[0][0])||out===("I"+cardMatrixCopy[1][0])||out===("N"+cardMatrixCopy[2][0])||out===("G"+cardMatrixCopy[3][0])||out===("O"+cardMatrixCopy[4][0]))
       {
           c1++;
           
       }
       if(out===("B"+cardMatrixCopy[0][1])||out===("I"+cardMatrixCopy[1][1])||out===("N"+cardMatrixCopy[2][1])||out===("G"+cardMatrixCopy[3][1])||out===("O"+cardMatrixCopy[4][1]))
       {
           c2++;
          
       }
       if(out===("B"+cardMatrixCopy[0][2])||out===("I"+cardMatrixCopy[1][2])||out===("G"+cardMatrixCopy[3][2])||out===("O"+cardMatrixCopy[4][2]))
       {
           c3++;
          
       }
       if(out===("B"+cardMatrixCopy[0][3])||out===("I"+cardMatrixCopy[1][3])||out===("N"+cardMatrixCopy[2][3])||out===("G"+cardMatrixCopy[3][3])||out===("O"+cardMatrixCopy[4][3]))
       {
           c4++;
           
       }
       if(out===("B"+cardMatrixCopy[0][4])||out===("I"+cardMatrixCopy[1][4])||out===("N"+cardMatrixCopy[2][4])||out===("G"+cardMatrixCopy[3][4])||out===("O"+cardMatrixCopy[4][4]))
       {
           c5++;
         
       }
        if(out===("B"+cardMatrixCopy[0][0])||out===("I"+cardMatrixCopy[1][1])||out===("G"+cardMatrixCopy[3][3])||out===("O"+cardMatrixCopy[4][4]))
       {
           d1++;
          
       }
       if(out===("B"+cardMatrixCopy[0][4])||out===("I"+cardMatrixCopy[1][3])||out===("G"+cardMatrixCopy[3][1])||out===("O"+cardMatrixCopy[4][0]))
       {
           d2++;
           
       }
        
            if(r1===5||r2===5||r3===4||r4===5||r5===5||c1===5||c2===5||c3===4||c4===5||c5===5||d1===4||d2===4)
       {
        finished++;
         
          
       }
           if(r1===5||r2===5||r3===4||r4===5||r5===5)
       {
       columnClosed++;
         
          
       }
           if(c1===5||c2===5||c3===4||c4===5||c5===5)
       {
       
        rowClosed++; 
         
       }
       if(d1===4||d2===4)
       {
        diagonalClosed++;
         
         //  document.getElementById("love").innerHTML = "closed  "+closed;  
       }
       if(c1===5||c5===5||r1===5||r5===5)
       {
         rectangle++;
       }
    if(pattern==="threeInAnyWays" && finished>=3){
        //document.getElementById("love").innerHTML = "closed  threeInANYways "; 
    trueBingo = true;
        }
    
     if(pattern==="twoRowsThreeColumn" && columnClosed >=3 && rowClosed >=2){
        //document.getElementById("love").innerHTML = "closed  two Rows and Three Columns"; 
    trueBingo = true;
        }
     if(pattern==="x" && d1===4 && d2===4 ){
      //  document.getElementById("love").innerHTML = "closed two diagonals"; 
      trueBingo = true;  
    }
     if(pattern==="Rectangle" && rectangle===4 ){
       // document.getElementById("love").innerHTML = "you closed rectangle"; 
        trueBingo = true;
    }
     if(pattern==="plus" && r3===4 && c3===4 ){
      //  document.getElementById("love").innerHTML = "you closed plus"; 
        trueBingo = true;
    }
      
    
  
    if(ballCounter===75){
      ballFinished();
      ballCounter = 0;
    }
      
          
             
  
  }
    
  
  
  
  function ballFinished(){
      document.getElementById("showBall").innerHTML = "All Balls had Bounced";
      document.getElementById("playAgain").style.display = "block";
      
     
    }
    
  
    function playAgain(){
      document.getElementById("showBall").style.display = "none";
      document.getElementById("love").style.display = "none";
      document.getElementById("playAgain").style.display = "none";
   
      var  gameDiv = document.getElementById("gameDiv");
  gameDiv.style.display="none";
      




      for(var i=1; i<=15; i++)
      {
        var string ="b"+i;
        document.getElementById(string).style.color = "grey";
      }
      for(var i=16; i<=30; i++)
      {
        var string ="i"+i;
        document.getElementById(string).style.color = "grey";
      }
      for(var i=31; i<=45; i++)
      {
        var string ="n"+i;
        document.getElementById(string).style.color = "grey";
      }
      for(var i=46; i<=60; i++)
      {
        var string ="g"+i;
        document.getElementById(string).style.color = "grey";
      }
      for(var i=61; i<=75; i++)
      {
        var string ="o"+i;
        document.getElementById(string).style.color = "grey";
      }
    for(var i=1; i<=25; i++){
      document.getElementById("cardBut"+i).style.background = "grey";
    }
    
  
   rowClosed=0;
   columnClosed=0;
   diagonalClosed=0;
   rectangle= 0;
    r1 = 0;
          r2 = 0;
          r3 = 0;
        r4 = 0;
         r5 = 0;
         c1 = 0;
         c2 = 0;
         c3 = 0;
       c4 = 0;
         c5 = 0;
       d1 = 0;
         d2 = 0;
          finished = 0;  
         ballCounter = 0;
  
  
  
  
  
  
  trueBingo = false;
  winnerNotFound = true;
  
  socket.emit('playAgain', roomValue);
    }
  
  
  
   