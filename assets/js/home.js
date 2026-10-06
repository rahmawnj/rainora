document.addEventListener("DOMContentLoaded",()=>{
  const loader=document.querySelector(".rainora-loader");
  const copy=document.querySelector(".hero-copy");
  const art=document.querySelector(".hero-art");

  requestAnimationFrame(()=>{
    copy?.classList.add("loaded");
    art?.classList.add("loaded");
  });

  if(loader){
    // The opening transition should never wait for remote images/fonts.
    // Start after the first paint, then let the curtain reveal the page.
    window.setTimeout(()=>{
      loader.classList.add("is-leaving");
      window.setTimeout(()=>loader.remove(),1150);
    },700);
  }
});