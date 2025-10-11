const LAYER_KEYS = {
  public: 'tc_public_v1',
  permissioned: 'tc_permissioned_v1',
  sidechain: 'tc_sidechain_v1'
};

function loadLayer(layer){
  try {
    return JSON.parse(localStorage.getItem(LAYER_KEYS[layer])||'{"blocks":[],"pending":[]}');
  } catch(e) {
    console.error("Load layer error:", e);
    return {blocks:[], pending:[]};
  }
}
function saveLayer(layer,data){
  try {
    localStorage.setItem(LAYER_KEYS[layer], JSON.stringify(data));
  } catch(e) {
    console.error("Save layer error:", e);
  }
}

function bootstrap(){
  ['public','permissioned','sidechain'].forEach(layer=>{
    const d = loadLayer(layer);
    if(!d.blocks || !Array.isArray(d.blocks)){ d.blocks = []; d.pending = []; }
    saveLayer(layer,d);
  });
}
bootstrap();

let currentUser = null;
let activeLayer = 'public';

function getEl(id) {
  const el = document.getElementById(id);
  if(!el) console.warn('Missing DOM element:', id);
  return el;
}
const layerSelect = getEl('layerSelect');
const roleSelect = getEl('roleSelect');
const userCard = getEl('userCard');
const userIdEl = getEl('userId');
const userNameEl = getEl('userName');
const userRegEl = getEl('userReg');
const trustScoreEl = getEl('trustScore');
const pendingCountEl = getEl('pendingCount');
const ledgerEl = getEl('ledger');
const contractView = getEl('contractView');
const activeLayerEl = getEl('activeLayer');
const feedEl = getEl('feed');
const statLoans = getEl('statLoans');
const statBorrowers = getEl('statBorrowers');
const lastBlockEl = getEl('lastBlock');

function genId(prefix='u'){ return prefix + Math.random().toString(36).slice(2,10); }

function computeTrustScore(userId){
  const all = getAllReports();
  const userLoans = all.filter(r=> r.userId===userId);
  if(userLoans.length===0) return 40 + Math.floor(Math.random()*10);
  const repaid = userLoans.filter(r=> r.state==='CLOSED').length;
  const score = Math.round(40 + (repaid/userLoans.length)*50 + Math.random()*10);
  return Math.min(99, score);
}

function getLayerData(layer = activeLayer){ return loadLayer(layer); }
function addPendingTx(layer, tx){
  const d = loadLayer(layer);
  d.pending.push(tx);
  saveLayer(layer,d);
}

function getAllReports(){
  const all = [];
  ['public','permissioned','sidechain'].forEach(layer=>{
    const d = loadLayer(layer);
    (d.blocks || []).forEach(b=>{
      (b.txs||[]).forEach(tx=> all.push({...tx, layer}));
    });
    (d.pending||[]).forEach(tx=> all.push({...tx, layer, pending:true}));
  });
  return all;
}

function renderLedger(){
  if(!ledgerEl || !lastBlockEl) return;
  ledgerEl.innerHTML = '';
  const d = getLayerData(activeLayer);
  if(d.blocks.length===0){
    ledgerEl.innerHTML = `<div class="small">No blocks yet on ${activeLayer} layer. Mine a block to commit pending transactions.</div>`;
    lastBlockEl.textContent = '—';
    return;
  }
  const blocks = [...d.blocks].reverse().slice(0,10);
  blocks.forEach(b=>{
    const row = document.createElement('div'); row.className='row';
    const left = document.createElement('div'); left.innerHTML = `<div style="font-weight:700">Block #${b.index}</div><div class="small">${new Date(b.ts).toLocaleString()}</div>`;
    const right = document.createElement('div'); right.style.textAlign='right';
    right.innerHTML = `<div class="small">${b.txs.length} tx</div><div class="small">hash:${b.hash.slice(0,8)}…</div>`;
    row.appendChild(left); row.appendChild(right);
    ledgerEl.appendChild(row);
  });
  lastBlockEl.textContent = d.blocks[d.blocks.length-1].index;
}

