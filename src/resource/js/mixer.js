 
document.addEventListener("DOMContentLoaded", function(event) {

var hydra = new Hydra({ detectAudio: true,  canvas: document.getElementById("hydra-canvas"),});

var js = CodeMirror.fromTextArea(document.getElementById("codejs"), {
  mode:  "javascript",
  lineNumbers: true,
  theme: "dracula"
});
 
var element = document.getElementById('run');

element.onclick = function(){ 
  if(document.getElementById('chalfunction')){
    document.getElementById('chalfunction').remove();
  }
  var jsx = js.getValue();
  var s = document.createElement('script');
  s.setAttribute("id", "chalfunction");
  s.textContent = jsx;//inne
  document.body.appendChild(s); 
};

console.log("ajahaha");
});