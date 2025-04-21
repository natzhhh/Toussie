function patternGenerator() {


this.playingPattern;

this.generatePattern = () => {
   var patterns = ["threeInAnyWays","twoRowsThreeColumn","x","rectangle","plus"];
    let bballsLen = patterns.length;
    let ball =  1 + Math.floor(Math.random()*bballsLen);
    let i = ball-1;
    playingPattern = patterns[i];
    return playingPattern;
};
}