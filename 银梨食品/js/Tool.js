/************************************************************************
 * --------------------------  工具箱 duanpeng  ----------------------- *
 ************************************************************************/

function Tool(){
	//获取绝对路径
	this.selectCommodityFormSubmit=selectCommodityFormSubmit;
	this.selectCommodityFormSubmits=selectCommodityFormSubmits;
	this.getParameter=getParameter;
	this.shopCartMove=SHOP_CART_MOVE;
	this.getRealPath=GET_REAL_PATH;
	this.getRealPathGet=GET_REAL_PATH_GET;
	this.openSelection=OPEN_SELECTION;
	this.validateForm=VALIDATE_FORM;
	this.setBackgroundStyle=SET_BACKGROUND_STYLE;
	this.navigatorUserAgent=NAVIGATOR_USERAGENT;
	this.setFormAction=SET_FORM_ACTION;
	this.ajaxPostSubmit=AJAX_POST_SUBMIT;
	this.ajaxPostTypeSubmit=AJAX_POST_TYPE_SUBMIT;
	this.ajaxGetSubmit=AJAX_GET_SUBMIT;
	this.ajaxPutSubmit=AJAX_PUT_SUBMIT;
	this.ajaxDeleteSubmit=AJAX_DELETE_SUBMIT;
	this.joinStringForCommon=JOINSTRINGFORCOMMON;
	this.loadPageshtml=LOADPAGESHTML;
	this.seachPageLst=SEACHPAGELST;
	this.windowOpen=WINDOWOPEN;
	this.windowNewOpen=WINDOWNEWOPEN;
	this.isPositiveNum=ISPOSITIVENUM;
	this.setAddEventListener=SETADDEVENTLISTENNER;
	this.showModelDialogEnable=SHOWMODELDIALOGENABLE;
	this.showModelDialogUnable=SHOWMODELDIALOGUNABLE;
	this.clearOpacity=CLEAROPACITY;
	this.dynamicsLoadBodyWH=DYNAMICS_BODYLOADWH;
	this.jqId=JQ_ID;
	this.checkType=CHECK_TYPE;
	this.setAttrValue2HTML=SET_ATTRVALUE2HTML;
	this.isCheckExistence=is_Check_Existence;
	this.setDefaultSelected=SETDEFAULT_SELECTED;
	this.getRedirectEmailAddr=GET_REDIRECT_EMAILADDR;
	this.html=html;
	this.deleteHTML=deleteHTML;
	this.changeTimeToStringYMDHM=ChangeTimeToStringYMDHM;
	this.changeTimeToStringYMDHMS=ChangeTimeToStringYMDHMS;
	this.formatMoney=formatMoney;
}

var tool = new Tool();
function deleteHTML(obj,html){ 
	var s = $(obj).find(html);	
	for(var i = 0; i < s.length; i++){
		if ($(s[i]).val() == "") $(s[i]).remove();				
	
	}
};

/* 
 * formatMoney(s,type) 
 * 功能：金额按千位逗号分割 
 * 参数：s，需要格式化的金额数值. 
 * 参数：type,判断格式化后的金额是否需要小数位. 
 * 返回：返回格式化后的数值字符串. 
 */  
function formatMoney(s, type) {  
    if (/[^0-9\.]/.test(s))  
        return "0";  
    if (s == null || s == "")  
        return "0";  
    s = s.toString().replace(/^(\d*)$/, "$1.");  
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");  
    s = s.replace(".", ",");  
    var re = /(\d)(\d{3},)/;  
    while (re.test(s))  
        s = s.replace(re, "$1,$2");  
    s = s.replace(/,(\d\d)$/, ".$1");  
    if (type == 0) {// 不带小数位(默认是有小数位)  
        var a = s.split(".");  
        if (a[1] == "00") {  
            s = a[0];  
        }  
    }  
    return s;  
} 

//分页
//获取页面URL方法
function getParameter(name) {
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if (r != null) return unescape(r[2]);
return null;
}

function html(div){
	var html=new Array();
	html.push('<div class="sp-tools">');
    html.push('<a href="javascript:void(0);">已取消</a>');
    html.push('<a href="<%=request.getContextPath()%>/order/orderDetails?orderNo=${orderDetail.orderno}" class="sp-color-green">查看订单</a>');
    html.push('</div>');
    $(div).append(html.join(""));
}

