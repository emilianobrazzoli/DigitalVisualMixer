//DECLARATION
var channelSelected= 0;
var channelLive= 0;
var isautosave = false; 
var loadprev=false;
var apiLink = 'https:/'+'/hydra.ojack.xyz/api/';
var channelMixer = []; 
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
    var element = document.getElementById(channelSelected+"");
    if(element)
      element.classList.add("selectedChannel");
    
    resolve(channelMixer);
    
  });
  return firstInitRetrive;
}


var selectActionExec = function (selectedAction) { 
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


var init = function(){
  emit('get_all');
}

init();
