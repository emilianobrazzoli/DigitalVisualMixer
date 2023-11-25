//DECLARATION
var channelSelected= 0;
var channelLive= 0;
var socket = io(); 
var isautosave = false;
var selectedAction = null;
var loadprev=false;
var apiLink = 'https:/'+'/hydra.ojack.xyz/api/';
var hydra = new Hydra({ detectAudio: true, canvas: document.getElementById("hydra-canvas"), });
var channelMixer = []; 
hydra.setResolution(1920, 1080);
a.show();
a.setBins(6);
console.log(a);
console.log("speed "+speed);
console.log("bpm "+bpm); 

var js = CodeMirror.fromTextArea(document.getElementById("codejs"), {
  lineNumbers: true,
  theme: "dracula",
  extraKeys: {"Ctrl-Space": "autocomplete"},
  mode: {name: "javascript", globalVars: true}
}); 

//END DECLARATION

//FUNCTION INIT TO CALL AT THE START OF THE PAGE
function initializeChannel(variable){
  const firstInitRetrive = new Promise((resolve, reject) => {
    document.getElementById("multychannel").innerHTML ="";
    channelMixer = variable;
    var html= "<div class=\"row spacingRowa\" >";
    var i=1;
    for (let index = 0; index < channelMixer.length; index++) {
      const element = channelMixer[index];
      html +=
      "<div style=\"text-align:center\" class=\" col-3 \"  >"+
      "<button style=\"width:90%;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;\" "+
      "id=\""+element.id+"\" onclick=\"selectChannelLoad('"+element.id+"')\" class=\"btn btn-primary\" title=\""+element.name+"\" >"+
        element.name+
      "</button>"+
      "</div>"
      if( (i>0 && i % 4 == 0 )|| i === channelMixer.length ){
        html +=" </div>"
      }
      if( (i>0 && i % 4 == 0 )&& i !== channelMixer.length ){
        html +=" <div class=\"row spacingRowa\" >"
      }
      if(  i === channelMixer.length ){
        document.getElementById("multychannel").innerHTML +=html
      }
      i++;
    }
    socket.on('connect', function() {
    });  
    var element = document.getElementById(channelSelected+"");
    if(element)
      element.classList.add("selectedChannel");
    resolve(channelMixer);
    
  });
  return firstInitRetrive;
}

//RETRIVE CHANNEL IN LIVE
socket.on('get_in_load', function(variable) {
  var element = document.getElementById(variable+"");
  if(element)
    element.classList.add("liveChannel");
  channelLive=parseInt(channel);
});


//RETRIVE GETCHANNEL
socket.on('get_channel', function(variable) {
  showChannelLive(variable.id); 
});

//RETRIVE CHANNEL BY FIND CHANNEL
socket.on('find_channel', function(variable) {
  var code = variable.code;   
  js.getDoc().setValue(code);
  if(loadprev){
    prev();
    loadprev=false;
  }
  if(!variable.name){
    variable.name=variable.id;
  }
  document.getElementById('channelName').value = variable.name+"";
});


//RETRIVE CHANNELS BY GET ALL
socket.on('get_all', function(variable) {
  
  initializeChannel(variable).then(data=>{
    autosave();
    socket.emit('get_in_load'); 
  })
});

var load = function(){
  socket.emit('find_channel', channelSelected); 
  console.log("load channel "+channelSelected);
}

var run = function(){
  socket.emit('set_channel', channelSelected);
  socket.emit('set_toload', true); 
  showChannelLive(channelSelected); 
  console.log("run channel "+channelSelected);
}
 
var prev = function () {
  if (document.getElementById('chalfunction')) {
    document.getElementById('chalfunction').remove();
  }
  var jsx = js.getValue();
  if(!jsx){
    jsx="hush();\nresetAudioAndSpeed();\ns0.initImage(\"./src/resource/img/alpha.png\");\nsrc(s0).out(o0);\nrender(o0);"
    js.getDoc().setValue(jsx);
  }
  var s = document.createElement('script');
  s.setAttribute("id", "chalfunction");
  s.textContent = jsx;//inne
  document.body.appendChild(s);
}; 

var save = function () { 
    var jsx = js.getValue();
    var name =  document.getElementById('channelName').value;
    if(!name){
      name=channelSelected;
    }
    var channel = {
      id: channelSelected,
      code: jsx,
      name:name
    }
    document.getElementById(channelSelected).innerText = name;
    document.getElementById(channelSelected).title = name;
    socket.emit('save_channel', channel);  
    console.log("Save channel "+channel.id); 
}
var autosave= function(){
  var element = document.getElementById("Autosave"); 
  isautosave = !isautosave; 
  if(element ){
    if(isautosave){
      element.classList.add("liveChannel"); 
    }else{
      element.classList.remove("liveChannel");
    }
  }
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
  if(isautosave){
    save();
  }
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
  socket.emit('get_all'); 
}

init();

document.onkeyup = function(e) {
  if (e.ctrlKey  && e.shiftKey && e.key === "Enter") {
    selectActionExec('prev');
  }
  if (e.ctrlKey  && e.shiftKey && e.key === "S") {
    save();
  }
};