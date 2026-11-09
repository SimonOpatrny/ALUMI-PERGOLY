'use strict';
(() => {
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('primary-nav');
  const menu = document.querySelector('.menu-toggle');
  const back = document.querySelector('.back-to-top');
  function toggleMenu(open){
    if(!nav || !menu)return;
    nav.classList.toggle('is-open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Zavřít navigaci':'Otevřít navigaci');
    menu.textContent=open?'×':'☰';
  }
  menu?.addEventListener('click',()=>toggleMenu(menu.getAttribute('aria-expanded')!=='true'));
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      toggleMenu(false);
      nav?.querySelectorAll('details[open]').forEach(d=>d.open=false);
    }
  });
  document.addEventListener('click',e=>{
    if(menu && nav?.classList.contains('is-open') && !nav.contains(e.target) && !menu.contains(e.target)) toggleMenu(false);
  });
  function updateScroll(){
    const y=window.scrollY;
    header?.classList.toggle('is-scrolled',y>30);
    back?.classList.toggle('is-visible',y>520);
  }
  window.addEventListener('scroll',updateScroll,{passive:true}); updateScroll();
  back?.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));

  // Reveal is enhancement only; content must remain visible if JS/observer is unavailable.
  const reveals=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.classList.add('js-ready');
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}
    },{threshold:.04,rootMargin:'0px 0px 90px 0px'});
    reveals.forEach(el=>observer.observe(el));
  }

  // Product choice: update all visible information and imagery, no decorative controls.
  const variants={
    stahovaci:{img:'https://b01537aabe.clvaw-cdnwnd.com/8e49795d2dfe571af394726cd0c27005/200000396-de133de135/747948564_1455800143255950_2287611024291255876_n-6.jpeg?ph=b01537aabe',alt:'Pergola se stahovací střechou',title:'Svoboda podle počasí.',desc:'Variabilní zastřešení pro chvíle na slunci i ve stínu.',url:'pergola-se-stahovaci-strechou.html'},
    sklenena:{img:'https://b01537aabe.clvaw-cdnwnd.com/8e49795d2dfe571af394726cd0c27005/200000146-327c0327c2/175689907_2973559069435757_2800858233490435372_n%20%281%29.jpeg?ph=b01537aabe',alt:'Pergola se skleněnou střechou',title:'Dovolte světlu zůstat.',desc:'Nadčasová střecha, která terasu chrání a současně propouští denní světlo.',url:'pergola-se-sklenenou-strechou.html'},
    poly:{img:'https://b01537aabe.clvaw-cdnwnd.com/8e49795d2dfe571af394726cd0c27005/200000294-0f8210f823/CF98C8DF-9175-4B83-B79C-87B6E587C9F8.png?ph=b01537aabe',alt:'Pergola s polykarbonátovou střechou',title:'Pro každý běžný den.',desc:'Lehké praktické zastřešení s příjemným rozptylem denního světla.',url:'pergola-s-polykarbonatem.html'}
  };
  const variantButtons=[...document.querySelectorAll('.roof-option')];
  function setVariant(key){
    const v=variants[key];if(!v)return;
    for(const b of variantButtons)b.setAttribute('aria-pressed',String(b.dataset.variant===key));
    document.getElementById('selector-title')?.replaceChildren(document.createTextNode(v.title));
    document.getElementById('selector-desc')?.replaceChildren(document.createTextNode(v.desc));
    const link=document.getElementById('selector-link');if(link)link.href=v.url;
    const visual=document.getElementById('selector-image');
    if(visual){visual.style.opacity='.65';const next=new Image();next.onload=()=>{visual.src=v.img;visual.alt=v.alt;visual.style.opacity='1'};next.onerror=()=>{visual.style.opacity='1'};next.src=v.img}
  }
  variantButtons.forEach((b,i)=>{
    b.addEventListener('click',()=>setVariant(b.dataset.variant));
    b.addEventListener('keydown',e=>{
      if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;
      e.preventDefault();const idx=(i+(e.key==='ArrowDown'?1:-1)+variantButtons.length)%variantButtons.length;
      variantButtons[idx].focus();setVariant(variantButtons[idx].dataset.variant);
    });
  });

  // Gallery with immediate photo grid, filtering, modal, keyboard controls.
  const filters=[...document.querySelectorAll('[data-filter]')];
  const galleryCards=[...document.querySelectorAll('.gallery-card')];
  const lightbox=document.getElementById('gallery-lightbox');
  const bigImage=document.getElementById('lightbox-image');
  const caption=document.getElementById('lightbox-caption');
  let visibleCards=galleryCards,active=0;
  filters.forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    galleryCards.forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter);
    visibleCards=galleryCards.filter(card=>!card.hidden);
    const count=document.getElementById('gallery-count');if(count)count.textContent=String(visibleCards.length);
  }));
  function showImage(){
    const card=visibleCards[active];if(!card||!bigImage)return;
    const image=card.querySelector('img');if(!image)return;
    bigImage.src=image.src;bigImage.alt=image.alt;
    if(caption)caption.textContent=card.dataset.caption||image.alt;
  }
  function next(step){if(visibleCards.length){active=(active+step+visibleCards.length)%visibleCards.length;showImage()}}
  galleryCards.forEach(card=>card.addEventListener('click',()=>{
    visibleCards=galleryCards.filter(x=>!x.hidden);
    active=visibleCards.indexOf(card);showImage();lightbox?.showModal();
  }));
  document.getElementById('lightbox-prev')?.addEventListener('click',()=>next(-1));
  document.getElementById('lightbox-next')?.addEventListener('click',()=>next(1));
  document.getElementById('lightbox-close')?.addEventListener('click',()=>lightbox?.close());
  lightbox?.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
  document.addEventListener('keydown',e=>{
    if(!lightbox?.open)return;
    if(e.key==='ArrowRight')next(1);
    if(e.key==='ArrowLeft')next(-1);
  });
  // Intentionally no analytics/tracking on the presentation preview.
})();
