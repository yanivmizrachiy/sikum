let deferredPrompt=null;

window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();
  deferredPrompt=e;
  const btn=document.getElementById("installBtn");
  if(btn) btn.style.display="inline-block";
});

document.addEventListener("DOMContentLoaded",()=>{
  const btn=document.getElementById("installBtn");
  if(!btn) return;

  btn.onclick=async()=>{
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt=null;
    btn.style.display="none";
  };
});
