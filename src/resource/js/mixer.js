var channelSelected= 0;
var channelLive= 0;
var socket = io(); 
var selectedAction = null;
var loadprev=false;
var apiLink = 'https:/'+'/hydra.ojack.xyz/api/';
var hydra = new Hydra({ detectAudio: true, canvas: document.getElementById("hydra-canvas"), });
hydra.setResolution(1920, 1080);
a.show();
a.setBins(6);
console.log(a);
console.log("speed "+speed);
console.log("bpm "+bpm); 

var js = CodeMirror.fromTextArea(document.getElementById("codejs"), {
  mode: "javascript",
  lineNumbers: true,
  theme: "dracula"
});

socket.on('get_channel', function(variable) {
  showChannelLive(variable.id); 
});

socket.on('get_code', function(variable) {
  var code = variable;   
  js.getDoc().setValue(code);
  if(loadprev){
    prev();
    loadprev=false;
  }
});
 

var load = function(){
  socket.emit('get_code', channelSelected); 
}

var run = function(){
  socket.emit('set_channel', channelSelected);
  socket.emit('set_toload', true); 
  showChannelLive(channelSelected); 
}
 
var prev = function () {
  if (document.getElementById('chalfunction')) {
    document.getElementById('chalfunction').remove();
  }
  var jsx = js.getValue();
  if(!jsx){
    jsx="hush()\n\ns0.initImage(\"./src/resource/img/alpha.png\") \n \nsrc(s0) \n  .out(o0)\n\n \n"
    js.getDoc().setValue(jsx);
  }
  var s = document.createElement('script');
  s.setAttribute("id", "chalfunction");
  s.textContent = jsx;//inne
  document.body.appendChild(s);
}; 

var save = function () { 
    var jsx = js.getValue();
    var channel = {
      id: channelSelected,
      code: jsx
    }
    socket.emit('save_channel', channel);  
}

var showChannelLive= function(channel){
  var elementToremove = document.getElementsByClassName("liveChannel");
  if(elementToremove.length>0){
    elementToremove[0].classList.remove("liveChannel");
  }
  var element = document.getElementById(channel);
  if(element)
    element.classList.add("liveChannel");
  channelLive=parseInt(channel);
}

var selectChannelLoad= function(channel){
  var elementToremove = document.getElementsByClassName("selectedChannel");
  if(elementToremove.length>0){
    elementToremove[0].classList.remove("selectedChannel");
  }
  var element = document.getElementById(channel);
  if(element)
    element.classList.add("selectedChannel");
  channelSelected=parseInt(channel);
  loadprev=true;
  load(); 
}

var selectChannel= function(channel){
  var elementToremove = document.getElementsByClassName("selectedChannel");
  if(elementToremove.length>0){
    elementToremove[0].classList.remove("selectedChannel");
  }
  var element = document.getElementById(channel);
  if(element)
    element.classList.add("selectedChannel");
  channelSelected=parseInt(channel);
}

var selectAction = function(action){
  var elementToremove = document.getElementsByClassName("selectedAction");
  if(elementToremove.length>0){
    elementToremove[0].classList.remove("selectedAction");
  }
  var element = document.getElementById(action);
  if(element)
    element.classList.add("selectedAction");
  selectedAction=action;
}
var resetAudio = function(){
  a.show();
  a.setScale(10)
  a.setBins(6)
  a.setSmooth(0.8)
  a.setCutoff(3)
  console.log(a);
  console.log("speed "+speed);
  console.log("bpm "+bpm); 
}
var exec = function () { 
  if(selectedAction === 'run'){
    run();
  }
  if(selectedAction === 'prev'){
    prev();
  }
  if(selectedAction === 'save'){
    save();
  }
  if(selectedAction === 'load'){
    load();
  }
  if(selectedAction === 'loadprev'){
    loadprev=true;
    load(); 
  }
  if(selectedAction === 'saverun'){
    save();
    run();
  }
}

var selectActionExec = function(action){
  selectedAction=action;
  exec();
}

var init = function(){
  socket.on('connect', function() { 
  }); 
  selectChannelLoad(0);
}

init();

document.onkeyup = function(e) {
  if (e.ctrlKey  && e.shiftKey && e.key === "Enter") {
    selectActionExec('prev');
  }
};