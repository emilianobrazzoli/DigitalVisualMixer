/*
osc() oscilla su tre valori: primo indica larghezza (più è piccolo più la banda è grande), velocità (negativo per andare a sinistra), colore (colori bande)
rotate() ruota su due valori (il primo è di quanto ruota, il secondo è quanto veloce)
repeat() su due valori, il primo è le colonne e la seconda sono le righe
kaleid() caleido su un valore che ne indica i punti del poligono (minimo 2 per un rettangolo)
noise() ruomore (bolle) su due valori, uno indica quanto sono piccoli e il secondo quanto sono veloci
scrollX da dove parte, quanto veloce
scrollY da dove parte, quanto veloce
scroll da dove parte x,y, quanto veloce x,y
colorama indica quanto colorizzare
out() butta fuori il risultato
s0.initCam() initialize webcam as external source 's0'
src(s0).out() use external source 's0' inside Hydra
color tre valori RGB
render(o2)  // show only output o2
blend() combines the colors from two sources to create a third source. il secondo valore aumenta il colore di differenza
modulate() does not change color or luminosity but distorts one visual source using another visual source.
modulateRotate() is similar to .rotate(), but it allows you to apply different amounts of rotation to different parts of the visual source
shape indica i lati, quanto è largo e quanto sfumare i bordi
https://hydra.ojack.xyz/api/
*/


//INIT SOCKET

var socket = io(); 
var channel =  null; //default
var toload = null; //default  
var hydra = new Hydra({ detectAudio: true, canvas: document.getElementById("hydra-canvas") });
hydra.setResolution(1920, 1080);
a.setBins(6);

var loadChannel = function(){ 
    if(channel!==null && toload){
        if (document.getElementById('chalfunction')) {
            document.getElementById('chalfunction').remove();
          }
          var s = document.createElement('script');
          s.setAttribute("id", "chalfunction");
          s.textContent = channel.code;//inne
          document.body.appendChild(s); 
          socket.emit('set_toload', false);
          a.hide();
    }
}

//SET SOCKET EVENT

socket.on('get_channel', function(variable) {
    channel = variable; 
    loadChannel();
});

socket.on('get_toload', function(variable) {
    if(toload === null){
        toload = true;
    }else{
        toload = variable; 
    }
    loadChannel();
});

socket.on('set_channel', function(variable) {
    channel = variable; 
    loadChannel(); 
});

socket.on('set_toload', function(variable) {
    toload = variable;  
    loadChannel(); 
});
 
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
  
var init = function(){
    //START SOCKET CONNECTION
    socket.on('connect', function() { 
    }); 
    loadChannel();
     
}

init();
 
 