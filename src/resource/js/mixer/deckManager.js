
import { run,prev,save,load,setLoadprev,selectChannelLoad,autosave,initMixer} from "./mixerManager.js";

import { initMirror } from "./rollupBundle/codeMirrorManager.js";

import { initMacro } from "./macroManager.js";

var apiLink = 'https:/'+'/hydra.ojack.xyz/api/';

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
    setLoadprev(true);
    load(); 
  }
  if(selectedAction === 'saverun'){
    save();
    run();
  }
} 


var init = function(){
  initMixer();
  initMirror();
  initMacro();
  window.selectChannelLoad =selectChannelLoad;
  window.selectActionExec = selectActionExec;
  window.autosave = autosave;
  window.apiLink = apiLink;
}

init();