//序列化标签
function strToJson(obj){    
	var json=$(obj).serialize();
    json = json.replace(/&/g,"','");    
	json = json.replace(/=/g,"':'");    
	json = "({'"+json +"'})";    
	json = eval(json);     
    return json;    
}  
/**
 * 提交form表单
 */
$.fn.serializeJson=function(name,value,otherString){
    var serializeObj={},
        array=this.serializeArray();
    $(array).each(function(){
    	if(this.name==name){
    		serializeObj[this.name]=value;
    	}else{
    		serializeObj[this.name]=this.value;
    	}
    });

    if(otherString!=undefined){
        var otherArray = otherString.split(';');
        $(otherArray).each(function(){
            var otherSplitArray = this.split(':');
            serializeObj[otherSplitArray[0]]=otherSplitArray[1];
        });
    }
    return serializeObj;
};

function AJAX_POST_TYPE_SUBMIT(actionUrl,param,successCallback){
    $.ajax({
        type:FINALSTRING.POST,
        url:actionUrl,
        data:param,
        dataType:"json",  
        contentType : 'application/json;charset=utf-8', //设置请求头信息 
        success:successCallback
    })
};
function AJAX_POST_SUBMIT(actionUrl,param,successCallback){
	$.ajax({
		type:FINALSTRING.POST,
		url:actionUrl,
		data:param,
		success:successCallback
	})
};

function AJAX_GET_SUBMIT(actionUrl,param,successCallback){
    $.ajax({
        type:FINALSTRING.GET,
        url:actionUrl,
        data:param,
        success:successCallback
    })
};

function AJAX_PUT_SUBMIT(actionUrl,param,successCallback){
    $.ajax({
        type:FINALSTRING.POST,
        url:actionUrl,
        data:(!jQuery.isEmptyObject(param)?param[FINALSTRING._METHOD]=FINALSTRING.PUT:param)?param:{},
        success:successCallback
    })
};

function AJAX_DELETE_SUBMIT(actionUrl,param,successCallback){
	
    $.ajax({
        type:FINALSTRING.POST,
        url:actionUrl,
        data:(!jQuery.isEmptyObject(param)?param[FINALSTRING._METHOD]=FINALSTRING.DELETE:param)?param:{},
        success:successCallback
    })
};


function JQ_ID(id) {
    return id.replace(/(:|\.)/g,'\\$1');
}



function SET_ATTRVALUE2HTML(t,json){
    var typeParam = tool.checkType(t);
    for(var name in json){
        var objBody = document.getElementById(typeParam+name);
        if(tool.isCheckExistence(objBody)&&objBody.tagName==FINALSTRING.INPUT_TYPE){
        	if(objBody.type==FINALSTRING.TEXT||objBody.type==FINALSTRING.HIDDREN) objBody.value=json[name];
        	else if($.inArray(objBody.type,FINALSTRING.inputType)>=0&&objBody.value==json[name]) objBody.checked=true;
        }
        else if(tool.isCheckExistence(objBody)&&objBody.tagName==FINALSTRING.TEXTAREA_TYPE){
        	objBody.innerHTML=json[name];
        }
        else if(tool.isCheckExistence(objBody)&&objBody.tagName==FINALSTRING.SELECT_TYPE){
            for(var j=0;j<objBody.length;j++){
                if(objBody[j].value==json[name]){
                    objBody[j].selected=true;
                }
            }
        }
    }
}


function SETDEFAULT_SELECTED(id,v){
	$.each($(id)[0],function(index,item){
		if(item.value==v) item.selected=true;
	})
}


function CHECK_TYPE(param){
    if(param==null||!param){
        return "";
    }
    else{
       return param+FINALSTRING.UNLINE;
    }
}


function is_Check_Existence(obj){
    if(obj==null||!obj){
        return false;
    }
    else{
        return true;
    }
}


function set_Clear_HTML(type,paramARRAY){
    var typeParam = tool.checkType(type);
    for(var i in paramARRAY){
        var objBody = document.getElementById(typeParam+paramARRAY[i]);
        if(tool.isCheckExistence(objBody)&&objBody.tagName==FINALSTRING.INPUT_TYPE){
            objBody.value="";
        }
        else if(tool.isCheckExistence(objBody)&&objBody.tagName==FINALSTRING.SELECT_TYPE){
            for(var j=0;j<objBody.length;j++){
                if(objBody[j].value==""){
                    objBody[j].selected=true;
                }
            }
        }
    }
}


