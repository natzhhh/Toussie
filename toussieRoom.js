const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
app.use(cors())
//const User = require('./User');
const { addUser, removeUser, getUser,
    getUsersInRoom } = require("./User");
 

const { Server } = require("socket.io");
const io = new Server(server);
var readyPlayer = {};
var joinedPlayer = {};
var gameStarted = {};
var scoreWinner = {};
var playingCoin = {};
var playerNames = {};
var rooms = {};

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});





let current_turn = {};
let timeOut;
let _turn = {};
var winnerBox = {};
let life;



function starter(room){
    var frontTurn = rooms[room][0];
    current_turn[room]++;
    let length = rooms[room].length;
    console.log(length);
    const user = getUser(frontTurn);    

   
        setTimeout(function(){

            for(let i =0; i<length; i++){
                io.to(rooms[room][i]).emit('length', {  length: length, index: i});
            }
            io.to(frontTurn).emit('yourTurn', `Hey ${user.name} it is your turn flip the coins! `); 
            io.sockets.in(user.room).emit('message',{  user: 'admin', text:  `Now is ${user.name}'s turn` }); 
            life = 1;
        }, 3000);
  
}



function next_turn(room){
    if(current_turn[room] >= rooms[room].length){
        current_turn[room] = 0;
    }
    _turn[room] = current_turn[room]++ % rooms[room].length;
    let cli = rooms[room][_turn[room]];
    let index = false;
  if(winnerBox[room] !== null){
        for( var val = 0; val < winnerBox[room].length; val++){
        if(winnerBox[room][val] === cli){
           index = true;
           console.log(cli);
         }
       }
    }
    if (index) {
      next_turn(room); 
    }
    else{
        const user = getUser(cli); 
        io.to(cli).emit('yourTurn', `Hey ${user.name} it is your turn flip the coins! `); 
        io.sockets.in(user.room).emit('message',{  user: 'admin', text:  `Now is ${user.name}'s turn` }); 
        console.log("next turn triggered " , _turn[room]);
        life = 1;
    }
    
    
 }

 io.on('connection', client =>{
    client.on('roomCreate', roomCreate);
    client.on('ready', readyFunction);
    client.on('passTurn', passTurn);
    client.on('toss', toss);
    client.on('winner', winner);
    client.on('playAgain', playAgain);
    client.on('home', home);



/////////////////////////improvement about the scoket message in client html
/////////////////////////////////////////////////////////////////////////
client.on('disconnect', () => {
    const user = getUser(client.id);
    
    if (user) {
        
        var index =  rooms[user.room].indexOf(user.id);
        rooms[user.room].splice(index, 1); 
        if (index < current_turn[user.room]){
            current_turn[user.room]--;
           
        }
     if (index === current_turn[user.room]){
        
        }
        console.log("dissconected "+index);
        joinedPlayer[user.room]--;
        next_turn(user.room);
        client.broadcast.to(user.room).emit('message', {  user: 'admin', text:  `${user.name} had left` });
        client.leave(user.room);
    removeUser(client.id);
    }
   
    
});


function playAgain(room){
    readyPlayer[room] ++;
    console.log('ready :'+ readyPlayer[room]);
    console.log('joined :'+ joinedPlayer[room]);

    if(readyPlayer[room]===joinedPlayer[room])
    {
        
        scoreWinner[room] = joinedPlayer[room];
        console.log(readyPlayer[room]+"ready");
        console.log(joinedPlayer[room]+"joined");
        
        starter(room);
        
        gameStarted[room]= true; 
       readyPlayer[room] = 0;
      // joinedPlayer[room] = 0;
         
    }
   else {
        client.emit('message', "wait for otherPlayers");
    }
}

function home(room){
    const user = getUser(client.id);
    joinedPlayer[room]--;
      rooms[user.room].splice(index, 1);
    client.broadcast.to(room).emit('message', {  user: 'admin', text:  `${user.name} had left` });
 
  var index =  rooms[user.room].indexOf(user.id);
 
  if (index < current_turn[user.room]){
    current_turn[user.room]--;
    }
  
  client.leave(room);
    removeUser(client.id);
    playAgain(room);
}














function winner(room){
    const user = getUser(client.id);
    var index =  rooms[room].indexOf(user.id); 
  
    winnerBox[user.room].push(client.id);
    console.log(user.name+" winner");
   
    if(rooms[user.room].length===4 && winnerBox[user.room].length===3){
        for(var val1 = 0; val1<3; val1++){
            for(var val2 = 0; val2<4; val2++){
                if(rooms[user.room][val2]===winnerBox[user.room][val1]){
                    rooms[user.room][val2] = rooms[user.room][val1];
                    rooms[user.room][val1] = winnerBox[user.room][val1];
                }
            }
        }
        const first = getUser(winnerBox[user.room][0]);
        const second = getUser(winnerBox[user.room][1]);
        const third = getUser(winnerBox[user.room][2]);
        const losser = getUser(rooms[user.room][3]);
        
        io.sockets.in(user.room).emit('winnersTable', {  first: first.name, second: second.name, third: third.name, losser: losser.name, length: 4 });
        io.to(winnerBox[user.room][0]).emit('yourResult', "Congratulation! You are the winner!");
        io.to(winnerBox[user.room][1]).emit('yourResult', "Congratulation! You are second place!");
        io.to(winnerBox[user.room][2]).emit('yourResult', "Congratulation! You are third Place!");
        io.to(rooms[user.room][3]).emit('yourResult', "You Loose! Try again failing in not the end, it is the process of sucess!");
      
        gameStarted[room]=false;
        current_turn[room] = 0;
             _turn[room] = 0;
         winnerBox[room] = [];

    }
    if(rooms[user.room].length===3 && winnerBox[user.room].length===2){
        for(var val1 = 0; val1<2; val1++){
            for(var val2 = 0; val2<3; val2++){
                if(rooms[user.room][val2]===winnerBox[user.room][val1]){
                    rooms[user.room][val2] = rooms[user.room][val1];
                    rooms[user.room][val1] = winnerBox[user.room][val1];
                }
            }
        }
        const first = getUser(winnerBox[user.room][0]);
        const second = getUser(winnerBox[user.room][1]);
        const losser = getUser(rooms[user.room][2]);
        
        io.sockets.in(user.room).emit('winnersTable', {  first: first.name, second: second.name, losser: losser.name, length: 3 });
        io.to(winnerBox[user.room][0]).emit('yourResult', "Congratulation! You are the winner!");
        io.to(winnerBox[user.room][1]).emit('yourResult', "Congratulation! You are second place!");
        io.to(rooms[user.room][2]).emit('yourResult', "You Loose! Try again failing in not the End, it is the process of sucess!");
        gameStarted[room]=false;
        current_turn[room] = 0;
             _turn[room] = 0;
         winnerBox[room] = [];
    }
    if(rooms[user.room].length===2 && winnerBox[user.room].length===1){
        for(var val1 = 0; val1<1; val1++){
            for(var val2 = 0; val2<2; val2++){
                if(rooms[user.room][val2]===winnerBox[user.room][val1]){
                    rooms[user.room][val2] = rooms[user.room][val1];
                    rooms[user.room][val1] = winnerBox[user.room][val1];
                }
            }
        }
        const first = getUser(winnerBox[user.room][0]);
        const losser = getUser(rooms[user.room][1]);
        
        io.sockets.in(user.room).emit('winnersTable', {  first: first.name,  losser: losser.name, length: 2 });
        io.to(winnerBox[user.room][0]).emit('yourResult', "Congratulation! You are the winner!");
        io.to(rooms[user.room][1]).emit('yourResult', "You Loose! Try again failing in not the End, it is the process of success!");
        gameStarted[room]=false;
        current_turn[room] = 0;
             _turn[room] = 0;
         winnerBox[room] = [];
    }
    if(rooms[user.room].length===1) {
        const first = getUser(winnerBox[user.room][0]);
        io.sockets.in(user.room).emit('winnersTable', {  first: first.name,  losser: "you played with your self, therfore ther is no looser! ", length: 1 });
        console.log(rooms[user.room].length);
        io.to(winnerBox[user.room][0]).emit('yourResult', "Congratulation! You win! Play Again!");
        gameStarted[room]=false;
        current_turn[room] = 0;
             _turn[room] = 0;
         winnerBox[room] = [];
    }
}


function toss(room){
    life--;
    const user = getUser(client.id);
    var index =  rooms[room].indexOf(user.id);

    let i = Math.floor(Math.random() * 2);
    let i2 = Math.floor(Math.random() * 2);
    let i3 = Math.floor(Math.random() * 2);
    let i4= Math.floor(Math.random() * 2);
   
    if(rooms[room].length === 4)
    {
        if((rooms[room].length - index) === 4) {
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index });
            let index2 =  index + 3;
            io.to(rooms[room][1]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index2});
            let index3 =  index + 2;
            io.to(rooms[room][2]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index3});
            let index4 =  index + 1;
            io.to(rooms[room][3]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index4});
        }
        if((rooms[room].length - index) === 3) {
            let index4 =  index - 1;
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index4 });
            let index2 =  index + 1;
            io.to(rooms[room][3]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index2});
            let index3 =  index + 2;
            io.to(rooms[room][2]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index3});
            
            io.to(rooms[room][0]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index});
        }
        if((rooms[room].length - index) === 2) {
            let index4 =  index - 2;
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index4 });
            let index2 =  index + 1;
            io.to(rooms[room][3]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index2});
            let index3 =  index - 1;
            io.to(rooms[room][1]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index3});
            
            io.to(rooms[room][0]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index});
        }
        if((rooms[room].length - index) === 1) {
            let index4 =  index - 3;
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index4 });
            let index2 =  index - 1;
            io.to(rooms[room][1]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index2});
            let index3 =  index - 2;
            io.to(rooms[room][2]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index3});
            
            io.to(rooms[room][0]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index});
        }
       
    }
    
   else if(rooms[room].length === 3)
    {
        if((rooms[room].length - index) === 3) {
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index });
            let index2 =  index + 3;
            io.to(rooms[room][1]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index2});
            let index3 =  index + 2;
            io.to(rooms[room][2]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index3});
           
        }
        if((rooms[room].length - index) === 2) {
            let index4 =  index - 1;
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index4 });
            let index3 =  index + 2;
            io.to(rooms[room][2]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index3});
            
            io.to(rooms[room][0]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index});
        }
        if((rooms[room].length - index) === 1) {
            let index4 =  index - 2;
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index4 });
            let index3 =  index - 1;
            io.to(rooms[room][1]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index3});
            
            io.to(rooms[room][0]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index});
        }
       
    }
    else if(rooms[room].length === 2)
    {
        if((rooms[room].length - index) === 2) {
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index });
            let index2 =  index + 3;
            io.to(rooms[room][1]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index2});
           
           
        }
        if((rooms[room].length - index) === 1) {
            let index4 =  index - 1;
            io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index4 });
            
            io.to(rooms[room][0]).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: index});
        }
       
    }
    else{
        io.to(user.id).emit('lukyNumbers', {  i1: i, i2: i2, i3: i3, i4: i4, index: 0 });
    }
    if(rooms[room][_turn[room]] === client.id){
       if(i===1 && i2===1 && i3===1 && i4===1){
        life += 2;
       }
       if(i===0 && i2===0 && i3===0 && i4===0){
        life += 1;
       }

        setTimeout(()=>{
            let index = false;
            if(winnerBox[room] !== null){
                  for( var val = 0; val < winnerBox[room].length; val++){
                  if(winnerBox[room][val] === user.id){
                     index = true;
                 
                   }
                 }
                 }
                      

           if(life===0){
            next_turn(room); 
           }
           else if(index){
            next_turn(room); 
           }
           else{
            if(rooms[room] !== null){
                for( var val = 0; val < rooms[room].length; val++){
                if(rooms[room][val] === user.id){
                  
               io.to(user.id).emit('yourTurn', `Hey ${user.name} you got additional life flip the coins again! `); 
            io.sockets.in(user.room).emit('message',{  user: 'admin', text:  ` ${user.name} get additional life it is his turn again!` }); 
            console.log(" Additonal triggered " , _turn[room]);
                 }
                 
               }
            }else{
                next_turn(room); 
            }
            
           }
           },4000);
     }  

}
 
