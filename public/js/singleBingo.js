let  cardMatrixCopy = [];
let houseCardMatrix =[];
var ready = document.getElementById('ready');
var start = document.getElementById('start');
var pattern;
var whichPlay;
var winnerNotFound;
//making the html div elment hide
 //  var randomCardTwo = document.getElementById('randomCardTwo');
 var randomCard = document.getElementById('randomCard');
  
 var firstCard = document.getElementById('firstCard');
 var playAgain1 = document.getElementById('playAgain');
firstCard.style.display="none";
document.getElementById("showBall").style.display = "none";
document.getElementById("showBingo").style.display = "none";
document.getElementById("showPattern").style.display = "none";
document.getElementById("badBingo").style.display = "none";
document.getElementById("houseBingo").style.display = "none";
document.getElementById("roomName").style.display = "none";
document.getElementById("firework").style.display = "none";

document.getElementById("interstitial").style.display = "none";
document.getElementById("rewarded").style.display = "none";
//document.getElementById("adDescription").style.display = "none";


 randomCard.style.display="none";
 playAgain1.style.display="none";
 document.getElementById("game").style.display = "none";
 var single = document.getElementById('single');
 var playWithHouse = document.getElementById('multiplayer');
 var options = document.getElementById('options');
 var circle = document.getElementById('circle');

 let rowClosed;
 let columnClosed;
 let diagonalClosed;
   var r1 ;
        var r2 ;
        var r3 ;
      var r4 ;
        var r5 ;
       var c1 ;
        var c2;
        var c3 ;
       var c4;
       var c5;
        var d1;
        var d2;
        var rectangle;
        var finished ;  
        var ballCounter;
       var waiting;
 var gameStarted;
 var trueBingo;
 var coinPlayer =15;
 var trueBingoCounter;



 let HrowClosed;
 let HcolumnClosed;
 let HdiagonalClosed;
   var Hr1 ;
        var Hr2 ;
        var Hr3 ;
      var Hr4 ;
        var Hr5 ;
       var Hc1 ;
        var Hc2;
        var Hc3 ;
       var Hc4;
       var Hc5;
        var Hd1;
        var Hd2;
        var Hrectangle;
        var Hfinished ;  
        var HballCounter;
       var Hwaiting;
 var HgameStarted;
 var HtrueBingo;
 var HcoinPlayer =15;
 var HtrueBingoCounter;

var ballPlaying;




/*****************************************
 **************************************** 
 *  for fb instant loader
 * **************************************
 *****************************************/
 const id = 5356440877711074;

FBInstant.initializeAsync().then(function() {

  // We can start to load assets
  var progress= 0;
 var interval = setInterval(function(){
    // When preloading assets, make sure to report the progress
    if(progress>=95){
      clearInterval(interval); 
       // Now that assets are loaded, call startGameAsync
        FBInstant.startGameAsync().then(onAds);
      }
FBInstant.setLoadingProgress(progress);
progress+=5; 
},100);
});

function onAds() {
let supportedAPIs = FBInstant.getSupportedAPIs();
let canShowAds =
supportedAPIs.includes('getInterstitialAdAsync') && supportedAPIs.includes('getRewardedVideoAsync');
if (!canShowAds) {
display.error('Ads not supported in this session');
}
}
function preloadInterstitial() {
  document.getElementById("display-message").innerHTML="Preloading Interstitial";
$('#btn-interstitial').hide();
//let id = $('#interstitial-placement').val();// const REWARDED_PLACEMENT_ID = '<YOUR REWARDED VIDEO PLACEMENT ID>';

FBInstant.getInterstitialAdAsync(id)
.then(function(interstitial) {
// Load the Ad asynchronously
preloadedInterstitial = interstitial;
return preloadedInterstitial.loadAsync();
})
.then(function() {
  document.getElementById("display-success").innerHTML="Interstitial ready";
$('#btn-interstitial').show();
})
.catch(function(error) {
  document.getElementById("display-error").innerHTML="Interstitial failed to preload: "+error;
//display.error('Interstitial failed to preload: ' + error.message);
});
}

function preloadRewarded() {
  document.getElementById("display-message").innerHTML="Preloading Rewarded Video'";
//display.message('Preloading Rewarded Video');
$('#btn-rewarded').hide();
//let id = $('#rewarded-placement').val();//  const INTERSTITIAL_PLACEMENT_ID = '<YOUR INTERSTITIAL PLACEMENT ID>';
FBInstant.getRewardedVideoAsync(id)
.then(function(rewarded) {
// Load the Ad asynchronously
preloadedRewardedVideo = rewarded;
return preloadedRewardedVideo.loadAsync();
})
.then(function() {
  document.getElementById("display-success").innerHTML="Rewarded Video ready";
$('#btn-rewarded').show();
})
.catch(function(error) {
  document.getElementById("display-error").innerHTML="Rewarded Video failed to preload: "+error;
//display.error('Rewarded Video failed to preload: ' + error.message);
});
}

