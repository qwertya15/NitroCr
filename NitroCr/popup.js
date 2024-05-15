(()=>{
let f=document.querySelector('#favi');

chrome.tts.isSpeaking().then(rsp=>{
  if (rsp) {
    // activate a button to stop speaking if the TTS is saying anything
    let b=document.querySelector('#stopSpeaking');
    b.onclick=()=>{
      chrome.tts.stop();
      b.setAttribute('disabled',true);
    }
    b.removeAttribute('disabled');
  }
});

// get favi
(async ()=>{
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
})().then((t)=>{
  f.parentElement.href=f.src=t.favIconUrl;
  f.style.display='block';
}).catch((e)=>console.error(e));

})();