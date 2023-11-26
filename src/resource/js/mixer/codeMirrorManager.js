
var js = CodeMirror.fromTextArea(document.getElementById("codejs"), {
    lineNumbers: true,
    theme: "dracula",
    extraKeys: {"Ctrl-Space": "autocomplete"},
    mode: {name: "javascript", globalVars: true}
  }); 