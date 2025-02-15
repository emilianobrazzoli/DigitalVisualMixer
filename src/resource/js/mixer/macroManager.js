
export function initMacro() {


  document.onkeyup = function (e) {
    if (e.ctrlKey && e.key === "Enter") {
      selectActionExec('prev');
    }
    if (e.ctrlKey && e.key === "ArrowLeft") {
      selectActionExec('prevRunLive');
    }
    if (e.ctrlKey && e.key === "ArrowRight") {
      selectActionExec('nextRunLive');
    }
    if (e.ctrlKey && e.key === "ArrowUp") {
      selectActionExec('save'); 
    }
    if (e.ctrlKey && e.key === "ArrowDown") {
      selectActionExec('run'); 
    }
  };
}