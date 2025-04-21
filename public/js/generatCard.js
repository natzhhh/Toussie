



function generateCard() {






this.matrix = [];

this.generateMatrix = () => {


var b = [];
var i = [];
var n = [];
var g = [];
var o = [];

var bBalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var iBalls = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var nBalls = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
var gBalls = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
var oBalls = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

for(var j = 0; j<=4; j++){
    let bballsLen = bBalls.length;
let ball =  1 + Math.floor(Math.random()*bballsLen);
let i = ball-1;
b[j] = bBalls[i];
bBalls = splice(bBalls, i);
}
this.matrix.push(b);
for(var j = 0; j<=4; j++){
    let iballsLen = iBalls.length;
    let ball =  1 + Math.floor(Math.random()*iballsLen);
    let k = ball-1;
    i[j] = iBalls[k];
    iBalls = splice(iBalls, k);
    }
    this.matrix.push(i);
for(var j = 0; j<=4; j++){
    let nballsLen = nBalls.length;
        let ball =  1 + Math.floor(Math.random()*nballsLen);
        let i = ball-1;
        n[j] = nBalls[i];
        nBalls = splice(nBalls, i);
        }
        this.matrix.push(n);
 for(var j = 0; j<=4; j++){
    
let gballsLen = gBalls.length;
            let ball =  1 + Math.floor(Math.random()*gballsLen);
            let i = ball-1;
            g[j] = gBalls[i];
            gBalls = splice(gBalls, i);
            }
            this.matrix.push(g);  
for(var j = 0; j<=4; j++){
    let oballsLen = oBalls.length;
                let ball =  1 + Math.floor(Math.random()*oballsLen);
                let i = ball-1;
                o[j] = oBalls[i];
                oBalls = splice(oBalls, i);
                }
                this.matrix.push(o);
                
                
return this.matrix;    
};





}
function splice(balls,j) {
    balls.splice(j, 1);  
    return balls;
 }