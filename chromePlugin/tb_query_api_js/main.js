
;(function(jQuery){
	var $ = jQuery;
	var query = function(id){
		var item ;
		$.ajax({
			url:"https://hws.m.taobao.com/cache/wdetail/5.0/?id="+id+"&ttid=2013@taobao_h5_1.0.0&exParams={}",
			async:false,
			dataType:"json",
			success:function(data){
				item = data;
			}
		});
		return item;
	}

	var querySuccess = function(itemList){
		alert("调用成功了，请看控制台输出。");
		console.info("共查询商品："+itemList.length+"个");
		console.info(itemList);
		$("#s-menu-container-input").val(JSON.stringify(itemList));
	};

	var startQuery = function(){
		
		var itemUrls = $.trim($("#s-menu-container-input").val());
		if(itemUrls == ""){
			alert("您没有输入淘宝地址");
			return;
		}
		var queryIds = new Array();
		$.each(itemUrls.split("\n"),function(index, url){
			if(url.indexOf("item.taobao.com/item.htm")!=-1 || url.indexOf("detail.tmall.com/item.htm")!=-1){
				var id = "";
				$.each(url.substr(url.indexOf("?")+1).split("&"),function(i, pars){
					if(pars.split("=").length > 1 && pars.split("=")[0] == "id" && /^\d{1,20}$/.test(pars.split("=")[1]) ){
						id = pars.split("=")[1];
						return false;
					}
				});
				if(id == ""){
					alert("第『"+(index+1)+"』个链接没有找到商品ID!");
					return false;
				}else{
					queryIds.push(id);
				}
			}else{
				alert("第『"+(index+1)+"』个链接输入不正确!");
				return false;
			}
		});

		if(queryIds.length > 0){
			var index = 0;
			var itemList = new Array();
			//一秒执行一次,尽量的控制频频
			function queryItem(queryIds,index){
				if(queryIds.length > index ){
					itemList.push(query(queryIds[index]));
					setTimeout(function(){
						queryItem(queryIds,++index);
					},1000);
				}else{
					querySuccess(itemList);
				}
			}
			queryItem(queryIds,index);
		}
	};

	var init = function(){
		var content = $('<div></div>');
		content.append('<textarea id="s-menu-container-input" style="width:100%;height:100px;"></textarea>')
		$("#s_mancard_main .s-menu-container").after('<input type="button" value="获取信息" id="s-menu-container-but" class="btn self-btn bg s_btn">');
		//$("#s_mancard_main .s-menu-container").after('<input type="button" value="123" id="123" class="btn self-btn bg s_btn">');
		$("#s_mancard_main .s-menu-container").after(content);
		$("#s-menu-container-but").click(startQuery);
		// $("#123").click(function(){
		// 	location.reload();
		// })
		$('.pull-left').append('<input type="button" value="获取信息" id="text1" class="btn self-btn bg s_btn">');
		$("#text1").on("click",function(){
			console.log(window.RayCloud);
			console.log(localStorage.getItem('sellerId'));
		});

	}

	jQuery(function(){
		init();
	});

})(jQuery);


	
	



