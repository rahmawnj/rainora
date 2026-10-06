async function loadTemplatePart(targetId, path){
  const target=document.getElementById(targetId);
  if(!target)return;
  try{
    const response=await fetch(path,{cache:"no-cache"});
    if(!response.ok)throw new Error("Template request failed: "+response.status);
    target.innerHTML=await response.text();
    return target;
  }catch(error){
    console.error(error);
  }
}

function setupTemplate(){
  const page=document.body.dataset.page||"home";
  const header=document.querySelector("[data-header]");
  if(header){
    if(page==="home")header.classList.add("is-overlay");
    else header.classList.add("is-solid");
    header.querySelectorAll("[data-nav]").forEach(link=>{
      link.classList.toggle("active",link.dataset.nav===page);
    });
  }

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible","is-visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.1,rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".reveal,[data-scroll-reveal],[data-scroll-image]").forEach(el=>observer.observe(el));

  const parallaxItems=[...document.querySelectorAll("[data-scroll-image]")];
  let ticking=false;
  function updateParallax(){
    const viewport=window.innerHeight;
    parallaxItems.forEach(item=>{
      const rect=item.getBoundingClientRect();
      if(rect.bottom<0||rect.top>viewport)return;
      const center=rect.top+rect.height/2;
      const offset=(viewport/2-center)*.075;
      item.style.setProperty("--parallax-y",offset.toFixed(2)+"px");
    });
    ticking=false;
  }
  window.addEventListener("scroll",()=>{
    if(!ticking){
      window.requestAnimationFrame(updateParallax);
      ticking=true;
    }
  },{passive:true});
  updateParallax();

  const motionTargets=[...document.querySelectorAll("main section, main .card, main .product, main .feature-copy, main .intro h2, main .ritual-copy, main .categories h2, main .topline")];
  motionTargets.forEach((el,index)=>{
    if(!el.hasAttribute("data-scroll-reveal")) el.setAttribute("data-scroll-reveal", index%4===1 ? "left" : index%4===2 ? "right" : "up");
    el.style.setProperty("--delay",Math.min(index%5*70,280)+"ms");
  });
  document.querySelectorAll("main .hero-art, main .hero-art img, main .ritual-art, main .feature-image, main .story-art, main .product-image, main .product-detail-image").forEach(el=>{
    if(!el.hasAttribute("data-scroll-image")) el.setAttribute("data-scroll-image","");
  });

  const cursor=document.querySelector(".cursor");
  if(cursor){
    window.addEventListener("pointermove",e=>{
      cursor.style.left=e.clientX+"px";
      cursor.style.top=e.clientY+"px";
    });
    document.querySelectorAll("a,button,.product,.card").forEach(el=>{
      el.addEventListener("mouseenter",()=>{cursor.style.width="28px";cursor.style.height="28px"});
      el.addEventListener("mouseleave",()=>{cursor.style.width="9px";cursor.style.height="9px"});
    });
  }
}

document.addEventListener("DOMContentLoaded",async()=>{
  await Promise.all([
    loadTemplatePart("site-header","components/header.html"),
    loadTemplatePart("site-footer","components/footer.html")
  ]);
  setupTemplate();
});