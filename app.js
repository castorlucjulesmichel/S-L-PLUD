const menuButton=document.querySelector("#menuToggle");
const sidebar=document.querySelector("#sidebar");
menuButton?.addEventListener("click",()=>sidebar?.classList.toggle("open"));

/* Navigasyon aplikasyon: chak bouton chanje ekran, li pa fè paj la defile. */
const content=document.querySelector(".content");
const routeTitles={
 home:["Apèsi jeneral","Byenveni nan SÒL PLUS"],
 bank:["Bous mwen","Rezime finansye kont ou"],
 groups:["Gwoup SÒL","Gwoup ou yo ak aktivite solidarite"],
 "create-group":["Kreye gwoup SÒL","Mete kondisyon gwoup ou a"],
 goals:["Objektif ekonomi","Planifye sa ou vle reyalize"],
 activity:["Aktivite","Istwa mouvman kont ou"],
 profile:["Pwofil mwen","Enfòmasyon sou kont manm ou"],
 security:["Sekirite","Pwoteksyon kont ak konfyans"],
 help:["Sant asistans","Kontakte ekip SÒL PLUS la"]
};
const views={};
function makeView(key){
 const panel=document.createElement("section");
 panel.className="app-view";
 panel.dataset.screen=key;
 panel.hidden=true;
 const heading=document.createElement("div");
 heading.className="screen-heading";
 heading.innerHTML='<span class="eyebrow">SÒL PLUS • ESPAS MANM</span><h2></h2><p></p>';
 heading.querySelector("h2").textContent=routeTitles[key][0];
 heading.querySelector("p").textContent=routeTitles[key][1];
 panel.append(heading); content.append(panel); views[key]=panel; return panel;
}
const routes=["home","bank","groups","create-group","goals","activity","profile","security","help"];
routes.forEach(makeView);
const byId=id=>document.getElementById(id);
const hero=content.querySelector(".hero");
const sectionHead=content.querySelector(".section-head");
const stats=byId("wallet");
const mainGrid=content.querySelector(".main-grid");
const createCard=byId("create-group");
const bottomGrid=content.querySelector(".bottom-grid");
const groupsCard=byId("groups");
const goalsCard=byId("goals");
bottomGrid?.remove();
const transactions=byId("transactions");
const profile=byId("profile");
const security=byId("security");
const footer=content.querySelector("footer");
views.home.append(hero,mainGrid,footer);

