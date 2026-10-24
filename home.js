page(()=>{
 $('#cats').innerHTML=CATS.map(([c,e])=>`<a class="cat" href="menu.html?cat=${c}"><b>${e}</b>${c}</a>`).join('');
 const render=()=>$('#featured').innerHTML=[...DISHES].filter(d=>d.avail).sort((a,b)=>b.rating-a.rating).slice(0,4).map(card).join('');
 render();document.addEventListener('cb:update',render);
 const picks=[DISHES[0],DISHES[4],DISHES[9],DISHES[2]],s=$('#slider');let i=0,t;
 s.innerHTML=`<div class="track">${picks.map(d=>`<div class="slide">${imgTag(d)}<div><h3>${esc(d.name)}</h3><p>${inr(d.price)} · ⭐ ${d.rating}</p></div></div>`).join('')}</div>
 <button class="sbtn p" aria-label="Previous slide">‹</button><button class="sbtn n" aria-label="Next slide">›</button><div class="dots">${picks.map((_,k)=>`<button aria-label="Go to slide ${k+1}"></button>`).join('')}</div>`;
 const tr=$('.track',s),dots=$$('.dots button',s);
 const go=n=>{i=(n+picks.length)%picks.length;tr.style.transform=`translateX(-${i*100}%)`;dots.forEach((d,k)=>d.classList.toggle('on',k===i))};
 const auto=()=>{clearInterval(t);t=setInterval(()=>go(i+1),4000)};
 $('.p',s).onclick=()=>{go(i-1);auto()};$('.n',s).onclick=()=>{go(i+1);auto()};dots.forEach((d,k)=>d.onclick=()=>{go(k);auto()});
 s.onmouseenter=()=>clearInterval(t);s.onmouseleave=auto;go(0);auto();
 $('#news').onsubmit=e=>{e.preventDefault();const f=$('#ne');if(!check.email(f.value.trim())){setErr(f,'Enter a valid email like you@example.com');return}
  setErr(f,'');f.value='';toast('Thanks! (Demo only: nothing was saved or sent)')};
});