function renderFeed(){
  if(!feedEl) return;
  const all = getAllReports().sort((a,b)=> (b.ts||0)-(a.ts||0)).slice(0,100);
  feedEl.innerHTML = '';
  all.forEach(r=>{
    const box = document.createElement('div'); box.className='panel'; box.style.padding='8px'; box.style.marginBottom='8px';
    const meta = document.createElement('div'); meta.className='small'; meta.innerHTML = `<b>${r.type||r.action}</b> • ${r.userId||r.user||r.from||'—'} • <span class="small">${new Date(r.ts||Date.now()).toLocaleString()}</span> • <span class="chip">${r.layer||r.layer}</span>`;
    box.appendChild(meta);
    const txt = document.createElement('div'); txt.style.marginTop='6px'; txt.textContent = r.desc || r.note || JSON.stringify(r.data||'');
    box.appendChild(txt);
    if(r.media && r.media.length){
      const mcont = document.createElement('div'); mcont.className='feed-media';
      r.media.forEach(m=>{
        if(m.type.startsWith('image')){ const im=new Image(); im.src=m.url; mcont.appendChild(im); }
        if(m.type.startsWith('video')){ const v=document.createElement('video'); v.src=m.url; v.controls=true; mcont.appendChild(v); }
      });
      box.appendChild(mcont);
    }
    feedEl.appendChild(box);
  });
}

function fakeHash(s){
  let h=0; for(let i=0;i<s.length;i++) h = ((h<<5)-h)+s.charCodeAt(i), h |= 0;
  return (Math.abs(h)).toString(16);
}

function produceBlock(){
  const d = loadLayer(activeLayer);
  if(!d.pending || d.pending.length===0){ alert('No pending txs to commit on this layer.'); return; }
  const index = (d.blocks.length||0)+1;
  const ts = Date.now();
  const txs = d.pending.splice(0, d.pending.length); // commit all
  const block = { index, ts, txs, prev: d.blocks.length? d.blocks[d.blocks.length-1].hash : '0', hash: fakeHash(JSON.stringify({index,ts,txs})) };
  d.blocks.push(block);
  saveLayer(activeLayer, d);
  renderLedger(); renderFeed(); renderCharts();
  alert(`Block #${block.index} produced on ${activeLayer}`);
}

function createLoanRequest({userId,amount,tenure,purpose}){
  const tx = {
    id: 'tx'+Date.now()+Math.random().toString(36).slice(2,6),
    action:'REQUEST_LOAN',
    type:'loan',
    userId, amount, tenure, purpose,
    state:'REQUESTED',
    ts: Date.now(),
    layer: activeLayer
  };
  addPendingTx(activeLayer, tx);
  renderLedger(); renderFeed(); renderCharts();
}

function contractAction(txId, action, extra={}){
  const tx = {
    id: 'tx'+Date.now()+Math.random().toString(36).slice(2,6),
    orig: txId,
    action,
    data: extra,
    ts: Date.now(),
    layer: activeLayer
  };
  addPendingTx(activeLayer, tx);
  renderFeed(); renderLedger(); renderCharts();
}

function verifyZK(){
  const proofOk = Math.random()>0.2;
  alert('Zero-Knowledge Check result: ' + (proofOk ? 'Proof Verified no borrower PII disclosed' : 'Proof Failed escalate to dispute resolution'));
}

function syncPendingAll(){
  ['public','permissioned','sidechain'].forEach(layer=>{
    const d = loadLayer(layer);
    if(d.pending && d.pending.length){
      const index = (d.blocks.length||0)+1; const ts = Date.now(); const txs = d.pending.splice(0,d.pending.length);
      const block = { index, ts, txs, prev: d.blocks.length? d.blocks[d.blocks.length-1].hash : '0', hash: fakeHash(JSON.stringify({index,ts,txs})) };
      d.blocks.push(block);
      saveLayer(layer,d);
    }
  });
  renderLedger(); renderFeed(); renderCharts();
  alert('All pending transactions committed (simulated).');
}