function DYNAMICS_BODYLOADWH(obj){
	obj.style.width=$(window.screen)[0].availWidth>$(document.body)[0].scrollWidth?FINALSTRING.LOO:($(window.screen)[0].availWidth-50)+FINALSTRING.PX;
	obj.style.height=$(window.screen)[0].availHeight>$(document.body)[0].scrollHeight?FINALSTRING.LOO:($(document.body)[0].scrollHeight)+FINALSTRING.PX;
}


function SHOWMODELDIALOGENABLE(p,hm,w,h){
	var htmlOpj=$(FINALSTRING.MODELDIALOGBACKGROUD());
	var htmlOmj=$(FINALSTRING.MODELDIALOG(w,h));
	var hmOj=$(hm);
	htmlOpj.prependTo(FINALSTRING.IDS+p);
	htmlOmj.appendTo(FINALSTRING.IDS+p);
	hmOj.prependTo(FINALSTRING.IDS+FINALSTRING.DIA);
	var oj=$(FINALSTRING.IDS+p);
	var o=oj[0].children;
	for(var i=0;i<o.length;i++){
		o[i].style.display=FINALSTRING.SHOWBLOCK;
	}
	oj[0].style.display=FINALSTRING.SHOWBLOCK;
	$(document.body)[0].parentNode.style.overflow=FINALSTRING.HIDDREN;
}


function SHOWMODELDIALOGUNABLE(p,hm){var oj=$(FINALSTRING.IDS+p);oj.html(hm);oj[0].style.display=FINALSTRING.SHOWNONE;$(document.body)[0].parentNode.style.overflow=FINALSTRING.AUTO;}


function CLEAROPACITY(oj){$(oj).remove();}


/**
 * @describer 打开窗体(动态窗体比例)
 * @author co-duanpeng001
 */
function WINDOWOPEN(url,w,h){
	var name; //网页名称，可为空;
	var iWidth=w; //弹出窗口的宽度;
	var iHeight=h; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
		window.open(url,name,'height='+iHeight+',width='+iWidth+',top='+iTop+',left='+iLeft+', toolbar =no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no') 
}

/**
 * @describer 打开新窗体
 * @author co-duanpeng001
 */
function WINDOWNEWOPEN(url,name){
//	var name='_selft'; //网页名称，可为空;
	window.open(url,name,'') 
}


/**
 * 动态绑定
 * @author co-duanpeng001
 */
function SETADDEVENTLISTENNER(el,bt1,bt2,mt) {
	 if(el.addEventListener)el.addEventListener(bt1,function(e){if(mt.indexOf(FINALSTRING.METHODTYPE)>=0){eval(mt)}},false);
	 if(el.attachEvent)el.attachEvent(bt2,function(e){if(mt.indexOf(FINALSTRING.METHODTYPE)>=0){eval(mt)}});
	}


/**
 * 将字符串所有的"."替换为""
 */
function getRealName(str){
	index=str.lastIndexOf(".");
	str0=str.substring(0,index);
	str1=str.substring(index,str.length);
	str0=str0.replace(/\./g,"");
	str=str0+str1;
	return str;
}


/**
 * 将日期类型转换成字符串型格式 yyyy-MM-dd hh:mm
 * @param DateIn
 * @returns {String}
 * @author co-duanpeng001
 */
function ChangeTimeToStringYMDHM(DateIn)
{
    var Year = 0 ;
    var Month = 0 ;
    var Day = 0 ;
    var Hour = 0 ;
    var Minute = 0 ;
    var CurrentDate = "" ;
    // 初始化时间
    Year       = DateIn.getFullYear();
    Month      = DateIn.getMonth()+ 1 ;
    Day        = DateIn.getDate();
    Hour       = DateIn.getHours();
    Minute     = DateIn.getMinutes();
    CurrentDate = Year + "-" ;
    if ( Month >= 10 )
    {
        CurrentDate = CurrentDate + Month + "-" ;
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Month + "-" ;
    }
    if ( Day >= 10 )
    {
        CurrentDate = CurrentDate + Day ;
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Day ;
    }

     if ( Hour >= 10 )
    {
        CurrentDate = CurrentDate + " " + Hour ;
    }
    else
    {
        CurrentDate = CurrentDate + " 0" + Hour ;
    }
    if ( Minute >= 10 )
    {
        CurrentDate = CurrentDate + ":" + Minute ;
    }
    else
    {
        CurrentDate = CurrentDate + ":0" + Minute ;
    }      
    return CurrentDate ;
}
/**
 * 将日期类型转换成字符串型格式 yyyy-MM-dd hh:mm:ss
 * @param DateIn
 * @returns {String}
 * @author co-duanpeng001
 */
