(()=>{

// load settings
chrome.storage.local.get(['settings'],(rsp)=>{
  let s=rsp.settings;
  if (s==null) return console.warn('unable to load settings...');
  if (s.instantPage) {
    document.documentElement.insertAdjacentHTML('afterbegin',`<script src="//instant.page/5.1.0" type="module" integrity="sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw"></script>`);
  }
  if (s.peskyBuggers) {
    setInterval(()=>{
      document.querySelectorAll('[id*="google_ads_"],[class*="ad-slot"],[class*="AdWrapper-"],[class*="ac-player-"],[class*="teads-"],[class*="ytd-ad-"],.roxotAd').forEach(e=>{
          try { e.remove(); }
          catch (e) {}
      });
    },1000);
  }
  if (s.peskyBuggers2) {
    window.addEventListener('click',()=>{
      let c=document.querySelector('.video-ads');
      if (c && c.children.length>0 && document.querySelector('video')) {
        document.querySelector('video').currentTime=Number.MAX_SAFE_INTEGER;
        document.querySelector('.ytp-skip-ad-button')?.click();
      }
    },{passive:true});
  }
});


// display the site's favicon
chrome.runtime.onMessage.addListener((req,sender,rendRes)=>{
  if (!req) return;
  try {
    if (req.getFavi) {
      chrome.storage.local.get(['favIconUrl'],(rsp)=>{
        let u=rsp.favIconUrl;
        if (u!=null) {
          if (u.startsWith('data:')) {
            // open custom page for data-URIs
            window.open('about:blank','_blank')
              .document.write('<head><title>NitroCr favicon viewer</title><link href="'+u+'" rel="icon"/></head><body style="background:#111;display:grid;place-items:center;margin:0px;width:100%;height:100%;"><img src="'+u+'"></img></body>');
          } else {
            // else just (try to) open in a new tab
            window.open(u,'_blank');
          }
          // clear favicon url from storage
          chrome.storage.local.remove('favIconUrl',()=>{});
        } else
          console.error('favIconUrl not found in local extension storage!');
      });
    }
  } catch (e) {console.warn(e);}
});

})();