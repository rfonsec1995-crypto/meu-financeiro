const $=id=>document.getElementById(id);
const STORAGE_KEY='meu-financeiro-local-v1';
const cats=[["Alimentação",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M4 12h16M8 8c1-1 2-1 4-1s3 0 4 1"/></g></svg>'],["Mercado",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h2l2 11h10l3-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></g></svg>'],["Moradia",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-7 9 7v9H3z"/><path d="M9 20v-6h6v6"/></g></svg>'],["Contas",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 5 13h6l-1 9 9-12h-6z"/></g></svg>'],["Transporte",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16 6 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l1 8"/><path d="M4 16h16v3H4zM7 19v2m10-2v2"/><circle cx="8" cy="13" r="1"/><circle cx="16" cy="13" r="1"/></g></svg>'],["Saúde",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16M4 12h16"/></g></svg>'],["Lazer",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="m8 11 3 3m0-3-3 3m8-2h.01M17 14h.01"/></g></svg>'],["Compras",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1 12H5zM9 8a3 3 0 0 1 6 0"/></g></svg>'],["Assinaturas",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 6h4m-3 12h2"/></g></svg>'],["Educação",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c4 3 8 3 12 0v-5m4-2v7"/></g></svg>'],["Pets",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="5" cy="13" r="1.5"/><circle cx="19" cy="13" r="1.5"/><path d="M8 19c0-3 2-5 4-5s4 2 4 5c-2 2-6 2-8 0z"/></g></svg>'],["Viagem",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 13 18-7-7 18-3-8z"/><path d="m11 16 5-5"/></g></svg>'],["Vestuário",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m8 4 4 2 4-2 5 4-3 4-2-1v9H8v-9l-2 1-3-4z"/></g></svg>'],["Investimentos",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5m0 14h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/></g></svg>'],["Outros",'<svg class="category-icon" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/></g></svg>']]
const quick=[10,15,20,25,30,35,40,45,50,75,100,150];
const fmt=n=>Number(n||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const num=s=>{
 let v=String(s??'').trim().replace(/R\$|\s/g,'');
 if(!v)return NaN;
 if(v.includes(','))v=v.replace(/\./g,'').replace(',','.');
 else if((v.match(/\./g)||[]).length>1)v=v.replace(/\./g,'');
 return Number(v);
};
const localDateISO=()=>{
 const d=new Date();
 return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const formatLocalDate=value=>{
 const [y,m,d]=String(value||'').split('-').map(Number);
 return y&&m&&d?new Date(y,m-1,d).toLocaleDateString('pt-BR'):'';
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initialItems=[
 {id:'seed-1',descricao:'Lanche',valor:24.64,categoria:'Alimentação',conta:'Crédito',tipo:'Despesa',data:'2026-11-06'},
 {id:'seed-2',descricao:'Energético',valor:13.50,categoria:'Alimentação',conta:'Débito',tipo:'Despesa',data:'2026-11-06'},
 {id:'seed-3',descricao:'Hambúrguer',valor:72.00,categoria:'Alimentação',conta:'Crédito',tipo:'Despesa',data:'2026-11-05'},
 {id:'seed-4',descricao:'Gasolina',valor:50.00,categoria:'Transporte',conta:'Crédito',tipo:'Despesa',data:'2026-11-05'},
 {id:'seed-5',descricao:'Cigarro e Powerade',valor:41.40,categoria:'Outros',conta:'Débito',tipo:'Despesa',data:'2026-11-04'},
 {id:'seed-6',descricao:'Pão de queijo',valor:12.22,categoria:'Alimentação',conta:'Débito',tipo:'Despesa',data:'2026-11-04'},
 {id:'seed-7',descricao:'Energético',valor:17.50,categoria:'Alimentação',conta:'Débito',tipo:'Despesa',data:'2026-11-03'},
 {id:'seed-8',descricao:'Açaí',valor:55.70,categoria:'Alimentação',conta:'Crédito',tipo:'Despesa',data:'2026-11-02'}
];
let state=loadState(),type='Despesa',account='Débito',cat='Alimentação',filter='Todos',monthFilter='Todos',dayFilter='Todos',selected='Alimentação';
function loadState(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const s=JSON.parse(raw);if(s&&s.bal&&Array.isArray(s.items))return s;}}catch(e){}return {bal:{debito:1610.38,credito:201.66},items:initialItems};}
function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('storageStatus').textContent='Salvo neste iPhone';}catch(e){$('storageStatus').textContent='Não foi possível salvar neste aparelho: '+e.message;}}
function renderCats(){$('categories').innerHTML=cats.map(([n,e])=>`<button type="button" data-cat="${n}" class="${cat===n?'on':''}">${e}<br>${n}</button>`).join('');document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;renderCats();});}
function renderQuick(){$('quick').innerHTML=quick.map(n=>`<button type="button" data-q="${n}">R$ ${n}</button>`).join('');document.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{$('amount').value=String(b.dataset.q);$('amount').blur();$('formmsg').textContent='Valor de '+fmt(Number(b.dataset.q))+' selecionado.';});}
function render(){const {items,bal}=state;const ex=items.filter(x=>x.tipo==='Despesa');const sd=ex.filter(x=>x.conta==='Débito').reduce((s,x)=>s+x.valor,0);const sc=ex.filter(x=>x.conta==='Crédito').reduce((s,x)=>s+x.valor,0);$('debit').textContent=fmt(bal.debito);$('credit').textContent=fmt(bal.credito);$('total').textContent=fmt(bal.debito+bal.credito);$('debitBalance').value=String(bal.debito).replace('.',',');$('creditBalance').value=String(bal.credito).replace('.',',');$('spentdebit').textContent='Débito: '+fmt(sd);$('spentcredit').textContent='Crédito: '+fmt(sc);
 const categoryColors=['#3B82F6','#10B981','#F59E0B','#EF4444','#8B5CF6','#06B6D4','#EC4899','#84CC16','#F97316','#6366F1','#14B8A6','#D946EF','#A3A3A3','#0EA5E9','#D97706'];const sums=cats.map(([n,e],i)=>{const list=ex.filter(x=>x.categoria===n);return {n,e,list,i,v:list.reduce((s,x)=>s+x.valor,0)}}).filter(x=>x.v>0);const max=Math.max(1,...sums.map(x=>x.v));$('chart').innerHTML=sums.map(x=>`<button type="button" class="baritem ${selected===x.n?'on':''}" data-bar="${x.n}" style="--bar-color:${categoryColors[x.i%categoryColors.length]}"><span class="barval">${fmt(x.v)}</span><span class="stage"><span class="bar" style="height:${Math.max(3,x.v/max*100)}%"></span></span><span class="barlabel">${x.e} ${x.n}</span></button>`).join('')||'<p class="muted">Ainda não há despesas.</p>';document.querySelectorAll('[data-bar]').forEach(b=>b.onclick=()=>{selected=b.dataset.bar;render();});const chosen=sums.find(x=>x.n===selected);$('details').hidden=!chosen;$('details').innerHTML=chosen?`<b>${chosen.e} ${chosen.n} — ${fmt(chosen.v)}</b>`+chosen.list.map(x=>`<div class="row"><div><b>${esc(x.descricao)}</b><div class="muted">${formatLocalDate(x.data)} · ${x.conta}</div></div><b>${fmt(x.valor)}</b></div>`).join(''):'';
 $('accountchart').innerHTML=[['Débito',sd,'#0879e9'],['Crédito',sc,'#8b4de0']].map(([n,v,c])=>`<div class="acol"><b>${fmt(v)}</b><div class="bar" style="height:${Math.max(3,v/Math.max(1,sd,sc)*115)}px;background:${c}"></div>${n}</div>`).join('');
 const monthSelect=$('monthFilter');
 const monthNames=[...new Set(state.items.map(x=>String(x.data||'').slice(0,7)).filter(x=>/^\d{4}-\d{2}$/.test(x)))].sort((a,b)=>b.localeCompare(a));
 monthSelect.innerHTML='<option value="Todos">Todos os meses</option>'+monthNames.map(m=>{const [y,mo]=m.split('-');const label=new Date(Number(y),Number(mo)-1,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});return `<option value="${m}">${label.charAt(0).toUpperCase()+label.slice(1)}</option>`;}).join('');
 monthSelect.value=monthNames.includes(monthFilter)?monthFilter:'Todos';
 const daySelect=$('dayFilter');const visibleDates=[...new Set(items.filter(x=>(filter==='Todos'||x.conta===filter)&&(monthFilter==='Todos'||String(x.data||'').slice(0,7)===monthFilter)).map(x=>String(x.data||'')).filter(x=>/^\\d{4}-\\d{2}-\\d{2}$/.test(x)))].sort((a,b)=>b.localeCompare(a));daySelect.innerHTML='<option value="Todos">Todos os dias</option>'+visibleDates.map(d=>`<option value="${d}">${formatLocalDate(d)}</option>`).join('');if(!visibleDates.includes(dayFilter))dayFilter='Todos';daySelect.value=dayFilter;const filteredHistory=items.filter(x=>(filter==='Todos'||x.conta===filter)&&(monthFilter==='Todos'||String(x.data||'').slice(0,7)===monthFilter)&&(dayFilter==='Todos'||String(x.data||'')===dayFilter));const groupedDates=[...new Set(filteredHistory.map(x=>String(x.data||'')))].sort((a,b)=>b.localeCompare(a));$('history').innerHTML=groupedDates.map(d=>`<div class="history-day"><h3>${formatLocalDate(d)}</h3>${filteredHistory.filter(x=>String(x.data||'')===d).map(x=>`<div class="row history-row"><div class="history-info"><b>${esc(x.descricao)}</b><div class="muted">${esc(x.categoria)} · ${x.conta}</div></div><div class="history-actions"><b class="${x.tipo==='Entrada'?'income':'expense'}">${x.tipo==='Entrada'?'+':'−'}${fmt(x.valor)}</b><button type="button" class="delete-btn" data-delete="${esc(x.id)}" aria-label="Excluir ${esc(x.descricao)}" title="Excluir lançamento">Excluir</button></div></div>`).join('')}</div>`).join('')||'<p class="muted">Nenhum lançamento.</p>';document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{const item=state.items.find(x=>x.id===b.dataset.delete);if(!item)return;if(!window.confirm(`Excluir o lançamento "${item.descricao}" de ${fmt(item.valor)}?`))return;const key=item.conta==='Débito'?'debito':'credito';state.bal[key]+=item.tipo==='Despesa'?item.valor:-item.valor;state.items=state.items.filter(x=>x.id!==item.id);saveState();render();});}
