/*
*    公用js事件
*    2017-03-20(yangsiyu)
*    固定导航栏（首页-详情页）
*    输入框历史记录
 */ 

/**
 * 获取手机验证样式改变
 *  id  当前获取验证码按钮选择器
 */
function getSMS(id) {
    var n = 60;
    function reduceTime(id) {
        if (n == 0) {
            $(id).html("重新发送").removeAttr('disabled');
            $(id).css({
                background: "#7bbe2b",
                color: "white"
            });
        } else {
            $(id).html("还剩<span class='sp-color-red sp-font-weight'>" + n + "</span>秒").attr('disabled', true);
            $(id).css({
                background: "#ddd",
                color: "black"
            });
            n--;
            setTimeout(function () {
                reduceTime(id);
            }, 1000);
        }
    }
    reduceTime(id);
}

var getCookie = function(name){
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("="); 
        if(arr[0] == name){
            return arr[1];
        }
    } 
}
$(function(){
function showCooikeAll(){
	if(res[0] === "undefined" || res[0] === "" || res[0] === "null"){
		$(".association_box").addClass("sp-hide");
		$("#get_cookie").empty();
	}else{
		$(".association_box").removeClass("sp-hide");
		var obj = "";
		$("#get_cookie").empty();
		for ( var i in res) {
			var arr = "";
			arr += "<li>" + res[i] + "</li>";
			obj += arr;
		}
		$("#get_cookie").append(obj);
		var len = $("#get_cookie li").length;
		if (len == 0) {
			$(".association_box").addClass("sp-hide");
		} else {
			$(".association_box").removeClass("sp-hide");
	    }
	}
}
function search(){
	var res = getCookie("name");
    var arr = unescape(getCookie("name")).split(',');
    if(arr.length > 10){
        arr.pop();
    }
    arr = arr.join();
    var val = $("#searchKeyWord").val();
    if(val.indexOf("<") > -1 || val.indexOf("<") > -1){
    	return;
    }
    if(res !== undefined){
        val = val + "," + arr;
    }
    var _val = [];
    val = val.split(',');
    for(var i = 0; i < val.length; i++){
		if(_val.indexOf(val[i]) < 0){
			_val.push(val[i]);
		}
	}
    _val = _val.join();
    var oDate = new Date();
    oDate.setTime(oDate.getTime() + 10*24*3600*1000); 
    document.cookie = 'name=' + escape(_val) + ';expires=' + oDate.toGMTString() + ';path=/';
}
$("#searchBtn").on("click",search);

var res = unescape(getCookie("name")).split(',');
var val = $("#searchKeyWord").val();

//键盘事件 key== 40 (向下) key == 38 (向上) key == 13 (回车)
$("#searchKeyWord").keyup(function(event) {
var key = event.keyCode;
if (key == 40) {
	console.log();
	if($("#get_cookie li").length == 0){
		return;
	}else{
		var len = $("#get_cookie li").length;
		var index = $("#get_cookie .choose_this").index();
		index = index + 1;
		if (index > len - 1) index = 0;
		$(".association_box").removeClass("sp-hide");
		$("#get_cookie li").removeClass("choose_this");
		$("#get_cookie li").eq(index).addClass("choose_this");
		$("#searchKeyWord").val($("#get_cookie li").eq(index).text());
	}
} else if (key == 13) {
	search(); //cookie记录
    var tex = $("#searchKeyWord").val();
	tool.selectCommodityFormSubmit(1, tex, "", "", "C", "", "", "");
} else if (key == 38) {
	if($("#get_cookie li").length == 0){
		return;
	}else{
		var len = $("#get_cookie li").length;
		var index = $("#get_cookie .choose_this").index();
		index = index - 1;
		if (index < 0)
			index = len - 1;
		$(".association_box").removeClass("sp-hide");
		$("#get_cookie li").removeClass("choose_this");
		$("#get_cookie li").eq(index).addClass("choose_this");
	    $("#searchKeyWord").val($("#get_cookie li").eq(index).text());
	}
} else{
	// 输入
	var _thisVal = $(this).val();
	if (res[0] == "undefined"){
		$("#get_cookie").empty();
		$(".association_box").addClass("sp-hide");
	}else if(_thisVal == "" || _thisVal == null){
        showCooikeAll();
    } else {
		$(".association_box").removeClass("sp-hide");
		var obj = "";
		$("#get_cookie").empty();
		for ( var i in res) {
			var arr = "";
			if (res[i].indexOf(_thisVal) > -1) {
				arr += "<li>" + res[i] + "</li>";
				obj += arr;
			}
		}
		$("#get_cookie").append(obj);
		var len = $("#get_cookie li").length;
		if (len == 0) {
			$(".association_box").addClass("sp-hide");
		} else {
			$(".association_box").removeClass("sp-hide");
			}
		}
	}
});
//搜索框失去焦点
	function stopPropagation(e){
		if (e.stopPropagation) 
		e.stopPropagation(); 
		else 
		e.cancelBubble = true; 
	} 
	$(document).bind('click',function(){ 
		$(".association_box").addClass("sp-hide");
	}); 
	$('#searchKeyWord').bind('click',function(e){ 
		stopPropagation(e); 
	}); 

//搜索框聚焦
$("#searchKeyWord").focus(function(){
	showCooikeAll();
});
// 点击选中搜索词语(后隐藏历史记录)
$(document).on("click",'#get_cookie li',function(){
    var _thisWord = $(this).text();
    $("#searchKeyWord").val(_thisWord);
    $(".association_box").addClass("sp-hide"); 
    tool.selectCommodityFormSubmit(1,_thisWord,"","","C","","","");
});
    
// 搜索历史 end
var title = $('title').text();
//固定导航栏
function fixNormal(){
	var pro = 30 ;
	var cover = function (){
		$(".sp-header").addClass("header_fixed");
        $(".fixex_logo").removeClass("sp-hide");
        $(".header_fixed .sp-box-margin-left").css("margin-left","150px");
        $(".fill_nav").removeClass("sp-hide");
	}
	var over = function (){
		$(".sp-header").removeClass("header_fixed");
        $(".fill_nav").addClass("sp-hide");
        $(".fixex_logo").removeClass("sp-hide");
	}
	if($(window).scrollTop() >= pro){
		cover();
	}else{
		over();
	}
    $(window).scroll(function (){
        if ($(window).scrollTop() >= pro){
        	cover();
        }else{
        	over();
        }
    });
}
//商品介绍售后保障导航栏 页面滚动至导航处固定
function fixDetail(){
    var top = $(".sp-tab").offset().top;
    var cover = function (){
    	  $(".fixex_logo").addClass("sp-hide");
    	  $(".sp-header").addClass("header_fixed").addClass("specil_fixed_nav");
          $(".js_fixd_nav").addClass("specil_fixed");
          $(".fill_nav").removeClass("sp-hide");
          $(".sp-wrap .keyword").addClass("specil_search specil_position");
	}
	var over = function (){
		$(".sp-header").removeClass("header_fixed").removeClass("specil_fixed_nav");
        $(".js_fixd_nav").removeClass("specil_fixed");
        $(".fill_nav").addClass("sp-hide");
        $(".fixex_logo").removeClass("sp-hide");
        $(".sp-wrap .keyword").removeClass("specil_search specil_position");
        $(".fixex_logo").removeClass("sp-hide");
	}
    if($(window).scrollTop() >= top){
		cover();
	}else{
		over();
	}
    $(document).scroll(function () {
        if ($(document).scrollTop() >= top) {
        	cover();
        }else{
        	over();
        }
    });
}
	var proList = "商品列表",
		proIndex = "银犁食品",
		proDetail = "商品详情"
		proNew = "新品专题"
		proCount = "折扣专题"
	
	if(title == proList || title == proIndex || title == proNew || title == proCount){
		fixNormal();
	}else if(title == proDetail){
		fixDetail();
	}
    //头部 工具栏 客服,app下拉 展现
    $(".site-nav .s_tel,.site-nav .s_app").hover(function () {
        $(this).css({
            background: "#fff"
        });
        $(this).find("a").css({
            color: "#7bbe2b"
        });
        $(this).find("div").removeClass("sp-hide");
    }, function () {
        $(this).css({
            background: "transparent"
        });
        $(this).find("a").css({
            color: "#666"
        });
        $(this).find("div").addClass("sp-hide");
    });   
    
//售后服务切换展示
    $(".sp-ly-other").off().on("click",function(){
        var list = $(".sp-list-service"),
            icon = $(".icon-switch");
        if(list.is(":visible")){
            list.slideUp(400);
            icon.css({
                backgroundPosition: '-60px -150px'
            });
        }else{
            list.slideDown(400);
            icon.css({
                backgroundPosition: '-30px -150px'
            });
        }

    });

    //列表页面导航鼠标悬停出现 菜单下拉列表
    $(function () {
        $(".hover").on({
            mouseenter: function () {
                $('.sp-menu-list').css("display", "block");
                $(".sp-menu-category-a").find("i").addClass("sp-icon-hover");
            },
            mouseleave: function () {
                $('.sp-menu-list').css("display", "none");
                $(".sp-menu-category-a").find("i").removeClass("sp-icon-hover");
            }
        });
    });

    //导航菜单下拉列表悬停出现列表详情列表面板
    $(".sp-menu-list").children(".sp-name").hover(function() { //一级导航悬浮
        $(this).addClass("hover").siblings(".sp-name").removeClass("hover");
        var index = $(this).index();
        $(".sp-menu-detail").children(".sp-detail-item").hide();
        $(".sp-menu-detail").children(".sp-detail-item").eq(index).show();
    })
    $(".sp-menu-list").hover(function() { //整个导航菜单悬浮，是否显示二级导航到出厂
        $(".sp-menu-detail").show();
    }, function() {
        $(".sp-menu-detail").hide();
        $('.sp-name').removeClass("hover");
    })
    $(".sp-menu-detail").children(".sp-detail-item").hover(function() { //二级导航悬浮
        var index = $(this).index();
        $(".sp-menu-list").children(".sp-name").eq(index).addClass("hover");
        $(".sp-menu-detail").show();
    }, function() {
        $(".sp-menu-detail").hide();
        $(".sp-menu-list").children(".sp-name").removeClass("hover");
    })
    
    
    jQuery(".recommod-list-pannel").slide({
		mainCell : ".recommod-list",
		effect : "fold",
		autoPlay : true
	});
    
});

