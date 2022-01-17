chrome.storage.local.get(['settings'],(obj)=>{
  if (obj && obj.settings) {
    if (obj.settings.instantPage) {
      document.body.insertAdjacentHTML('beforeend',`<script src="//instant.page/5.1.0" type="module" integrity="sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw"></script>`);
    }
    if (obj.settings.peskyBuggers) {
      setInterval(()=>{
        let all =
{
'ezgif.com': {
ids: ['hdr','sidebar','fa','ezgif.com_728x90_middle_responsive'], classes: [], qsa: []
},
'unicode-table.com': {
ids: ['mobile-ad-with-closebtn'], classes: ['main__top-ad','page__ad-right','block-ad','roxot-dynamic-inited','roxot-dynamic'], qsa: []
},
'bonk.io': {
ids: ['adboxverticalCurse','adboxverticalleftCurse'], classes: [], qsa: []
},
'vectr.com': {
ids: [], classes: ['ads side'], qsa: []
},
'poptropica.com': {
ids: ['left_wrapper','right_wrapper'], classes: [], qsa: []
},
'dictionary.com': {
ids: [], classes: ['GoogleActiveViewElement','celtra-ad-inline-host'], qsa: []
},
'youtube.com': {
ids: [], classes: ['ytp-paid-content-overlay','ytd-display-ad-renderer'], qsa: []
},
'physicsclassroom.com': {
ids: ['rightAd'], classes: ['__fs-ancillary'], qsa: []
},
}, all2 =
{
ids: [], classes: ['GoogleActiveViewClass','adsbygoogle'], qsa: ['[id*=\'google_ads\']','[aria-label=\'advertisement\']']
}, go = (i,c,q)=>{
  for (let j of i) try {document.getElementById(i).remove();} catch (e){}
  for (let j of c) try {
    for (let k of document.getElementsByClassName(j)) try{k.remove();} catch(e){}} catch (e){}
  for (let j of q) try {
    for (let k of document.querySelectorAll(j)) try{k.remove();} catch(e){}} catch (e){}
}
        for (let i of Object.keys(all)) if (location.href.indexOf(i)>-1||i=='*') go(all[i].ids,all[i].classes,all[i].qsa);
        go(...Object.values(all2));

      }, 1000);
    }
    if (obj.settings.peskyBuggers2) {
      window.onclick=async ()=>{
        if (!document.querySelector('video')) return;
        try {let b; if (b=document.querySelector('button.ytp-ad-overlay-close-button')) b.click();}
        catch (e){}
        try {
          if (document.querySelector('span.ytp-ad-info-hover-text-button')) {
            let p=document.querySelectorAll('video')[0].paused,y=window.scrollY;
            await document.querySelector('span.ytp-ad-info-hover-text-button').click();
            await document.querySelector('button.ytp-ad-info-dialog-mute-button').click();
            await document.querySelector('button.ytp-ad-feedback-dialog-close-button').click();
            if (p==true) {await document.querySelectorAll('video')[0].pause();}
            window.scrollTo(window.scrollX??0,y??0);
          }	
        } catch (e){}
      };
    }
  }
});



chrome.runtime.onMessage.addListener((req,sender,rendRes)=>{
  if (req && req.getFavi) {
    chrome.storage.local.get(['favIconUrl'],(obj)=>{
      if (obj && obj.favIconUrl) {
        window.open(obj.favIconUrl,'_blank');
        chrome.storage.local.remove('favIconUrl',()=>{});
      } else
        console.error('favIconUrl not found in local extension storage!');
    });
  }
});