function ChangeTimeToStringYMDHMS(DateIn)
{
	var Year = 0 ;
	var Month = 0 ;
	var Day = 0 ;
	var Hour = 0 ;
	var Minute = 0 ;
	var Seconds = 0 ;
	var CurrentDate = "" ;
	// 初始化时间
	Year       = DateIn.getFullYear();//年份
	Month      = DateIn.getMonth()+ 1 ;//某一月
	Day        = DateIn.getDate();//某一天
	Hour       = DateIn.getHours();//小时
	Minute     = DateIn.getMinutes();//分钟
	Seconds    = DateIn.getSeconds();//秒
	CurrentDate = Year + "-" ;
	if ( Month >= 10 )
	{
		CurrentDate = CurrentDate + Month + "-" ;
	}
	else
	{
		CurrentDate = CurrentDate + "0" + Month + "-" ;
	}
	if ( Day >= 10 )
	{
		CurrentDate = CurrentDate + Day ;
	}
	else
	{
		CurrentDate = CurrentDate + "0" + Day ;
	}
	
	if ( Hour >= 10 )
	{
		CurrentDate = CurrentDate + " " + Hour ;
	}
	else
	{
		CurrentDate = CurrentDate + " 0" + Hour ;
	}
	if ( Minute >= 10 )
	{
		CurrentDate = CurrentDate + ":" + Minute ;
	}
	else
	{
		CurrentDate = CurrentDate + ":0" + Minute ;
	} 
	if(Seconds>=10)
	{
		CurrentDate = CurrentDate + ":" + Seconds ;
	}
	else
	{
		CurrentDate = CurrentDate + ":0" + Seconds ;
	}
	return CurrentDate ;
}



/**
 * 将日期类型转换成字符串型格式 yyyy-MM-dd
 * @param DateIn
 * @returns {String}
 * @author co-duanpeng001
 */
function ChangeTimeToStringYMD(DateIn)
{
    var Year = 0 ;
    var Month = 0 ;
    var Day = 0 ;
    var Hour = 0 ;
    var Minute = 0 ;
    var CurrentDate = "" ;
    // 初始化时间
    Year       = DateIn.getFullYear();
    Month      = DateIn.getMonth()+ 1 ;
    Day        = DateIn.getDate();
    
    CurrentDate = Year + "/" ;
    if ( Month >= 10 )
    {
        CurrentDate = CurrentDate + Month + "/" ;
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Month + "/" ;
    }
    if ( Day >= 10 )
    {
        CurrentDate = CurrentDate + Day ;
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Day ;
    }
    return CurrentDate ;
}


/**
 * 验证正整数
 */
function ISPOSITIVENUM(s){
	var re=/^[0-9]*[1-9][0-9]*$/;
	return re.test(s);
}


function SEACHPAGELST(c,cp,t,i){
	var crp=1;
	if(t=='seach'){
		crp=cp.parentNode.children[1].value;
		if(!crp){alert("请输入跳转的页码");return false;}
		var flag=tool.isPositiveNum(crp);
		if(!flag){alert("页码输入错误,请检查!");return false;}
		if(crp>c){
			alert("输入页码已超过最大页码数,请检查!");
			cp.parentNode.children[1].value='';
			return false;
		}
	}
	else if(t=='up'){
		crp=cp-1;
		if(crp<1)
			crp=c;
	}
	else if(t=='next'){
		crp=cp+1;
		if((crp)>c)
			crp=1;
	}
	var paramData=dataEx.getparamData(i);paramData.currentPage=crp;dataEx.getCallbackFuntion(i)(paramData);
}



