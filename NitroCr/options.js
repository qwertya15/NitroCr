(()=>{ // hidden scope
let s={},s2=document.querySelector('i'),m=document.querySelector('main');
let s3=s2.textContent,s4=String.fromCodePoint(0x1F4BE); s4=`${s4} Changes saved! ${s4}`;
let s5 = {
'instantPage':'Inject instant.page pre-loader script',
'peskyBuggers':'Block ads',
'peskyBuggers2':'(NOTE: may no longer work due to a YT update) Skip/hide (most) YT video/overlay ads when mouse is clicked',
}
chrome.storage.local.get(['settings'],(obj)=>{
  if (obj && obj.settings) {
    s = obj.settings;
  } else
    chrome.storage.local.set({'settings':{}},()=>{
      console.log('saved initial empty object');
    });
  for (let [i,j] of Object.entries(s5))
    m.insertAdjacentHTML('beforeend',`<span class="opt-con"><label for="${i}" class="pointer">${j}?</label>
<input type="checkbox" id="${i}" class="pointer"/></span><br/>`);
  try {document.querySelector('noscript').remove();} catch(e){}
  for (let i of document.querySelectorAll('input[id]')) {
    if (s[i.id]==true || s[i.id]==false) i.checked=s[i.id];
    i.oninput = ()=>{
      console.log('saving...');
      let s={};
      chrome.storage.local.get(['settings'],(obj)=>{
        if (obj && obj.settings) {
          s = obj.settings;
          s[i.id]=i.checked??false;
          console.log(`${i.id} updated to ${i.checked??false}...`);
          chrome.storage.local.set({'settings':s},()=>{
            s2.textContent=s4; setTimeout(()=>{s2.textContent=s3;},1600);
          });
        }
      });
    }
  }
});
})();