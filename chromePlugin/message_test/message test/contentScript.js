(function(){
	console.log("contentscript injected!");

	var resOK= {
		farewell:"contentscript send response back..."
	};
	var resErr= {
		farewell:"contentscript has error!"
	};

	chrome.runtime.onMessage.addListener(function(request,sender,senderResponse){
		console.log("receiving request comes from extension...");
		console.log(window.RayCloud);
		if(request.greeting === "do something in contentscript!"){
			senderResponse(resOK);
		}else{
			senderResponse(resErr);
		}
	})
})()