/*
  页面跳转函数
 @param targetUrl:  要跳转到的页面的url
 */
function jumpPage(targetUrl){
    window.location.href ="" + realPath + targetUrl;
}

/*
 * 字符限制 字体显示过长 省略出现(适用于两行字体)
 *@param id:  要实现两行省略字体限制的类名
 */

function limitCharacters(id){
    $("" + id + "").each(function(){
        var text = $(this).html();
        if(text.length > 37){
            text = text.substring(0,36) + "...";
            $(this).text(text);
        }
    });
}

//取当前url
(function(){
	$(".sp-ly-nav li").removeClass("sp-ly-default");
	var url = document.location.href;
	var q = url.split('?')[1];
	var arr = [], obj;
	var q = url.split('?')[1];
	if(q != undefined){
		q = q.split('&');
		for(var i = 0; i < q.length; i++){
			obj = q[i].split('=');
			arr.push(obj[1]);
			arr[obj[0]] = obj[1];
		}
	}
	//个人中心
	var type = arr['type'] - 1;
	$(".sp-ly-nav li").eq(type).addClass("sp-ly-default");
	//帮助中心
	var pageName = arr['pageName'];
	if(pageName){
		$.each($(".sp-ly-nav li"),function(i, o){
			if($(o).find("a").attr("data-nav") == pageName){
				$(o).addClass("sp-ly-default");
			}
		});
	}
})();