function showInterstitial() {
preloadedInterstitial.showAsync()
.then(function() {
// User has watched the ad.
// Perform post-ad success operation
//..
document.getElementById("display-success").innerHTML="Interstitial watched";
//display.success('Interstitial watched!');
document.getElementById("interstitial").style.display="none";
setInterval(function(){
  document.getElementById("interstitial").style.display="block"; 
},4000);
})
.catch(function(error) {
  document.getElementById("display-error").innerHTML=error;
//display.error(error.message);
});
}

function showRewarded() {
preloadedRewardedVideo.showAsync()
.then(function() {
// User has watched the ad.
// Perform post-ad success operation
//..
document.getElementById("display-success").innerHTML="Rewarded Video watched!";
//display.success('Rewarded Video watched!');
coinPlayer =coinPlayer + 15;
document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
// gameHasNotStarted(roomValue);
if(whichPlay==="housePlay"){
  if(coinPlayer===0){
    coinPlayer =coinPlayer + 15;
    document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
  }
  ballFinished();
}else{
  ballStarter(whichPlay);
  coinPlayer =coinPlayer + 15;
document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
}

})
.catch(function(error) {
  document.getElementById("display-error").innerHTML=error;
//display.error(error.message);
});
}














function goHome(){
  var randomCard = document.getElementById('randomCard');
  
 var firstCard = document.getElementById('firstCard');
 var playAgain1 = document.getElementById('playAgain');
firstCard.style.display="none";
document.getElementById("showBall").style.display = "none";
document.getElementById("showBingo").style.display = "none";
document.getElementById("showPattern").style.display = "none";
document.getElementById("badBingo").style.display = "none";
document.getElementById("houseBingo").style.display = "none";
document.getElementById("roomName").style.display = "none";
document.getElementById("firework").style.display = "none";


document.getElementById("interstitial").style.display = "none";
document.getElementById("rewarded").style.display = "none";
//document.getElementById("adDescription").style.display = "none";

 randomCard.style.display="none";
 playAgain1.style.display="none";
 document.getElementById("game").style.display = "none"; 



 for(var i=1; i<=15; i++)
 {
   var string ="b"+i;
   document.getElementById(string).style.background = "wheat";
 }
 for(var i=16; i<=30; i++)
 {
   var string ="i"+i;
   document.getElementById(string).style.background = "wheat";
 }
 for(var i=31; i<=45; i++)
 {
   var string ="n"+i;
   document.getElementById(string).style.background = "wheat";
 }
 for(var i=46; i<=60; i++)
 {
   var string ="g"+i;
   document.getElementById(string).style.background = "wheat";
 }
 for(var i=61; i<=75; i++)
 {
   var string ="o"+i;
   document.getElementById(string).style.background = "wheat";
 }

for(var i=1; i<=25; i++){
 document.getElementById("cardBut"+i).style.background = "grey";
}
if(whichPlay==="housePlay"){

  for(var i=1; i<=25; i++){
    document.getElementById("cardHBut"+i).style.background = "grey";
  }
  
}




 document.getElementById("allthethings").style.display = "block";
}




function twentyFiveBalls(ball){
  ballPlaying = ball; 
   rowClosed=0;
  columnClosed=0;
   diagonalClosed=0;
   cardMatrixCopy = [];
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
          rectangle =0;
          finished = 0;  
          ballCounter = 0;
         waiting = 0;
   gameStarted = false;
  trueBingo = false;
  //coinPlayer = 15;
 trueBingoCounter = 0;
 document.getElementById("houseCard").style.display = "none";
  document.getElementById("allthethings").style.display="none";
  document.getElementById("game").style.display = "block";
  //let patternValue= patternGenerator();

  start.style.display="block";
   
  start.innerHTML= "Game: "+ball+" Balls";

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
  $("#cardBtn13").prop("value", cardMatrix[2][2]);
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

         document.getElementById("interstitial").style.display = "block";
         //document.getElementById("adDescription").style.display = "block";
       /**** * ***************
        * 
        * **********************
        * preloadInterstitial();
         setTimeout(function(){
          showInterstitial();
         },2000);********/
         

       if(ball===35)  {
         let playingCoin =5;
         whichPlay = "play35";
         coinBank(playingCoin,1,whichPlay);
       }
       if(ball===45){
        let playingCoin =5;
        whichPlay = "play45";
        coinBank(playingCoin,1,whichPlay);
       }
 
}







///generates random playing Patterns
function patternGenerator() {
  
  var playingPattern;
         
  
              
              var patterns = ["threeInAnyWays", "twoRowsThreeColumn", "x", "Rectangle", "plus"];
              let bballsLen = patterns.length;
              let ball = 1 + Math.floor(Math.random() * bballsLen);
              let i = ball - 1;
              playingPattern = patterns[i];
              return playingPattern;
          }


          //generate random Balls
