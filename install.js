let deferredPrompt = null;

function msg(t){
  const el = document.getElementById("installMsg");
  if (el) el.textContent = t || "";
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById("installBtn");
  if (btn) {
    btn.disabled = false;
    btn.textContent = "התקן למסך הבית";
  }
  msg("");
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  const btn = document.getElementById("installBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "הותקן בהצלחה";
  }
  msg("האפליקציה נוספה למסך הבית.");
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("installBtn");
  if (!btn) return;

  btn.style.display = "inline-flex";
  btn.disabled = false;

  btn.onclick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } catch(e) {}
      return;
    }
    msg("אם לא נפתח חלון התקנה: פתח בתפריט הדפדפן ⋮ ואז בחר 'הוסף למסך הבית' או 'התקן אפליקציה'.");
  };
});
