
import { insertText, modalMirror, getDocModalMirror } from "./rollupBundle/codeMirrorManager.js";

import { prev } from "./mixerManager.js";
import { ModalPanel } from "./modalManager.js";

function hydraPrew(code) {

  const myPromise = new Promise((resolve, reject) => {
    var ifrm = document.getElementById('myIframe');
    ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;

    ifrm.document.open();
    ifrm.document.write('<canvas width="300" height="200" class="bg-black" id="HydraModal"></canvas>');
    ifrm.document.close();


    var hydraLibrary = ifrm.document.createElement('script');
    hydraLibrary.setAttribute("src", "/dist/hydra-synth.js");
    ifrm.document.getElementsByTagName('head')[0].appendChild(hydraLibrary);
    setTimeout(() => {
      resolve("foo");
    }, 200);
  });

  const myPromise2 = new Promise((resolve, reject) => {
    myPromise.then(() => {
      var ifrm = document.getElementById('myIframe');
      ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;

      if (ifrm.document.getElementById('chalfunction')) {
        ifrm.document.getElementById('chalfunction').remove();
      }
      setTimeout(() => {
        resolve("foo");
      }, 200);
    });
  });

  myPromise2.then(() => {
    var ifrm = document.getElementById('myIframe');
    ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;

    var s = ifrm.document.createElement('script');
    s.setAttribute("id", "chalfunction");
    s.textContent = 'var hydraModal = new Hydra({ detectAudio: false , canvas: document.getElementById("HydraModal"), }).synth    ; hydraModal.setResolution(300, 200);' +
      " hydraModal." + code;//inne
    ifrm.document.body.appendChild(s);
  })



}
function getCodeModal() {
  prev();
  return getDocModalMirror();
}
function sourcefunction(id) {
  var value = findInJsonById(id); 
  var html =
    `<div class="overflow-y-auto w-50-ns w-100 w-100-m h-100 db">
  <div class="pa2">
    <div class="w-100 flex justify-center">
      <div class="pa4">
        <div>
        <iframe width="320" height="220" id="myIframe">
        </iframe>
        </div>
      </div>
    </div>
    <div class="w-100">
      <div class="w-100">
        <div class="editor" id="ModalMirror">
        </div>
      </div>
    </div>
  </div>
</div>
`;
  new ModalPanel(html, value.title, "Close", function () { return insertText(getCodeModal()) }, "Insert code");
  hydraPrew(value.code);
  modalMirror(value.code, function () { return hydraPrew(getCodeModal()) });
}
function findInJsonById(id) {
  var returnState;
  functionJson.forEach(element => {
    if (element) {
      element.data.forEach(element => {
        if (element.id == id) {
           returnState = element;
        }
      });
    }
  });
  return returnState;
}
var functionJson = [{
  "id": "source", "title":"Source", "data":
    [
      { "id": "noise", "title": "Noise", "code": "noise( scale = 10, offset = 0.1 ).out()" },
      { "id": "voronoi", "title": "Voronoi", "code": "voronoi( scale = 5, speed = 0.3, blending = 0.3 ).out()" },
      { "id": "osc", "title": "Osc", "code": "osc( frequency = 60, sync = 0.1, offset=1 ).out()" },
      { "id": "shape", "title": "Shape", "code": "shape( sides = 3, radius = 0.3, smoothing = 0.01 ).out()" },
      { "id": "gradient", "title": "Gradient", "code": "gradient( speed=0.5 ).out()" },
      { "id": "src", "title": "Src", "code": "src( output =o0).modulate(noise(3),0.005).blend(shape(4),0.01).out(o0)" },
      { "id": "solid", "title": "Solid", "code": "solid( r=0.3, g=0.3, b=0.5, a = 1 ).out()" }
    ]
},{
  "id": "geometry", "title":"Geometry", "data":
    [
      { "id": "rotate", "title": "Rotate", "code": "osc(50).rotate( angle = 10, speed=1 ).out(o0)" },
      { "id": "scale", "title": "Scale", "code": "shape().scale(amount=1.5,xMult=[0.25,0.5].fast(0.25),yMult=1, offsetX = 0.5, offsetY = 0.5).out(o0)" },
      { "id": "pixelate", "title": "Pixelate", "code": "noise().pixelate( pixelX = 20, pixelY = 20 ).out(o0)" },
      { "id": "repeat", "title": "Repeat", "code": "shape().repeat( repeatX = 3, repeatY = 3, offsetX=0, offsetY=0 ).out()" },
      { "id": "repeatX", "title": "RepeatX", "code": "shape().repeatX(reps = 3, offset=0).out()" },
      { "id": "repeatY", "title": "RepeatY", "code": "shape().repeatY( reps = 3, offset=0 ).out()" },
      { "id": "kaleid", "title": "Kaleid", "code": "osc(25,-0.1,0.5).kaleid(nSides=50).out(o0)" },
      { "id": "scroll", "title": "Scroll", "code": "shape(3).scroll( scrollX = 0.5, scrollY = 0.5, speedX=0, speedY=0 ).out(o0)" },
      { "id": "scrollX", "title": "ScrollX", "code": "shape(3).scrollX( scrollX = 0.5, speedX=0).out(o0)" },
      { "id": "scrollY", "title": "ScrollY", "code": "shape(3).scrollY( scrollY = 0.5, speedY=0 ).out(o0)" }
    ]
}]


function initFunction() {
  var html = ``;
  document.getElementById("functionManager").innerHTML = "";
  functionJson.forEach(element => {
    if (element) {

      html += `<li>
        <a class="dropdown-item" href="#">
        `+element.title+`Source &raquo;
        </a>
        <ul class="dropdown-menu dropdown-submenu">`;
      element.data.forEach(element => {
        if (element) {
          html += `
            <li>
              <a class="dropdown-item" onclick="sourcefunction('`+element.id+`')">`+element.title+`</a>
            </li>`;
        }
      });

      html += ` </ul> </li>`;
    }
  });
  document.getElementById("functionManager").innerHTML += html
  window.sourcefunction = sourcefunction;
}
export { initFunction }