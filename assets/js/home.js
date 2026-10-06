document.addEventListener("DOMContentLoaded",()=>{
  const loader=document.querySelector(".rainora-loader");
  const copy=document.querySelector(".hero-copy");
  const art=document.querySelector(".hero-art");

  requestAnimationFrame(()=>{
    copy?.classList.add("loaded");
    art?.classList.add("loaded");
  });

  const leave=()=>{
    if(!loader)return;
    loader.classList.add("is-leaving");
    window.setTimeout(()=>loader.remove(),1150);
  };

  if(document.readyState==="complete") window.setTimeout(leave,650);
  else window.addEventListener("load",()=>window.setTimeout(leave,650),{once:true});
});