let deferredPrompt = null;

function setMsg(txt){
  const m = document.getElementById("installMsg");
  if(m) m.textContent = txt || "";
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById("installBtn");
  if (btn) {
    btn.disabled = false;
    btn.textContent = "התקן למסך הבית";
  }
  setMsg("");
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  const btn = document.getElementById("installBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "הותקן בהצלחה";
  }
  setMsg("האפליקציה נוספה למסך הבית.");
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("installBtn");
  if (!btn) return;

  btn.disabled = false;
  btn.onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch(e) {}
      return;
    }

    setMsg("אם חלון התקנה לא נפתח: פתח בתפריט הדפדפן ⋮ ואז בחר 'הוסף למסך הבית' או 'התקן אפליקציה'.");
  };
});