function generateBalls() {
  

    var arrayBalls = [];
              
                  var balls = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "I16", "I17", "I18", "I19", "I20", "I21", "I22", "I23", "I24", "I25", "I26", "I27", "I28", "I29", "I30", "N31", "N32", "N33", "N34", "N35", "N36", "N37", "N38", "N39", "N40", "N41", "N42", "N43", "N44", "N45", "G46", "G47", "G48", "G49", "G50", "G51", "G52", "G53", "G54", "G55", "G56", "G57", "G58", "G59", "G60", "O61", "O62", "O63", "O64", "O65", "O66", "O67", "O68", "O69", "O70", "O71", "O72", "O73", "O74", "O75"];
      
      
      
                  for (var j = 1; j <= 75; j++) {
      
      
                      let ballsLen = balls.length;
                      let ball = 1 + Math.floor(Math.random() * ballsLen);
      
                      let k=j-1;
                      let i = ball - 1;
                      let out = balls[i];
                      arrayBalls[k] = out;
                      balls = splice(balls, i);
                  }
                  return arrayBalls;
              }
      //array splice function
function splice(balls,j) {
  balls.splice(j, 1);  
  return balls;
}


 //chanege button color for cards
 function change(cardButId){
    
  var btn = document.getElementById(cardButId).style.background; 
  //var btn = document.getElementById(cardButId);
  if (btn === "rgb(221, 11, 92)") {
      document.getElementById(cardButId).style.background = "grey";
  } else {
      document.getElementById(cardButId).style.background = "rgb(221, 11, 92)";
  }

 

}

function coinBank(score,indicator,whichPlay){
  if(indicator===2){
   var winningPrize = 5*score;
   coinPlayer = coinPlayer + winningPrize;
   document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
  }
  if(indicator===1){
  
   if(coinPlayer<=0){
    coinPlayer = coinPlayer-score;
    document.getElementById("rewarded").style.display="block";
     document.getElementById("rewarded").innerHTML="you have insuficiant coin wacth Ads earn coins";
     document.getElementById("coinBank").innerHTML="Empty bank";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /*setTimeout( function() {
       coinPlayer =coinPlayer + 15;
       document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
      // gameHasNotStarted(roomValue);
      ballStarter(whichPlay);
     }, 8000);  **************************************/
     
     
     
   }else{
    coinPlayer = coinPlayer-score;
     document.getElementById('coinBank').innerHTML = "Coin Bank:"+ coinPlayer;
    // gameHasNotStarted(roomValue);
   ballStarter(whichPlay);
   }
  }
 }

 function ballStarter(whichPlay){
  let ballsArray = generateBalls();
  if(whichPlay==="play35"){
 // coinBank(playingCoin,1);
  for (var j = 1; j <= 35; j++) {


    let i = j-1;
    let out = ballsArray[i];
        console.log(out);
        ballTurn(out,j);
   }}
   if(whichPlay==="housePlay"){
    for (var j = 1; j <= 75; j++) {


      let i = j-1;
      let out = ballsArray[i];
          console.log(out);
          ballTurn(out,j);
     }} 
   if(whichPlay==="play45"){
    // coinBank(playingCoin,1);
     for (var j = 1; j <= 45; j++) {
   
   
       let i = j-1;
       let out = ballsArray[i];
           console.log(out);
           ballTurn(out,j);
      }}


}


function ballTurn(out,j){
 setTimeout( function() {   
 
    task25(out,cardMatrixCopy);
    
  }, 3000 * j); 
  
}


function showAndHide() {
  var x = document.getElementById('SectionName');
  if (x.style.display == 'none') {
      x.style.display = 'block';
  } else {
      x.style.display = 'none';
  }
}

function whenBingoClicked(){
 
  
  
if(whichPlay==="housePlay"){
  if(trueBingo===true&&HtrueBingo!=true){
    document.getElementById("showBingo").style.display="block";
    document.getElementById("firework").style.display = "block";
      winnerNotFound = false;
        let score = 2;
        //socket.emit('theWinner', {room: roomValue, message: playingName});
       document.getElementById("showBingo").innerHTML = "Good Bingo Bro!";
       document.getElementById("bingoButton").style.display= "none";
       coinBank(score,2,whichPlay); 
      // trueBingoCounter++; 
    //  clearInterval(delayBalls);
      setTimeout( function() {   
        document.getElementById("showBingo").style.display="none";
        document.getElementById("firework").style.display = "none";
        //ballFinished();
      }, 5000); 
  //finished--;
}else if(HtrueBingo===true){
  document.getElementById("badBingo").style.display="block";
document.getElementById("badBingo").innerHTML = "The House wins first, you loose!"; 
setTimeout( function() {   
  document.getElementById("badBingo").style.display="none";
}, 2000); 
}else {
  document.getElementById("badBingo").style.display="block";
  document.getElementById("badBingo").innerHTML = "Bad BINGO!"; 
  setTimeout( function() {   
    document.getElementById("badBingo").style.display="none";
  }, 2000); 
}
}
if(whichPlay==="play35"||whichPlay==="play45")
{
  if(trueBingo===true){
    trueBingoCounter++; 
     if( finished >= trueBingoCounter){
      document.getElementById("showBingo").style.display="block";
      document.getElementById("firework").style.display = "block";
        let score = 2;
        //socket.emit('theWinner', {room: roomValue, message: playingName});
       document.getElementById("showBingo").innerHTML = "Good Bingo Bro!";
      
       //document.getElementById("bingoButton").style.display= "none";
       coinBank(score,2,whichPlay); 
       setTimeout( function() {   
        document.getElementById("showBingo").style.display="none";
        document.getElementById("firework").style.display = "none";
      }, 5000); 
      // trueBingoCounter++; 
       }    
  //finished--;
}else {
  document.getElementById("badBingo").style.display="block";
  document.getElementById("badBingo").innerHTML = "Bad BINGO!"; 
  setTimeout( function() {   
    document.getElementById("badBingo").style.display="none";
  }, 2000); 
}
}
}


