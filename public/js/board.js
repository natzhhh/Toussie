let i5= document.getElementById("0");
let a5 = document.querySelector("#A5");
let e1= document.querySelector("#E1");
let e9 = document.querySelector("#E9");

let posA=0;
let prePosA;
let posB=0;
let prePosB;
let preSitB;
let sitPosB
let posC=0;
let prePosC;
let preSitC;
let sitPosC;
let posD=0;
let prePosD;
let preSitD;
let sitPosD;
let length;

////B to others position of collision indicator 
let BD;
let BC;
let preBD;
let preBC;
////C to others position of collision indicator /////////////
let CD;
let CB;
let preCD;
let preCB;
////D to others position of collision indicator 
let DB;
let DC;
let preDB;
let preDC;
////A to others position of collision indicator 
let AD;
let AC;
let AB;
let preAB
let preAD;
let preAC;

function playAgain(){
  document.getElementById("replay").style.display = "none";
  document.getElementById("tossId").style.display = "block";
  document.getElementById(posA).style.background = ""; 
 if(sitPosB) {document.getElementById(sitPosB).style.background = ""; }
 if(sitPosC)  {document.getElementById(sitPosC).style.background = ""; }
 if(sitPosD)  { document.getElementById(sitPosD).style.background = ""; }
  posA=0; 
  posB=0;
  posC=0;
  posD=0; 
  socket.emit('playAgain', roomValue);//////sending play agin command
}
function home(){
  document.getElementById("tossId").style.display = "block";
  document.getElementById("replay").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("allthethings").style.display = "block";
  document.getElementById(posA).style.background = ""; 
  if(sitPosB) {document.getElementById(sitPosB).style.background = ""; }
  if(sitPosC)  {document.getElementById(sitPosC).style.background = ""; }
  if(sitPosD)  { document.getElementById(sitPosD).style.background = ""; }
  posA=0; 
  posB=0;
  posC=0;
  posD=0; 
  
  socket.emit('home', roomValue);//////sending home to aknowledge the room

}

socket.on('length', ({length, index})=>{
    
    console.log(length);
    if(length===4){
      
            move("A", 0);
        move("B", 0);
        move("C", 0);
        move("D", 0);  
        
      
      
    }
    else if(length===3){
       
       if(index===0){
        move("A", 0);
        move("B", 0);
        move("C", 0);
       }
       else if(index===1){
        move("A", 0);
        move("B", 0);
        move("D", 0);
       }
       else{
        move("A", 0);
        move("D", 0);
        move("C", 0);
      
       }
       
    }
    else if(length===2){
        if(index===0){
            move("A", 0);
            move("B", 0);
        }
        if(index===1)
        {
            move("A", 0);
            move("D", 0);
        }
     
       
    }
    else{
        move("A", 0);
    }
    });


//placement(posA);

