var channelSelectedToSave = 1;
var channelSelectedToView = 1;
var socket = io(); 

//INIT EVENT FOR CODEMIRROR
document.addEventListener("DOMContentLoaded", function (event) {

  var hydra = new Hydra({ detectAudio: true, canvas: document.getElementById("hydra-canvas"), });

  var js = CodeMirror.fromTextArea(document.getElementById("codejs"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "dracula"
  });

  var run = document.getElementById('run'); 
  run.onclick = function () {
    if (document.getElementById('chalfunction')) {
      document.getElementById('chalfunction').remove();
    }
    var jsx = js.getValue();
    var s = document.createElement('script');
    s.setAttribute("id", "chalfunction");
    s.textContent = jsx;//inne
    document.body.appendChild(s);
  }; 

  var save = document.getElementById('save'); 
  save.onclick = function () { 
      var jsx = js.getValue();
      var channel = {
        id: channelSelectedToSave,
        code: jsx
      }
      socket.emit('save_channel', channel); 
      changeChannle();
  }

  console.log("mixer: event loaded");
});



var changeChannle = function(){
  socket.emit('set_channel', channelSelectedToView);
  socket.emit('set_toload', true); 
}