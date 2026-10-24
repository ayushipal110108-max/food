page(()=>{
 const d=dish(new URLSearchParams(location.search).get('id')),b=$('#detail');
 if(!d){b.innerHTML=`<div class="empty"><b>🍽️</b><h3>No dish selected</h3><p>That dish doesn't exist. Pick one from the menu.</p><a class="btn" href="menu.html">Browse Menu</a></div>`;return}
 document.title=d.name+' | CraveBite';let q=1;
 const draw=()=>{const f=getFavs().includes(d.id);b.innerHTML=`<div class="detail">${imgTag(d)}<div><h1 style="font-size:2.2rem">${esc(d.name)}</h1><p>⭐ ${d.rating} · <span class="tag ${d.veg?'':'nv'}">${d.veg?'Vegetarian':'Non-vegetarian'}</span> <span class="tag ${d.avail?'':'no'}">${d.avail?'Available':'Sold out'}</span></p>
  <p class="sub" style="margin-top:.6rem">${esc(d.desc)}</p><h3 style="font-size:1.1rem">Ingredients</h3><ul>${d.ing.map(i=>`<li>${esc(i)}</li>`).join('')}</ul><p class="price" style="font-size:1.6rem">${inr(d.price)}</p>
  <div class="row" style="justify-content:flex-start;margin:1rem 0"><div class="qty"><button id="mi" aria-label="Decrease">−</button><span aria-live="polite">${q}</span><button id="pl" aria-label="Increase">+</button></div>
  <button class="btn" id="add" ${d.avail?'':'disabled'}>Add to Cart · ${inr(d.price*q)}</button><button class="btn out" data-fav="${d.id}">${f?'♥ Saved':'♡ Favorite'}</button></div></div></div>`;
  $('#mi').onclick=()=>{q=Math.max(1,q-1);draw()};$('#pl').onclick=()=>{q=Math.min(20,q+1);draw()};$('#add').onclick=()=>addCart(d.id,q)};
 draw();document.addEventListener('cb:update',()=>{if(!document.activeElement.closest?.('.qty'))draw()});
 const r=DISHES.filter(x=>x.cat===d.cat&&x.id!==d.id);const rel=r.length?r:DISHES.filter(x=>x.id!==d.id).slice(0,3);
 $('#related').innerHTML=rel.map(card).join('');$('#relwrap').hidden=false;
});
