(()=>{

let s={},sh=document.querySelector('i'),m=document.querySelector('main');
// text setup for the "Changes Saved!" header:
let t0=sh.textContent,t1=String.fromCodePoint(0x1F4BE); t1=`${t1} Changes saved! ${t1}`;
// labels for the settings:
let sd = {
  'instantPage':'Inject instant.page pre-loader script? (more info in credits page)',
  'peskyBuggers':'Block (most) webpage ads?',
  'peskyBuggers2':'(NOTE: may no longer work if YT\'s site changes)<br/>Skip/hide (most) YT ads (when mouse is clicked)?',
  'updateChecks':'Check for version updates (only on extension\'s pages)?',
  //'sitecache':'(wip...): try to use storage to cache websites?', // todo...
}

chrome.storage.local.get(['settings'],(rsp)=>{
  if (rsp && rsp.settings) {
    s = rsp.settings;
    try {document.querySelector('noscript').remove();} catch(e){}
    for (let [i,j] of Object.entries(sd))
      m.insertAdjacentHTML('beforeend',`<div class="opt-con" style="opacity:0;"><label for="${i}" class="bounce">${j}</label>
  <input type="checkbox" id="${i}" class="pointer"/></div><br/>`);
    let t=0;
    for (let j of document.querySelectorAll('.opt-con')) {
      let i = j.querySelector('input');
      setTimeout(()=>j.style.opacity="1",(++t)*100);
      if (s[i.id]==true || s[i.id]==false) i.checked=s[i.id];
      i.oninput = ()=>{
        console.log('saving...');
        let s={};
        chrome.storage.local.get(['settings'],(rsp2)=>{
          if (rsp2 && rsp2.settings) {
            s = rsp2.settings;
            s[i.id]=i.checked??false;
            console.log(`${i.id} updated to ${i.checked??false}...`);
            chrome.storage.local.set({'settings':s},()=>{
              setTimeout(()=>{
                j.classList.add('saved');
                setTimeout(()=>j.classList.remove('saved'),800);
                if (sh.textContent!=t1) {
                  sh.textContent=t1;
                  setTimeout(()=>{
                    if (sh.textContent!=t0) sh.textContent=t0;
                  },1000);
                }
              },250);
            });
          }
        });
      }
    }
  } else {
    return console.warn('unable to load extension settings...');
  }
});

})();