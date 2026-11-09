const menu = document.querySelector("#menuToggle");
const sidebar = document.querySelector("#sidebar");
menu?.addEventListener("click", () => sidebar?.classList.toggle("open"));
document.querySelectorAll(".side-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelectorAll(".side-nav a").forEach(item => item.classList.remove("active"));
  link.classList.add("active");
  sidebar?.classList.remove("open");
}));
const toast = document.querySelector("#toast");
let toastTimeout;
document.querySelectorAll("[data-notice]").forEach(button => button.addEventListener("click", () => {
  if (!toast) return;
  toast.textContent = button.dataset.notice;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
}));
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
