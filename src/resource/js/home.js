
var hydra = new Hydra({ detectAudio: true, canvas: document.getElementById("hydra-canvas") });
hydra.setResolution(1920, 1080);

s0.initImage("./src/resource/img/alpha.png")
a.setCutoff(4)
a.setSmooth(0.8)
src(s0).scroll([-0.2,0.2].smooth(),[-0.2,0.2,0.1,-0.15].smooth())
.scale(()=>1+a.fft[0])
  .modulateHue(src(o0).sub(s0,1).scale(1.01),1)
  .diff(osc(4,0.5,2).mask(shape(4,1,0.001)))
  .out(o0)


 