views.bank.append(sectionHead,stats);
/* Twa sèvis prensipal andedan espas Bank lan. */
const bankServices=document.createElement("div");
bankServices.className="bank-services";
bankServices.innerHTML=`
 <div class="bank-service-grid" role="group" aria-label="Sèvis bank">
  <button type="button" class="bank-service-button active" data-bank-service="sol" aria-pressed="true"><span class="bank-service-icon">🤝</span><span class="bank-service-copy"><b>SÒL</b><small>Gwoup solidarite</small></span><span class="bank-service-arrow">›</span></button>
  <button type="button" class="bank-service-button" data-bank-service="savings" aria-pressed="false"><span class="bank-service-icon savings-icon">🐖</span><span class="bank-service-copy"><b>Épargne</b><small>Ekonomi pèsonèl</small></span><span class="bank-service-arrow">›</span></button>
  <button type="button" class="bank-service-button" data-bank-service="loan" aria-pressed="false"><span class="bank-service-icon loan-icon">💳</span><span class="bank-service-copy"><b>Prè</b><small>Demann finansman</small></span><span class="bank-service-arrow">›</span></button>
  <button type="button" class="bank-service-button" data-bank-service="deposit" aria-pressed="false"><span class="bank-service-icon deposit-icon">＋</span><span class="bank-service-copy"><b>Depo</b><small>Manyèl oswa otomatik</small></span><span class="bank-service-arrow">›</span></button>
  <button type="button" class="bank-service-button" data-bank-service="withdraw" aria-pressed="false"><span class="bank-service-icon withdraw-icon">↗</span><span class="bank-service-copy"><b>Retrè</b><small>Apwobasyon admin</small></span><span class="bank-service-arrow">›</span></button>
 </div>
 <div class="bank-service-panel" data-bank-panel="sol">
  <span class="eyebrow">SÈVIS SOLIDARITE</span><h3>Patisipe nan yon gwoup SÒL</h3>
  <p>Antre enfòmasyon gwoup ou vle patisipe ladan l. Limit kontribisyon yo respekte règ SÒL PLUS yo.</p>
  <form class="service-form" id="solJoinForm">
   <label class="field"><span>NON GWOUP LA OSWA KÒD ENVITASYON</span><input name="group" required maxlength="80" placeholder="Ekri non oswa kòd gwoup la"></label>
   <div class="form-grid">
    <label class="field"><span>KONTRIBISYON (HTG)</span><input id="solAmount" name="amount" type="number" min="1" step="1" required placeholder="Egzanp: 1000"></label>
    <label class="field"><span>FREKANS</span><select id="solFrequency" name="frequency"><option value="daily">Chak jou</option><option value="weekly">Chak semèn</option><option value="monthly" selected>Chak mwa</option></select></label>
   </div>
   <div class="service-calculation" id="solFee" aria-live="polite">Frè sèvis: 12% · Montan nèt la ap parèt lè ou antre kontribisyon an.</div>
   <button class="primary-btn" type="submit">Kontinye <b>→</b></button>
   <button class="service-link-button" type="button" id="openCreateGroup">Mwen vle kreye pwòp gwoup mwen</button>
   <div class="form-result" id="solResult" role="status" aria-live="polite"></div>
  </form>
 </div>
 <div class="bank-service-panel" data-bank-panel="savings" hidden>
  <span class="eyebrow">EKONOMI PÈSONÈL</span><h3>Kreye yon plan Épargne</h3>
  <p>Chwazi objektif ou ak kantite ou ta renmen mete sou kote. Ou ka ajiste plan an anvan li aktive.</p>
  <form class="service-form" id="savingsForm">
   <label class="field"><span>NON OBJEKTIF LA</span><input name="goal" required maxlength="80" placeholder="Egzanp: Lajan lekòl, kay, ijans"></label>
   <div class="form-grid">
    <label class="field"><span>OBJEKTIF TOTAL (HTG)</span><input name="target" type="number" min="1" step="1" required placeholder="Konbyen ou vle rasanble?"></label>
    <label class="field"><span>KONTRIBISYON (HTG)</span><input name="amount" type="number" min="1" step="1" required placeholder="Konbyen w ap mete chak fwa?"></label>
    <label class="field"><span>FREKANS</span><select name="frequency"><option value="daily">Chak jou</option><option value="weekly">Chak semèn</option><option value="monthly" selected>Chak mwa</option></select></label>
    <label class="field"><span>DAT OU VIZE</span><input name="targetDate" type="date" required></label>
   </div>
   <button class="primary-btn" type="submit">Prepare plan Épargne <b>→</b></button>
   <div class="form-result" id="savingsResult" role="status" aria-live="polite"></div>
  </form>
 </div>
 <div class="bank-service-panel" data-bank-panel="loan" hidden>
  <span class="eyebrow">SOLISYON FINANSMAN</span><h3>Fè yon demann prè</h3>
  <p>Garanti obligatwa a reprezante 25% montan prè ou mande a. Kalkil la ap fèt otomatikman anba a.</p>
  <form class="service-form" id="loanForm">
   <div class="form-grid">
    <label class="field"><span>MONTAN PRÈ A (HTG)</span><input id="loanAmount" name="amount" type="number" min="1" step="1" required placeholder="Konbyen ou bezwen?"></label>
    <label class="field"><span>DIRE OU TA RENMEN (MWA)</span><input name="duration" type="number" min="1" step="1" required placeholder="Egzanp: 6"></label>
    <label class="field"><span>FREKANS RANBOUSMAN</span><select name="frequency"><option value="weekly">Chak semèn</option><option value="monthly" selected>Chak mwa</option></select></label>
    <label class="field"><span>OBJEKTIF PRÈ A</span><select name="purpose" required><option value="">Chwazi yon rezon</option><option>Biznis</option><option>Edikasyon</option><option>Sante</option><option>Lojman</option><option>Lòt bezwen</option></select></label>
   </div>
   <div class="loan-guarantee" id="loanGuarantee" aria-live="polite"><span>Garanti 25% obligatwa</span><strong>0 HTG</strong><small>Antre montan prè a pou kalkile garanti a.</small></div>
   <button class="primary-btn" type="submit">Soumèt demann pou verifikasyon <b>→</b></button>
   <div class="form-result" id="loanResult" role="status" aria-live="polite"></div>
  </form>
 </div>
 <div class="bank-service-panel" data-bank-panel="deposit" hidden>
  <span class="eyebrow">ANTRE LAJAN SOU KONT OU</span><h3>Fè yon depo</h3>
  <p>Chwazi fason ou vle fè depo a. Depo manyèl rete annatant jiskaske administratè verifye li; depo otomatik mande konfimasyon founisè a.</p>
  <form class="service-form" id="depositForm">
   <div class="form-grid">
    <label class="field"><span>MONTAN DEPO A (HTG)</span><input name="amount" type="number" min="1" step="1" required placeholder="Antre montan an"></label>
    <label class="field"><span>METÒD DEPO</span><select name="method"><option value="manual">Manyèl — voye prèv</option><option value="automatic">Otomatik — founisè peman</option></select></label>
   </div>
   <label class="field"><span>REFERANS PEMAN OSWA NIMEWO TRANZAKSYON</span><input name="reference" maxlength="120" placeholder="Nimewo referans (si genyen)"></label>
   <label class="field"><span>PRÈV / NÒT POU ADMINISTRATÈ</span><textarea name="proof" rows="3" placeholder="Mete detay oswa referans prèv peman an"></textarea></label>
   <div class="service-calculation">Sekirite: pa gen balans k ap ogmante anvan verifikasyon manyèl oswa konfimasyon founisè a.</div>
   <button class="primary-btn" type="submit">Soumèt demann depo <b>→</b></button>
   <div class="form-result" id="depositResult" role="status" aria-live="polite"></div>
  </form>
 </div>
 <div class="bank-service-panel" data-bank-panel="withdraw" hidden>
  <span class="eyebrow">RETRÈ SOU KONT OU</span><h3>Mande yon retrè</h3>
  <p>Tou de metòd retrè yo disponib nan plan an. <strong>Tout retrè mande apwobasyon administratè anvan peman fèt.</strong></p>
  <form class="service-form" id="withdrawForm">
   <div class="form-grid">
    <label class="field"><span>MONTAN RETRÈ A (HTG)</span><input name="amount" type="number" min="1" step="1" required placeholder="Antre montan an"></label>
    <label class="field"><span>METÒD RETRÈ</span><select name="method"><option value="manual">Manyèl — ajan peye</option><option value="automatic">Otomatik — founisè peman</option></select></label>
    <label class="field"><span>DESTINASYON / NIMEWO KONT</span><input name="destination" maxlength="120" required placeholder="Kont oswa nimewo pou resevwa lajan"></label>
    <label class="field"><span>NON BENEFISYÈ</span><input name="beneficiary" maxlength="100" required placeholder="Non moun k ap resevwa a"></label>
   </div>
   <div class="service-calculation withdrawal-warning"><strong>Apwobasyon obligatwa:</strong> demann lan ap rete annatant; montan an dwe rezève pandan verifikasyon. Okenn peman pa fèt anvan admin apwouve li.</div>
   <button class="primary-btn" type="submit">Voye demann retrè <b>→</b></button>
   <div class="form-result" id="withdrawResult" role="status" aria-live="polite"></div>
  </form>
 </div>`;
