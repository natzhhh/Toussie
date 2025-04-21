

let yourResult = document.getElementById("yourResult");

let coin = document.getElementById("coin");
let coin2 = document.getElementById("coin2");
let coin3 = document.getElementById("coin3");
let coin4 = document.getElementById("coin4");
let flipBtn = document.getElementById("flip-button");
let resetBtn = document.getElementById("reset-button");
let heads = 0;
let tails = 0;
let player = "A";





socket.on('winnersTable', function({first, second, third, losser, length}) {
   
   setTimeout(function(){
    
   
    
   
    resetTosser();
    document.getElementById("tossButtons").style.display = "none";
    document.getElementById("tossId").style.display = "none";
    document.getElementById("replay").style.display = "block";


 if(length===4){
    document.querySelector("#firstPlace").textContent = `Winner: ${first}`;
    document.querySelector("#secondPlace").textContent = `Second Place: ${second}`;
    document.querySelector("#thirdPlace").textContent = `Third Place: ${third}`;
    document.querySelector("#looser").textContent = `Looser: ${losser}`;
  
}  
else if(length===3){
    document.querySelector("#firstPlace").textContent = `Winner: ${first}`;
    document.querySelector("#secondPlace").textContent = `Second Place: ${second}`;
    document.querySelector("#looser").textContent = `Looser: ${losser}`;
} 
else if(length===2){
    document.querySelector("#firstPlace").textContent = `Winner: ${first}`;
    document.querySelector("#looser").textContent = `Looser: ${losser}`;
} 
 else{
    document.querySelector("#firstPlace").textContent = `Winner: ${first}`;
}
},3000);
        });
 
socket.on('yourResult', function(msg) {
    
       yourResult.innerHTML= msg;
        });



function flipCoins(){

 socket.emit('toss', roomValue);///////////////////////////romeValue
    document.getElementById("tossButtons").style.display = "none";
    document.getElementById("message2").innerHTML= "";//for clearing your turn order
    document.getElementById('message').innerHTML="";
    
        }
 
socket.on('lukyNumbers', function({i1, i2, i3, i4, index}) {
showCoins(i1,i2,i3,i4,index)
   
    });

    function showCoins(i,i2,i3,i4,index){
  
    coin.style.animation = "none";
    coin2.style.animation = "none";
    coin3.style.animation = "none";
    coin4.style.animation = "none";
    heads = 0;
    tails = 0;
    updateStats(index);
    if(i){
        setTimeout(function(){
            coin.style.animation = "spin-heads 3s forwards"; 
        }, 100); 
        heads++;
    }else{
        setTimeout(function(){
            coin.style.animation = "spin-tails 3s forwards";    
        }, 100);
        tails++;
    }
    if(i2){
        setTimeout(function(){
            coin2.style.animation = "spin-heads 3s forwards"; 
        }, 100); 
        heads++;
    }else{
        setTimeout(function(){
            coin2.style.animation = "spin-tails 3s forwards";    
        }, 100);
        tails++;
    }
    if(i3){
        setTimeout(function(){
            coin3.style.animation = "spin-heads 3s forwards"; 
        }, 100); 
        heads++;
    }else{
        setTimeout(function(){
            coin3.style.animation = "spin-tails 3s forwards";    
        }, 100);
        tails++;
    }
    if(i4){
        setTimeout(function(){
            coin4.style.animation = "spin-heads 3s forwards"; 
        }, 100); 
        heads++;
    }else{
        setTimeout(function(){
            coin4.style.animation = "spin-tails 3s forwards";    
        }, 100);
        tails++;
    }


    setTimeout(updateStats(index), 3000);
    disableButton();
}
function updateStats(index){
    if(index===0){
        player = "A";
    }
    if(index===1){
        player = "B";
    }
    if( index ===2){
        player = "C";
    }
    if(index===3){
        player = "D";
    }
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
if((heads===4)&&(tails===0)){
    document.querySelector("#moves").textContent = `Eight(8) step forward and two additional lives`;
    move(player, 8);
}
else if((heads===3)&&(tails===1)){
    document.querySelector("#moves").textContent = `Touusie! one step back`;
    move(player, -1);
}
else if((heads===2)&&(tails===2)){
    document.querySelector("#moves").textContent = `Two(2) step forward `;
   move(player, 2);
}
else if((heads===1)&&(tails===3)){
    document.querySelector("#moves").textContent = `Three(3) step forward`;
    move(player, 3);
}
else if((heads===0)&&(tails===4)){
    document.querySelector("#moves").textContent = `Four(4) step forward and one additional life`;
   move(player, 4);
}
else
{
    document.querySelector("#moves").textContent = ` `;
  // move(player, 0);
}
}
function disableButton(){
    flipBtn.disabled = true;
    setTimeout(function(){
        flipBtn.disabled = false;
    },3000);
}








function resetTosser() {
    coin.style.animation = "none";
    coin2.style.animation = "none";
    coin3.style.animation = "none";
    coin4.style.animation = "none";
    heads = 0;
    tails = 0;
    updateStats();
}