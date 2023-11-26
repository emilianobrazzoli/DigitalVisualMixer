
var hydra = new Hydra({ detectAudio: true, canvas: document.getElementById("hydra-canvas"), });
hydra.setResolution(1920, 1080);
a.show();
a.setBins(6);
console.log(a);
console.log("speed "+speed);
console.log("bpm "+bpm); 

var resetAudioAndSpeed = function(){
    a.setScale(10)
    a.setBins(6)
    a.setSmooth(0.8)
    a.setCutoff(3)
    sepped=1;
    bpm=30;
    console.log(a);
    console.log("speed "+speed);
    console.log("bpm "+bpm); 
}