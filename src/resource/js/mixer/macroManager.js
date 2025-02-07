
export function initMacro() {


  document.onkeyup = function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
      selectActionExec('prev');
    }
    if (e.ctrlKey && e.shiftKey && e.key === "ArrowLeft") {
      selectActionExec('prevRunLive');
    }
    if (e.ctrlKey && e.shiftKey && e.key === "ArrowRight") {
      selectActionExec('nextRunLive');
    }
    if (e.ctrlKey && e.shiftKey && e.key === "S") {
      selectActionExec('save'); 
    }
    if (  e.shiftKey && e.key === "R") {
      selectActionExec('run'); 
    }
  };
}