function move(player, result){
    console.log(player);
if(player==="A"){
    if((result===-1)&&(posA===4||posA===0||posA===8||posA===12||posA===24)){
        posA = posA;

    }
    else{
        prePosA = posA;
    posA = posA + result;
    if(posA>=24){
        posA = 24;
socket.emit('winner', roomValue);//////anouncing  wining status
    }}
///////////////// A position relative  to B////////////////////////

if(posA<=3){
    AB = posA + 12;
   }
   else if(4<= posA && posA <=15){
    AB = posA - 4;
   }
   else if(16<= posA && posA <=21){
    AB = posA + 2;
   }
   else if(22<= posA && posA <=23){
    AB = posA - 6;
   }
   else{
    AB = posA;
   }


   if(prePosA<=3){
   preAB = prePosA + 12;
      }
      else if(4<= prePosA && prePosA<=15){
        preAB = prePosA - 4;
    }
      else if(16<= prePosA && prePosA <=21){
        preAB = prePosA + 2;
      }
      else if(22<= prePosA && prePosA <=23){
        preAB = prePosA - 6;
      }
      else{
        preAB = prePosA;
      }

      ///////////////// A position relative  to C////////////////////////

if(posA<=7){
    AC = posA + 8;
   }
   else if(8<= posA && posA <=15){
    AC = posA - 8;
   }
   else if(16<= posA && posA <=19){
    AC = posA + 4;
   }
   else if(20<= posA && posA <=23){
    AC = posA - 4;
   }
   else{
    AC = posA;
   }


   if(prePosA<=7){
   preAC = prePosA + 8;
      }
      else if(8<= prePosA && prePosA<=15){
        preAC = prePosA - 8;
    }
      else if(16<= prePosA && prePosA <=19){
        preAC = prePosA + 4;
      }
      else if(20<= prePosA && prePosA <=23){
        preAC = prePosA - 4;
      }
      else{
        preAC = prePosA;
      }
    
             ///////////////// A position relative  to D////////////////////////
       if(posA<=11){
        AD = posA + 4;
       }
       else if(12<= posA && posA <=15){
        AD = posA - 12;
       }
       else if(16<= posA && posA <=17){
        AD = posA + 6;
       }
       else if(18<= posA && posA <=23){
        AD = posA - 2;
       }
       else{
        AD = posA;
       }
   
   
       if(prePosA<=11){
        preAD =prePosA + 4;
          }
          else if(11<= prePosA && prePosA <=15){
            preAD =prePosA - 12;
          }
          else if(16<= prePosA && prePosA <=17){
            preAD =prePosA + 6;
          }
          else if(18<= prePosA && prePosA<=23){
            preAD =prePosA - 2;
          }
          else{
            preAD =prePosA;
          }
         
         
    placement2(posA, prePosA, player);
}
if(player==="B"){
    if((result===-1)&&(posB===4||posB===0||posB===8||posB===12||posB===24)){
        posB = posB;

    }
    else{
       prePosB = posB;
    posB = posB + result; 
    if(posB>24){
        posB = 24;
    }
    }
   //////////////////////////////////B position relative to A///////////////////////////
    if(posB<=11){
     sitPosB = posB + 4;
    }
    else if(12<= posB && posB <=15){
        sitPosB = posB - 12;
    }
    else if(16<= posB && posB <=17){
        sitPosB = posB + 6;
    }
    else if(19<= posB && posB <=23){
        sitPosB = posB - 2;
    }
    else{
        sitPosB = posB;
    }


    if(prePosB<=11){
        preSitB = prePosB + 4;
       }
       else if(12<= prePosB && prePosB <=15){
           preSitB = prePosB - 12;
       }
       else if(16<= prePosB && prePosB <=17){
           preSitB = prePosB + 6;
       }
       else if(19<= prePosB  && prePosB<=23){
           preSitB = prePosB - 2;
       }
       else{
           preSitB = prePosB;
       }
       
///////////////// B position relative  to C////////////////////////

    if(posB<=3){
        BC = posB + 12;
       }
       else if(4<= posB && posB <=15){
           BC = posB - 4;
       }
       else if(16<= posB && posB <=21){
           BC = posB + 2;
       }
       else if(22<= posB && posB <=23){
          BC = posB - 6;
       }
       else{
           BC = posB;
       }
   
   
       if(prePosB<=3){
       preBC = prePosB + 12;
          }
          else if(4<= prePosB && prePosB <=15){
           preBC = prePosB - 4;
        }
          else if(16<= prePosB && prePosB <=21){
            preBC = prePosB + 2;
          }
          else if(22<= prePosB  && prePosB<=23){
            preBC = prePosB - 6;
          }
          else{
            preBC = prePosB;
          }
        
                 ///////////////// B position relative  to D////////////////////////
           if(posB<=7){
            BD = posB + 8;
           }
           else if(8<= posB && posB <=15){
               BD = posB - 8;
           }
           else if(16<= posB && posB <=19){
               BD = posB + 4;
           }
           else if(20<= posB && posB <=23){
              BD = posB - 4;
           }
           else{
               BD = posB;
           }
       
       
           if(prePosB<=7){
           preBD = prePosB+ 8;
              }
              else if(8<= prePosB && prePosB <=15){
               preBD = prePosB - 8;
            }
              else if(16<= prePosB && prePosB <=19){
                preBD = prePosB + 4;
              }
              else if(20<= prePosB  && prePosB<=23){
                preBD = prePosB - 4;
              }
              else{
                preBD =prePosB;
              }
             
             
         
         
       placement2(sitPosB, preSitB, player);    
}
if(player==="C"){
    if((result===-1)&&(posC===4||posC===0||posC===8||posC===12||posC===24)){
        posC = posC;
    }
    else{
        prePosC = posC;
     posC = posC + result; 
     if(posC>24){
         posC = 24;
     }
    }
       //////////////////////////////////C position relative to A///////////////////////////
    if(posC<=7){
        sitPosC = posC + 8;
       }
       else if(8<= posC && posC <=15){
           sitPosC = posC - 8;
       }
       else if(16<= posC && posC <=19){
           sitPosC = posC + 4;
       }
       else if(20<= posC && posC <=23){
           sitPosC = posC - 4;
       }
       else{
           sitPosC = posC;
       }
   
   
       if(prePosC<=7){
           preSitC = prePosC + 8;
          }
          else if(8<= prePosC && prePosC<=15){
              preSitC = prePosC - 8;
          }
          else if(16<= prePosC && prePosC <=19){
              preSitC = prePosC + 4;
          }
          else if(20<= prePosC && prePosC <=23){
              preSitC = prePosC - 4;
          }
          else{
              preSitC = prePosC;
          }


          ///////////////// C position relative  to B////////////////////////

    if(posC<=11){
        CB = posC + 4;
       }
       else if(12<= posC && posC <=15){
        CB = posC + 12;
       }
       else if(16<= posC && posC <=17){
        CB = posC + 6;
       }
       else if(18<= posC && posC<=23){
        CB = posC - 2;
       }
       else{
        CB = posC;
       }
   
   
       if(prePosC<=11){
       preCB = prePosC + 4;
          }
          else if(12<= prePosC && prePosC <=15){
            preCB = prePosC + 12;
        }
          else if(16<= prePosC && prePosC <=17){
            preCB = prePosC + 6;
          }
          else if(18<= prePosC && prePosC<=23){
            preCB = prePosC - 2;
          }
          else{
            preCB = prePosC
          }
        
                 ///////////////// C position relative  to D////////////////////////
           if(posC<=3){
            CD = posC + 12;
           }
           else if(4<= posC && posC <=15){
            CD = posC - 4;
           }
           else if(16<= posC && posC <=21){
            CD = posC + 2;
           }
           else if(22<= posC && posC <=23){
            CD = posC - 6;
           }
           else{
            CD = posC;
           }
       
       
           if(prePosC<=3){
           preCD = prePosC+ 12;
              }
              else if(4<= prePosC && prePosC <=15){
                preCD = prePosC- 4;
            }
              else if(16<= prePosC && prePosC <=21){
                preCD = prePosC+ 2;
              }
              else if(22<= prePosC && prePosC <=23){
                preCD = prePosC - 6;
              }
              else{
                preCD = prePosC;
              }
             
             
         
    placement2(sitPosC, preSitC, player);
}
if(player==="D"){
    if((result===-1)&&(posD===4||posD===0||posD===8||posD===12||posD===24)){
        posD = posD;
    }
    else{
    prePosD = posD;
    posD = posD + result;
    if(posD>24){
        posD = 24;
    }
   }
  
     //////////////////////////////////D position relative to A///////////////////////////
   if(posD<=3){
    sitPosD = posD + 12;
   }
   else if(4<= posD && posD <=15){
       sitPosD = posD - 4;
   }
   else if(16<= posD && posD <=21){
       sitPosD = posD + 2;
   }
   else if(22<= posD && posD <=23){
       sitPosD = posD - 6;
   }
   else{
       sitPosD = posD;
   }


   if(prePosD<=3){
       preSitD = prePosD + 12;
      }
      else if(4<= prePosD && prePosD <=15){
          preSitD = prePosD - 4;
      }
      else if(16<= prePosD && prePosD <=21){
          preSitD = prePosD + 2;
      }
      else if(22<= prePosD && prePosD <=23){
          preSitD = prePosD - 6;
      }
      else{
          preSitD = prePosD;
      }
  
      
  ///////////////// D position relative  to B////////////////////////

  if(posD<=7){
    DB = posD + 8;
   }
   else if(8<= posD && posD <=15){
    DB = posD - 8;
   }
   else if(16<= posD && posD <=19){
    DB = posD + 4;
   }
   else if(20<= posD && posD <=23){
    DB = posD - 4;
   }
   else{
    DB = posD;
   }


   if(prePosD<=7){
   preDB = prePosD + 8;
      }
      else if(8<= prePosD && prePosD <=15){
        preDB = prePosD - 8;
    }
      else if(16<= prePosD && prePosD <=19){
        preDB = prePosD + 4;
      }
      else if(20<= prePosD && prePosD <=23){
        preDB = prePosD - 4;
      }
      else{
        preDB = prePosD;
      }
    
             ///////////////// D position relative  to C////////////////////////
       if(posD<=11){
        DC = posD + 4;
       }
       else if(12<= posD && posD <=15){
        DC = posD - 12;
       }
       else if(16<= posD && posD <=17){
        DC = posD + 6;
       }
       else if(18<= posD && posD <=23){
        DC = posD - 2;
       }
       else{
        DC = posD;
       }
   
   
       if(prePosD<=11){
       preDC = prePosD + 4;
          }
          else if(12<= prePosD && prePosD <=15){
            preDC = prePosD - 12;
        }
          else if(16<= prePosD && prePosD <=17){
            preDC = prePosD + 6;
          }
          else if(18<= prePosD && prePosD <=23){
            preDC = prePosD - 2;
          }
          else{
            preDC = prePosD;
          }
         
         

   placement2(sitPosD, preSitD, player);
}
}


