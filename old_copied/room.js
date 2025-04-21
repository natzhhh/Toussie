const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const createCoolDown = require('./createCoolDown');
//const splice = require('./splice');
const patternGenerator =require('./patternGenerator');
const generateBalls = require('./generateBalls');
//for sockiet io
const { Server } = require("socket.io");
const io = new Server(server);


var readyPlayer = {};
var joinedPlayer = {};
var gameStarted = {};
var scoreWinner = {};
var playingCoin = {};
//var winnerNotFound = {};



app.use(express.static(__dirname+'/public'));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/indexroom.html');
});




io.on('connection', client =>{
    client.on('roomCreate', roomCreate);
   // client.on('joinRoom', joinRoom);
//****client.on('chosenCard', chosenCard);
//client.on('chosenPattern', chosenPattern);
client.on('ready', readyFunction);
client.on('playAgain', playAgain);


client.on('theWinner',({room, message})=> {
    
   //Send this event to everyone in the room.
   //io.emit('Natt message', msg);
  
   io.sockets.in(room).emit('winner', message);
   //winnerNotFound = false;
   client.emit('winnerScore', scoreWinner[room]);
  });





    client.on('create', ({room, message})=> {
        client.join(room);
       //Send this event to everyone in the room.
       //io.emit('Natt message', msg);
       io.sockets.in(room).emit('Natt', message);
      });

   /****  function chosenCard({room, message}){
        

        if(message===cards[0]){
            joinedPlayer++;
            cards.splice(0, 1);
            io.sockets.in(room).emit('chosenCard', message);
        }
        else if(message===cards[1]){
            joinedPlayer++;
            cards.splice(1, 1);
            io.sockets.in(room).emit('chosenCard', message);
        }
        else if(message===cards[2]){
            joinedPlayer++;
            cards.splice(2, 1);
            io.sockets.in(room).emit('chosenCard', message);
        }
        else if(message===cards[3]){
            joinedPlayer++;
            cards.splice(3, 1);
            io.sockets.in(room).emit('chosenCard', message);
        }
        else if(message===cards[4]){
            joinedPlayer++;
            cards.splice(4, 1);
            io.sockets.in(room).emit('chosenCard', message);
        }
        else if(message===cards[5]){
            joinedPlayer++;
            cards.splice(5, 1);
            io.sockets.in(room).emit('chosenCard', message);
        }
        else {
            
            io.sockets.in(room).emit('unchosen', cards);
        }

        
    }****/

  /*** *******  function chosenPattern({room, message}){

        if(message===patterns[0]){
        a++;
       

        }
        else if(message===patterns[1]){
            b++;
            
        }
        else if(message===patterns[2]){
            c++;
        }
        else if(message===patterns[3]){
            d++;
        }
        else{
           e++;
        }


    
        if(a>=b&&a>=c&&a>=d&&a>=e){
            max = patterns[0];
           
        }
        else if(b>=c&&b>=d&&b>=e){
            max = patterns[1];
          
        }
        else if(c>=d&&c>=e){
            max = patterns[2];
           
        }
        else if(d>=e){
            max = patterns[3];
        }
        else {
            max = patterns[4];
        }
       
        io.sockets.in(room).emit('chosenPattern', max);
    }

*****************************************/


    function readyFunction(room){
           
        
        readyPlayer[room] ++;
        console.log('ready :'+ readyPlayer[room]);
        console.log('joined :'+ joinedPlayer[room]);

        if(readyPlayer[room]===joinedPlayer[room])
        {
            
            scoreWinner[room] = joinedPlayer[room];
            console.log(readyPlayer[room]+"ready");
            console.log(joinedPlayer[room]+"joined");
            gameStarted[room] = true; 
            io.sockets.in(room).emit('start',"start your game"); 
            let patternValue= patternGenerator();
            io.sockets.in(room).emit('chosenPattern', patternValue);

            //let balls = new generateBalls();
            let ballsArray = generateBalls();
           
           // io.sockets.in(room).emit('chosenPattern', max);
           for (var j = 1; j <= 75; j++) {


            let i = j-1;
            let out = ballsArray[i];
            io.sockets.in(room).emit('ballTurn', {out: out, j: j});
                console.log(out);
           }
           readyPlayer[room] = 0;
          // joinedPlayer[room] = 0;
             
        }
       else {
            client.emit('wait', "wait for otherPlayers");
        }

    }
function playAgain(room){
   
    gameStarted[room] = false;
   
   
   // joinedPlayer[room] ++;
    console.log('playAgain :'+ joinedPlayer[room]);
    client.emit('roomName', room);
    playingCoin[room] = 5;
    client.emit('scoreStarter',playingCoin[room]); //this will going to be changed by the value of bettingCoin
   io.sockets.in(room).emit('gameWaiting', {playingCoin: playingCoin[room], room: room});
  
}


function patternGenerator() {
  
    var playingPattern;
           
    
                
                var patterns = ["threeInAnyWays", "twoRowsThreeColumn", "x", "Rectangle", "plus"];
                let bballsLen = patterns.length;
                let ball = 1 + Math.floor(Math.random() * bballsLen);
                let i = ball - 1;
                playingPattern = patterns[i];
                return playingPattern;
            }
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
        
               



    function roomCreate(roomName){
        client.join(roomName);
        console.log(joinedPlayer[roomName]);
if(joinedPlayer[roomName]!==undefined){
   // client.join(roomName); 
    joinedPlayer[roomName] ++;
  // window['joinedPlayer'+roomName]++;
  //client.emit('roomName', roomName);
   if(gameStarted[roomName]===true){

    client.emit('newMember', "In this room Game Has been Started wait until they play again "); 
    
    }else{
    client.emit('roomName', roomName);// gameStarted fa[]
    playingCoin[roomName] = 5;
client.emit('scoreStarter',playingCoin[room]); //this will going to be changed by the value of bettingCoin
   
       }

}
else{
    joinedPlayer[roomName] = 1;
    gameStarted[roomName] = false;
    readyPlayer[roomName] = 0;
    playingCoin[roomName] = 5;
    client.emit('scoreStarter',playingCoin[roomName]); //this will going to be changed by the value of bettingCoin
   
    client.emit('roomName', roomName);// gameStarted fa

    
    
}

    
       
    // cards = ["card1", "card2", "card3","card4", "card5", "card6"];
   //readyPlayer =0;
  
        console.log('room Name:'+ roomName);

        }

   /************ *        function joinRoom(roomName){
       
        client.join(roomName);
        console.log('Joined Room:'+ roomName);
        client.emit('newMember', "you joined room "+ roomName); 

        io.sockets.in(roomName).emit('newMember', "new player has joined");
    }********************/



   /*****************  function  ballRandomGenerator(roomName){
     
    // var j = 1;
       // writeNext(j, roomName);
     
      
      for (var j=1;j<=75;j++){
    
           //var delayTime =1500;
              
                 
                  
                        //if (winnerNotFound) {
                        
                        let ballsLen = balls.length;
                        let ball =  1 + Math.floor(Math.random()*ballsLen);
                
                 
                     let i = ball-1;
                      let out = balls[i];
                
                             io.sockets.in(roomName).emit('ballTurn', {out: out, j: j});
                             console.log(out);
                  
                             balls = splice(balls, i);
                        
                      
                       // }
            
                                    }
                                 balls=  ["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B14","B15","I16","I17","I18","I19","I20","I21","I22","I23","I24","I25","I26","I27","I28","I29","I30","N31","N32","N33","N34","N35","N36","N37","N38","N39","N40","N41","N42","N43","N44","N45","G46","G47","G48","G49","G50","G51","G52","G53","G54","G55","G56","G57","G58","G59","G60","O61","O62","O63","O64","O65","O66","O67","O68","O69","O70","O71","O72","O73","O74","O75"];

                                 readyPlayer = 0;
                                 a =0;
                                 b = 0;
                                 c = 0;
                               d = 0;
                                e = 0;
                                gameStarted = false;
                    //console.log(abebe);

                  
                                 //   gameStarted = false;
                                  // winnerNotFound = true;
                                   // io.sockets.in(roomName).emit('ballsFinished', "All balls had bounced!");
                                   
               
            
                                }**********************/
/***************************************************************
 * ************************************************************
                 function writeNext(j, roomName)
{

 
    if(j>75 || !winnerNotFound){
        return ;
    }

    setTimeout(function()
    { j=j+1;
      
   
                        ballsLen = balls.length;
                         ball =  1 + Math.floor(Math.random()*ballsLen);
                
                 
                     let i = ball-1;
                    out = balls[i];
                
                             io.sockets.in(roomName).emit('ballTurn', out );
                             console.log(out);
                  
                             balls = splice(balls, i);


                             writeNext(j, roomName);
   
    }, 2000);
}
   **************************************************
   **************************************************
   **********************/ 

});




function splice(balls,j) {
    balls.splice(j, 1);  
    return balls;
 }

/**************** 
 function delay() {
    setTimeout(() => {
       
    }, 2000);
  }
*****************************/

server.listen(3000, function(){
   console.log('listening on localhost:3000');
});