views.bank.append(bankServices);
bankServices.querySelectorAll("[data-bank-service]").forEach(button=>button.addEventListener("click",()=>{
 const selected=button.dataset.bankService;
 bankServices.querySelectorAll("[data-bank-service]").forEach(item=>{
  const active=item===button; item.classList.toggle("active",active); item.setAttribute("aria-pressed",String(active));
 });
 bankServices.querySelectorAll("[data-bank-panel]").forEach(panel=>panel.hidden=panel.dataset.bankPanel!==selected);
}));

// Fòm sèvis Bank yo: kalkil lokal pou demonstrasyon, san tranzaksyon reyèl.
const moneyFormat=new Intl.NumberFormat("fr-HT",{maximumFractionDigits:2});
const fmtHTG=value=>moneyFormat.format(value)+" HTG";
const solAmount=byId("solAmount"),solFrequency=byId("solFrequency"),solFee=byId("solFee");
function updateSolFee(){
 const amount=Number(solAmount?.value)||0;
 if(solFee)solFee.textContent=amount>0?"Frè sèvis 12%: "+fmtHTG(amount*.12)+" · Montan nèt: "+fmtHTG(amount*.88):"Frè sèvis: 12% · Antre kontribisyon an pou wè montan nèt la.";
}
solAmount?.addEventListener("input",updateSolFee); solFrequency?.addEventListener("change",()=>{
 if(!solAmount)return;
 const limits={daily:20000,weekly:30000,monthly:50000}; solAmount.max=String(limits[solFrequency.value]);
 if(Number(solAmount.value)>limits[solFrequency.value])solAmount.value=String(limits[solFrequency.value]);
 updateSolFee();
});
solFrequency?.dispatchEvent(new Event("change"));
byId("solJoinForm")?.addEventListener("submit",event=>{
 event.preventDefault(); const form=event.currentTarget; if(!form.reportValidity())return;
 const amount=Number(solAmount.value),limit={daily:20000,weekly:30000,monthly:50000}[solFrequency.value];
 if(amount>limit){solAmount.setCustomValidity("Limit pou frekans sa a depase.");solAmount.reportValidity();solAmount.setCustomValidity("");return;}
 const result=byId("solResult"); result.innerHTML="<strong>Demann SÒL la pare pou verifikasyon.</strong> Kontribisyon brit: "+fmtHTG(amount)+" · Frè 12%: "+fmtHTG(amount*.12)+" · Montan nèt: "+fmtHTG(amount*.88)+". Demann lan poko anrejistre sou sèvè.";result.classList.add("show");
});
byId("openCreateGroup")?.addEventListener("click",()=>activateView("create-group"));
byId("savingsForm")?.addEventListener("submit",event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
 const d=Object.fromEntries(new FormData(form).entries());
 const result=byId("savingsResult");result.innerHTML="<strong>Plan Épargne a pare pou verifikasyon.</strong> Objektif: "+d.goal+" · Total: "+fmtHTG(Number(d.target))+" · Chak peryòd: "+fmtHTG(Number(d.amount))+" · Frekans: "+d.frequency+" · Dat vize: "+d.targetDate+". Plan an poko aktive ni anrejistre.";result.classList.add("show");
});
const loanAmount=byId("loanAmount"),loanGuarantee=byId("loanGuarantee");
function updateLoanGuarantee(){
 const amount=Number(loanAmount?.value)||0,guarantee=amount*.25;
 if(loanGuarantee){loanGuarantee.querySelector("strong").textContent=fmtHTG(guarantee);loanGuarantee.querySelector("small").textContent=amount>0?"Garanti pou mete sou kote: 25% montan prè a.":"Antre montan prè a pou kalkile garanti a.";}
}
loanAmount?.addEventListener("input",updateLoanGuarantee);
byId("loanForm")?.addEventListener("submit",event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
 const d=Object.fromEntries(new FormData(form).entries()),amount=Number(d.amount),guarantee=amount*.25;
 const result=byId("loanResult");result.innerHTML="<strong>Rezime demann prè a pare pou verifikasyon.</strong> Montan mande: "+fmtHTG(amount)+" · Garanti 25%: "+fmtHTG(guarantee)+" · Dire swete: "+d.duration+" mwa · Ranbousman: "+d.frequency+" · Objektif: "+d.purpose+". Pa gen to enterè ki fikse nan règ nou genyen yo; demann lan poko apwouve ni anrejistre.";result.classList.add("show");
});