function houseWins(){
//  document.getElementById("love").innerHTML = ""; 
if(winnerNotFound){
  document.getElementById("houseBingo").style.display="block";
document.getElementById("houseBingo").innerHTML = "Game Over! House wins!";
document.getElementById("bingoButton").style.display= "none";
document.getElementById("rewarded").style.display = "block";
document.getElementById("rewarded").innerHTML = "you loose watch ads to earn life";
winnerNotFound = false;
//clearInterval(delayBalls);
}
}

















function task25(out,cardMatrixCopy){
   
 
   ballCounter ++;
   if(whichPlay==="housePlay"){
    if(winnerNotFound){ 
         document.getElementById("showBall").innerHTML = out;
    document.getElementById("showBall").style.display = "block";
       }
     else {
      document.getElementById("roomName").style.display = "block";
    document.getElementById("roomName").innerHTML = "wait until the last ball light up";
    document.getElementById("showBall").style.display = "none"; 
    document.getElementById("showPattern").style.display="none"; 
      }
   }
   
   if(whichPlay==="play35"||whichPlay==="play45"){
   document.getElementById("showBall").innerHTML = out;
   document.getElementById("showBall").style.display = "block";
  }
    /***************************
  for making bingo bord change color 
   *************************************/
            
  if(out.startsWith("B")){
       result = out.toLocaleLowerCase();
           
           document.getElementById(result).style.background = "#7b52e3"; 
           
     }
     else if(out.startsWith("I")){
       result = out.toLocaleLowerCase();
           document.getElementById(result).style.background = "#ff9933";  
     }
     else if(out.startsWith("N"))
     {
      result = out.toLocaleLowerCase();
           document.getElementById(result).style.background = "#ff4422"; 
     }
        else if (out.startsWith("G")){
         result = out.toLocaleLowerCase();
           document.getElementById(result).style.background = "#FF00FF";
     }
        else if (out.startsWith("O")){
        result = out.toLocaleLowerCase();
           document.getElementById(result).style.background = "#FF4500";
     }
     else {
         result = out.toLocaleLowerCase();
         document.getElementById(result).innerHTML = "b";  
     }

/*******************************************************************
          ****************************************************
                      **for house Card**
          ****************************************************
 ****************************************************************************/
if(whichPlay==="housePlay"&&winnerNotFound===true){


  document.getElementById("cardHBut13").style.background = "#f54d0a ";

  if(out.startsWith("B")){
      
       if(out===("B"+houseCardMatrix[0][0])){
        
        document.getElementById("cardHBut1").style.background = "#f54d0a";
          }
       if(out===("B"+houseCardMatrix[0][1])){
        
            document.getElementById("cardHBut6").style.background = "#f54d0a";
          }
       if(out===("B"+houseCardMatrix[0][2])){
        
         document.getElementById("cardHBut11").style.background = "#f54d0a";
        }
       if(out===("B"+houseCardMatrix[0][3])){
        
          document.getElementById("cardHBut16").style.background = "#f54d0a";
        }
       if(out===("B"+houseCardMatrix[0][4])){
        
         document.getElementById("cardHBut21").style.background = "#f54d0a";
          }
    
  }
  else if(out.startsWith("I")){
    if(out===("I"+houseCardMatrix[1][0])){
        
      document.getElementById("cardHBut2").style.background = "#f54d0a";
        }
  if(out===("I"+houseCardMatrix[1][1])){
      
          document.getElementById("cardHBut7").style.background = "#f54d0a";
   }
   if(out===("I"+houseCardMatrix[1][2])){
      
    document.getElementById("cardHBut12").style.background = "#f54d0a";
      }
    if(out===("I"+houseCardMatrix[1][3])){
      
        document.getElementById("cardHBut17").style.background ="#f54d0a";
    }
    if(out===("I"+houseCardMatrix[1][4])){
      
      document.getElementById("cardHBut22").style.background = "#f54d0a";
        }
  
  }
  else if(out.startsWith("N"))
  {  if(out===("N"+houseCardMatrix[2][0])){
        
    document.getElementById("cardHBut3").style.background = "#f54d0a";
      }
    if(out===("N"+houseCardMatrix[2][1])){
    
        document.getElementById("cardHBut8").style.background = "#f54d0a";
   }
   
    if(out===("N"+houseCardMatrix[2][3])){
    
      document.getElementById("cardHBut18").style.background = "#f54d0a";
  }
    if(out===("N"+houseCardMatrix[2][4])){
    
    document.getElementById("cardHBut23").style.background = "#f54d0a";
      }


   }
     else if (out.startsWith("G")){

      if(out===("G"+houseCardMatrix[3][0])){
        
        document.getElementById("cardHBut4").style.background = "#f54d0a";
          }
      if(out===("G"+houseCardMatrix[3][1])){
        
            document.getElementById("cardHBut9").style.background = "#f54d0a";
      }
      if(out===("G"+houseCardMatrix[3][2])){
        
      document.getElementById("cardHBut14").style.background = "#f54d0a";
        }
      if(out===("G"+houseCardMatrix[3][3])){
        
          document.getElementById("cardHBut19").style.background = "#f54d0a";
      }
      if(out===("G"+houseCardMatrix[3][4])){
        
        document.getElementById("cardHBut24").style.background = "#f54d0a";
          }
    
   }
     else if (out.startsWith("O")){
      if(out===("O"+houseCardMatrix[4][0])){
        
        document.getElementById("cardHBut5").style.background = "#f54d0a";
          }
       if(out===("O"+houseCardMatrix[4][1])){
        
            document.getElementById("cardHBut10").style.background = "#f54d0a";
        }
       if(out===("O"+houseCardMatrix[4][2])){
        
      document.getElementById("cardHBut15").style.background = "#f54d0a";
        }
        if(out===("O"+houseCardMatrix[4][3])){
        
          document.getElementById("cardHBut20").style.background = "#f54d0a";
      }
      if(out===("O"+houseCardMatrix[4][4])){
        
        document.getElementById("cardHBut25").style.background = "#f54d0a";
          }
    
  }
  else {
     // result = out.toLocaleLowerCase();
     document.getElementById("showBingo").innerHTML = "there is something wrong";  
  }


  
  if(out===("B"+houseCardMatrix[0][0])||out===("B"+houseCardMatrix[0][1])||out===("B"+houseCardMatrix[0][2])||out===("B"+houseCardMatrix[0][3])||out===("B"+houseCardMatrix[0][4]))
  {
      Hr1 = Hr1+1;
      if(Hr1===5){
        Hfinished++;
        HcolumnClosed++;
        Hrectangle++;
      }
    
  }
  if(out===("I"+houseCardMatrix[1][0])||out===("I"+houseCardMatrix[1][1])||out===("I"+houseCardMatrix[1][2])||out===("I"+houseCardMatrix[1][3])||out===("I"+houseCardMatrix[1][4]))
  {
      Hr2 = Hr2+1;
      if(Hr2===5){
        Hfinished++;
        HcolumnClosed++;
      }
    
  }
  if(out===("N"+houseCardMatrix[2][0])||out===("N"+houseCardMatrix[2][1])||out===("N"+houseCardMatrix[2][3])||out===("N"+houseCardMatrix[2][4]))
  {
      Hr3 = Hr3+1;
      if(Hr3===4){
        Hfinished++;
        HcolumnClosed++;
      }
    
  }
  if(out===("G"+houseCardMatrix[3][0])||out===("G"+houseCardMatrix[3][1])||out===("G"+houseCardMatrix[3][2])||out===("G"+houseCardMatrix[3][3])||out===("G"+houseCardMatrix[3][4]))
  {
      Hr4 = Hr4+1;
      if(Hr4===5){
        Hfinished++;
        HcolumnClosed++;
      }
    
  }
  if(out===("O"+houseCardMatrix[4][0])||out===("O"+houseCardMatrix[4][1])||out===("O"+houseCardMatrix[4][2])||out===("O"+houseCardMatrix[4][3])||out===("O"+houseCardMatrix[4][4]))
  {
      Hr5 = Hr5+1;
      if(Hr5===5){
        Hfinished++;
        HcolumnClosed++;
        Hrectangle++;
      }
  }
  
  if(out===("B"+houseCardMatrix[0][0])||out===("I"+houseCardMatrix[1][0])||out===("N"+houseCardMatrix[2][0])||out===("G"+houseCardMatrix[3][0])||out===("O"+houseCardMatrix[4][0]))
  {
      Hc1=Hc1+1;
      if(Hc1===5){
        Hfinished++;
        HrowClosed++; 
        Hrectangle++;
      }
      
  }
  if(out===("B"+houseCardMatrix[0][1])||out===("I"+houseCardMatrix[1][1])||out===("N"+houseCardMatrix[2][1])||out===("G"+houseCardMatrix[3][1])||out===("O"+houseCardMatrix[4][1]))
  {
      Hc2=Hc2+1;
      if(Hc2===5){
        Hfinished++;
        HrowClosed++; 
      }
  }
  if(out===("B"+houseCardMatrix[0][2])||out===("I"+houseCardMatrix[1][2])||out===("G"+houseCardMatrix[3][2])||out===("O"+houseCardMatrix[4][2]))
  {
      Hc3=Hc3+1;
      if(Hc3===4){
        Hfinished++;
        HrowClosed++; 
      }
     
  }
  if(out===("B"+houseCardMatrix[0][3])||out===("I"+houseCardMatrix[1][3])||out===("N"+houseCardMatrix[2][3])||out===("G"+houseCardMatrix[3][3])||out===("O"+houseCardMatrix[4][3]))
  {
      Hc4=Hc4+1;
      if(Hc4===5){
        Hfinished++;
        HrowClosed++; 
      }
      
  }
  if(out===("B"+houseCardMatrix[0][4])||out===("I"+houseCardMatrix[1][4])||out===("N"+houseCardMatrix[2][4])||out===("G"+houseCardMatrix[3][4])||out===("O"+houseCardMatrix[4][4]))
  {
      Hc5=Hc5+1;
      if(Hc5===5){
        Hfinished++;
        HrowClosed++; 
        Hrectangle++;
      }
  }
   if(out===("B"+houseCardMatrix[0][0])||out===("I"+houseCardMatrix[1][1])||out===("G"+houseCardMatrix[3][3])||out===("O"+houseCardMatrix[4][4]))
  {
      Hd1=Hd1+1;
      if(Hd1===4){
        Hfinished++;
        HdiagonalClosed++;
      }
     
  }
  if(out===("B"+houseCardMatrix[0][4])||out===("I"+houseCardMatrix[1][3])||out===("G"+houseCardMatrix[3][1])||out===("O"+houseCardMatrix[4][0]))
  {
      Hd2=Hd2+1;
      if(Hd2===4){
        Hfinished++;
        HdiagonalClosed++;
       
      }
  }
   
  
 
  if(pattern==="threeInAnyWays" && Hfinished>=3){
    //document.getElementById("love").innerHTML = "closed  threeInANYways "; 
    HtrueBingo = true;
    houseWins();
    }

 if(pattern==="twoRowsThreeColumn" && HcolumnClosed >=3 && HrowClosed >=2){
    //document.getElementById("love").innerHTML = "closed  two Rows and Three Columns"; 
    HtrueBingo = true;
    houseWins();
    }
 if(pattern==="x" && Hd1===4 && Hd2===4 ){
  //  document.getElementById("love").innerHTML = "closed two diagonals"; 
     HtrueBingo = true;
     houseWins();  
  }
 if(pattern==="Rectangle" && Hrectangle===4 ){
   // document.getElementById("love").innerHTML = "you closed rectangle"; 
    HtrueBingo = true;
    houseWins();
  }
 if(pattern==="plus" && Hr3===4 && Hc3===4 ){
  //  document.getElementById("love").innerHTML = "you closed plus"; 
    HtrueBingo = true;
    houseWins();
    }


 
 }



    














      /*************************************************
        for checking closing
        *******************************/
        //for closing the card1
  
  
        
        if(out===("B"+cardMatrixCopy[0][0])||out===("B"+cardMatrixCopy[0][1])||out===("B"+cardMatrixCopy[0][2])||out===("B"+cardMatrixCopy[0][3])||out===("B"+cardMatrixCopy[0][4]))
        {
            r1 = r1+1;
            if(r1===5){
              finished++;
              columnClosed++;
              rectangle++;
            }
          
        }
        if(out===("I"+cardMatrixCopy[1][0])||out===("I"+cardMatrixCopy[1][1])||out===("I"+cardMatrixCopy[1][2])||out===("I"+cardMatrixCopy[1][3])||out===("I"+cardMatrixCopy[1][4]))
        {
            r2 =r2+1;
            if(r2===5){
              finished++;
              columnClosed++;
              
            }
           
        }
         if(out===("N"+cardMatrixCopy[2][0])||out===("N"+cardMatrixCopy[2][1])||out===("N"+cardMatrixCopy[2][3])||out===("N"+cardMatrixCopy[2][4]))
        {
            r3=r3+1;
            if(r3===4){
              finished++;
              columnClosed++;
             
            }
           
        }
        if(out===("G"+cardMatrixCopy[3][0])||out===("G"+cardMatrixCopy[3][1])||out===("G"+cardMatrixCopy[3][2])||out===("G"+cardMatrixCopy[3][3])||out===("G"+cardMatrixCopy[3][4]))
        {
            r4=r4+1;
            if(r4===5){
              finished++;
              columnClosed++;
            } 
        }
       if (out===("O"+cardMatrixCopy[4][0])||out===("O"+cardMatrixCopy[4][1])||out===("O"+cardMatrixCopy[4][2])||out===("O"+cardMatrixCopy[4][3])||out===("O"+cardMatrixCopy[4][4]))
        {
            r5=r5+1;
          //  document.getElementById("gameDiv").innerHTML = "coulmnd r5 "+r5;  
          if(r5===5){
            finished++;
            columnClosed++;
            rectangle++;
          } 
        }
         if(out===("B"+cardMatrixCopy[0][0])||out===("I"+cardMatrixCopy[1][0])||out===("N"+cardMatrixCopy[2][0])||out===("G"+cardMatrixCopy[3][0])||out===("O"+cardMatrixCopy[4][0]))
        {
            c1=c1+1;
            if(c1===5){
              finished++;
              rowClosed++; 
              rectangle++;
            }
        }
        if(out===("B"+cardMatrixCopy[0][1])||out===("I"+cardMatrixCopy[1][1])||out===("N"+cardMatrixCopy[2][1])||out===("G"+cardMatrixCopy[3][1])||out===("O"+cardMatrixCopy[4][1]))
        {
            c2=c2+1;
            if(c2===5){
              finished++;
              rowClosed++;   
            }
           
        }
        if(out===("B"+cardMatrixCopy[0][2])||out===("I"+cardMatrixCopy[1][2])||out===("G"+cardMatrixCopy[3][2])||out===("O"+cardMatrixCopy[4][2]))
        {
            c3=c3+1;
            if(c3===4){
              finished++;
              rowClosed++; 
            }
        }
        if(out===("B"+cardMatrixCopy[0][3])||out===("I"+cardMatrixCopy[1][3])||out===("N"+cardMatrixCopy[2][3])||out===("G"+cardMatrixCopy[3][3])||out===("O"+cardMatrixCopy[4][3]))
        {
            c4=c4+1;
            if(c4===5){
              finished++;
              rowClosed++; 
            }
        }
        if(out===("B"+cardMatrixCopy[0][4])||out===("I"+cardMatrixCopy[1][4])||out===("N"+cardMatrixCopy[2][4])||out===("G"+cardMatrixCopy[3][4])||out===("O"+cardMatrixCopy[4][4]))
        {
            c5=c5+1;
            if(c5===5){
              finished++;
              rowClosed++; 
              rectangle++;
            }
          
        }
         if(out===("B"+cardMatrixCopy[0][0])||out===("I"+cardMatrixCopy[1][1])||out===("G"+cardMatrixCopy[3][3])||out===("O"+cardMatrixCopy[4][4]))
        {
            d1=d1+1;
            if(d1===4){
              finished++;
              diagonalClosed++;
            }
        }
        if(out===("B"+cardMatrixCopy[0][4])||out===("I"+cardMatrixCopy[1][3])||out===("G"+cardMatrixCopy[3][1])||out===("O"+cardMatrixCopy[4][0]))
        {
            d2=d2+1;
            if(d2===4){
              finished++;
              diagonalClosed++;
            }
            
        }
         
        if(pattern==="threeInAnyWays" && finished>=3 && whichPlay==="housePlay"){
          //document.getElementById("love").innerHTML = "closed  threeInANYways "; 
       trueBingo = true;
          }
      
       if(pattern==="twoRowsThreeColumn" && columnClosed >=3 && rowClosed >=2 && whichPlay==="housePlay"){
          //document.getElementById("love").innerHTML = "closed  two Rows and Three Columns"; 
          trueBingo = true;
          }
       if(pattern==="x" && d1===4 && d2===4 && whichPlay==="housePlay" ){
        //  document.getElementById("love").innerHTML = "closed two diagonals"; 
           trueBingo = true;  
      }
       if(pattern==="Rectangle" && rectangle===4 && whichPlay==="housePlay"){
         // document.getElementById("love").innerHTML = "you closed rectangle"; 
          trueBingo = true;
      }
       if(pattern==="plus" && r3===4 && c3===4 && whichPlay==="housePlay" ){
        //  document.getElementById("love").innerHTML = "you closed plus"; 
          trueBingo = true;
      }
        if(finished>=1 && whichPlay==="play35"){
          trueBingo = true;
        }
        if(finished>=1 && whichPlay==="play45"){
          trueBingo = true;
        }
    
        if(ballCounter===45&&whichPlay==="play45"){
          //document.getElementById("roomName").style.display = "block";
           ballFinished();
         }
     if(ballCounter===35&&whichPlay==="play35"){
      //document.getElementById("roomName").style.display = "block";
       ballFinished();
     }
     if(ballCounter===75&&whichPlay==="housePlay"){
      ballFinished();
    }
       
  }



