page(()=>{
 const R=[['n',v=>v.length>=2,'Please enter your name'],['e',check.email,'Enter a valid email'],['s',v=>v.length>=3,'Add a short subject'],['m',v=>v.length>=10,'Message needs at least 10 characters']];
 $('#cf').onsubmit=e=>{e.preventDefault();let ok=true,first;R.forEach(([id,fn,m])=>{const el=$('#'+id),g=fn(el.value.trim());setErr(el,g?'':m);if(!g){ok=false;first=first||el}});
  if(!ok){first.focus();return toast('Please fix the form errors','bad')}
  e.target.reset();toast('Form checked! (Demo only: no message was actually sent)')};
 $$('.faq button').forEach(b=>b.onclick=()=>{const a=b.nextElementSibling,o=a.classList.toggle('open');b.setAttribute('aria-expanded',o);b.lastChild.textContent=o?'−':'+'});
});