/**
 * 百度地图
 * @param type 1:坐标 2：地名 
 * @param addr 初始化城市
 * @param num 初始化地图等级
 * @param msg 数据 格式：数组
 */
function map_init(type, addr, num, msg) {
	//初始化地图
    var map = new BMap.Map("map");
    if(type == 1){
    	addr = addr.split(',');
    	var _point = new window.BMap.Point(addr[0], addr[1]); 
    	map.centerAndZoom(_point, num); 
    }else if(type == 2){
    	map.centerAndZoom(addr, num); 
    }else{
    	return false;
    }
    map.enableScrollWheelZoom(true); //启用滚轮放大缩小  
    if(msg == undefined){
    	return false;
    }else{
    	//获取数据加标注
        var point = new Array(), //存放标注点经纬信息的数组  
        	marker = new Array(), //存放标注点对象的数组  
        	info = new Array(), //存放提示信息窗口对象的数组  
        	p0,  //纬度
        	p1,  //经度
        	myIcon,  //标注图标
        	label;   //文字标注
        var	opts = {
			width : 240, 
			height: 0,
			enableMessage:true
		};
        for (var i = 0; i < msg.length; i++) {
            p0 = msg[i].longitude;
            p1 = msg[i].latitude; //按照原数组的point格式将地图点坐标的经纬度分别提出来  
            point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点  
            myIcon = new BMap.Icon("../../image/common/posi_red.png", new BMap.Size(20,23));
            marker[i] = new window.BMap.Marker(point[i],{icon: myIcon}); //按照地图点坐标生成标记 
            map.addOverlay(marker[i]);  
            label = new window.BMap.Label(i+1, { offset: new window.BMap.Size(6, -2) });
            label.setStyle({
				color : "white",
			 	fontSize : "12px",
				height : "20px",
				lineHeight : "23px",
				fontFamily:"微软雅黑",
				background:"none",
				border: "none"
			});
            marker[i].setLabel(label); 
			info[i] = "<p style='width:225px;'>地址：" + msg[i].addr+"</p>";
			addClickHandler(info[i],marker[i]); 
        };
    }
    //鼠标hover更改按钮颜色
    function addClickHandler(info,marker){
        marker.addEventListener("click",function(e){  
            openInfo(info,e);
        });
        marker.addEventListener("mouseover", function () {
    		this.setIcon(new BMap.Icon("../../image/common/posi_blue.png", new BMap.Size(20,23)));
        });
        marker.addEventListener("mouseout", function () {  
        	this.setIcon(new BMap.Icon("../../image/common/posi_red.png", new BMap.Size(20,23)));
        });
    };
    //点击显示窗口信息
    function openInfo(info,e){  
        var p = e.target;  
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);  
        var infoWindow = new BMap.InfoWindow(info,opts);  // 创建信息窗口对象   
        map.openInfoWindow(infoWindow,point); //开启信息窗口  
    };
    //点击地址重新渲染地图
    $(".sp-pick-up-station li").on("click",function(){
    	if($(this).hasClass("visited")) return false;
    	$(this).addClass("visited").siblings().removeClass("visited");
		var province = $("#province .selected").text();
    	var city = $("#city .selected").text();
    	var area = $("#area .selected").text();		
    	var addr = province + city + area; //取到省市区地址
    	var addrGet = $(this).find("p").text();
    	var address = addr + addrGet
		var myGeo = new BMap.Geocoder();   // 创建地址解析器实例
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(address, function(point){
			if (point) {
				map.centerAndZoom(point, 15);
			}else{
				layer.msg("您选择的地址没有解析到结果!");
			}
		});
    });
};

