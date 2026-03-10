let deferredPrompt = null;

function setInstallMessage(text) {
  const el = document.getElementById('installMsg');
  if (el) el.textContent = text || '';
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setInstallMessage('אפשר להתקין עכשיו למסך הבית.');
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  const btn = document.getElementById('installBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'הותקן בהצלחה';
  }
  setInstallMessage('האפליקציה נוספה למסך הבית.');
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('installBtn');
  if (!btn) return;

  btn.style.display = 'inline-flex';
  btn.onclick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } catch {}
      return;
    }
    setInstallMessage("בדפדפן הזה אין כרגע חלון התקנה אוטומטי. פתח ⋮ ואז בחר 'הוסף למסך הבית' או 'התקן אפליקציה'.");
  };
});