function LOADPAGESHTML(i,c,cp){
	$(i).html("");
	var html=new Array();
	html[html.length]="<span>";
	html[html.length]="<a>总页数</a>";
	html[html.length]="<a>"+c+"</a>";
	html[html.length]="</span>";
	html[html.length]="&nbsp;&nbsp;&nbsp;";
	html[html.length]="<span>";
	html[html.length]="<a id=\"seachId\" style=\"font-size:14px;cursor: pointer;\" onclick=\"tool.seachPageLst("+c+",this,'seach','"+i+"')\">跳转</a>";
	html[html.length]="<input type=\"text\" style=\"width:21px;height:17px\">";
	html[html.length]="</span>&nbsp;";
	html[html.length]="<a id=\"upId\" href=\"javascript:void(0)\" onclick=\"tool.seachPageLst("+c+","+cp+",'up','"+i+"')\">上一页</a>";
	html[html.length]="<a href=\"#\" class=\"cur\">"+cp+"</a>";
	html[html.length]="<a id=\"nextId\" href=\"javascript:void(0)\" onclick=\"tool.seachPageLst("+c+","+cp+",'next','"+i+"')\">下一页</a>";
	$(html.join(" ")).appendTo(i);
}


function JOINSTRINGFORCOMMON(param,array,c,pz){
	var result = {resultArray:'',titleArray:''};
	var resultArray = new Array();
	var titleArray = new Array();
	var flag=true;
	if(array&&array.length>0){
		var obj=array[0];
		for(var j=0;j<param.columns.length;j++){
			var num=0;
			if($.inArray(param.columns[j].field,FINALSTRING.inputType)>=0){
				resultArray.push({value:"'<input type=\""+param.columns[j].field+"\" />'",hidden:param.columns[j].hidden});
				titleArray.push({title:param.columns[j].title,width:param.columns[j].width});
				continue;
			}
			if($.inArray(param.columns[j].field,FINALSTRING.indexType)>=0){
				resultArray.push({value:""+(c*pz-(pz-1))+"+i",hidden:param.columns[j].hidden});
				titleArray.push({title:param.columns[j].title,width:param.columns[j].width});
				continue;
			}
			for(var name in obj){
				if(param.columns[j].field==name){
					num++;
					titleArray.push({title:param.columns[j].title,width:param.columns[j].width,hidden:param.columns[j].hidden});
					resultArray.push({value:"dataList[i]."+name+"",hidden:param.columns[j].hidden});
				}
			}
			if(num==0){alert("初始field字段 ["+param.columns[j].field+"] 定义出错,请检查!");flag=false;break;}
		}
			if(!flag){return false;}
		result.resultArray=resultArray;
		result.titleArray=titleArray;
		
	}
	else {
		for(var j=0;j<param.columns.length;j++){
				titleArray.push({title:param.columns[j].title,width:param.columns[j].width,hidden:param.columns[j].hidden});
		}
		result.titleArray=titleArray;
	}
	result.flag=flag;
	return result;
}



function VALIDATE_FORM(form,JSONdata){
	$(form).validate(JSONdata);
}


function GET_REAL_PATH(url){
	return realPath+url;
}

function GET_REAL_PATH_GET(url){
	return realPath+url;
}

function OPEN_SELECTION(elem) {
    if (document.createEvent) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        elem[0].dispatchEvent(e);
    } 
    /*else if (element.fireEvent) {
        elem[0].fireEvent("onmousedown");
    }*/
}

/************************** 带检索功能下拉框自定义 ********************************/
function NAVIGATOR_USERAGENT(){
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE")
			&& !(userAgent.indexOf("Opera") > -1)) {
		return true;
	}else {
		return false;
	}
}


function SET_BACKGROUND_STYLE(element,color){
	var flag=tool.navigatorUserAgent();
	if(!flag){
		if(element.tagName===FINALSTRING.selectTagName){
			$(element).css({'background-color':color});
			$.each(element,function(i,v){$(element[i]).css({'background-color':'white'});});
		}
		else{
			$(element).css({'background-color':color});
		}
	}
}


function SET_FORM_ACTION(form,url){
	form.action='';
	form.action=url;
}


/**
 * 自定义控件
 * co-duanpeng001
 * 2016-09-13
 */