let loanChart = null;
function renderCharts(){
  if(!statLoans || !statBorrowers) return;
  const all = getAllReports();
  const loans = all.filter(r=> r.action==='REQUEST_LOAN' || r.type==='loan' || r.action==='REQUEST_LOAN' || (r.action && r.action.includes('LOAN')) || (r.amount));
  const counts = { public:0, permissioned:0, sidechain:0 };
  all.forEach(r=>{ counts[r.layer] = (counts[r.layer]||0)+1; });
  statLoans.textContent = loans.length;
  const users = new Set(all.map(r=> r.userId||r.user)).size;
  statBorrowers.textContent = users;

  const chartCanvas = getEl('loanChart');
  if(!chartCanvas) return;
  const ctx = chartCanvas.getContext('2d');
  const data = {
    labels: ['Public','Permissioned','Sidechain'],
    datasets: [{label:'Tx Count',data:[counts.public,counts.permissioned,counts.sidechain],backgroundColor:['#1fb6ff','#24c58b','#ffcc00']}]
  };
  if(loanChart) loanChart.destroy();
  loanChart = new Chart(ctx, { type:'bar', data, options:{responsive:true,plugins:{legend:{display:false}}}});
}

const RISK_KEYWORDS = ['default','late','fraud','fake','evade','dispute','overdue','repay','loan shark'];
function ingestNlp(text){
  const lines = text.split(/\n+/).map(s=>s.trim()).filter(Boolean);
  const results = lines.map(line=>{
    const found = RISK_KEYWORDS.filter(k=> line.toLowerCase().includes(k));
    return { line, risk: found.length>0, matches:found };
  });
  results.forEach((r,i)=>{
    const tx = { id:'soc'+Date.now()+i, action:'SOCIAL_INGEST', desc: r.line, matches: r.matches, ts:Date.now(), layer:'public' };
    addPendingTx('public', tx);
  });
  renderFeed(); renderLedger(); renderCharts();
  return results;
}

// Event listeners (add existence checks)
getEl('createUserBtn')?.addEventListener('click', ()=>{
  const name = getEl('uName').value.trim();
  const phone = getEl('uPhone').value.trim();
  const region = getEl('uRegion').value.trim();
  if(!name || !phone){ alert('Provide name & phone to create a user (sim).'); return; }
  currentUser = { id: genId('user'), name, phone, region, created:Date.now() };

  localStorage.setItem('tc_user_'+currentUser.id, JSON.stringify(currentUser));

  if(userCard) userCard.style.display='block';
  if(userIdEl) userIdEl.textContent = currentUser.id;
  if(userNameEl) userNameEl.textContent = currentUser.name;
  if(userRegEl) userRegEl.textContent = currentUser.region + ' · ' + currentUser.phone;
  if(trustScoreEl) trustScoreEl.textContent = computeTrustScore(currentUser.id);
  alert('User created (sim): ' + currentUser.id);
});

getEl('bioBtn')?.addEventListener('click', ()=> {
  if(!currentUser) return alert('Create a user first.');
  alert('Biometric check (sim) succeeded for ' + currentUser.name);
});

getEl('voiceBtn')?.addEventListener('click', ()=> {
  if(!currentUser) return alert('Create a user first.');
  alert('Voice authentication (sim) succeeded for ' + currentUser.name);
});

getEl('ussdBtn')?.addEventListener('click', ()=> {
  alert('USSD path simulated: *99*' + Math.floor(Math.random()*9000+1000));
});

getEl('requestLoan')?.addEventListener('click', ()=>{
  if(!currentUser) return alert('Please create profile first.');
  const amount = Number(getEl('loanAmt').value)||0;
  const tenure = Number(getEl('loanTenure').value)||0;
  const purpose = getEl('loanPurpose').value.trim();
  if(amount<=0 || tenure<=0){ alert('Enter amount and tenure'); return; }
  createLoanRequest({ userId: currentUser.id, amount, tenure, purpose, desc:`Loan request ${amount} INR for ${purpose}` });
  alert('Loan request submitted to layer: ' + activeLayer);
  if(pendingCountEl) pendingCountEl.textContent = loadLayer(activeLayer).pending.length;
});

