(function(){
	chrome.browserAction.onClicked.addListener(function(tab){
		chrome.tabs.sendMessage(tab.id,{greeting:"do something in contentscript!"},
			function(response){
			/** 回调函数，用来处理请求返回的json对象:response **/
			console.log(response.farewell);
		})
	})
})();