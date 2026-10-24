page(()=>{
 const p=new URLSearchParams(location.search),st={q:'',cat:DISHES.some(d=>d.cat===p.get('cat'))?p.get('cat'):'All',sort:''};
 const cats=['All',...new Set(DISHES.map(d=>d.cat))],g=$('#grid');
 const draw=()=>{
  $('#chips').innerHTML=cats.map(c=>`<button class="chip ${c===st.cat?'on':''}" data-c="${c}" aria-pressed="${c===st.cat}">${c}</button>`).join('');
  let l=DISHES.filter(d=>(st.cat==='All'||d.cat===st.cat)&&d.name.toLowerCase().includes(st.q.toLowerCase()));
  if(st.sort==='pa')l.sort((a,b)=>a.price-b.price);if(st.sort==='pd')l.sort((a,b)=>b.price-a.price);if(st.sort==='r')l.sort((a,b)=>b.rating-a.rating);
  $('#count').textContent=l.length+' dish'+(l.length===1?'':'es')+' found';
  g.innerHTML=l.length?l.map(d=>card(d).replace('</div></div></article>',`</div><button class="rm" data-info="${d.id}" style="text-align:left">Quick view</button></div></article>`)).join(''):
   `<div class="empty" style="grid-column:1/-1"><b>🔍</b><h3>No dishes match</h3><p>Try a different search or clear your filters.</p><button class="btn" data-reset>Reset filters</button></div>`};
 $('#q').oninput=e=>{st.q=e.target.value.trim();draw()};$('#sort').onchange=e=>{st.sort=e.target.value;draw()};
 const reset=()=>{st.q='';st.cat='All';st.sort='';$('#q').value='';$('#sort').value='';draw()};$('#reset').onclick=reset;
 document.addEventListener('click',e=>{const c=e.target.closest('[data-c]'),i=e.target.closest('[data-info]');
  if(e.target.closest('[data-reset]'))reset();if(c){st.cat=c.dataset.c;draw()}
  if(i){const d=dish(i.dataset.info),m=$('#dlg');m.innerHTML=`${imgTag(d)}<div class="bd"><h3>${esc(d.name)}</h3><p>${esc(d.desc)}</p><p><b>Ingredients:</b> ${d.ing.map(esc).join(', ')}</p><div class="row"><span class="price">${inr(d.price)}</span><span>⭐ ${d.rating}</span></div>
   <div class="row"><button class="btn sm" data-add="${d.id}" ${d.avail?'':'disabled'}>Add to Cart</button><a class="btn out sm" href="food-details.html?id=${d.id}">Full details</a><button class="btn out sm" id="cl">Close</button></div></div>`;m.showModal();$('#cl').onclick=()=>m.close()}});
 $('#dlg').addEventListener('click',e=>{if(e.target.id==='dlg')e.target.close()});
 document.addEventListener('cb:update',draw);draw();
});
