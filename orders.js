page(()=>{
 const all=ls.get('cb_orders',[]),orders=Array.isArray(all)?all.filter(o=>o&&o.id&&Array.isArray(o.items)):[];
 const status=o=>{const m=(Date.now()-new Date(o.date))/60000;return m<2?'Order Received':m<5?'Preparing':'Ready (demo)'};
 const when=o=>new Date(o.date).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'});
 const lines=o=>o.items.map(i=>`<div class="row"><span>${esc(i.name)} × ${i.qty}</span><span>${inr(i.price*i.qty)}</span></div>`).join('');
 const ok=$('#okbox');
 if(ok){const o=orders.find(x=>x.id===new URLSearchParams(location.search).get('id'));
  ok.innerHTML=!o?`<div class="empty"><b>🧾</b><h3>No order to show</h3><p>We couldn't find that demo order on this device.</p><a class="btn" href="menu.html">Browse Menu</a></div>`:
  `<div class="ok"><div class="tick">🍽️</div><h2>Thanks, ${esc(o.customer.name.split(' ')[0])}! Demo order placed</h2><p class="sub">Order ID <b>${esc(o.id)}</b></p><div class="box" style="text-align:left">${lines(o)}
  <div class="row"><span>Delivery</span><span>${o.del?inr(o.del):'Free'}</span></div>${o.disc?`<div class="row"><span>Discount</span><span>−${inr(o.disc)}</span></div>`:''}<div class="row" style="font-weight:700"><span>Total</span><span>${inr(o.total)}</span></div></div>
  <p class="note" style="margin-top:1rem">Illustrative preparation time: about 25–30 minutes. This is a demo; no real order or payment exists.</p><a class="btn" href="menu.html">Continue Shopping</a> <a class="btn out" href="orders.html">View Order History</a></div>`;return}
 const l=$('#olist');
 if(!orders.length){l.innerHTML=`<div class="empty"><b>📦</b><h3>No orders yet</h3><p>Place a demo order and it will appear here.</p><a class="btn" href="menu.html">Explore Menu</a></div>`;return}
 l.innerHTML=orders.map(o=>`<details class="box" style="margin-bottom:.8rem"><summary class="row" style="cursor:pointer"><span><b>${esc(o.id)}</b><br><small>${when(o)} · ${o.items.reduce((s,i)=>s+i.qty,0)} items</small></span><span><span class="status">${status(o)}</span> <b>${inr(o.total)}</b> <u style="font-size:.8rem">View Details</u></span></summary>
  <div style="margin-top:.8rem">${lines(o)}<p style="font-size:.85rem;color:var(--mute);margin-top:.5rem">Deliver to: ${esc(o.customer.address)}${o.customer.note?'<br>Note: '+esc(o.customer.note):''}</p></div></details>`).join('');
});
