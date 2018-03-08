$(function(){
	//刷新页面同步购物车数量
	getCartNum();
	//初始化选项卡	
	if($(".sp-menu-category-a").length>0){//存在菜单选项，才放专题标题上去
		getAllSpecial();//所有专题的标题，拼接到菜单选项卡后面（对多5个）
	}
	//大图片
	var url = $(".them_banner").attr("data_src");
	$(".them_banner").css("backgroundImage","url(" + url + ")");
	
	function  getAllSpecial(){
		var specialId=$("#specialId").val();
		if(specialId==null || specialId==""){
			$(".menu-special").addClass("sp-menu-title-green");
		}
		var url="/seminar/getAllSpecial";		
		var params={};
		$.post(url,params,function(data){			
			if(data==null){
				return ;
			}else{			
				var html="";
				for(var i=0;i<data.length;i++){					
					if(data[i].id==specialId){
					//console.log(data[i].specialName);
					html=html+
					"<div class='sp-menu-category  sp-menu-title-green'><p class='sp-center'><a class='sp-menu-category-a' href='/seminar/getSeminarList?id="+data[i].id+"&&specialType="+data[i].specialType+"' >"
					+data[i].specialName+
					"</a></p><input type='hidden' id='"+data[i].id+"'></div>";
				     }else{
			    	 html=html+
						"<div class='sp-menu-category'><p class='sp-center'><a class='sp-menu-category-a' href='/seminar/getSeminarList?id="+data[i].id+"&&specialType="+data[i].specialType+"' >"
						+data[i].specialName+
						"</a></p><input type='hidden' id='"+data[i].id+"'></div>";	 
				     }
					if(i==4){//限制选项卡为最多5个
						i=data.length;
					}
				}
				$(".menu-special").after(html);
			}
		});
		
	}
	function getCartNum(){
		var cartNum=0;
		var userName=$("#userName").html();
		if(userName==null || userName=='' || userName==undefined){
			return ;
		}else{
			var url="/customer/cart/cartNum";
			var params={};
			$.post(url,params,function(data){
				
			});
		}		
		
		
	}
});