const hero=document.getElementById('hero'), replay=document.getElementById('replay'), skip=document.getElementById('skip');
// Two complementary irregular edges make an actual torn-paper opening.
const edge=Array.from({length:51},(_,i)=>`${50+Math.sin(i*2.7)*.6+Math.sin(i*5.1)*.35}% ${i*2}%`);
document.querySelector('.left').style.clipPath=`polygon(0 0,${edge.join(',')},0 100%)`;
document.querySelector('.right').style.clipPath=`polygon(${edge.join(',')},100% 100%,100% 0)`;
let timer;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function stop(){clearTimeout(timer);hero.classList.remove('opening');skip.hidden=true;replay.disabled=false}
function play(){stop();if(reduced.matches)return;void hero.offsetWidth;hero.classList.add('opening');skip.hidden=false;replay.disabled=true;timer=setTimeout(stop,2600)}
replay.addEventListener('click',play);skip.addEventListener('click',stop);reduced.addEventListener('change',()=>{if(reduced.matches)stop()});
const photo=document.querySelector('.food');if(photo.complete&&photo.naturalWidth)play();else photo.addEventListener('load',play,{once:true});
