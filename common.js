const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ls={get:(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const dish=id=>DISHES.find(d=>d.id===Number(id));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const getCart=()=>{const c=ls.get('cb_cart',[]);return Array.isArray(c)?c.filter(i=>i&&dish(i.id)&&i.qty>0):[]};
const saveCart=c=>{ls.set('cb_cart',c);document.dispatchEvent(new Event('cb:update'))};
function addCart(id,q=1){const d=dish(id);if(!d)return toast('Dish not found','bad');if(!d.avail)return toast(d.name+' is sold out','bad');
 const c=getCart(),i=c.find(x=>x.id===d.id);i?i.qty=Math.min(20,i.qty+q):c.push({id:d.id,qty:q});saveCart(c);toast(d.name+' added to cart')}
const getFavs=()=>{const f=ls.get('cb_favs',[]);return Array.isArray(f)?f.filter(dish):[]};
function toggleFav(id){let f=getFavs();const on=f.includes(id);f=on?f.filter(x=>x!==id):[...f,id];ls.set('cb_favs',f);toast(on?'Removed from favorites':'Added to favorites');document.dispatchEvent(new Event('cb:update'))}
function totals(){const sub=getCart().reduce((s,i)=>s+dish(i.id).price*i.qty,0),code=ls.get('cb_promo','');
 const disc=code===PROMO.code?Math.round(sub*PROMO.pct/100):0,del=sub===0||sub>=FREE_ABOVE?0:DELIVERY;return{sub,disc,del,total:sub-disc+del,code}}
function toast(msg,type=''){let b=$('#toasts');if(!b){b=document.createElement('div');b.id='toasts';b.setAttribute('role','status');document.body.append(b)}
 const t=document.createElement('div');t.className='toast '+type;t.textContent=msg;b.append(t);setTimeout(()=>t.remove(),2600)}
const imgTag=d=>`<img src="${d.img}" alt="${esc(d.name)}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml,'+encodeURIComponent('<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%23f3e3c8%22 width=%22400%22 height=%22300%22/><text x=%2250%25%22 y=%2260%25%22 font-size=%2290%22 text-anchor=%22middle%22>${d.e}</text></svg>')">`;
function card(d){const f=getFavs().includes(d.id);
 return `<article class="card"><button class="fav ${f?'on':''}" data-fav="${d.id}" aria-label="${f?'Remove':'Add'} ${esc(d.name)} ${f?'from':'to'} favorites" aria-pressed="${f}">${f?'♥':'♡'}</button>
 <a class="im" href="food-details.html?id=${d.id}">${imgTag(d)}</a><div class="bd"><div class="row"><h3 style="font-size:1.1rem">${esc(d.name)}</h3><span>⭐ ${d.rating}</span></div>
 <div class="row"><span class="tag ${d.veg?'':'nv'}">${d.veg?'Veg':'Non-veg'}</span><span class="tag ${d.avail?'':'no'}">${d.avail?'Available':'Sold out'}</span></div>
 <p>${esc(d.desc)}</p><div class="row"><span class="price">${inr(d.price)}</span>
 <button class="btn sm" data-add="${d.id}" ${d.avail?'':'disabled style="opacity:.5;cursor:not-allowed"'}>Add to Cart</button></div></div></article>`}
function updateBadge(){const n=getCart().reduce((s,i)=>s+i.qty,0);$$('.badge.c').forEach(b=>b.textContent=n);$$('.badge.f').forEach(b=>b.textContent=getFavs().length)}
function layout(){const p=document.body.dataset.page,L=[['index','Home'],['menu','Menu'],['about','About'],['contact','Contact'],['favorites','Favorites'],['orders','Orders'],['cart','Cart']];
 const li=L.map(([h,t])=>`<li><a href="${h}.html" class="${p===h?'on':''}">${t}${h==='cart'?'<span class="badge c">0</span>':h==='favorites'?'<span class="badge f">0</span>':''}</a></li>`).join('');
 document.body.insertAdjacentHTML('afterbegin',`<header class="nav"><div class="wrap"><a class="logo" href="index.html">Crave<span>Bite</span> 🍅</a>
 <button class="burger" aria-label="Toggle menu" aria-expanded="false">☰</button><ul class="links">${li}</ul></div></header>`);
 document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap"><div><a class="logo" href="index.html" style="color:#fff">CraveBite</a><p>Good Food. Great Mood.</p><p style="font-size:.85rem">Demo project: no real orders or payments.</p></div>
 <div><h3>Explore</h3><ul><li><a href="menu.html">Menu</a></li><li><a href="about.html">About</a></li><li><a href="orders.html">My Orders</a></li></ul></div>
 <div><h3>Contact</h3><ul><li>12 Demo Street, Sample City</li><li>+91 00000 00000 (fictional)</li><li>hello@cravebite.example</li></ul></div></div>
 <p class="copy">© 2026 CraveBite, a college web development project</p></footer><button id="top" aria-label="Back to top">↑</button>`);
 const b=$('.burger'),l=$('.links');b.onclick=()=>{const o=l.classList.toggle('open');b.setAttribute('aria-expanded',o)};
 const t=$('#top');addEventListener('scroll',()=>t.style.display=scrollY>400?'block':'none');t.onclick=()=>scrollTo({top:0,behavior:'smooth'});updateBadge()}
document.addEventListener('click',e=>{const a=e.target.closest('[data-add]'),f=e.target.closest('[data-fav]');
 if(a)addCart(+a.dataset.add);if(f)toggleFav(+f.dataset.fav)});
document.addEventListener('cb:update',updateBadge);
const check={email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),phone:v=>/^[6-9]\d{9}$/.test(v.replace(/[\s-]/g,''))};
function setErr(el,m){const e=el.parentElement.querySelector('.err');if(e)e.textContent=m;el.setAttribute('aria-invalid',String(!!m))}
function page(init){addEventListener('DOMContentLoaded',()=>{layout();init&&init()})}
