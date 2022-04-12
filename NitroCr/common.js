if (window) {
// check version & show status
window.requestAnimationFrame(async()=>{
    let m=(await fetch('https://raw.githubusercontent.com/qwertya15/NitroCr/main/updates.xml')).json();
    let v1=Number(m.version)??NaN,v2=Number(chrome.runtime.getManifest().version)??NaN;
    if (!isNaN(v1) && !isNaN(v2) && v1 > v2) {
        chrome.action.setBadgeBackgroundColor(
            {color: '#f05000'},()=>{
                // callback
                chrome.action.setBadgeText(
                    {text: String(v2)+'!'},()=>{
                        // callback
                    }
                )
            }
        )
    }
});
}