function ballFinished(){
  setTimeout( function() {  
    document.getElementById("showBall").style.display = "none"; 
    document.getElementById("roomName").style.display = "block";
    document.getElementById("roomName").innerHTML = "All Balls has been Bounced";
  document.getElementById("playAgain").style.display = "block";
    
  }, 3000); 
  

  
 
}


function playAgain(){
  document.getElementById("showBall").style.display = "none";
  document.getElementById("showBingo").style.display = "none";
  document.getElementById("playAgain").style.display = "none";
  document.getElementById("showPattern").style.display="none";  
  document.getElementById("badBingo").style.display = "none";
  document.getElementById("houseBingo").style.display = "none";
  document.getElementById("roomName").style.display= "none";
  document.getElementById("firework").style.display = "none";

  document.getElementById("interstitial").style.display = "none";
  document.getElementById("rewarded").style.display = "none";
 // document.getElementById("adDescription").style.display = "none";
  

  for(var i=1; i<=15; i++)
  {
    var string ="b"+i;
    document.getElementById(string).style.background = "wheat";
  }
  for(var i=16; i<=30; i++)
  {
    var string ="i"+i;
    document.getElementById(string).style.background = "wheat";
  }
  for(var i=31; i<=45; i++)
  {
    var string ="n"+i;
    document.getElementById(string).style.background = "wheat";
  }
  for(var i=46; i<=60; i++)
  {
    var string ="g"+i;
    document.getElementById(string).style.background = "wheat";
  }
  for(var i=61; i<=75; i++)
  {
    var string ="o"+i;
    document.getElementById(string).style.background = "wheat";
  }

for(var i=1; i<=25; i++){
  document.getElementById("cardBut"+i).style.background = "grey";
}
if(whichPlay==="play35"||whichPlay==="play45"){
  twentyFiveBalls(ballPlaying);
}


if(whichPlay==="housePlay"){

  for(var i=1; i<=25; i++){
    document.getElementById("cardHBut"+i).style.background = "grey";
  }
   playHouse();
}

}
/*********************************************************
 * ***************************************************
            **********************************
                play with the house
 
             ********************************** 
 * ****************************************************
 ******************************************************/
