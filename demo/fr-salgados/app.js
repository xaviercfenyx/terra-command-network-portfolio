// WhatsApp da loja: 55 + DDD + número (só dígitos).
const WHATSAPP_NUMBER = '5511955683703';

const MENU = [
 {cat:'Artesanais',icon:'🍔',note:'Hambúrguer artesanal 180g',items:[
  ['Bacon Onion',28,'3 cebolas empanadas, queijo cheddar, molho de alho e molho barbecue'],
  ['Salada Artesanal',23,'Queijo cheddar, molho de alho, cebola, alface americana e tomate'],
  ['Burguer Artesanal',23,'Queijo cheddar, molho de alho e cebola'],
  ['Bacon Barbecue',26,'Bacon, queijo cheddar, alface americana, tomate, molho barbecue e molho de alho'],
  ['Doritos Burguer',28,'Molho de alho, doritos e molho da casa']]},
 {cat:'Combos da Casa',icon:'⭐',items:[
  ['Casa 1',33,'1 Bacon Onion + 1 Coca Cola 350ml'],['Casa 2',33,'1 Doritos Burguer + 1 Coca Cola 350ml']]},
 {cat:'Pastéis',icon:'🥟',items:[
  ...['Carne','Queijo','Calabresa','Frango','Palmito'].map(n=>['Pastel '+n,11]),
  ...['Carne com Queijo','Carne com Catupiry','Calabresa com Catupiry','Brócolis com Queijo','Bacon com Queijo','Bacon com Catupiry','Pizza','Palmito com Queijo','Frango com Catupiry'].map(n=>['Pastel '+n,12]),
  ['Pastel Três Queijos',14],['Pastel Três Sabores',15],['Pastel Especial',17],['Pastel Carne Seca c/ Mussarela',19]]},
 {cat:'Lanches',icon:'🥪',note:'Todos acompanham batata',items:[
  ['Misto Quente',12,'Presunto e queijo'],['Bauru',14,'Presunto, queijo, tomate e molho'],
  ['X-Burguer',14,'Hambúrguer, queijo, maionese e molho'],['X-Calabresa',14,'Calabresa, queijo, tomate, alface, maionese e molho'],
  ['X-Frango',14,'Frango, alface, queijo, tomate, maionese e molho'],['Americano',15,'Presunto, ovo, queijo, tomate, alface, maionese e molho'],
  ['X-Salada',15,'Hambúrguer, queijo, tomate, alface, maionese e molho'],['X-Bacon',18,'Hambúrguer, queijo, bacon, alface, tomate, maionese e molho'],
  ['X-Egg',18,'Hambúrguer, ovo, alface e tomate'],['X-Bacon Cheddar',18,'Hambúrguer, bacon, cheddar, maionese e molho'],
  ['X-Caipira',18,'Frango, cheddar, milho, tomate, alface, queijo, maionese e molho'],['X-Contra Filé',26,'Contrafilé, alface, queijo, tomate, maionese e molho'],
  ['X-Tudo',26,'Ovo, presunto, alface, tomate, maionese, hambúrguer, queijo, frango, calabresa e bacon']]},
 {cat:'Combos',icon:'🍟',items:[
  ['Combo 1',50,'1 X-Salada, 1 X-Bacon, 30 mini salgados, batata frita e Guaraná 600ml'],
  ['Combo 2',30,'1 X-Salada, 20 mini salgados, batata frita e Pepsi lata 350ml'],
  ['Combo 3',45,'1 X-Bacon, 30 mini salgados e Guaraná 600ml'],
  ['Combo 4',50,'1 X-Salada, 1 X-Bacon, 1 X-Burguer, batata frita e Coca Cola 600ml'],
  ['Combo 5',55,'1 X-Tudo, 1 X-Contra Filé, Coca Cola 600ml e batata frita'],
  ['Combo 6',100,'3 X-Salada, 2 X-Bacon, batata frita e Coca Cola 2L'],
  ['Combo 7',55,'3 X-Burguer, 1 X-Salada, batata frita e Dolly 2L'],
  ['Combo 8',40,'1 Americano, 1 X-Burguer, batata frita e Dolly 2L'],
  ['Combo 9',45,'1 X-Salada, 1 X-Bacon, batata frita e Pepsi 600ml'],
  ['Combo 10',25,'1 X-Salada, batata frita e Coca Cola 350ml'],
  ['Combo 11',35,'1 X-Tudo, batata frita e Coca Cola 350ml'],
  ['Combo 12',30,'1 X-Bacon, batata frita e Coca Cola 350ml'],
  ['Combo 13',30,'1 X-Bacon com cheddar, batata frita e Coca Cola 350ml']]},
 {cat:'Doces',icon:'🍩',items:[['Churros',1,'Unidade']]}
];
const ITEMS={};MENU.forEach((c,ci)=>c.items.forEach((it,ii)=>{ITEMS[ci+'-'+ii]={name:it[0],price:it[1],desc:it[2]||''}}));
const brl=v=>'R$ '+v.toFixed(2).replace('.',',');
function cartLines(cart){return Object.entries(cart).filter(([,q])=>q>0).map(([id,q])=>({...ITEMS[id],id,q,sub:ITEMS[id].price*q}))}
function cartTotal(cart){return cartLines(cart).reduce((s,l)=>s+l.sub,0)}
function buildMessage(cart,f={}){const L=cartLines(cart);let m='*Pedido - Fr Salgados*\n\n';
 L.forEach(l=>m+=`${l.q}x ${l.name} (${brl(l.price)}) = ${brl(l.sub)}\n`);m+=`\n*Total: ${brl(cartTotal(cart))}*\n`;
 if(f.name)m+=`\nNome: ${f.name}`;if(f.addr)m+=`\nEndereço: ${f.addr}`;if(f.pay)m+=`\nPagamento: ${f.pay}`;if(f.obs)m+=`\nObservação: ${f.obs}`;return m.trim()}