document.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{type=b.dataset.type;document.querySelectorAll('[data-type]').forEach(x=>x.classList.toggle('on',x===b));});
document.querySelectorAll('[data-account]').forEach(b=>b.onclick=()=>{account=b.dataset.account;document.querySelectorAll('[data-account]').forEach(x=>x.classList.toggle('on',x===b));});
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('on',x===b));render();});
$('monthFilter').onchange=()=>{monthFilter=$('monthFilter').value;render();}; $('dayFilter').onchange=()=>{dayFilter=$('dayFilter').value;render();};
$('add').type='button';
$('add').onclick=()=>{
 try{
  const v=num($('amount').value);
  if(!Number.isFinite(v)||v<=0){$('formmsg').textContent='Informe um valor válido, por exemplo 45,90.';$('amount').focus();return;}
  const desc=$('description').value.trim();
  const balanceKey=account==='Débito'?'debito':'credito';
  const delta=type==='Despesa'?-v:v;
  const nextBalance=Number(state.bal[balanceKey]||0)+delta;
  if(nextBalance<0){$('formmsg').textContent='Saldo insuficiente. Atualize o saldo antes de registrar essa despesa.';return;}
  state.bal[balanceKey]=nextBalance;
  state.items.unshift({id:'local-'+Date.now(),descricao:desc||'Sem descrição',valor:v,categoria:cat,conta:account,tipo:type,data:localDateISO()});
  saveState();
  $('amount').value='';$('description').value='';
  $('formmsg').textContent='Lançamento salvo neste iPhone.';
  render();
 }catch(err){$('formmsg').textContent='Erro ao registrar: '+err.message;}
};

