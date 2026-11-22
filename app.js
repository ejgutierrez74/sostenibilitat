const panelPages={"inici": "index.html", "ra1-materials": "ra1.html", "programacio": "index.html", "planificacio-docent": "index.html", "fonts": "index.html", "ra1": "ra1.html", "ra1-apunts": "ra1.html", "ra1-practiques": "ra1.html", "ra1-prova": "ra1.html", "ra1-criteris": "ra1.html", "ra2": "ra2.html", "ra2-apunts": "ra2.html", "ra2-practiques": "ra2.html", "ra2-prova": "ra2.html", "ra2-criteris": "ra2.html", "ra3": "ra3.html", "ra3-apunts": "ra3.html", "ra3-practiques": "ra3.html", "ra3-prova": "ra3.html", "ra3-criteris": "ra3.html", "ra4": "ra4.html", "ra4-apunts": "ra4.html", "ra4-practiques": "ra4.html", "ra4-prova": "ra4.html", "ra4-criteris": "ra4.html", "ra5": "ra5.html", "ra5-apunts": "ra5.html", "ra5-practiques": "ra5.html", "ra5-prova": "ra5.html", "ra5-criteris": "ra5.html", "ra6": "ra6.html", "ra6-projecte": "ra6.html", "ra6-criteris": "ra6.html"};

function route(){const bits=location.hash.slice(1).split('/'),key=bits[0]||document.body.dataset.defaultPanel,anchor=bits[1];
const destination=panelPages[key];if(destination&&!document.getElementById(key)){location.replace(destination+'#'+key+(anchor?'/'+anchor:''));return;}
const panel=document.getElementById(key)||document.getElementById(document.body.dataset.defaultPanel)||document.querySelector('.panel');if(!panel)return;
document.querySelectorAll('.panel').forEach(x=>x.classList.toggle('active',x===panel));
const cur=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('nav a').forEach(a=>{const [page,hash]=a.getAttribute('href').split('#');const active=page===cur&&('#'+hash)===('#'+key+(anchor?'/'+anchor:''));a.classList.toggle('active',active);active?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');if(active){let p=a.parentElement;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}}});
if(panel.id.endsWith('-apunts')||panel.id.endsWith('-practiques'))panel.querySelectorAll(':scope > article').forEach(a=>a.hidden=!!anchor&&a.id!==anchor);
selectProgrammeRA(key,anchor);
if(anchor&&document.getElementById(anchor)&&!panel.id.startsWith('programacio')){requestAnimationFrame(()=>document.getElementById(anchor).scrollIntoView())}else window.scrollTo(0,0);
document.title=panel.dataset.title+' · M1708';}
function selectProgrammeRA(key,anchor){if(key!=='programacio')return;const sel=/^programacio-ra[1-6]$/.test(anchor||'')?anchor:'programacio-ra1';
document.querySelectorAll('#programacio-ra-curriculum > article').forEach(a=>a.hidden=a.id!==sel);
document.querySelectorAll('#programacio-ra-curriculum [role="tab"]').forEach(a=>{const on=a.getAttribute('aria-controls')===sel;a.setAttribute('aria-selected',String(on));a.tabIndex=on?0:-1;});
if(anchor)requestAnimationFrame(()=>document.getElementById('programacio-ra-curriculum').scrollIntoView());}
document.querySelector('#programacio-ra-curriculum [role="tablist"]')?.addEventListener('keydown',e=>{const tabs=[...e.currentTarget.querySelectorAll('[role="tab"]')];const i=tabs.indexOf(document.activeElement);if(i<0)return;let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else return;e.preventDefault();tabs[n].focus();location.hash=tabs[n].hash;});
window.addEventListener('hashchange',route);route();
document.getElementById('print')?.addEventListener('click',()=>window.print());
