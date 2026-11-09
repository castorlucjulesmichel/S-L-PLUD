const menuButton=document.querySelector("#menuToggle");
const sidebar=document.querySelector("#sidebar");
menuButton?.addEventListener("click",()=>sidebar?.classList.toggle("open"));
document.querySelectorAll(".nav-item").forEach(link=>link.addEventListener("click",()=>{
 document.querySelectorAll(".nav-item").forEach(item=>item.classList.remove("active"));
 link.classList.add("active");
 sidebar?.classList.remove("open");
}));
const toast=document.querySelector("#toast");
let toastTimer;
document.querySelectorAll("[data-notice]").forEach(button=>button.addEventListener("click",()=>{
 if(!toast)return;
 toast.textContent=button.dataset.notice;
 toast.classList.add("show");
 clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);
}));
const year=document.querySelector("#year");
if(year)year.textContent=new Date().getFullYear();
document.addEventListener("click",event=>{
 if(window.innerWidth<=780&&sidebar?.classList.contains("open")&&!sidebar.contains(event.target)&&!menuButton?.contains(event.target))sidebar.classList.remove("open");
});

// Group rules preview: no financial group is actually created until a secure backend is connected.
const groupForm=document.querySelector("#groupForm");
const groupResult=document.querySelector("#groupResult");
groupForm?.addEventListener("submit",event=>{
 event.preventDefault();
 if(!groupForm.reportValidity())return;
 const data=Object.fromEntries(new FormData(groupForm).entries());
 const money=new Intl.NumberFormat("fr-HT").format(Number(data.contribution));
 if(groupResult){groupResult.innerHTML="<strong>Règ gwoup la pare pou verifikasyon.</strong>"+data.groupName+" · "+money+" HTG / "+data.frequency+" · "+data.maxMembers+" manm maksimòm · "+data.groupType+". Pou sekirite, gwoup la poko anrejistre sou yon sèvè.";groupResult.classList.add("show");}
});
