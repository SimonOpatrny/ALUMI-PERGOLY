'use strict';
const form=document.getElementById('quote-form');
if(form){
  const steps=Array.from(form.querySelectorAll('.form-step'));
  const progress=Array.from(document.querySelectorAll('.quote-steps span'));
  const next=document.getElementById('quote-next');const prev=document.getElementById('quote-back');const info=document.getElementById('quote-status');
  const summary=document.getElementById('quote-summary');let current=0;
  const productNames={stahovaci:'Pergola se stahovací střechou',sklenena:'Pergola se skleněnou střechou',poly:'Pergola s polykarbonátem',zahrada:'Zimní zahrada / zasklení',plot:'Hliníkový plot',doplnky:'Příslušenství'};
  const query=new URLSearchParams(window.location.search).get('produkt');
  if(query && productNames[query]){const preselected=form.querySelector(`input[name="product"][value="${query}"]`);if(preselected)preselected.checked=true}
  const val=name=>{const f=form.elements.namedItem(name);return f&&'value'in f?f.value.trim():''};
  function show(step,initial=false){current=step;steps.forEach((s,i)=>s.hidden=i!==current);progress.forEach((s,i)=>s.classList.toggle('active',i===current));prev.hidden=current===0;next.textContent=current===2?'Připravit e-mail s poptávkou ↗':'Pokračovat →';info.textContent='';info.classList.remove('success');if(current===2)updateSummary();if(!initial)document.querySelector('.quote-steps')?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
  function validate(){const active=steps[current];if(current===0&&!form.querySelector('input[name="product"]:checked')){info.textContent='Vyberte prosím požadovaný produkt.';return false}
    for(const control of active.querySelectorAll('input[required],select[required],textarea[required]')){if(!control.checkValidity()){control.reportValidity();control.focus();return false}}return true}
  function selectedExtras(){return Array.from(form.querySelectorAll('input[name="extras"]:checked')).map(x=>x.value).join(', ')||'Bez upřesnění'}
  function details(){return [['Produkt',productNames[form.querySelector('input[name="product"]:checked')?.value]||'—'],['Šířka',val('width')+' m'],['Hloubka',val('depth')+' m'],['Zastřešení',val('roof')||'Nechám si doporučit'],['Doplňky',selectedExtras()],['Místo realizace',val('location')],['Jméno',val('name')],['E-mail',val('email')],['Telefon',val('phone')],['Poznámka',val('message')||'Bez poznámky']];}
  function updateSummary(){if(!summary)return;summary.replaceChildren();const title=document.createElement('h4');title.textContent='Souhrn vaší poptávky';summary.appendChild(title);details().forEach(([key,value])=>{const row=document.createElement('div');const label=document.createElement('span');const text=document.createElement('span');label.textContent=key;text.textContent=value;row.append(label,text);summary.appendChild(row)});summary.hidden=false}
  next.addEventListener('click',()=>{if(!validate())return;if(current<2){show(current+1);return}const body='Dobrý den,\n\nrád/a bych požádal/a o nezávaznou cenovou nabídku.\n\n'+details().map(([k,v])=>k+': '+v).join('\n')+'\n\nDěkuji.';const subject='Nezávazná poptávka — ALUMI PERGOLY';const mailto='mailto:info@alumipergoly.cz?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    const anchor=document.getElementById('mailto-fallback');if(anchor){anchor.href=mailto;anchor.hidden=false}
    info.classList.add('success');info.textContent='Poptávka nebyla odeslána z webu. Otevře se váš e-mailový program s připravenou zprávou. Odeslání dokončete v něm.';
    // No backend exists. Do not claim successful dispatch or collect the data on the demo server.
    window.location.href=mailto;
  });
  prev.addEventListener('click',()=>show(Math.max(0,current-1)));
  show(0,true);
}
