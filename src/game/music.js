let context=null;
let timer=null;
let step=0;
const notes=[261.63,329.63,392,523.25,392,329.63];

function playNote(){
  if(!context)return;
  const oscillator=context.createOscillator();
  const gain=context.createGain();
  oscillator.type='sine';
  oscillator.frequency.value=notes[step%notes.length];
  step+=1;
  gain.gain.setValueAtTime(0.0001,context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.025,context.currentTime+0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001,context.currentTime+0.7);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime+0.72);
}

function startMusic(){
  if(timer)return;
  try{
    context||=new AudioContext();
    context.resume?.();
    playNote();
    timer=setInterval(playNote,900);
  }catch{}
}

function stopMusic(){
  clearInterval(timer);
  timer=null;
}

document.addEventListener('change',event=>{
  const input=event.target.closest?.('[data-setting="music"]');
  if(!input)return;
  input.checked?startMusic():stopMusic();
});

document.addEventListener('visibilitychange',()=>{
  if(document.hidden)stopMusic();
});