/**
 * 三级联动获取省市区数据
 * 
 */
function getJson(){
	tool.ajaxGetSubmit(""+realPath+"customer/addressProvincialCity",{},function (msg) {
		if(msg.status=="success"){
			var data = msg.result;
			var htl = '';
			var box = $("#province").find(".slt-list ul");
			for(var i in data){
				htl += "<li selectVal="+ data[i].code +">"+ data[i].name +"</li>";
			}
			box.empty().append(htl);
			//监听省
			$("#province").each(function(){
				$(this).selectEvent(1,function(val, obj){
					var city = '';
					for(var i in data){
						if(data[i].code == val){
							city = data[i].children;
						}
					}
					//显示市
					var box_city = $("#city").find(".slt-list ul");
					var htl_city = '';
					for(var i in city){
						htl_city += "<li selectVal="+ city[i].code +">"+ city[i].name +"</li>";
					}
					box_city.empty().append(htl_city);
					$("#city").each(function(){
						$(this).selectEvent(1,function(val,obj){
							var area = '';
							for(var i in city){
								if(city[i].code == val){
									area = city[i].children;
								}
							}
							//显示区
							var box_area = $("#area").find(".slt-list ul");
							var htl_area = '';
							for(var i in area){
								htl_area += "<li selectVal="+ area[i].code +">"+ area[i].name +"</li>";
							}
							box_area.empty().append(htl_area);
							$("#area").each(function(){
								$(this).selectEvent(1,function(val,obj){
									$(".sp-auto-address").show();
									//调用显示地图
									showMapByAddress();
								});
							});
						});
					});
				});
			});
		}
	});
};