(function($){
	$.extend({
		selectVNctrol:function(selectObj,listData,v,n){
			if(!listData){
				listData=[];
			}
			var list=listData;
			var html = new Array();
			selectObj.html("");
			html.push("<option value=\"\">"+FINALSTRING.selectDefaut+"</option>");
			for(var i=0;i<list.length;i++){
				html.push("<option value="+list[i][v]+">"+list[i][n]+"</option>");
			}
			selectObj.append(html.join(" "));
		},
		selectVVNctrol:function(selectObj,listData,v,n){
			if(!listData){
				listData=[];
			}
			var list=listData;
			var html = new Array();
			selectObj.html("");
			html.push("<option value=\"\">"+FINALSTRING.selectDefaut+"</option>");
			for(var i=0;i<list.length;i++){
				html.push("<option value="+list[i][v]+">"+list[i][v] +"  "+ list[i][n]+"</option>");
			}
			selectObj.append(html.join(" "));
		},
		validateFormAjaxSubmit:function(u,f,r,m,fn){
			$(f).validate({ 
				onsubmit:true,onchange:false,onblur:false,onfocus:false,onfocusout:false,focusin:false,onclick:false,onkeyup :false,
				ignore: ".ignore",
				rules: r, 
				messages:m,
				showErrors : function(errorMap, errorList) {
			       var msg = "";   
		           $.each(errorList, function(i,v){   
			           msg = (v.message+"\r\n");
			           if(msg){
			        	   alert(msg);
			        	   return false;
			           }
		           });   
		           		if(!msg){
		           		   var l=dataEx.getStyleList();
		 	        	   if(l.length>0){tool.setBackgroundStyle(l[0],'white');}
		           		}
		           },
				submitHandler: function(form) {
					if(u){tool.setFormAction(form,u);}
				     $(form).ajaxSubmit({
				    	 success:function(data){
				    		 if(typeof fn===FINALSTRING.FUNCTIONTYPE)
				    		 fn(data);
				    	 }
				     });
		         }, 
		     	invalidHandler: function(form, validator) {  
		     		 var l=dataEx.getStyleList();
		     		 if(l.length>0){tool.setBackgroundStyle(l[0],'white');}
		     		 var errorList=validator.errorList;
		     		 var e=errorList[0].element;
		     		 tool.setBackgroundStyle(e,'rgba(246,2,250,0.21)')
		     		 dataEx.setStyleList(e);
		      		 return false;
		          }
			});
		},
		/** 
		 * table分页列表加载插件-参数说明：
		 * lstId：table列表id
		 * pageId: 分页显示位置id
		 * params: 列表第一行标题字段参数和tr行样式参数
		 * dataList：查询结果list
		 * counts: 总页数
		 * currentPage：当前页数
		 * pageSize: 每页显示条数
		 * callback: 回调函数1
		 * successback 回调函数2
		 */
		loadDataToPageTable:function(data,successback){
			var params=data.parameters;
			var callback=data.callback;
			var dataList=data.dataList;
			dataEx.setparamData(data.paramData,data.paging);
			dataEx.setCallbackFuntion(callback,data.paging);
			tool.loadPageshtml(data.paging,data.counts,data.currentPage);
			if(!dataList){dataList=[]};
			var titleTrHtml="<tr>";
			if(params.TRclass&&params.TRclass.titleTRclass){
				var titleTRclass=params.TRclass.titleTRclass;
				titleTrHtml="<tr class=\""+titleTRclass+"\">";
			}
			var resultTrHtml="<tr>";
			if(params.TRclass&&params.TRclass.resultTRclass){
				var resultTRclass=params.TRclass.resultTRclass;
				resultTrHtml="<tr class=\""+resultTRclass+"\">";
			}
			$(data.resultTable).html('');
			var html = new Array();
			var results = tool.joinStringForCommon(params,dataList,data.currentPage,data.pageSize);
			if(!results.flag){return false;}
				var titleArray = results.titleArray;
						html.push(titleTrHtml);
				$.each(titleArray,function(i,v){
						var rHtml='';
						if(v.width){
							rHtml="<td width="+v.width+">"+v.title+"</td>";
							if(v.hidden){
								rHtml="<td width="+v.width+" style=\"display:none\">"+v.title+"</td>";
							}
						}
						else{
							rHtml="<td>"+v.title+"</td>";
							if(v.hidden){
								rHtml="<td style=\"display:none\">"+v.title+"</td>";
							}
						}
						html.push(rHtml);
					});
						html.push("</tr>");
				var resultArray = results.resultArray;
				for(var i=0;i<dataList.length;i++){
						html.push(resultTrHtml);
					for(var n=0;n<resultArray.length;n++){
						var value=resultArray[n].value;
						var hidden=resultArray[n].hidden;
						var vl=eval(value);
						if(!vl){vl='';}
						if(!hidden){
							html.push("<td>"+vl+"</td>");
						}
						else{
							html.push("<td style=\"display:none\">"+vl+"</td>");
						}
					}
						html.push("</tr>");
				}
			$(html.join(" ")).appendTo(data.resultTable);
			if(successback){
				if(typeof successback==FINALSTRING.FUNCTIONTYPE) successback();
				else alert("successBack of "+data.resultTable+" pageList"+' is not function !');return false;
			}
		},
		validateFormSubmit:function(f,r,m){
			$(f).validate({ 
				onsubmit:true,onchange:false,onblur:false,onfocus:false,onfocusout:false,focusin:false,onclick:false,onkeyup :false,
				ignore: ".ignore",
				rules: r, 
				messages:m,
				showErrors : function(errorMap, errorList) {
			       var msg = "";   
		           $.each(errorList, function(i,v){   
			           msg = (v.message+"\r\n");
			           if(msg){
			        	   alert(msg);
			        	   return false;
			           }
		           });   
		           		if(!msg){
		           		   var l=dataEx.getStyleList();
		 	        	   if(l.length>0){tool.setBackgroundStyle(l[0],'white');}
		           		}
		           },
		     	invalidHandler: function(form, validator) {  
		     		 var l=dataEx.getStyleList();
		     		 if(l.length>0){tool.setBackgroundStyle(l[0],'white');}
		     		 var errorList=validator.errorList;
		     		 var e=errorList[0].element;
		     		 tool.setBackgroundStyle(e,'rgba(246,2,250,0.21)')
		     		 dataEx.setStyleList(e);
		      		 return false; 
		          } 
			});
		},
		showModelDialog:function(p,b,w,h){
			var hm=FINALSTRING.ISEMPTY;
			var oj=$(FINALSTRING.IDS+p);
			if(b) {dataEx.setModelDialogHTML(FINALSTRING.IDS+p,oj.html());hm=oj.html();oj.html(FINALSTRING.ISEMPTY);tool.showModelDialogEnable(p,hm,w,h);}
			else {hm=dataEx.getModelDialogHTML(FINALSTRING.IDS+p);oj.html(FINALSTRING.ISEMPTY);tool.showModelDialogUnable(p,hm);}
		},
		setAttrValuePageLst:function(K,V){tool.setAttrValue2HTML(K,V);}
	});
})(jQuery);