$('update').onclick=()=>{const d=num($('debitBalance').value),c=num($('creditBalance').value);if(!Number.isFinite(d)||!Number.isFinite(c)||d<0||c<0){$('balmsg').textContent='Confira os saldos.';return;}state.bal={debito:d,credito:c};saveState();$('balmsg').textContent='Saldos atualizados e salvos neste iPhone.';render();};
$('export').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='meu-financeiro-backup.json';a.click();URL.revokeObjectURL(url);};
$('importFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const s=JSON.parse(await f.text());if(!s.bal||!Array.isArray(s.items))throw new Error('Arquivo de backup inválido.');state=s;saveState();render();$('backupmsg').textContent='Backup restaurado neste iPhone.';}catch(err){$('backupmsg').textContent=err.message;}e.target.value='';};
renderCats();renderQuick();render();saveState();
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));


// Atualiza a cor da barra do navegador conforme o tema do iPhone.
(()=>{
 const media=window.matchMedia('(prefers-color-scheme: dark)');
 const meta=document.querySelector('#themeColorMeta');
 const apply=()=>{if(meta)meta.setAttribute('content',media.matches?'#101214':'#f2f4f7');};
 apply();
 if(media.addEventListener)media.addEventListener('change',apply);
 else if(media.addListener)media.addListener(apply);
})();


