/************************************************************************
 * -----------------------  DataExchange duanpeng  -------------------- *
 ************************************************************************/

var FINALSTRING={
		INPUT_TYPE:'INPUT',
		SELECT_TYPE:'SELECT',
		TEXTAREA_TYPE:'TEXTAREA',
		TEXT:'text',
		CHECKBOX:'checkbox',
		Radio:'radio',
		SPORT:".",
		IDX:"Idx",
		UNLINE:"_",
		_METHOD:"_method",
		POST:"post",
		GET:"get",
		PUT:"put",
		DELETE:"delete",
		charsetEncode:"_input_charset=utf-8",
		selectDefaut:'-- 请选择 --',
		selectTagName:'SELECT',
		inputType:['checkBox','checkbox','radio'],
		indexType:['index'],
		enableCN:'正常',
		deleteCN:'作废',
		unUploadCN:'未上传',
		FUNCTIONTYPE:'function',
		METHODTYPE:'(this)',
		CHANGE:'change',
		ONCHANGE:'onchange',
		MOVEHOVER:'#resultTable .moveHover',
		ISEMPTY:'',
		ISNULL:null,
		LOO:'100%',
		PX:'px',
		IDS:'#',
		OP:'op',
		DIA:'dia',
		SHOWBLOCK:'block',
		SHOWNONE:'none',
		AUTO:'auto',
		HIDDREN:'hidden',
		MODELDIALOG:function(w,h){w=parseInt(w);h=parseInt(h);return '<div id="dia" style="width:'+w+'%;height:'+h+'%;position:absolute;left:'+(100-w)/2+'%;top:'+((document.documentElement.scrollTop+$(document.body)[0].scrollTop)+(100-h)*2.7)+'px;background:#F6FDFA;z-index: 1000;overflow:auto;border:1px solid #93B5AC;display:none"></div>';},
		MODELDIALOGBACKGROUD:function(){var wd=$(window.screen)[0].availWidth>$(document.body)[0].scrollWidth?FINALSTRING.LOO:($(window.screen)[0].availWidth)+FINALSTRING.PX;var ht=$(window.screen)[0].availHeight>$(document.body)[0].scrollHeight?FINALSTRING.LOO:($(document.body)[0].scrollHeight)+FINALSTRING.PX;return '<div id="op" style="width:'+wd+';height:'+ht+';position:absolute;background: gray;filter:alpha(opacity=70);-moz-opacity:0.7;opacity:0.7;z-index: 999;display:none"></div>';}
}


function DataExchange(){
	this.setProdCach=SET_PRODCACH;
	this.getProdCach=GET_PRODCACH;
	this.styleList=new Array();
	this.concatList=new Array();
	this.setStyleList=SET_STYLE_LIST;
	this.getStyleList=GET_STYLE_LIST;
	this.setConcatList=SET_CONCAT_LIST;
	this.getConcatList=GET_CONCAT_LIST;
	this.paramData=new Object();
	this.setparamData=SET_PARAM_DATA;
	this.getparamData=GET_PARAM_DATA;
	this.callbackFunction=new Object();
	this.setCallbackFuntion=SET_CALLBACK_FUNTION;
	this.getCallbackFuntion=GET_CALLBACK_FUNTION;
	this.modelDialogHTML=new Object();
	this.setModelDialogHTML=SET_MODEL_DIALOGHTML;
	this.getModelDialogHTML=GET_MODEL_DIALOGHTML;
	
}

var dataEx = new DataExchange();


function SET_PRODCACH(prodCach){this.prodCach=prodCach;}

function GET_PRODCACH(){return this.prodCach;}

function SET_STYLE_LIST(obj){this.styleList=[];this.styleList[this.styleList.length]=obj;}

function GET_STYLE_LIST(){return this.styleList;}

function SET_CONCAT_LIST(arr){this.concatList = this.concatList.concat(arr);}

function GET_CONCAT_LIST(){return this.concatList;}

function SET_PARAM_DATA(paramData,idx){this.paramData[idx]=paramData;}

function GET_PARAM_DATA(idx){return this.paramData[idx];}

function SET_CALLBACK_FUNTION(callbackFunction,idx){this.callbackFunction[idx]=callbackFunction;}

function GET_CALLBACK_FUNTION(idx){return this.callbackFunction[idx];}

function SET_MODEL_DIALOGHTML(idx,modelDialogHTML){this.modelDialogHTML[idx]=modelDialogHTML;}

function GET_MODEL_DIALOGHTML(idx){return this.modelDialogHTML[idx];}


