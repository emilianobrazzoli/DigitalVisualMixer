
var load = function(){
    emit('find_channel', channelSelected); 
    console.log("load channel "+channelSelected);
  }
  
  var run = function(){
    emit('set_channel', channelSelected);
    emit('set_toload', true); 
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
      emit('save_channel', channel);  
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