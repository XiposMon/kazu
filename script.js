function logout() {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
const userName = sessionStorage.getItem("username") || "User";
document.addEventListener("DOMContentLoaded", () => {
  const userEl = document.getElementById("userNameDisplay");
  if (userEl) userEl.textContent = userName;

  setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString("id-ID", { hour12: false });
    const clock = document.getElementById("clock");
    if (clock) clock.innerText = time;
  }, 1000);
});
function showContent(menu) {
  const sections = ['home', 'sales', 'qr'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('active');
    el.classList.add('hidden');
  });
  const selected = document.getElementById(menu);
  selected.classList.remove('hidden');
  setTimeout(() => selected.classList.add('active'), 10);
}
