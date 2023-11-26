
document.onkeyup = function(e) {
    if (e.ctrlKey  && e.shiftKey && e.key === "Enter") {
      selectActionExec('prev');
    }
    if (e.ctrlKey  && e.shiftKey && e.key === "S") {
      save();
    }
  };