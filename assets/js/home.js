document.addEventListener("DOMContentLoaded",()=>{
  const copy=document.querySelector(".home-copy");
  const art=document.querySelector(".home-art");
  requestAnimationFrame(()=>{
    copy?.classList.add("loaded");
    art?.classList.add("loaded");
  });
});