// Splash: entrada discreta e saída em fade suave após 4 segundos.
(()=>{
 const splash=document.getElementById('splash');
 if(!splash)return;
 const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 window.setTimeout(()=>{
  splash.classList.add('hide');
  window.setTimeout(()=>splash.remove(),reduced?50:750);
 },4000);
})();


// Voz: reconhecimento direto, interpretação local e confirmação automática ao terminar a fala.
let voiceRecognition=null;
let pendingVoiceEntry=null;
function parseVoiceExpense(raw){
 const text=String(raw||'').trim();
 if(!text) return {error:'Não recebi uma frase. Toque em Falar e tente novamente.'};
 const lower=text.toLocaleLowerCase('pt-BR');
 const match=lower.match(/(?:r\$\s*)?(\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?|\d+(?:,\d{1,2})?)(?:\s*reais?)?/i);
 if(!match) return {error:'Não identifiquei o valor. Diga, por exemplo, “35 reais de almoço no débito”.'};
 const amount=num(match[1]);
 if(!Number.isFinite(amount)||amount<=0) return {error:'O valor não parece válido. Confira a fala.'};
 const isIncome=/\b(recebi|receber|ganhei|ganho|entrada|sal[aá]rio|reembolso|dep[oó]sito)\b/i.test(lower);
 const account=/\b(cr[eé]dito|cart[aã]o de cr[eé]dito)\b/i.test(lower)?'Crédito':/\b(d[eé]bito|cart[aã]o de d[eé]bito|pix|dinheiro)\b/i.test(lower)?'Débito':'Débito';
 const rules=[
 ['Alimentação',/almo[cç]o|jantar|lanche|comida|restaurante|hamb[uú]rguer|pizza|a[cç]a[ií]|padaria|p[aã]o|caf[eé]|energ[eé]tico|bebida|ifood|delivery|refei[cç][aã]o/],
 ['Mercado',/mercado|supermercado|a[cç]ougue|hortifruti/],
 ['Moradia',/aluguel|condom[ií]nio|reforma/],
 ['Contas',/luz|energia|[aá]gua|internet|telefone|celular|g[aá]s|conta/],
 ['Transporte',/gasolina|combust[ií]vel|etanol|uber|99|[ôo]nibus|metr[oô]|estacionamento|ped[aá]gio/],
 ['Saúde',/farm[aá]cia|rem[eé]dio|m[eé]dico|consulta|dentista|exame/],
 ['Lazer',/cinema|show|jogo|game|bar|passeio/],
 ['Compras',/compra|loja|eletr[oô]nico|acess[oó]rio/],
 ['Assinaturas',/netflix|spotify|youtube|prime|assinatura/],
 ['Educação',/curso|livro|escola|faculdade/],
 ['Pets',/pet|ra[cç][aã]o|veterin[aá]rio/],
 ['Viagem',/hotel|passagem|hospedagem|viagem/],
 ['Vestuário',/roupa|camisa|cal[cç]a|sapato|t[eê]nis/],
 ['Investimentos',/investimento|aplica[cç][aã]o|tesouro|cdb/]
 ];
 let category='Outros';
 for(const [name,rx] of rules){if(rx.test(lower)){category=name;break;}}
 let desc=text.replace(/\br\$\s*/ig,' ')
  .replace(/\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?|\d+(?:,\d{1,2})?/,' ')
  .replace(/\breais?\b/ig,' ')
  .replace(/\b(gastei|gastamos|comprei|paguei|despesa|despesas|recebi|receber|ganhei|ganho|entrada|lançamento|lancamento|de|no|na|do|da|com|hoje|ontem|agora|por|via|em|um|uma|o|a)\b/ig,' ')
  .replace(/\b(cartão de crédito|cartao de credito|cartão de débito|cartao de debito|crédito|credito|débito|debito|pix|dinheiro)\b/ig,' ')
  .replace(/[.,!?;:]+/g,' ').replace(/\s+/g,' ').trim();
 if(!desc) desc=isIncome?'Entrada':'Despesa';
 return {amount,account,type:isIncome?'Entrada':'Despesa',category,description:desc.charAt(0).toLocaleUpperCase('pt-BR')+desc.slice(1)};
}
function openVoiceConfirmation(parsed){
 pendingVoiceEntry={...parsed};
 $('voiceEditAmount').value=String(parsed.amount).replace('.',',');
 $('voiceEditDescription').value=parsed.description;
 $('voiceEditCategory').innerHTML=cats.map(([name])=>`<option value="${name}">${name}</option>`).join('');
 $('voiceEditCategory').value=cats.some(([name])=>name===parsed.category)?parsed.category:'Outros';
 $('voiceEditAccount').value=parsed.account;
 $('voiceEditType').value=parsed.type;
 // Fecha o teclado do iPhone antes de exibir o modal, evitando que ele apareça por trás.
 if(document.activeElement && typeof document.activeElement.blur==='function') document.activeElement.blur();
 const modal=$('voiceConfirm');
 modal.classList.remove('voice-modal-open');
 modal.hidden=false;
 void modal.offsetWidth;
 requestAnimationFrame(()=>modal.classList.add('voice-modal-open'));
 $('voiceMsg').textContent='Fala reconhecida. Você pode corrigir qualquer campo antes de confirmar.';
}

