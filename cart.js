page(()=>{
 const box=$('#cartbox');
 const draw=()=>{const c=getCart();
  if(!c.length){box.innerHTML=`<div class="empty"><b>🛒</b><h3>Your cart is empty</h3><p>Add something delicious to get started.</p><a class="btn" href="menu.html">Back to Menu</a></div>`;return}
  const t=totals(),keep=document.activeElement&&document.activeElement.id==='pc';
  box.innerHTML=`<div class="split"><div>${c.map(i=>{const d=dish(i.id);return `<div class="item">${imgTag(d)}<div><b>${esc(d.name)}</b><div class="price">${inr(d.price)}</div><button class="rm" data-rm="${d.id}">Remove</button></div>
   <div class="qty"><button data-dec="${d.id}" aria-label="Decrease ${esc(d.name)}">−</button><span>${i.qty}</span><button data-inc="${d.id}" aria-label="Increase ${esc(d.name)}">+</button></div></div>`}).join('')}</div>
  <aside class="sum"><h3>Order summary</h3><div class="row"><span>Subtotal</span><span>${inr(t.sub)}</span></div>${t.disc?`<div class="row" style="color:var(--ok)"><span>Discount (${t.code})</span><span>−${inr(t.disc)}</span></div>`:''}
  <div class="row"><span>Delivery</span><span>${t.del?inr(t.del):'Free'}</span></div><div class="row tot"><span>Total</span><span>${inr(t.total)}</span></div>
  <div class="f" style="margin-top:1rem"><label for="pc">Promo code</label><div class="row"><input id="pc" placeholder="Try CRAVE10" value="${esc(t.code)}"><button class="btn sm" id="ap">Apply</button></div><span class="err" id="pe"></span></div>
  <p style="font-size:.78rem;color:var(--mute)">Demo coupon: <b>CRAVE10</b> = 10% off. Delivery ₹${DELIVERY}, free above ₹${FREE_ABOVE}.</p><a class="btn" style="width:100%;text-align:center;margin-top:.8rem" href="checkout.html">Proceed to Checkout</a></aside></div>`;
  $('#ap').onclick=()=>{const v=$('#pc').value.trim().toUpperCase();if(!v){ls.set('cb_promo','');draw();return}
   if(v===PROMO.code){ls.set('cb_promo',v);toast('Coupon applied');draw()}else{$('#pe').textContent='Invalid code. Try CRAVE10.';toast('Invalid promo code','bad')}}};
 box.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const c=getCart(),ch=(id,f)=>{const i=c.find(x=>x.id===+id);if(i){f(i);saveCart(c.filter(x=>x.qty>0))}};
  if(t.dataset.inc)ch(t.dataset.inc,i=>i.qty=Math.min(20,i.qty+1));if(t.dataset.dec)ch(t.dataset.dec,i=>i.qty--);
  if(t.dataset.rm){saveCart(c.filter(x=>x.id!==+t.dataset.rm));toast('Item removed')}});
 document.addEventListener('cb:update',draw);draw();
});
