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
            'dictionary.com': {
              ids: [], classes: ['GoogleActiveViewElement','celtra-ad-inline-host'], qsa: []
            },
            'youtube.com': {
              ids: ['sparkles-container','player-ads'], classes: ['ytp-paid-content-overlay','ytd-display-ad-renderer'], qsa: ['ytd-promoted-sparkles-web-renderer']
            },
          }, all2 =
          {
            ids: [], classes: ['GoogleActiveViewClass','adsbygoogle'], qsa: ['[id*=\'google_ads\']','[aria-label=\'advertisement\']','.glacier-ad']
          }, go = (i,c,q)=>{
            for (let j of i) try {document.getElementById(i).remove();} catch (e){}
            for (let j of c) try {
              for (let k of document.getElementsByClassName(j)) try{k.remove();} catch(e){}
            } catch (e){}
            for (let j of q) try {
              for (let k of document.querySelectorAll(j)) try{k.remove();} catch(e){}
            } catch (e){}
          }
        for (let i of Object.keys(all)) if (location.href.indexOf(i)>-1) go(all[i].ids,all[i].classes,all[i].qsa);
        go(...Object.values(all2));

      }, 1000);
    }
    if (obj.settings.peskyBuggers2) {
      window.onclick=async ()=>{
        let p=document.querySelectorAll('video')[0],y=window.scrollY;
        p = (p && p.paused==true);
        try {let b; if (b=document.querySelector('button.ytp-ad-overlay-close-button')) b.click();}
        catch (e){}
        try {
          if (document.querySelector('span.ytp-ad-info-hover-text-button'))
            document.querySelectorAll(
              ['span.ytp-ad-info-hover-text-button',
              'button.ytp-ad-info-dialog-mute-button',
              'button.ytp-ad-feedback-dialog-close-button'].join(',')
            ).forEach(async(i)=>{try{await i.click();}catch(e){}});
          if (document.querySelector('.ytp-ad-skip-button-container'))
            document.querySelectorAll('.ytp-ad-skip-button-container,.ytp-ad-skip-button-slot')
            .forEach(async(i)=>{try{await i.click();}catch(e){}});
          if (location.href.indexOf('youtube.com')>-1 && document.querySelector('div.ytp-ad-player-overlay'))
            try {
              document.querySelector('ytd-player video').currentTime+=document.querySelector('ytd-player video').duration+1;
            } catch (e){}
        } catch (e){}
        if (p==true) {await document.querySelectorAll('video')[0].pause();}
        window.scrollTo(window.scrollX??0,y??0);
      };
    }
  }
});



chrome.runtime.onMessage.addListener((req,sender,rendRes)=>{
  if (req) { try {
    if (req.getFavi) {
      chrome.storage.local.get(['favIconUrl'],(obj)=>{
        if (obj && obj.favIconUrl) {
          window.open(obj.favIconUrl,'_blank');
          chrome.storage.local.remove('favIconUrl',()=>{});
        } else
          console.error('favIconUrl not found in local extension storage!');
      });
    } else if (req.readText) {
      chrome.storage.local.get(['text2Read'],(obj)=>{
        if (obj && obj.text2Read != undefined) {
          window.speechSynthesis.cancel();
          if (obj.text2Read != '') {
            window.speechSynthesis.speak(
              new SpeechSynthesisUtterance(obj.text2Read)
            );
          }
          chrome.storage.local.remove('text2Read',()=>{});
        } else
          console.error('text2Read not found in local extension storage!');
      });
    }
  } catch (e) {console.warn(e);} }
});