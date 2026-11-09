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
 </div>
 <div class="bank-service-panel" data-bank-panel="sol"><span class="eyebrow">SÈVIS SOLIDARITE</span><h3>SÒL</h3><p>Patisipe nan yon gwoup SÒL, suiv kontribisyon ou epi resevwa tou pa ou dapre règ gwoup la.</p></div>
 <div class="bank-service-panel" data-bank-panel="savings" hidden><span class="eyebrow">EKONOMI PÈSONÈL</span><h3>Épargne</h3><p>Mete lajan sou kote epi suiv pwogrè ekonomi pèsonèl ou.</p></div>
 <div class="bank-service-panel" data-bank-panel="loan" hidden><span class="eyebrow">SOLISYON FINANSMAN</span><h3>Prè</h3><p>Eksplore sèvis prè a. Garanti ki prevwa a se 25% montan prè a.</p></div>`;
views.bank.append(bankServices);
bankServices.querySelectorAll("[data-bank-service]").forEach(button=>button.addEventListener("click",()=>{
 const selected=button.dataset.bankService;
 bankServices.querySelectorAll("[data-bank-service]").forEach(item=>{
  const active=item===button; item.classList.toggle("active",active); item.setAttribute("aria-pressed",String(active));
 });
 bankServices.querySelectorAll("[data-bank-panel]").forEach(panel=>panel.hidden=panel.dataset.bankPanel!==selected);
}));

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
const moneyFormat=new Intl.NumberFormat("fr-HT",{maximumFractionDigits:2});

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
