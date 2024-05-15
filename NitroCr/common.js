// personalize extension's console messages with a prefix:
['log','warn','error','info'].forEach(v=>{
    console['_'+v]=console[v];
    console[v]=(...d)=>console['_'+v]('[NitroCr]',...d);
});

// src: https://developer.chrome.com/docs/extensions/mv3/options/#linking
let ol=document.querySelector('#options-link');
if (ol) ol.addEventListener('click',()=>chrome.runtime.openOptionsPage(),{passive:true});

try {
    if (window)
        // check version & show status
        chrome.storage.local.get(['settings'],(rsp)=>{
            // should check for updates?
            if (rsp && rsp.settings && rsp.settings.updateChecks) {
                window.requestAnimationFrame(async()=>{
                    let m;
                    try {
                        // check the latest version number
                        m = await fetch('https://raw.githubusercontent.com/qwertya15/NitroCr/main/NitroCr/manifest.json').catch(e=>{
                            console.log('update check error:',e);
                            throw new Error('fetching manifest: non-ok status code');
                        });
                        if (!m || !m.ok) throw new Error('fetching manifest: non-ok status code');
                        m = await m.json();
                    } catch (e) {
                        console.log('update check: failed to fetch manifest version');
                        return false;
                    }
                    // compare version numbers
                    let v1=Number(m.version),v2=Number(chrome.runtime.getManifest().version),update=!isNaN(v1) && !isNaN(v2) && v1 > v2;
                    v1=String(v1), v2=String(v2);
                    if (update) {
                        chrome.action.setBadgeBackgroundColor({color:'#f05000'},()=>{
                            console.log('updater: badge color set');
                            chrome.action.setBadgeText({text:v1+'!'},()=>{
                                console.log('updater: badge text set to '+v1);
                                chrome.action.setTitle({title:'Update '+v1+' is available!'},()=>{
                                    console.log('updater: set badge tooltip to show version '+v1);
                                });
                            });
                        });
                        if (document && document.querySelector('main')) {
                            v2=`Update available (v${v1})!`;
                            document.querySelector('main').insertAdjacentHTML('beforeend',
                            `<a id="update" href="https://github.com/qwertya15/NitroCr" target="_blank" title="${v2}" class="bounce">${v2}</a>`);
                        }
                    } else {
                        chrome.action.setBadgeText({text:''},()=>{
                            console.log('updater: cleared badge text; current version is '+v1);
                            chrome.action.setTitle({title:String(chrome.runtime.getManifest().action.default_title)??'NitroCr'},()=>{
                                console.log('updater: reset badge tooltip; current version is '+v1);
                            });
                        });
                    }
                });
            } else {
                // nevermind
                console.log('not checking for updates...');
            }
        });
} catch (e) {
    console.warn(e);
}