function passTurn(room){
    if(rooms[room][_turn[room]] === client.id){
        setTimeout(()=>{
            next_turn(room); 
           },3000);
       
     }  
}
  
  function readyFunction(room){

    readyPlayer[room] ++;
    console.log('ready :'+ readyPlayer[room]);
    console.log('joined :'+ joinedPlayer[room]);

    if(readyPlayer[room]===joinedPlayer[room])
    {
        
        scoreWinner[room] = joinedPlayer[room];
        console.log(readyPlayer[room]+"ready");
        console.log(joinedPlayer[room]+"joined");

        io.sockets.in(room).emit('start', "Start game"); 
        
        starter(room);
        
      
       
       
        
        gameStarted[room]= true; 
       readyPlayer[room] = 0;
      // joinedPlayer[room] = 0;
         
    }
   else {
        client.emit('wait', "wait for otherPlayers");
    }

}

function roomCreate({ name, room }, callback) {
             
              roomName = [];
            
                
              if((joinedPlayer[room]===undefined)||(joinedPlayer[room]<4)){
                  
                
                        if(joinedPlayer[room]!==undefined){
                        rooms[room].push(client.id);
                        joinedPlayer[room] ++;
                        const { error, user } = addUser(
                            { id: client.id, name, room, turn: joinedPlayer[room] });
                 //
                        if (error){
                            console.log(error);
 
                           return callback(error);
                        }
                        
             
                            client.join(user.room);

                            if(rooms[room].length<=1){
               
                                gameStarted[room] = false;
                              }
                                  if(gameStarted[room]===true){
         
                                   client.emit('newMember', "In this room game has been started wait until they play again "); 
         
                                 }else{
                                                                 // Emit will send message to the user
                                         // who had joined
                                 client.emit('roomName', { 
                                    user: user.room , text: user.name  +' welcome to room ' +user.room+'.' });
                                   console.log(user.name);
                                   console.log(user.turn);
                                  // Broadcast will send message to everyone
                                   // in the room except the joined user
                                   client.broadcast.to(user.room).emit('roomName', { user: user.room, text: `${user.name}, has joined` });
                            
                            } 
                       }
                      else{
                        //roomName[0] = playerName;
                        rooms[room] = [client.id];
                    joinedPlayer[room] = 1;
                    
                    current_turn[room] = 0;
                  
                    _turn[room] = 0;
                    winnerBox[room] = [];
                    const { error, user } = addUser(
                        { id: client.id, name, room, turn: joinedPlayer[room]});
                        if (error) return callback(error);
 
                        // Emit will send message to the user , turn: joinedPlayer[room] 
                        // who had joined
                        client.emit('roomName', {
                            user: 'admin', text:
                                `${user.name},
                            welcome to room ${user.room}.`
                        });
                   
                        console.log(user.name);
                        console.log(user.turn);


                        client.join(user.room);

                   gameStarted[room] = false;
                   readyPlayer[room] = 0;
         
                
                 }
                }
                else {
                    client.emit('createNewRoom', "In this room players are more than enough! Please create another room! ");  
                }

    console.log('room Name:'+ room);
    callback();
    }

});



server.listen(3000, function(){
    console.log('listening on localhost:3000');
 });