function showLocalRequest(formId,resultId,message){
 byId(formId)?.addEventListener("submit",event=>{
  event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
  const result=byId(resultId);if(result){result.textContent=message;result.classList.add("show");}
 });
}
showLocalRequest("depositForm","depositResult","Demann depo a prepare nan demonstrasyon sa a sèlman. Li poko voye bay admin ni anrejistre sou sèvè; balans lan pa chanje.");
showLocalRequest("withdrawForm","withdrawResult","Demann retrè a prepare nan demonstrasyon sa a sèlman. Li poko voye bay admin ni founisè peman; okenn lajan pa soti sou kont lan.");

views.groups.append(groupsCard);
views["create-group"].append(createCard);
views.goals.append(goalsCard);
views.activity.append(transactions);
views.profile.append(profile);
views.security.append(security);
const helpCard=document.createElement("article");
helpCard.className="card help-screen-card";
helpCard.innerHTML='<div class="card-heading"><div><span class="eyebrow">NOU LA POU OU</span><h3>Bezwen asistans?</h3><p>Voye kesyon ou bay ekip SÒL PLUS la.</p></div><span class="stat-icon green">?</span></div><a class="primary-btn help-mail" href="mailto:contact@solplus.app">Kontakte sipò →</a>';
views.help.append(helpCard);
function activateView(key){
 if(!views[key])key="home";
 Object.entries(views).forEach(([name,panel])=>panel.hidden=name!==key);
 document.querySelectorAll(".nav-item,.dock-item").forEach(link=>{
  const active=link.dataset.view===key;
  link.classList.toggle("active",active);
  if(active)link.setAttribute("aria-current","page"); else link.removeAttribute("aria-current");
 });
 const title=routeTitles[key][0];
 const h1=document.querySelector(".topbar h1");
 const crumb=document.querySelector(".crumb");
 if(h1)h1.textContent=title;
 if(crumb)crumb.innerHTML="SÒL PLUS <span>/</span> "+title;
 sidebar?.classList.remove("open");
 window.scrollTo(0,0);
 document.body.dataset.view=key;
}
document.querySelectorAll("[data-view]").forEach(link=>link.addEventListener("click",event=>{
 event.preventDefault(); activateView(link.dataset.view);
}));
document.querySelectorAll('a[href^="#"]:not([data-view])').forEach(link=>{
 const id=link.getAttribute("href").slice(1);
 const map={"dashboard":"home","wallet":"bank","groups":"groups","create-group":"create-group","goals":"goals","transactions":"activity","profile":"profile","security":"security","help":"help"};
 if(map[id]){link.addEventListener("click",event=>{event.preventDefault();activateView(map[id]);});}
});
activateView("home");
const toast=document.querySelector("#toast"); let toastTimer;
document.querySelectorAll("[data-notice]").forEach(button=>button.addEventListener("click",()=>{
 if(!toast)return; toast.textContent=button.dataset.notice; toast.classList.add("show");
 clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);
}));
const year=document.querySelector("#year"); if(year)year.textContent=new Date().getFullYear();
document.addEventListener("click",event=>{
 if(window.innerWidth<=780&&sidebar?.classList.contains("open")&&!sidebar.contains(event.target)&&!menuButton?.contains(event.target))sidebar.classList.remove("open");
});

