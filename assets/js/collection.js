document.addEventListener("DOMContentLoaded",()=>{
  const art=document.querySelector(".collection-art");
  requestAnimationFrame(()=>art?.classList.add("loaded"));

  const filters=[...document.querySelectorAll(".filter")];
  const products=[...document.querySelectorAll(".product")];
  const count=document.getElementById("count");

  function applyFilter(filter,updateUrl=true){
    filters.forEach(button=>button.classList.toggle("active",button.dataset.filter===filter));
    let visible=0;
    products.forEach(card=>{
      const show=filter==="all"||card.dataset.category===filter;
      card.classList.toggle("hide",!show);
      if(show)visible++;
    });
    count.textContent=visible+" collection"+(visible===1?"":"s");
    if(updateUrl){
      const url=new URL(window.location.href);
      if(filter==="all")url.searchParams.delete("category");
      else url.searchParams.set("category",filter);
      history.replaceState({}, "", url);
    }
  }

  filters.forEach(button=>button.addEventListener("click",()=>{
    applyFilter(button.dataset.filter);
    document.querySelector("#collection")?.scrollIntoView({behavior:"smooth",block:"start"});
  }));

  const requested=new URLSearchParams(window.location.search).get("category");
  if(requested && filters.some(button=>button.dataset.filter===requested)){
    applyFilter(requested,false);
    setTimeout(()=>document.querySelector("#collection")?.scrollIntoView({behavior:"smooth",block:"start"}),50);
  }else{
    applyFilter("all",false);
  }
});