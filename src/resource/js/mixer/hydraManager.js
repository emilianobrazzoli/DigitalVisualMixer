
var hydraMain;
var sepped = 1;
var bpm = 30;
function refreshHydra(jsx) {

    if (document.getElementById('chalfunction')) {
        document.getElementById('chalfunction').remove();
    }
    var s = document.createElement('script');
    s.setAttribute("id", "chalfunction");
    s.textContent = jsx;//inne
    document.body.appendChild(s);
}
function resetAudioAndSpeed() {
    a.setScale(10)
    a.setBins(6)
    a.setSmooth(0.8)
    a.setCutoff(3)
    sepped = 1;
    bpm = 30;
    console.log(a);
    console.log("speed " + speed);
    console.log("bpm " + bpm);
}
function inithydra() {
    hydraMain = new Hydra({ detectAudio: true, canvas: document.getElementById("hydra-canvas"), numSources: 8, numOutputs: 8 }).synth;
    hydraMain.setResolution(1920, 1080);
    resetAudioAndSpeed();
    a.show();
    window.hydraMain = hydraMain;
    window.resetAudioAndSpeed = resetAudioAndSpeed;
}
export { inithydra, refreshHydra, resetAudioAndSpeed }