// Règ gwoup SÒL PLUS yo soti nan business-rules.js.
const rules=window.SOL_PLUS_RULES;
const groupForm=document.querySelector("#groupForm");
const groupResult=document.querySelector("#groupResult");
const frequency=document.querySelector("#groupFrequency");
const contribution=document.querySelector("#groupContribution");
const members=document.querySelector('[name="maxMembers"]');
const durationField=document.querySelector("#durationField");
const duration=document.querySelector("#groupDuration");
const durationUnit=document.querySelector("#durationUnit");
const mandatoryDeposit=document.querySelector("#mandatoryDeposit");
const depositAmountField=document.querySelector("#depositAmountField");
const depositAmount=document.querySelector("#depositAmount");
function syncDepositField(){
 const show=mandatoryDeposit?.value==="Wi";
 if(depositAmountField){
  depositAmountField.hidden=!show;
  depositAmountField.style.display=show?"flex":"none";
  depositAmountField.setAttribute("aria-hidden",String(!show));
 }
 if(depositAmount){
  depositAmount.required=Boolean(show);
  if(!show)depositAmount.value="";
 }
}
mandatoryDeposit?.addEventListener("change",syncDepositField);
mandatoryDeposit?.addEventListener("input",syncDepositField);
syncDepositField();
function syncGroupLimits(){
 if(!rules||!frequency||!contribution)return;
 const type=frequency.value;
 contribution.max=String(rules.maxContribution[type]);
 const durationLimit=type==="weekly"?rules.maxDuration.weekly:type==="monthly"?rules.maxDuration.monthly:null;
 if(durationField&&duration&&durationUnit){
  durationField.hidden=type==="daily"; duration.required=type!=="daily";
  if(durationLimit){ duration.max=String(durationLimit); duration.value=String(Math.min(Number(duration.value)||1,durationLimit));
   durationUnit.textContent=type==="weekly"?"semèn (maks. 50)":"mwa (maks. 60)"; }
 }
}
frequency?.addEventListener("change",syncGroupLimits);
syncGroupLimits();