function playHouse(){
 
  rowClosed=0;
  columnClosed=0;
   diagonalClosed=0;
   cardMatrix = [];
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
          rectangle =0;
          finished = 0;  
          ballCounter = 0;
         waiting = 0;
   gameStarted = false;
  trueBingo = false;
  //coinPlayer = 15;
 trueBingoCounter = 0;
 
  document.getElementById("allthethings").style.display="none";
  document.getElementById("game").style.display = "block";

  //let patternValue= patternGenerator();

  start.style.display="block";
   
  start.innerHTML= "Game: play with the house";

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


/********************************************
 *          Random house card ************************
 * **************************
 */


document.getElementById("houseCard").style.display = "block";
let card2 = new generateCard();
  houseCardMatrix = card2.generateMatrix();
 // houseCardMatrix = houseCardMatrixCopy;

  $("#cardHBut1").prop("value", houseCardMatrix[0][0]);
  $("#cardHBut2").prop("value", houseCardMatrix[1][0]);
  $("#cardHBut3").prop("value", houseCardMatrix[2][0]);
  $("#cardHBut4").prop("value", houseCardMatrix[3][0]);
  $("#cardHBut5").prop("value", houseCardMatrix[4][0]);
  $("#cardHBut6").prop("value", houseCardMatrix[0][1]);
  $("#cardHBut7").prop("value", houseCardMatrix[1][1]);
  $("#cardHBut8").prop("value", houseCardMatrix[2][1]);
  $("#cardHBut9").prop("value",houseCardMatrix[3][1]);
  $("#cardHBut10").prop("value", houseCardMatrix[4][1]);
  $("#cardHBut11").prop("value", houseCardMatrix[0][2]);
  $("#cardHBut12").prop("value", houseCardMatrix[1][2]);
  // $("#cardBtn13").prop("value", cardMatrix[2][2]);
  $("#cardHBut14").prop("value", houseCardMatrix[3][2]);
  $("#cardHBut15").prop("value", houseCardMatrix[4][2]);
  $("#cardHBut16").prop("value", houseCardMatrix[0][3]);
  $("#cardHBut17").prop("value", houseCardMatrix[1][3]);
  $("#cardHBut18").prop("value", houseCardMatrix[2][3]);
  $("#cardHBut19").prop("value", houseCardMatrix[3][3]);
  $("#cardHBut20").prop("value", houseCardMatrix[4][3]);
  $("#cardHBut21").prop("value", houseCardMatrix[0][4]);
  $("#cardHBut22").prop("value", houseCardMatrix[1][4]);
  $("#cardHBut23").prop("value", houseCardMatrix[2][4]);
  $("#cardHBut24").prop("value", houseCardMatrix[3][4]);
  $("#cardHBut25").prop("value", houseCardMatrix[4][4]);
     
  
  document.getElementById("randomHouseCard").style.display="block";

 

  HrowClosed=0;
  HcolumnClosed=0;
   HdiagonalClosed=0;
 
     Hr1 = 0;
          Hr2 = 0;
          Hr3 = 0;
        Hr4 = 0;
          Hr5 = 0;
         Hc1 = 0;
          Hc2 = 0;
          Hc3 = 0;
         Hc4 = 0;
         Hc5 = 0;
          Hd1 = 0;
          Hd2 = 0;
          Hrectangle =0;
          Hfinished = 0;  
          HballCounter = 0;
         Hwaiting = 0;
   HgameStarted = false;
  HtrueBingo = false;
  //coinPlayer = 15;
 HtrueBingoCounter = 0;
winnerNotFound = true;
 let playingCoin =5;
 whichPlay = "housePlay";
 pattern= patternGenerator();
 document.getElementById("showPattern").style.display="block";
 if(pattern==="threeInAnyWays"){
  document.getElementById("showPattern").innerHTML="Playing Pattern Is: Three in Anyways";
 }
 else if(pattern==="twoRowsThreeColumn"){
  document.getElementById("showPattern").innerHTML="Playing Pattern Is: 2 Rows and 3 Coulmns";
 }
 else if(pattern==="x"){
  document.getElementById("showPattern").innerHTML="Playing Pattern Is: X or Two Diagonals";
 }
 else if(pattern==="Rectangle"){
  document.getElementById("showPattern").innerHTML="Playing Pattern is: Rectangle or Sides";
 }else if(pattern==="plus"){
  document.getElementById("showPattern").innerHTML="Playing Pattern Is: Plus(+)";
 }else{
  document.getElementById("showPattern").innerHTML="Playing Pattern Is: check Spelling";
 }

 coinBank(playingCoin,1,whichPlay);
}