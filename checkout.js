page(()=>{
 const box=$('#cobox'),c=getCart();
 if(!c.length){box.innerHTML=`<div class="empty"><b>🛒</b><h3>Nothing to check out</h3><p>Your cart is empty. Add dishes first.</p><a class="btn" href="menu.html">Go to Menu</a></div>`;return}
 const t=totals();
 box.innerHTML=`<div class="note">Demo checkout: no payment is taken and no card details are collected. Nothing will be delivered.</div><div class="split"><form id="cof" class="box" novalidate>
 <div class="f"><label for="nm">Full name</label><input id="nm" autocomplete="name"><span class="err"></span></div><div class="f"><label for="em">Email</label><input id="em" type="email" autocomplete="email"><span class="err"></span></div>
 <div class="f"><label for="ph">Phone (10 digits)</label><input id="ph" inputmode="numeric" autocomplete="tel"><span class="err"></span></div><div class="f"><label for="ad">Delivery address</label><textarea id="ad" rows="3"></textarea><span class="err"></span></div>
 <div class="f"><label for="ins">Delivery instructions (optional)</label><input id="ins" maxlength="150"></div><button class="btn" type="submit">Place Demo Order</button></form>
 <aside class="sum"><h3>Order summary</h3>${c.map(i=>`<div class="row"><span>${esc(dish(i.id).name)} × ${i.qty}</span><span>${inr(dish(i.id).price*i.qty)}</span></div>`).join('')}
 <div class="row"><span>Subtotal</span><span>${inr(t.sub)}</span></div>${t.disc?`<div class="row"><span>Discount</span><span>−${inr(t.disc)}</span></div>`:''}<div class="row"><span>Delivery</span><span>${t.del?inr(t.del):'Free'}</span></div><div class="row tot"><span>Total</span><span>${inr(t.total)}</span></div></aside></div>`;
 const rules=[['nm',v=>v.length>=2&&/^[A-Za-z .'-]+$/.test(v),'Enter your name (letters only)'],['em',check.email,'Enter a valid email'],['ph',check.phone,'Enter a valid 10-digit Indian mobile number'],['ad',v=>v.length>=10,'Address must be at least 10 characters']];
 $('#cof').onsubmit=e=>{e.preventDefault();let ok=true,first;
  rules.forEach(([id,fn,m])=>{const el=$('#'+id),good=fn(el.value.trim());setErr(el,good?'':m);if(!good){ok=false;first=first||el}});
  if(!ok){first.focus();return toast('Please fix the highlighted fields','bad')}
  const tt=totals(),order={id:'CB-'+Date.now().toString(36).toUpperCase()+Math.random().toString(36).slice(2,5).toUpperCase(),date:new Date().toISOString(),
   items:getCart().map(i=>({id:i.id,name:dish(i.id).name,price:dish(i.id).price,qty:i.qty})),...tt,
   customer:{name:$('#nm').value.trim(),email:$('#em').value.trim(),phone:$('#ph').value.trim(),address:$('#ad').value.trim(),note:$('#ins').value.trim()}};
  const o=ls.get('cb_orders',[]);o.unshift(order);ls.set('cb_orders',o);ls.set('cb_cart',[]);ls.set('cb_promo','');
  box.innerHTML=`<div class="ok"><div class="tick">✅</div><h2>Demo order created</h2><p class="sub">Redirecting to your confirmation…</p></div>`;
  setTimeout(()=>location.href='order-success.html?id='+order.id,900)};
});
