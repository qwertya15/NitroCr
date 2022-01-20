if (window) {
// check version & show status
window.requestAnimationFrame(async()=>{
    let m=(await fetch('https://raw.githubusercontent.com/qwertya15/NitroCr/main/updates.xml')).json();
    let v1=Number(m.version)??-1,v2=Number(chrome.runtime.getManifest().version)??-1;
    if (!isNaN(v1) && !isNaN(v2) && v1 > v2) {
        chrome.action.setBadgeBackgroundColor(
        {color: '#'},()=>{
            // callback
        }
        )
    }
});
}