getEl('syncBtn')?.addEventListener('click', ()=> { syncPendingAll(); if(pendingCountEl) pendingCountEl.textContent = 0; });

getEl('mineBtn')?.addEventListener('click', ()=> { produceBlock(); if(pendingCountEl) pendingCountEl.textContent = loadLayer(activeLayer).pending.length; });

getEl('verifyZk')?.addEventListener('click', ()=> { verifyZK(); });

layerSelect?.addEventListener('change', (e)=> {
  activeLayer = e.target.value;
  if(activeLayerEl) activeLayerEl.textContent = activeLayer;
  renderLedger();
  if(pendingCountEl) pendingCountEl.textContent = loadLayer(activeLayer).pending.length;
});

roleSelect?.addEventListener('change', (e)=>{
  const role = e.target.value;
  if(role==='lender') getEl('mineBtn')?.classList.remove('hidden');
});

getEl('ingestNlp')?.addEventListener('click', ()=>{
  const txt = getEl('nlpInput').value.trim();
  if(!txt) return alert('Paste some social notes or posts first.');
  const results = ingestNlp(txt);
  alert('Ingested ' + results.length + ' items into public layer.');
});

getEl('analyzeBtn')?.addEventListener('click', ()=>{
  const res = ingestNlp(getEl('nlpInput').value || '');
  const risky = res.filter(r=> r.risk );
  alert('Analysis done. Risky mentions: ' + risky.length);
});

getEl('resetBtn')?.addEventListener('click', ()=>{
  if(!confirm('Reset demo storage?')) return;
  ['public','permissioned','sidechain'].forEach(k=> localStorage.removeItem(LAYER_KEYS[k]));
  localStorage.removeItem('tc_user_'+(currentUser && currentUser.id));
  location.reload();
});

(function boot(){
  activeLayer = layerSelect?.value || 'public';
  if(activeLayerEl) activeLayerEl.textContent = activeLayer;
  renderLedger(); renderFeed(); renderCharts();
  if(pendingCountEl) pendingCountEl.textContent = loadLayer(activeLayer).pending.length;
})();

function renderContractView(){
  if(!contractView) return;
  const d = getLayerData(activeLayer);
  const txs = (d.blocks||[]).flatMap(b=>b.txs).concat(d.pending||[]);
  const loanRequests = txs.filter(t=> t.action==='REQUEST_LOAN' || t.type==='loan' || t.action==='REQUEST_LOAN' || t.amount);
  if(loanRequests.length===0){ contractView.innerHTML='<div class="small">No contracts yet on this layer.</div>'; return; }
  contractView.innerHTML = '';
  loanRequests.slice(-6).reverse().forEach(l=>{
    const el = document.createElement('div'); el.className='panel'; el.style.padding='8px'; el.style.marginBottom='8px';
    el.innerHTML = `<div style="display:flex;justify-content:space-between"><div><b>Loan ${l.id||l.userId}</b> • ${l.userId||'—'}</div><div class="small">${l.state||l.action||'REQUESTED'}</div></div>
      <div class="small">${l.amount? ('₹'+l.amount + ' • '+(l.tenure||'')+' months') : ''}</div>
      <div class="small">${l.purpose || l.desc || ''}</div>
      <div style="margin-top:8px;display:flex;gap:6px">
        <button class="btn secondary" onclick="contractAction('${l.id||l.txId||l.userId}','APPROVE')">Approve</button>
        <button class="btn secondary" onclick="contractAction('${l.id||l.txId||l.userId}','DISBURSE')">Disburse</button>
        <button class="btn secondary" onclick="contractAction('${l.id||l.txId||l.userId}','REPAY',{amount: Math.round((l.amount||1000)/4)})">Mark Repay</button>
        <button class="btn" onclick="contractAction('${l.id||l.txId||l.userId}','CLOSE')">Close</button>
      </div>`;
    contractView.appendChild(el);
  });
}

setInterval(()=>{
  renderLedger(); renderFeed(); renderCharts(); renderContractView();
  if(pendingCountEl) pendingCountEl.textContent = loadLayer(activeLayer).pending.length;
}, 1500);