function toussie(player, index){
    if(index==="A"){
        posA=0;
        AB = 12;
        AC = 8;
        AD = 4;
        document.getElementById(posA).style.background = "url('css/image/men.png')"; 
    }else if(index==="B"){
        posB=0;
        sitPosB=4; 
        BC = 12;
        BD = 8;
        document.getElementById(sitPosB).style.background = "url('css/image/women.png')";  
    }
    else if(index==="C"){
        posC=0;
        CB = 4;
        CD = 12;
        sitPosC=8;
        document.getElementById(sitPosC).style.background = "url('css/image/boy.png')"; 
    }else{
        posD=0;
        DB = 8;
        DC = 4;
        sitPosD=12; 
        document.getElementById(sitPosD).style.background = "url('css/image/girl.png')"; 
    }


 }


function placement2(pos, pre, player){
    
    if(player==="A" ){
        if((pre===4||pre===0||pre===8||pre===12||pre===24)&&(pre===sitPosB||pre===sitPosD||pre===sitPosC)){
           if(pre===sitPosB){
            document.getElementById(sitPosB).style.background = "url('css/image/women.png')";  
           }
           else if(pre===sitPosC){
            document.getElementById(sitPosC).style.background = "url('css/image/boy.png')"; 
           }
           else{
            document.getElementById(sitPosD).style.background = "url('css/image/girl.png')"; 
           }

        }
        else{
            document.getElementById(pre).style.background = ""; 
        }
           
 
    
           if(((pre < sitPosB && sitPosB <pos)||(sitPosB===pos) )  && (sitPosB !==4 && sitPosB !==0 && sitPosB !==8 && sitPosB !==12 && sitPosB !== 24)){ 
            document.getElementById(sitPosB).style.background = ""; 
            toussie("A","B");
           }
           if(((pre < sitPosC && sitPosC < pos)||(sitPosC === pos) )  && (sitPosC!==4&&sitPosC!==0&&sitPosC!==8&&sitPosC!==12&&sitPosC!==24)){
            document.getElementById(sitPosC).style.background = ""; 
            toussie("A","C");
           }
           if(((pre < sitPosD && sitPosD < pos)||(sitPosD===pos))  && (sitPosD!==4&&sitPosD!==0&&sitPosD!==8&&sitPosD!==12&&sitPosD!==24)){
            document.getElementById(sitPosD).style.background = ""; 
            toussie("A","D");
           }
           document.getElementById(pos).style.background = "url('css/image/men.png')";  //placement to new position
        }
    
    
        if(player==="B" ){
        if((pre===4||pre===0||pre===8||pre===12||pre===24)&&(pre===posA||pre===sitPosD||pre===sitPosC)){
           if(pre===posA){
            document.getElementById(posA).style.background = "url('css/image/men.png')";  
           }
           else if(pre===sitPosC){
            document.getElementById(sitPosC).style.background = "url('css/image/boy.png')"; 
           }
           else{
            document.getElementById(sitPosD).style.background = "url('css/image/girl.png')"; 
           }

        }
        else{
            document.getElementById(pre).style.background = ""; 
        }

   
           
            if(((prePosB < AB && AB < posB)||(AB===posB) )  && (posA!==4 && posA!==0 && posA!==8 && posA!==12 && posA!==24)){
            document.getElementById(posA).style.background = "";  
          
            toussie("B","A");  
           }
           if(((prePosB < CB && CB < posB)||(CB===posB) )  && (sitPosC!==4&&sitPosC!==0&&sitPosC!==8&&sitPosC!==12&&sitPosC!==24)){
            document.getElementById(sitPosC).style.background = "";  
            toussie("B","C");  
           }
           if(((prePosB < DB && DB < posB)||(DB===posB) )  && (sitPosD!==4&&sitPosD!==0&&sitPosD!==8&&sitPosD!==12&&sitPosD!==24)){  
            document.getElementById(sitPosD).style.background = ""; 
            
            toussie("B","D");  
           }
    
           document.getElementById(pos).style.background = "url('css/image/women.png')";    //placement to new position

    }
    if(player==="C" ){
        if((pre===4||pre===0||pre===8||pre===12||pre===24)&&(pre===posA||pre===sitPosD||pre===sitPosB)){
           if(pre===posA){
            document.getElementById(posA).style.background = "url('css/image/men.png')";  
           }
           else if(pre===sitPosB){
            document.getElementById(sitPosB).style.background = "url('css/image/women.png')"; 
           }
           else{
            document.getElementById(sitPosD).style.background = "url('css/image/girl.png')"; 
           }

        }
        else{
            document.getElementById(pre).style.background = ""; 
        }
      
           
       
        
        if(((prePosC < AC && AC < posC)||(AC===posB) )  &&(posA!==4 && posA!==0 && posA!==8 && posA!==12 && posA!==24)){
            document.getElementById(posA).style.background = ""; 
            toussie("C","A");
           }
           if(((prePosC < BC && BC < posC)||(BC===posC) )  &&  (sitPosB !==4 && sitPosB !==0 && sitPosB !==8 && sitPosB !==12 && sitPosB !== 24)){
            document.getElementById(sitPosB).style.background = ""; 
            toussie("C","B");
           }
           if(((prePosC < DC && DC < posC)||(DC===posC) )  &&(sitPosD!==4&&sitPosD!==0&&sitPosD!==8&&sitPosD!==12&&sitPosD!==24)){
            document.getElementById(sitPosD).style.background = ""; 
            toussie("C","D"); 
           }
    
           document.getElementById(pos).style.background = "url('css/image/boy.png')";    //placement to new position

    }
    if(player==="D"){
        if((pre===4||pre===0||pre===8||pre===12||pre===24)&&(pre===posA||pre===sitPosC||pre===sitPosB)){
           if(pre===posA){
            document.getElementById(posA).style.background = "url('css/image/men.png')";  
           }
           else if(pre===sitPosB){
            document.getElementById(sitPosB).style.background = "url('css/image/women.png')"; 
           }
           else{
            document.getElementById(sitPosC).style.background = "url('css/image/boy.png')"; 
           }

        }
        else{
            document.getElementById(pre).style.background = ""; 
        }
   
           
       
        
        if(((prePosD < AD && AD < posD)||(AD===posD) )  && (posA!==4 && posA!==0 && posA!==8 && posA!==12 && posA!==24)){ 
            document.getElementById(posA).style.background = ""; 
            toussie("D","A");
        }
        if(((prePosD < BD && BD < posD)||(BD===posD) )  &&  (sitPosB !==4 && sitPosB !==0 && sitPosB !==8 && sitPosB !==12 && sitPosB !== 24)){
            document.getElementById(sitPosB).style.background = "";  
            toussie("D","B");
           }
           if(((prePosD < CD && CD < posD)||(CD===posD) )  &&  (sitPosC!==4 &&sitPosC!==0&&sitPosC!==8 && sitPosC !==12 && sitPosC!==24)){
            document.getElementById(sitPosC).style.background = ""; 
            toussie("D","C");
           }
        
         document.getElementById(pos).style.background = "url('css/image/girl.png')";    //placement to new position

    }
   

}