/**
 * duanpeng
 * 2017-1-13
 */
function GET_REDIRECT_EMAILADDR(v){
	var hash={   
			'gmail.com': 'http://mail.google.com',   
			'sina.com': 'http://mail.sina.com.cn',   
			'163.com': 'http://mail.163.com',   
			'126.com': 'http://mail.126.com',   
			'qq.com': 'http://mail.qq.com', 
			'yeah.net': 'http://www.yeah.net/',   
			'sohu.com': 'http://mail.sohu.com/',   
			'tom.com': 'http://mail.tom.com/',   
			'sogou.com': 'http://mail.sogou.com/',   
			'139.com': 'http://mail.10086.cn/',   
			'hotmail.com': 'http://www.hotmail.com',   
			'live.com': 'http://login.live.com/',   
			'live.cn': 'http://login.live.cn/',   
			'live.com.cn': 'http://login.live.com.cn',   
			'189.com': 'http://webmail16.189.cn/webmail/',   
			'yahoo.com.cn': 'http://mail.cn.yahoo.com/',   
			'yahoo.cn': 'http://mail.cn.yahoo.com/',   
			'eyou.com': 'http://www.eyou.com/',   
			'21cn.com': 'http://mail.21cn.com/',   
			'188.com': 'http://www.188.com/',   
			'foxmail.coom': 'http://www.foxmail.com'   
		};
	for(var name in hash){
		if(name&&v&&v.indexOf(name)!=-1)
		return hash[name];
	}
	return 'null';
}


function cipherContent(c){
	c=c.split('');  //将a字符串转换成数组
	c.splice(3,3,'***');
	return c.join('');;
}

