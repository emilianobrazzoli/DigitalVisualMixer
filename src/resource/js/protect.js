/*let allImages = document.querySelectorAll("img");
allImages.forEach((value)=>{
    value.oncontextmenu = (e)=>{
        e.preventDefault();
    }
})*/ 

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
/*
var hydra = new Hydra({ detectAudio: true});
s0.initCam() ; //loads a camera 
    
    osc(5, 0.9, 0.001)
    .kaleid([3,4,5,7,8,9,10].fast(0.1))
    .color(0.5, 0.3)
    .colorama(0.6).modulate(src(s0))
    .rotate(0.009,()=>Math.sin(time)* -0.02 )
    .modulateRotate(o0,()=>Math.sin(time) * 0.003)
    .modulate(o0, 0.9).modulate(src(s0))
    .scale(0.9).modulate(src(s0))
    .out(o0);
    
render(o0) */
 // show only output o2


//INIT SOCKET
var socket = io(); 
var channel =  null; //default
var toload = null; //default

var loadChannel = function(){

}

//SET SOCKET EVENT
socket.on('get_channel', function(variable) {
    channel = variable; 
});

socket.on('get_toload', function(variable) {
    toload = variable; 
    if(toload){
        loadChannel();
    }
});

var init = function(){
    //SET SOCKET CONNECTION
    socket.on('connect', function() { 
    }); 
}

init();