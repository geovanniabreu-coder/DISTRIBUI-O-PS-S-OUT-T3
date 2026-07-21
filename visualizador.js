const AREAS=['PICKING','PACKING MONO','PUTWALL','SHIPPING','BATCH SORTER','SINERGIA'];
const ACSS={PICKING:'ap','PACKING MONO':'am',PUTWALL:'aw',SHIPPING:'as','BATCH SORTER':'ab',SINERGIA:'ag'};
const AEM={PICKING:'📦','PACKING MONO':'🎁',PUTWALL:'🧱',SHIPPING:'🚚','BATCH SORTER':'⚙️',SINERGIA:'🤝'};
const ACOL={ap:'#1D4ED8',am:'#6D28D9',aw:'#C2410C',as:'#15803D',ab:'#BE123C',ag:'#0F766E'};
const ABCOL={ap:'#DBEAFE',am:'#EDE9FE',aw:'#FFEDD5',as:'#DCFCE7',ab:'#FFE4E6',ag:'#CCFBF1'};

const COLAB=[
  {n:'ANA LUISA DA SILVA PONTES',e:'6X1',t:'3°',s:'PICKING',st:'FÉRIAS'},
  {n:'ANA PAULA MOREIRA DE LIMA',e:'C',t:'3°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'ARIANE DOS SANTOS SILVA',e:'B',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'CESAR DE SOUSA ARAUJO',e:'T5 B',t:'5°',s:'PICKING',st:'PRESENTE'},
  {n:'CLERISSON DA SILVA LIMA',e:'C',t:'3°',s:'SHIPPING',st:'PRESENTE'},
  {n:'DAYANE FERREIRA DA COSTA',e:'T5 B',t:'5°',s:'PACKING MONO',st:'FÉRIAS'},
  {n:'ELAINE VICENTE SANTOS',e:'D',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'FABRICIO DE ASSIZ SOUSA',e:'D',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'FERNANDA PEDROSO CINTRA DA SILVA',e:'C',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'GESLLEY SILVA BARBOSA',e:'T5 A',t:'5°',s:'PICKING',st:'PRESENTE'},
  {n:'GESSICA DOS SANTOS SILVA DUARTE',e:'B',t:'3°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'GIOVANA CINTRA DE SOUSA',e:'C',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'GUILHERME DINIZ DA SILVA',e:'D',t:'3°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'ITACIARA SILVA DA COSTA',e:'D',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'JACKELINE SOUZA DA SILVA',e:'A',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'JOAO VITOR DOS SANTOS DINIZ',e:'T5 A',t:'5°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'KAROLAYNE CLARICE DOS SANTOS BORGES',e:'C',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'LUANA CAMILA LEONOR GALVIS',e:'A',t:'3°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'LUANA DA SILVA COSTA',e:'B',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'LUCAS BATISTA DANTAS',e:'T5 A',t:'5°',s:'PICKING',st:'FÉRIAS'},
  {n:'LUCI DE OLIVEIRA MARQUES DOS SANTOS',e:'A',t:'3°',s:'PICKING',st:'FÉRIAS'},
  {n:'MARCELO VENANCIO DOS SANTOS',e:'T5 A',t:'5°',s:'PICKING',st:'PRESENTE'},
  {n:'MARIA ALICE MACEDO DE SOUSA',e:'T5 B',t:'5°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'MIQUEIAS NEWTON DE LUCENA PEIXOTO',e:'D',t:'3°',s:'PICKING',st:'PRESENTE'},
  {n:'NICOLAS FERNANDES DOS REIS',e:'T5 B',t:'5°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'ROSIELI DE CASTRO SILVA',e:'T5 B',t:'5°',s:'PICKING',st:'PRESENTE'},
  {n:'RUAN BARROS DE SA SILVA',e:'A',t:'3°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'STEFANI OLIVEIRA ALMEIDA DE SOUSA',e:'D',t:'3°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'THALIA CRISTINA PEREIRA DA SILVA SOARES',e:'B',t:'3°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'THALIA FONSECA LEITE',e:'T5 B',t:'5°',s:'PACKING MONO',st:'PRESENTE'},
  {n:'VAGNER LAURIDO DO REGO',e:'A',t:'3°',s:'BATCH SORTER',st:'PRESENTE'},
  {n:'VALTER RODRIGUES DE SOUZA',e:'C',t:'3°',s:'BATCH SORTER',st:'PRESENTE'},
];

const EDITORS=['CLERISSON DA SILVA LIMA','RUAN BARROS DE SA SILVA','THALIA CRISTINA PEREIRA DA SILVA SOARES'];
const SUPERVISORES=[
  {n:'GEOVANNI HENRIQUE ABREU SILVA',role:'editor'},
  {n:'PAULO ITALO DOS SANTOS',role:'editor'},
];
const USERS=[
  ...SUPERVISORES,
  ...COLAB.map(c=>({n:c.n,role:EDITORS.includes(c.n)?'editor':'viewer'}))
];

// Folga calendário: âncora 19/jul/2026=dom=Turma A
const ANC=new Date(2026,6,19);
const TMS=['A','B','C','D'];
function getTurmaFolga(d){
  const delta=Math.round((new Date(d.getFullYear(),d.getMonth(),d.getDate())-new Date(ANC.getFullYear(),ANC.getMonth(),ANC.getDate()))/86400000);
  return TMS[((delta%4)+4)%4];
}
function isoW(d){
  const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()+3-(x.getDay()+6)%7);
  const w1=new Date(x.getFullYear(),0,4);
  return 1+Math.round(((x-w1)/86400000-3+(w1.getDay()+6)%7)/7);
}
// T5: semana ímpar → T5A=Sex(5)+Sab(6), T5B=Sab(6)+Dom(0)
//     semana par  → T5A=Sab(6)+Dom(0), T5B=Sex(5)+Sab(6)
function t5Folgas(d){
  const dw=d.getDay(),w=isoW(d),f=[];
  if(w%2===1){if(dw===5||dw===6)f.push('T5 A');if(dw===0||dw===6)f.push('T5 B');}
  else{if(dw===0||dw===6)f.push('T5 A');if(dw===5||dw===6)f.push('T5 B');}
  return f;
}

// Verifica se escala está de folga hoje (com suporte a exceções)
function isFolga(e){
  var td=new Date();
  var tdStr=td.getFullYear()+'-'+String(td.getMonth()+1).padStart(2,'0')+'-'+String(td.getDate()).padStart(2,'0');
  if(typeof EXC !== 'undefined' && ['A','B','C','D'].includes(e) && EXC[e] && EXC[e].includes(tdStr)) return true;
  return e===getTurmaFolga(td)||t5Folgas(td).includes(e);
}

function isFolga(e){
  const td=new Date();return e===getTurmaFolga(td)||t5Folgas(td).includes(e);
}

// State
let CU=null;
const PR={};
const DT={PICKING:[],  'PACKING MONO':[], PUTWALL:[], SHIPPING:[], 'BATCH SORTER':[], SINERGIA:[]};
const AF={presente:true,folga:true,ferias:true,ausente:true};
let PS='';

function canW(n){const s=PR[n];return s==='PRESENTE'||s==='BANCO';}
function getA(n){for(const a of AREAS)if(DT[a].includes(n))return a;return null;}
function isD(n){return getA(n)!==null;}
function isEd(){return CU&&CU.role==='editor';}

COLAB.forEach(c=>{let st=c.st;if(st==='PRESENTE'&&isFolga(c.e))st='FOLGA';PR[c.n]=st;});

const DI={
  PICKING:['FABRICIO DE ASSIZ SOUSA','ARIANE DOS SANTOS SILVA','ROSIELI DE CASTRO SILVA','GESLLEY SILVA BARBOSA','LUANA DA SILVA COSTA'],
  'PACKING MONO':['MIQUEIAS NEWTON DE LUCENA PEIXOTO','JACKELINE SOUZA DA SILVA','MARCELO VENANCIO DOS SANTOS','CESAR DE SOUSA ARAUJO'],
  PUTWALL:['RUAN BARROS DE SA SILVA','THALIA CRISTINA PEREIRA DA SILVA SOARES','GUILHERME DINIZ DA SILVA','STEFANI OLIVEIRA ALMEIDA DE SOUSA','ELAINE VICENTE SANTOS','ITACIARA SILVA DA COSTA','MARIA ALICE MACEDO DE SOUSA','THALIA FONSECA LEITE','NICOLAS FERNANDES DOS REIS','JOAO VITOR DOS SANTOS DINIZ'],
  SHIPPING:['CLERISSON DA SILVA LIMA','GESSICA DOS SANTOS SILVA DUARTE','VAGNER LAURIDO DO REGO'],
  'BATCH SORTER':[],SINERGIA:[]
};
Object.keys(DI).forEach(a=>DI[a].forEach(n=>{if(canW(n))DT[a].push(n);}));

// LOGIN
function rLogin(f){
  const el=document.getElementById('ll2');
  if(!f||!f.trim()){el.style.display='none';el.innerHTML='';return;}
  const fl=f.toLowerCase();
  const flt=USERS.filter(function(u){return u.n.toLowerCase().includes(fl);});
  el.style.display='block';
  if(!flt.length){el.innerHTML='<div class="LE">Nenhum resultado</div>';return;}
  el.innerHTML=flt.map(function(u){
    var safe=u.n.replace(/'/g,"\'");
    var roleLabel=u.role==='editor'?'&#9999;&#65039; Editor':'&#128065; Visualizador';
    var roleCss=u.role==='editor'?'RE':'RV';
    return '<div class="LP" onclick="doLogin(\'' +safe+ '\',\'' +u.role+ '\')">'
      +'<span class="LPN">'+u.n+'</span>'
      +'<span class="LR '+roleCss+'">'+roleLabel+'</span>'
      +'</div>';
  }).join('');
}
function fLogin(v){rLogin(v);}
function doLogin(n,role){
  CU={n,role};
  document.getElementById('OVL').style.display='none';
  const p=n.split(' ');
  document.getElementById('UNM').textContent=p[0]+' '+p[p.length-1];
  document.getElementById('UAV').textContent=(n[0]+(p[p.length-1][0]||'')).toUpperCase();
  document.getElementById('VB').style.display=role==='viewer'?'block':'none';
  rAll();
  const msg=role==='editor'?'Bem-vindo, '+p[0]+'! Acesso de Editor.':'Olá, '+p[0]+'! Acesso somente leitura.';
  toast(msg,role==='editor'?'tok':'');
}
function logout(){if(!confirm('Sair da sessão?'))return;CU=null;document.getElementById('OVL').style.display='flex';document.getElementById('VB').style.display='none';rLogin();}

// ALERTS
function calcAl(){
  const E=[],W=[];
  for(const a of AREAS)for(const n of DT[a])if(!canW(n))E.push(`<span class="e">${n}</span> está em <span class="e">${PR[n]}</span> mas consta em <span class="e">${a}</span>`);
  COLAB.forEach(c=>{if(canW(c.n)&&!isD(c.n))W.push(`<span class="w">${c.n}</span> está presente mas <span class="w">não foi distribuído</span>`);});
  const td=AREAS.reduce((s,a)=>s+DT[a].length,0),tp=COLAB.filter(c=>canW(c.n)).length;
  if(td>tp)E.push(`Distribuição (<span class="e">${td}</span>) maior que presentes (<span class="e">${tp}</span>)`);
  return{E,W};
}

function rAll(){rKPI();rAlerts();rCards();rSidebar();rPres();updBadge();}

function rKPI(){
  const tot=COLAB.length,pr=COLAB.filter(c=>canW(c.n)).length;
  const fo=COLAB.filter(c=>PR[c.n]==='FOLGA').length,fe=COLAB.filter(c=>PR[c.n]==='FÉRIAS').length;
  const di=AREAS.reduce((s,a)=>s+DT[a].length,0),nd=Math.max(0,pr-di);
  ['k0','k1','k2','k3','k4','k5'].forEach((id,i)=>{document.getElementById(id).textContent=[tot,pr,fo,fe,di,nd][i];});
  document.getElementById('kn').className='KI '+(nd>0?'er':'ok');
  document.getElementById('kd').className='KI '+(di>0?'ok':'');
}

function rAlerts(){
  const{E,W}=calcAl();
  const w=document.getElementById('AW');
  if(!E.length&&!W.length){w.innerHTML=`<div class="AB O"><span class="AI">✅</span><span class="AT"><span class="s">Tudo certo!</span> Distribuição consistente.</span></div>`;return;}
  let h='';
  E.forEach(m=>{h+=`<div class="AB E"><span class="AI">🚨</span><span class="AT">${m}</span></div>`;});
  W.forEach(m=>{h+=`<div class="AB W"><span class="AI">⚡</span><span class="AT">${m}</span></div>`;});
  w.innerHTML=h;
}

function rCards(){
  const ed=isEd();
  document.getElementById('AG').innerHTML=AREAS.map(a=>{
    const pp=DT[a],css=ACSS[a],em=AEM[a],hasE=pp.some(n=>!canW(n));
    const chips=pp.length?pp.map(n=>{
      const inv=!canW(n),st=PR[n];
      const col=COLAB.find(c=>c.n===n);
      const esc=col?col.e:'';
      const lborder=inv?'border-left:3px solid var(--err)':'border-left:3px solid var(--ok)';
      return '<div class="CH'+(inv?' INV':'')+'" style="'+lborder+'">'
        +'<span class="CN">'+n+'</span>'
        +'<span class="CESC">'+esc+'</span>'
        +(inv?'<span class="CB BE">&#9888; '+st+'</span>':'<span class="CB BO">&#10003;</span>')
        +'<span class="CR'+(ed?'':' OFF')+'" onclick="remP(\'' + n.replace(/'/g,"\'") + '\',\''+a+'\',event)" title="Remover">&#10005;</span>'
        +'</div>';
    }).join(''):'<div class="EA">Nenhum colaborador alocado</div>';
    return '<div class="AC '+css+(hasE?' ERR':'')+'"><div class="AH"><span class="AN">'+em+' '+a+'</span><span class="ACN">'+pp.length+'</span></div><div class="ABD">'+chips+'</div></div>';
  }).join('');
}


function rSidebar(){
  const ed=isEd();
  const av=COLAB.filter(c=>canW(c.n)&&!isD(c.n));
  const avEl=document.getElementById('AVL');
  if(!av.length){avEl.innerHTML=`<div style="color:var(--ok);font-size:11px;padding:8px;text-align:center;font-weight:600">✅ Todos os presentes foram distribuídos!</div>`;}
  else{
    const opts=AREAS.map(a=>`<option value="${a}">${a}</option>`).join('');
    avEl.innerHTML=av.map(c=>`<div class="AVP ND"><span class="AVN">${c.n}</span><span class="AVB Bsc">${c.e}</span>${ed?`<select class="SS" onchange="addA('${c.n.replace(/'/g,"\\'")}',this)"><option value="">+ Área</option>${opts}</select>`:`<span class="AVB" style="background:#FEF3C7;color:var(--warn)">Pendente</span>`}</div>`).join('');
  }
  const off=COLAB.filter(c=>!canW(c.n));
  const offEl=document.getElementById('OFL');
  if(!off.length){offEl.innerHTML=`<div style="color:var(--mut);font-size:11px;padding:8px">—</div>`;return;}
  offEl.innerHTML=off.map(c=>{
    const st=PR[c.n],bc=st==='FÉRIAS'?'Bfe':st==='FOLGA'?'Bfo':'Bau';
    const au=isFolga(c.e)?`<span class="AVB Bat">📅 auto</span>`:'';
    return `<div class="OP"><span class="ON">${c.n}</span><span class="AVB Bsc">${c.e}</span>${au}<span class="AVB ${bc}">${st}</span></div>`;
  }).join('');
}

function updBadge(){
  const{E}=calcAl();const b=document.getElementById('EB');
  E.length?(b.textContent=E.length,b.style.display='inline'):b.style.display='none';
}

function remP(n,a,e){
  e.stopPropagation();if(!isEd()){toast('Sem permissão de edição','terr');return;}
  DT[a]=DT[a].filter(x=>x!==n);toast(`${n.split(' ')[0]} removido de ${a}`,'tok');rAll();
}
function addA(n,sel){
  const a=sel.value;if(!a)return;
  if(!isEd()){toast('Sem permissão de edição','terr');sel.value='';return;}
  if(!canW(n)){toast(`⚠ ${n.split(' ')[0]} está em ${PR[n]}`,'terr');sel.value='';return;}
  AREAS.forEach(x=>{DT[x]=DT[x].filter(y=>y!==n);});DT[a].push(n);
  toast(`${n.split(' ')[0]} → ${a}`,'tok');rAll();
}

function rPres(){
  const ed=isEd(),term=PS.toLowerCase();
  const flt=COLAB.filter(c=>{
    const st=PR[c.n];
    const k=st==='PRESENTE'||st==='BANCO'?'presente':st==='FOLGA'?'folga':st==='FÉRIAS'?'ferias':'ausente';
    if(!AF[k])return false;
    if(term&&!c.n.toLowerCase().includes(term))return false;
    return true;
  });
  const SC={PRESENTE:'spr',FOLGA:'sfo','FÉRIAS':'sfe',AUSENTE:'sau',BANCO:'sba'};
  document.getElementById('PTB').innerHTML=flt.map(c=>{
    const st=PR[c.n],off=!canW(c.n),ar=getA(c.n),auto=isFolga(c.e);
    const rc='';
    const opts=['PRESENTE','FOLGA','FÉRIAS','AUSENTE','BANCO'].map(s=>`<option${s===st?' selected':''}>${s}</option>`).join('');
    const atg=auto?`<span class="AUT">📅 auto</span>`:'';
    return `<tr class="${rc}"><td><strong>${c.n}</strong></td><td><span style="font-size:11px;background:var(--sur2);padding:2px 8px;border-radius:5px;border:1px solid var(--bdr)">${c.e}</span>${atg}</td><td style="color:var(--mut)">${c.t}° TURNO</td><td style="color:var(--mut)">${c.s}</td><td>${ed?`<select class="PS2" onchange="updP('${c.n.replace(/'/g,"\\'")}',this.value)">${opts}</select>`:`<span class="SP ${SC[st]||'sau'}">${st}</span>`}</td></tr>`;
  }).join('');
}

function updP(n,st){
  if(!isEd()){toast('Sem permissão','terr');return;}
  PR[n]=st;
  if(st==='FOLGA'||st==='FÉRIAS'||st==='AUSENTE'){AREAS.forEach(a=>{DT[a]=DT[a].filter(x=>x!==n);});toast(`${n.split(' ')[0]} → ${st}. Removido da distribuição.`,'twrn');}
  else toast(`${n.split(' ')[0]} → ${st}`,'tok');
  rAll();
}

function fPres(v){PS=v;rPres();}
function tgF(k,el){AF[k]=!AF[k];el.classList.toggle('on');rPres();}

function swTab(n,el){
  document.querySelectorAll('.tc').forEach(e=>e.classList.remove('A'));
  document.querySelectorAll('.tab').forEach(e=>e.classList.remove('A'));
  document.getElementById('tab-'+n).classList.add('A');el.classList.add('A');
  if(n==='presenteismo')rPres();
}

function toast(msg,cls){
  cls=cls||'';
  const t=document.getElementById('toast');t.textContent=msg;const pfx=cls?cls+' ':'';t.className=pfx+'show';
  setTimeout(()=>t.className='',3000);
}

(function(){
  const ds=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const d=new Date();
  document.getElementById('DD').textContent=`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  document.getElementById('DW').textContent=ds[d.getDay()];
})();
document.addEventListener('DOMContentLoaded',function(){
  CU={n:"VIEWER",role:"viewer"};
  document.getElementById("OVL").style.display="none";
  document.getElementById("VB").style.display="block";
  rAll();
});