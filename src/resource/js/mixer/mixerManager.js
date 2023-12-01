

import { reinit, getDoc } from "./rollupBundle/codeMirrorManager.js";
import { emit } from "./mixerEmitter.js";
import { refreshHydra } from "./hydraManager.js";



var channelMixer = []; 
var channelLive= 0;
var isautosave = false; 


export var loadprev=false;
export var channelSelected= 0;
export function setChannelSelected(variable){
  channelSelected= variable;
} 
export function setLoadprev(variable){
  loadprev= variable;
}

//FUNCTION INIT TO CALL AT THE START OF THE PAGE
export function initializeChannel(variable){
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
    var element = document.getElementById(channelSelected+"");
    if(element)
      element.classList.add("selectedChannel");
    
    resolve(channelMixer);
    loadprev = true;
    load(); 
  });
  return firstInitRetrive;
}

export function load() {
  emit('find_channel', channelSelected);
  console.log("load channel " + channelSelected);
}

export function run() {
  emit('set_channel', channelSelected);
  emit('set_toload', true);
  showChannelLive(channelSelected);
  console.log("run channel " + channelSelected);
}

export function prev() {

  
  var jsx = getDoc();
  if (!jsx) {
    jsx = "hush();\nresetAudioAndSpeed();\ns0.initImage(\"./src/resource/img/alpha.png\");\nsrc(s0).out(o0);\nrender(o0);"
    reinit(jsx);
  }
  refreshHydra(jsx);
};

export function save() {
  var jsx = getDoc();
  var name = document.getElementById('channelName').value;
  if (!name) {
    name = channelSelected;
  }
  var channel = {
    id: channelSelected,
    code: jsx,
    name: name
  }
  document.getElementById(channelSelected).innerText = name;
  document.getElementById(channelSelected).title = name;
  emit('save_channel', channel);
  console.log("Save channel " + channel.id);
}
export function autosave() {
  var element = document.getElementById("Autosave");
  isautosave = !isautosave;
  if (element) {
    if (isautosave) {
      element.classList.add("liveChannel");
    } else {
      element.classList.remove("liveChannel");
    }
  }
}
export function showChannelLive(channel) {
  var elementToremove = document.getElementsByClassName("liveChannel");
  if (elementToremove.length > 0) {
    elementToremove[0].classList.remove("liveChannel");
  }
  var element = document.getElementById(channel);
  if (element)
    element.classList.add("liveChannel");
  channelLive = parseInt(channel);
}

export function selectChannelLoad(channel) {
  if (isautosave) {
    save();
  }
  var elementToremove = document.getElementsByClassName("selectedChannel");
  if (elementToremove.length > 0) {
    elementToremove[0].classList.remove("selectedChannel");
  }
  var element = document.getElementById(channel);
  if (element)
    element.classList.add("selectedChannel");

  channelSelected = parseInt(channel);
  loadprev = true;
  load();
}


export function initMixer(){
  emit('get_all');
}