function closeVoiceConfirmation(){
 $('voiceConfirm').hidden=true;
 pendingVoiceEntry=null;
}
$('voiceCancel').onclick=()=>{
 closeVoiceConfirmation();
 $('voiceMsg').textContent='Lançamento não registrado. Você pode editar a frase e falar novamente.';
};
$('voiceConfirmSave').onclick=()=>{
 if(!pendingVoiceEntry)return;
 const amount=num($('voiceEditAmount').value);
 const item={
  amount,
  description:$('voiceEditDescription').value.trim(),
  category:$('voiceEditCategory').value,
  account:$('voiceEditAccount').value,
  type:$('voiceEditType').value
 };
 if(!Number.isFinite(item.amount)||item.amount<=0){
  $('voiceMsg').textContent='Informe um valor válido antes de confirmar.';
  $('voiceEditAmount').focus();
  return;
 }
 if(!item.description){
  $('voiceMsg').textContent='Informe uma descrição antes de confirmar.';
  $('voiceEditDescription').focus();
  return;
 }
 const balanceKey=item.account==='Crédito'?'credito':'debito';
 const delta=item.type==='Despesa'?-item.amount:item.amount;
 const nextBalance=Number(state.bal[balanceKey]||0)+delta;
 if(nextBalance<0){
  $('voiceMsg').textContent='Saldo insuficiente para esse lançamento. Confira o saldo ou atualize-o antes.';
  return;
 }
 state.bal[balanceKey]=nextBalance;
 state.items.unshift({
  id:'voice-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),
  descricao:item.description,
  valor:item.amount,
  categoria:item.category||'Outros',
  conta:balanceKey==='credito'?'Crédito':'Débito',
  tipo:item.type==='Entrada'?'Entrada':'Despesa',
  data:localDateISO()
 });
 saveState();
 closeVoiceConfirmation();
 $('voiceText').value='';
 $('voiceMsg').textContent='Lançamento confirmado e salvo! Saldos, histórico e gráficos atualizados.';
 $('formmsg').textContent='';
 render();
};


// Ditado exclusivamente pelo microfone nativo do teclado do iPhone.
// O fim da fala é inferido pela pausa nas atualizações do campo de texto.
let voiceAutoPopupTimer=null;
let voiceLastHandledText='';
let voiceKeyboardMode=false;
function scheduleVoicePopup(){
 if(!voiceKeyboardMode)return;
 if(voiceAutoPopupTimer)clearTimeout(voiceAutoPopupTimer);
 voiceAutoPopupTimer=setTimeout(()=>{
  const spoken=$('voiceText').value.trim();
  if(!spoken||spoken===voiceLastHandledText)return;
  voiceLastHandledText=spoken;
  const parsed=parseVoiceExpense(spoken);
  if(parsed.error){$('voiceMsg').textContent=parsed.error;return;}
  voiceKeyboardMode=false;
  openVoiceConfirmation(parsed);
 },1800);
}
$('voiceKeyboard').onclick=()=>{
 if(voiceAutoPopupTimer)clearTimeout(voiceAutoPopupTimer);
 voiceLastHandledText='';
 voiceKeyboardMode=true;
 $('voiceText').value='';
 $('voiceText').focus();
 $('voiceMsg').textContent='O teclado do iPhone abriu. Toque no microfone do teclado e fale. A confirmação aparecerá automaticamente após você terminar.';
};
// Each dictated text update resets the pause timer. Keyboard edits are also supported.
$('voiceText').addEventListener('input',()=>{
 if(voiceKeyboardMode && $('voiceText').value.trim())scheduleVoicePopup();
});
