let ctxAct = {
  "siteFavi": {
    "title": "🌐 Open site favicon in new tab",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function(info,tab){
      chrome.storage.local.set({'favIconUrl':tab.favIconUrl},()=>{});
      chrome.tabs.sendMessage(tab.id,{'getFavi':true});
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