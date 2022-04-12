let ctxAct = {
  "siteFavi": {
    "title": "🌐 Open site favicon in new tab",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function(info,tab){
      chrome.storage.local.set({'favIconUrl':tab.favIconUrl},()=>{});
      try {
        chrome.tabs.sendMessage(tab.id,{'getFavi':true});
      } catch (e) {consolewarn(e);}
    },
  },
  "readText": {
    "title": "🗣 Read '%s'",
    "type": "normal",
    "contexts": ["selection"],
    "onclick": function(info,tab){
      chrome.storage.local.set({'text2Read':String(info.selectionText)??''},()=>{});
      try {
        chrome.tabs.sendMessage(tab.id,{'readText':true});
      } catch (e) {consolewarn(e);}
    },
  },
  // etc.
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