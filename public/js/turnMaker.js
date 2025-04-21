





socket.on('yourTurn', function(msg)  {
  document.getElementById('tossButtons').style.display="block";
  document.getElementById('message2').innerHTML=msg;
 
  
});

socket.on('message', ({user, text})=>{
 
  document.getElementById('message').innerHTML=text;
  //triggerTimeout("message");

  });
  

 



 function triggerTimeout(id){
   timeOut = setTimeout(()=>{
    document.getElementById(id).innerHTML= "";
   },3000);
 }

 function resetTimeOut(){
    if(typeof timeOut === 'object'){
      console.log("timeout reset");
      clearTimeout(timeOut);
    }
 }