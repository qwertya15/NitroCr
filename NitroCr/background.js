let ctxAct = {
  "siteFavi": {
    "title": "🌐 Open site favicon in new tab",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function(info,tab){
      try {
        chrome.storage.local.set({'favIconUrl':tab.favIconUrl},()=>{});
        chrome.tabs.sendMessage(tab.id,{'getFavi':true});
      } catch (e) {console.warn(e);}
    },
  },
  "readText": {
    "title": "🗣 Speak '%s'",
    "type": "normal",
    "contexts": ["selection"],
    "onclick": function(info,tab){
      try {
        let s=info.selectionText;
        if (s!=null && (s=String(s)).length>0) {
          if (s.length>32768) {
            // split into smaller queued substrings
            let s1;
            for (let i=0; i<s.length; i+=32767) {
              s1=s.substring(i,i+32767);
              chrome.tts.speak(s1, {'enqueue': true});
            }
          } else {
            chrome.tts.speak(s);
          }
        }
      } catch (e) {console.warn(e);}
    },
  },
};

chrome.contextMenus.removeAll();
for (let a of Object.keys(ctxAct)) {
  a=Object.assign({id:a},ctxAct[a]);
  delete a.onclick;
  chrome.contextMenus.create(a);
}

chrome.contextMenus.onClicked.addListener((info,tab)=>{
  if (ctxAct[info.menuItemId])
    ctxAct[info.menuItemId].onclick(info,tab);
});

// self.addEventListener('fetch',(e)=>{
//   try {
//     // e.respondWith( (async()=>{
//     //   try {
//     //     let rsp = await caches.match(e.request),f;
//     //     if (rsp) {
//     //       f = fetch(e.request).then(async(r)=>{
//     //         if (r.ok) {
//     //           let c1 = await caches.open(C.id);
//     //           c1.put(e.request,r.clone());
//     //         }
//     //       }).catch((e1)=>{
//     //         console.warn('failed to update resource:',e.request,e1);
//     //       });
//     //       return rsp;
//     //     } else {
//     //       f = await fetch(e.request).then(async(r)=>{
//     //         if (r.ok) {
//     //           let c1 = await caches.open(C.id);
//     //           c1.put(e.request,r.clone());
//     //           return c1;
//     //         }
//     //       }).catch((e1)=>{
//     //         console.error('failed to fetch resource:',e.request,e1);
//     //       });
//     //     }
//     //   } catch (e1) {
//     //     console.error(e1);
//     //     return;
//     //   }
//     // })());
//     console.log('got fetch request:',e);
//   } catch (e1) {
  //     console.error('err fetching resource ',e.request,':',e1);
  //   }
// });

// wip idk...
// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     console.log('got web request:',details);
//     console.log('body:',details.requestBody);
//     return details;
//   },
//   {urls: ['<all_urls>']},
//   ['extraHeaders','requestBody']
// );


// initialize settings if not already present:
chrome.storage.local.get(['settings'],(rsp)=>{
  if (!rsp || !rsp.settings) {
    chrome.storage.local.set({'settings':{updateChecks:true}},()=>{
      console.log('saved initial empty object');
    });
  }
});

console.log('extension service worker loaded!');