// Chan yo suiv limit yo pandan moun ap ranpli fòm nan.
function keepWithinLimit(input){
 if(!input)return;
 input.addEventListener("input",()=>{
  const max=Number(input.max);
  if(input.value!==""&&Number.isFinite(max)&&Number(input.value)>max)input.value=String(max);
 });
}
keepWithinLimit(contribution);
keepWithinLimit(members);
keepWithinLimit(duration);

groupForm?.addEventListener("submit",event=>{
 event.preventDefault(); if(!groupForm.reportValidity())return;
 const data=Object.fromEntries(new FormData(groupForm).entries());
 const gross=Number(data.contribution); const memberCount=Number(data.maxMembers);
 const maxContribution=rules.maxContribution[data.frequency];
 if(memberCount>rules.maxMembers){ members.setCustomValidity("Yon gwoup pa ka depase 100 manm."); members.reportValidity(); members.setCustomValidity(""); return; }
 if(gross>maxContribution){ contribution.setCustomValidity("Montan an depase limit pou frekans sa a."); contribution.reportValidity(); contribution.setCustomValidity(""); return; }
 const durationMax=data.frequency==="weekly"?rules.maxDuration.weekly:data.frequency==="monthly"?rules.maxDuration.monthly:null;
 if(durationMax&&Number(data.duration)>durationMax){ duration.setCustomValidity("Dire gwoup la depase limit la."); duration.reportValidity(); duration.setCustomValidity(""); return; }
 const net=rules.netDeposit(gross);
 const depositValue=data.mandatoryDeposit==="Wi"?Number(data.depositAmount):0;
 if(data.mandatoryDeposit==="Wi"&&(!Number.isFinite(depositValue)||depositValue<=0)){depositAmount?.reportValidity();return;}
 const frequencyLabel={daily:"chak jou",weekly:"chak semèn",monthly:"chak mwa"}[data.frequency];
 const durationText=data.frequency==="daily"?"":" · "+data.duration+" "+(data.frequency==="weekly"?"semèn":"mwa");
 if(groupResult){
  groupResult.innerHTML="<strong>Rezime gwoup la pare pou verifikasyon.</strong>"+data.groupName+" · "+moneyFormat.format(gross)+" HTG "+frequencyLabel+" · kontribisyon nèt: "+moneyFormat.format(net)+" HTG · "+memberCount+" manm"+durationText+" · "+data.groupType+(data.mandatoryDeposit==="Wi"?" · depo obligatwa: "+moneyFormat.format(depositValue)+" HTG":" · pa gen depo obligatwa")+". Gwoup la poko anrejistre sou yon sèvè.";
  groupResult.classList.add("show");
 }
});
