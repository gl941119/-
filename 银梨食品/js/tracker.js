/**
 * @Desc 创建Tracker,注册Event事件
 * @param Tracker
 *            采集对象
 * @param host
 *            本地window对象
 */
/*this.Tracker || (function(host) {
	var win = host, doc = win.document, t;
	win.Tracker = t = function() {};
//		wburl = wburl.replace("https://","ws://");
	t.wsUrl = "ws://www.ylfood.com/crm-kafka-web/trackerWebSocket"; // 服务器请求地址

	
	*//**
	 * @Desc 添加时间冒泡监听
	 *//*
	t.dispatchEvent = function(element, eventName, handler) {
		if (element.attachEvent) {
			element.attachEvent('on' + eventName, function(e) {
				handler.call(element, e);
			});
		} else if (element.addEventListener) {
			element.addEventListener(eventName, handler, false);
		} else {
			element['on' + eventName] = function(e) {
				handler.call(element, e);
			};
		}
	};

	*//**
	 * @Desc 根据名称获取session值
	 * @key session的key值对象
	 *//*
	t.sessionVaueByKey = function(key) {
		if (document.cookie.length > 0) {
			var c_start = document.cookie.indexOf(key + "=")
			if (c_start != -1) {
				c_start = c_start + key.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
	}

	*//**
	 * @Desc 根据长度获取随机字符串
	 * @len 随机字符串长度
	 *//*
	t.randomString = function(len) {
		len = len || 36;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = $chars.length;
		var pwd = '';
		for (i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	}

	*//**
	 * @Desc 浏览客户端类型
	 *//*
	t.browsers = [ {
		match : /ipad/i,
		type : "ipad"
	}, {
		match : /iphone os/i,
		type : "iphone os"
	}, {
		match : /midp/i,
		type : "midp"
	}, {
		match : /rv:1.2.3.4/i,
		type : "rv:1.2.3.4"
	}, {
		match : /ucweb/i,
		type : "ucweb"
	}, {
		match : /android/i,
		type : "android"
	}, {
		match : /windows ce/i,
		type : "windows ce"
	}, {
		match : /windows mobile/i,
		type : "windows mobile"
	}, {
		match : /chrome/i,
		type : "Chrome"
	}, {
		match : /opera/i,
		type : "Opera"
	}, {
		match : /firefox/i,
		type : "Firefox"
	}, {
		match : /safari/i,
		type : "Safari"
	}, {
		match : /compatible/i,
		type : "IE"
	}, {
		match : /msie/i,
		type : "IE"
	} ];

	*//**
	 * @Desc 获取客户端浏览器
	 *//*
	t.browserRedirect = function() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var browsers = Tracker.browsers;
		for ( var browser in browsers) {
			var browserValue = browsers[browser];
			var result = sUserAgent.match(browserValue['match']);
			if (result) {
				return browserValue['type'];
			}
		}
	}

})(this);

*//**
 * @Desc 向客户端放置TrackerId标识(区分不同客户端)
 *//*
if (!Tracker.sessionVaueByKey('TrackerId')) {
	document.cookie = "TrackerId=" + Tracker.randomString(36);
}

*//**
 * @Desc 拦截('mousedown')事件
 * @param document
 *            dom节点对象
 * @param 'mousedown'
 *            事件名称
 * @param function(e)
 *            事件处理对象
 *//*
document && Tracker.dispatchEvent(document,'mousedown',function(e){
	var node = e.target || e.srcElement;  //事件源节点
	var tracker = $(node).attr("Tracker");
	if(tracker)
	{
		var value = JSON.parse(tracker);
		if(value && value.actionType && value.actionType.match(/mousedown/i))
		{
			var documentMsg = Tracker.setData(node,value);
			if (null == websocket || websocket.readyState != 1) 
			{
				websocket = new WebSocket(Tracker.wsUrl);
			}
			websocket.send(documentMsg);
		}
	}
});

*//**
 * @Desc 拦截('scroll')事件
 * @param document
 *            dom节点对象
 * @param 'mousedown'
 *            事件名称
 * @param function(e)
 *            事件处理对象
 *//*
//document && Tracker.dispatchEvent(document,'scroll',function(e){
//	var node = e.target || e.srcElement;  //事件源节点
//	var tracker = $(node).attr("Tracker");
//	console.log("tracker scroll",tracker);
//	if(tracker)
//	{
//		var value = JSON.parse(tracker);
//		if(value && value.actionType && value.actionType.match(/mousedown/i))
//		{
//			var documentMsg = Tracker.setData(node,value);
//			if (null == websocket || websocket.readyState != 1) 
//			{
//				websocket = new WebSocket(Tracker.wsUrl);
//			}
//			websocket.send(documentMsg);
//		}
//	}
//});

*//**
 * @Desc 拦截('mouseover')事件[鼠标划过事件] 
 * @param document
 *            dom节点对象
 * @param 'mousedown'
 *            事件名称
 * @param function(e)
 *            事件处理对象
 *//*
document && Tracker.dispatchEvent(document,'mouseover',function(e){
	var node = e.target || e.srcElement;  //事件源节点
	var tracker = $(node).attr("Tracker");
	if(tracker)
	{
		var value = JSON.parse(tracker);
		if(value && value.actionType && value.actionType.match(/mouseover/i))
		{
			var documentMsg = Tracker.setData(node,value);
			if (null == websocket || websocket.readyState != 1) 
			{
				websocket = new WebSocket(Tracker.wsUrl);
			}
			websocket.send(documentMsg);
		}
	}
});




*//**
 * @Desc  记录操作 
 * 
 *//*
Tracker.setData = function(node,value)
{
	var actionParam = {};
	if("domvalue" in value){
		var domvalue = value.domvalue;
		if(!jQuery.isEmptyObject(domvalue)){
			actionParam = domvalue;
		}
	}
	if("domids" in value){
		var domids = value.domids;
		if(domids.length>0){
			$.each(domids, function(i,obj){
			    for(var k in obj){
			    	if(!!$("#"+obj[k]).val()){
			    		actionParam[k] = $("#"+obj[k]).val();
			    	}
			    	if(!!$("#"+obj[k]).html()){
			    		actionParam[k] = $("#"+obj[k]).html();
			    	}
			    }
			});
		}
	}
	var pathname = window.location.pathname;
	if(pathname == "/"){
		pathname = "index";
	}
	var documentMsg ={
		topic:'example', //用户消息所属话题	
		resources:"pc",//操作源 app or pc
		cookieId:Tracker.sessionVaueByKey('TrackerId'), //用户操作标识(36位字符串)
		onAPage:pathname,//用户操作进入该页的url
		userAgent:Tracker.browserRedirect(), //用户代理
		userId:$("#customerIdById").val(),//用户名称
		actionName:value.actionName,//用户操作事件名称
		actionType:value.actionType,//用户操作事件类型
		actionParam:actionParam//用户操作参数取值 
	}
	
	return JSON.stringify(documentMsg);
}

*//**
 * @Desc 记录当前页面停留时间事件
 *//*
var begin = new Date();
window.onbeforeunload = onbeforeunload_handler;
function onbeforeunload_handler() {
	var end = new Date();
	var documentMsg = {
		topic : 'example', // 用户消息所属话题
		cookieId : Tracker.sessionVaueByKey('TrackerId'), // 用户操作标识(32位字符串)
		userAgent : Tracker.browserRedirect(), // 用户代理
		userId : $("#customerIdById").val(),// 用户名称
		actionName : window.location.href,// 用户操作事件名称
		actionType : 'browse',// 用户操作事件类型
		actionParam : (end - begin) / 1000,// 用户操作参数取值
		actionDesc : "Stay in (" + window.location.href + ") page ("
				+ ((end - begin) / 1000) + "s)" // 用户操作事件描述
	}
	
	if (null == websocket || websocket.readyState != 1) 
	{
		websocket = new WebSocket(Tracker.wsUrl);
	}
	websocket.send(JSON.stringify(documentMsg));
}

function clickSend(node){
	var tracker = $(node).attr("Tracker");
	if(tracker)
	{
		var value = JSON.parse(tracker);
		if(value && value.actionType && value.actionType.match(/mousedown/i))
		{
			var documentMsg = Tracker.setData(node,value);
			if (null == websocket || websocket.readyState != 1) 
			{
				websocket = new WebSocket(Tracker.wsUrl);
			}
			websocket.send(documentMsg);
		}
	}
}

*//**
 * 创建websocket连接
 *//*
var websocket = null;
// 判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
	if (null == websocket || websocket.readyState != 1) {
		websocket = new WebSocket(Tracker.wsUrl);
	}
}
*/