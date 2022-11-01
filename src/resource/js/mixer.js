var channelSelected= 0;
var socket = io(); 
var selectedAction = null;
var loadprev=false;

var hydra = new Hydra({ detectAudio: true, canvas: document.getElementById("hydra-canvas"), });

var js = CodeMirror.fromTextArea(document.getElementById("codejs"), {
  mode: "javascript",
  lineNumbers: true,
  theme: "dracula"
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
}
 
var prev = function () {
  if (document.getElementById('chalfunction')) {
    document.getElementById('chalfunction').remove();
  }
  var jsx = js.getValue();
  if(!jsx){
    jsx="osc(0).color(0).out(o0);"
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

