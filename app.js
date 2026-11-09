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