function waUrl(cart,f){return 'https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(buildMessage(cart,f))}
if(typeof module!=='undefined')module.exports={ITEMS,cartTotal,buildMessage,waUrl};
// Fotos ilustrativas (ver assets/img/CREDITS.md)
const IMG_BY_NAME={'Bacon Onion':'burger-bacon-stack','Salada Artesanal':'burger-salada','Burguer Artesanal':'burger-classic','Bacon Barbecue':'burger-bacon-bbq','Doritos Burguer':'burger-double-cheddar',
 'Casa 1':'combo-coca','Casa 2':'combo-fries','Misto Quente':'misto-quente','Bauru':'misto-quente','X-Burguer':'x-burguer','X-Calabresa':'sandwich-tall','X-Frango':'x-frango',
 'Americano':'sandwich-club','X-Salada':'burger-salada','X-Bacon':'burger-bacon-bbq','X-Egg':'burger-classic','X-Bacon Cheddar':'burger-double-cheddar','X-Caipira':'x-frango',
 'X-Contra Filé':'burger-bacon-stack','X-Tudo':'combo-fries-2','Churros':'churros'};
const COMBO_IMGS=['combo-fries-2','combo-fries','combo-coca','fries'];
function imgFor(cat,name,ii){if(IMG_BY_NAME[name])return IMG_BY_NAME[name];if(cat==='Pastéis')return 'pastel-'+(ii%3+1);if(cat==='Combos')return COMBO_IMGS[ii%4];return 'burger-classic'}
if(typeof document!=='undefined'){const cart={};const $=s=>document.querySelector(s);
 $('#tabs').innerHTML=MENU.map((c,i)=>`<a href="#c${i}" data-i="${i}">${c.cat}</a>`).join('');
 $('#menu').innerHTML=MENU.map((c,ci)=>`<section id="c${ci}" class="sec"><div class="sec-h"><h2>${c.cat}</h2>${c.note?`<span class="note">${c.note}</span>`:''}</div><div class="grid">`+c.items.map((it,ii)=>{const id=ci+'-'+ii;return `<article class="card" id="card${id}"><div class="info"><h3>${it[0]}</h3>${c.note&&ci===0?`<p class="tag">${c.note}</p>`:''}${it[2]?`<p class="desc">${it[2]}</p>`:''}<div class="row"><span class="price">${brl(it[1])}</span></div></div><div class="pic"><img src="assets/img/${imgFor(c.cat,it[0],ii)}.webp" alt="${it[0]}" loading="lazy" width="600" height="600"><div class="ctl"><button class="add" data-d="1" data-id="${id}" aria-label="Adicionar ${it[0]}">+</button><div class="step"><button data-d="-1" data-id="${id}" aria-label="Remover">−</button><span id="q${id}">0</span><button data-d="1" data-id="${id}" aria-label="Adicionar">+</button></div></div></div></article>`}).join('')+'</div></section>').join('');
 function render(){Object.keys(ITEMS).forEach(id=>{const e=document.getElementById('q'+id);if(e){const q=cart[id]||0;e.textContent=q;document.getElementById('card'+id).classList.toggle('on',q>0)}});
  const L=cartLines(cart),n=L.reduce((s,l)=>s+l.q,0);$('#bar').classList.toggle('show',!!n);$('#barCount').textContent=n;$('#barLabel').textContent=n>1?'itens':'item';
  $('#barTotal').textContent=$('#cartTotal').textContent=$('#cartSub').textContent=brl(cartTotal(cart));
  $('#cartList').innerHTML=L.map(l=>`<li><div class="li-t"><b>${l.name}</b><small>${brl(l.price)} cada</small></div><div class="step sm"><button data-d="-1" data-id="${l.id}" aria-label="Remover">−</button><span>${l.q}</span><button data-d="1" data-id="${l.id}" aria-label="Adicionar">+</button></div><b class="li-s">${brl(l.sub)}</b></li>`).join('');
  if(!n)close()}
 const open=()=>{$('#drawer').classList.add('open');document.body.classList.add('lock')},close=()=>{$('#drawer').classList.remove('open');document.body.classList.remove('lock')};
 document.addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(!b)return;const id=b.dataset.id;cart[id]=Math.max(0,(cart[id]||0)+ +b.dataset.d);render()});
 $('#openCart').onclick=open;$('#closeCart').onclick=close;$('#drawer').onclick=e=>{if(e.target.id==='drawer')close()};
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 $('#finish').onclick=()=>{window.open(waUrl(cart,{name:$('#fName').value.trim(),addr:$('#fAddr').value.trim(),obs:$('#fObs').value.trim(),pay:$('#fPay').value}),'_blank')};
 const tabs=[...document.querySelectorAll('#tabs a')];const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){const i=en.target.id.slice(1);tabs.forEach(t=>t.classList.toggle('act',t.dataset.i===i));const a=tabs[i];a.parentNode.scrollTo({left:a.offsetLeft-16,behavior:'smooth'})}}),{rootMargin:'-120px 0px -70% 0px'});
 document.querySelectorAll('.sec').forEach(s=>io.observe(s));
 render()}
