
try{

  //ON page change
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete' && tab.url.includes('https://leetcode.com')){
    //if (changeInfo.url) {
      
      chrome.scripting.executeScript({
        files: ['contentScript.js'],
        target: {tabId: tab.id}
      });
    //}
    }
  });


}catch(e){
  console.log(e);
}
