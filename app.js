const menuButton=document.querySelector("#menuToggle");
const sidebar=document.querySelector("#sidebar");
menuButton?.addEventListener("click",()=>sidebar?.classList.toggle("open"));
document.querySelectorAll(".nav-item").forEach(link=>link.addEventListener("click",()=>{
 document.querySelectorAll(".nav-item").forEach(item=>item.classList.remove("active"));
 link.classList.add("active"); sidebar?.classList.remove("open");
}));
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
 if(depositAmountField)depositAmountField.hidden=!show;
 if(depositAmount)depositAmount.required=Boolean(show);
}
mandatoryDeposit?.addEventListener("change",syncDepositField);
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