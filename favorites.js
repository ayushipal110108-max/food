page(()=>{
 const g=$('#favgrid'),draw=()=>{const f=getFavs();
  g.className=f.length?'grid':'';g.innerHTML=f.length?f.map(id=>card(dish(id))).join(''):`<div class="empty"><b>♡</b><h3>No favorites yet</h3><p>Tap the heart on any dish to save it here.</p><a class="btn" href="menu.html">Explore Menu</a></div>`};
 document.addEventListener('cb:update',draw);draw();
});
