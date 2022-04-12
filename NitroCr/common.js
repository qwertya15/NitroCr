try {
    if (window)
        // check version & show status
        window.requestAnimationFrame(async()=>{
            let m=(await (await fetch('https://raw.githubusercontent.com/qwertya15/NitroCr/main/NitroCr/manifest.json')).json());
            let v1=Number(m.version)??NaN,v2=Number(chrome.runtime.getManifest().version)??NaN;
            //console.log('v1:',v1,', v2:',v2);
            if (!isNaN(v1) && !isNaN(v2) && v1 > v2) {
                chrome.action.setBadgeBackgroundColor({color:'#f05000'},()=>{
                        console.log('updater: set badge color')
                        chrome.action.setBadgeText({text:String(v1)+'!'},()=>{
                                console.log('updater: set badge text to '+String(v1));
                                chrome.action.setTitle({title:'Update '+String(v1)+' is available!'},()=>{
                                        console.log('updater: set badge tooltip to show version '+String(v1));
                                    }
                                );
                            }
                        );
                    }
                );
                if (document && document.title == 'NitroCr Popup' && document.querySelector('a#credits')) {
                    document.querySelector('a#credits').insertAdjacentHTML('afterend',
                    '<a id="update" href="https://github.com/qwertya15/NitroCr" title="Update available!" draggable="false" class="bounce">Update available!</a>');
                    document.querySelector('a#update').onclick=()=>{
                        window.open('https://github.com/qwertya15/NitroCr','_blank');
                    }
                }
            }
            else
                chrome.action.setBadgeText({text:''},()=>{
                        console.log('updater: cleared badge text; current version is '+String(v1));
                        chrome.action.setTitle({title:String(chrome.runtime.getManifest().action.default_title)??'NitroCr'},()=>{
                                console.log('updater: reset badge tooltip; current version is '+String(v1));
                            }
                        );
                    }
                );
        });
} catch (e) {console.log(e);}