// 加入购物车动画
function SHOP_CART_MOVE(obj1,obj2,bgUrl){
	var scrollTop = $('body').scrollTop() || $(document).scrollTop();
        var nStartX = obj1.offset().left + 50,  
            nStartY = obj1.offset().top - scrollTop, 

            nEndX = obj2.offset().left,  
            nEndY = obj2.offset().top - scrollTop,

            nTopX = nEndX - 10,  
            nTopY = nEndY - 8;  
        var x = nStartX,
            y = nStartY;  

        //新建一个内容  
        var domGood = document.createElement('div');
        $(domGood).css({
            width:'50px',
            height:'50px',
            background : 'url(' + bgUrl + ') left top no-repeat',
            backgroundSize:'cover',
            position:'fixed',
            left:nStartX + 'px',
            top:nStartY + 'px',
            transform:'scale(1)',
            zIndex:99999999
        });
        $(domGood).animate({
            width:'80px',
            height:'80px',
            left:nStartX,
            top:nStartY - 150,
            opacity:'1',
            transform:'scale(1)'
        },100,function(){
            var nStartX_1 = obj1.offset().left + 50,  
                nStartY_1 = obj1.offset().top - scrollTop, 

                nEndX_1 = obj2.offset().left,  
                nEndY_1 = obj2.offset().top - scrollTop,

                nTopX_1 = nEndX_1 + 25,  
                nTopY_1 = nEndY_1 + 25;  

            $(domGood).animate({
                width:'10px',
                height:'10px',
                left:nTopX_1,
                top:nEndY_1,
                transform:'scale(0)'
            },1000,function(){
                setTimeout(function(){
                    domGood.parentNode.removeChild(domGood);    
                },10);
            }); 
        });

        document.body.appendChild(domGood);
        
}


//表单提交公共方法
function selectCommodityFormSubmit(pageNum,keywordStr,selectedStr,selectedCatgStr,
		orderStr,orderFlag,condition,conTypeStr){
	
	pageNum = pageNum == null ? $("#pageNum").val() : pageNum;
	keywordStr = keywordStr == null ? $("#keywordStr").val() : keywordStr;
	selectedStr = selectedStr == null ? $("#selectedStr").val() : selectedStr;
	selectedCatgStr = selectedCatgStr == null ? $("#selectedCatgStr").val() : selectedCatgStr;
	orderStr = orderStr == null ? $("#orderStr").val() : orderStr;
	orderFlag = orderFlag == null ? $("#orderFlag").val() : orderFlag;
	condition = condition == null ? $("#condition").val() : condition;
	conTypeStr = conTypeStr == null ? $("#conTypeStr").val() : conTypeStr;	
	
	$("#pageNum").val(pageNum);
	$("#keywordStr").val(keywordStr);
	$("#selectedStr").val(selectedStr);
	$("#selectedCatgStr").val(selectedCatgStr);
	$("#orderStr").val(orderStr);
	$("#orderFlag").val(orderFlag);
	$("#condition").val(condition);
	$("#conTypeStr").val(conTypeStr);	
	
	$("#searchForm").submit();
}
//表单提交公共方法
function selectCommodityFormSubmits(pageNum,keywordStr,selectedStr,selectedCatgStr, orderStr,orderFlag,condition,conTypeStr,label, menuId){
	
	pageNum = pageNum == null ? $("#pageNum").val() : pageNum;
	keywordStr = keywordStr == null ? $("#keywordStr").val() : keywordStr;
	selectedStr = selectedStr == null ? $("#selectedStr").val() : selectedStr;
	selectedCatgStr = selectedCatgStr == null ? $("#selectedCatgStr").val() : selectedCatgStr;
	orderStr = orderStr == null ? $("#orderStr").val() : orderStr;
	orderFlag = orderFlag == null ? $("#orderFlag").val() : orderFlag;
	condition = condition == null ? $("#condition").val() : condition;
	conTypeStr = conTypeStr == null ? $("#conTypeStr").val() : conTypeStr;	
	label = label == null ? $("#label").val() : label;
	menuId = menuId == null ? $("#menuId").val() : menuId;
	$("#pageNum").val(pageNum);
	$("#keywordStr").val(keywordStr);
	$("#selectedStr").val(selectedStr);
	$("#selectedCatgStr").val(selectedCatgStr);
	$("#orderStr").val(orderStr);
	$("#orderFlag").val(orderFlag);
	$("#condition").val(condition);
	$("#conTypeStr").val(conTypeStr);
	$("#label").val(label);	
	$("#menuId").val(menuId);
	
	$("#searchForm").submit();
}