/**
 * 根据三级联动获取地址并显示地图
 * 
 */
function showMapByAddress(){
	var province = $("#province .selected").text();
	var city = $("#city .selected").text();
	var area = $("#area .selected").text();		
	var address = province + city + area;
    var area_code = $("#area .selected").attr("selectval");  
	//获取自提点
	tool.ajaxGetSubmit(""+realPath+"customer/terminal",{"county":area_code},function (msg) {
		if(msg.status=="success"){
			var result =msg.result;
			$("#sp-adr-list").empty();
			//根据后台返回数据调用地图
			var html = new Array();
			for (var i = 0; i <result.length; i++) {
				var housing=null
				if(result[i].housing==null){
					housing="";
				}else{
					housing=result[i].housing;
				}
				var v=i+1;
                html.push('<li><h4><i class="sp-icon icon-position">'+v+'</i><span class="site_name">'+result[i].name+'</span></h4>');
                html.push('<p id="'+result[i].sCode+'" class="adr-cont add-site">'+result[i].addr+housing+'</p></li>');
			}
			$("#sp-adr-list").append(html.join(""));
			map_init(2,address, 13,result);
		}
	});
}
//回到顶部
function returnTop(){
   var speed=1000;//滑动的速度
    $('body,html').animate({ scrollTop: 0 }, speed);
    return false;
}
$(".returnTop").on("click",function(){
	returnTop();
})
function scorllmove(){
	var scrollTop = $(document).scrollTop();
	if(scrollTop > 800){
		$(".bar").removeClass("sp-hide");
	}else{
		$(".bar").addClass("sp-hide");
	}
}
scorllmove();
// 滚动滚动条触发事件(列表页，详情页)
$(window).scroll(function(){
	scorllmove();
});
$(".type_bar li").on({
    mouseenter: function() { 
    	$(this).find("div").removeClass("sp-hide");
    	$(".type_bar li").removeClass("type_bar_hover");
        $(this).addClass("type_bar_hover");
    }, 
    mouseleave: function() { 
    	$(this).find("div").addClass("sp-hide");
    	$(".type_bar li").removeClass("type_bar_hover");
    }
});
//对比共有js

//    列表对比关注样式点击样式变化
$(".contrast").on("click",function(){
    if($(this).hasClass("contrast-visited")){
        $(this).removeClass("contrast-visited");
    }else{
        $(this).addClass("contrast-visited");
    }
    $(".compare-box").removeClass("sp-hide");
});
//隐藏对比栏
$(".compare-close").on("click",function(){
    $(".compare-box").addClass("sp-hide");
});
//显示当前删除
$(document).on("mouseenter",".box-item-list",function(){
    $(this).find(".compare-item-delete").removeClass("sp-hide");
});
$(document).on("mouseleave",".box-item-list",function(){
    $(this).find(".compare-item-delete").addClass("sp-hide");
});

//错误提示,失败提示 (辣椒感叹号提示)
function errorTips(msg){
	layer.open({
        type: 1,
        title: '提示',
        area: ['auto', 'auto'],
        content: "<div class='margin-btm-lg'><img src='images/warning.png'><span class='left-nor-padding sp-md-text sp-color-deep-gray'>" + msg + "</span></div>",
      });
}
