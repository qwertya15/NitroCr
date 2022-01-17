// get favi
(async ()=>{
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
})().then((t)=>{
  ((e)=>{
    e.src=t.favIconUrl;
    e.style.display='initial';
  })(document.querySelector('#favi'));
}).catch((e)=>{console.error(e);});
document.querySelector('#opts').onclick=()=>{
  window.open('/options.html','_blank');
}
document.querySelector('#credits').onclick=()=>{
  window.open('/credits.html','_blank');
}
((e)=>{
  e.onclick=()=>{
    window.open(e.src,'_blank');
  }
})(document.querySelector('#favi'));