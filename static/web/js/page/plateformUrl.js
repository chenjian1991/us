var Constants = {
	plateformShowUrl : "/api/"
}

var api = {
     signUp : Constants.plateformShowUrl+'/sso/user/register',//注册
     sendSms : Constants.plateformShowUrl+'/sso/user/send',//发送验证码
     verityCode :Constants.plateformShowUrl+"/sso/user/code_verify",//验证验证码
     login:Constants.plateformShowUrl+"/sso/user/login",//登录
     getUserInfo : Constants.plateformShowUrl+"/sso/user/get_user_info",//获取用户信息,
     userVertify:Constants.plateformShowUrl+"/sso/user/user_verify",//检验用户是否存在
     resetPassword:Constants.plateformShowUrl+'/sso/user/reset',//重置密码
     TradingPasswordVerify:Constants.plateformShowUrl+'/sso/user/sso.codeVerify',//验证交易密码
     TradingPasswordVerifynew:Constants.plateformShowUrl+'/sso/user/sso.restTradePasswordVerify',//验证交易密码是否正确
     setTradingPassword:Constants.plateformShowUrl+'/sso/user/set_trade_password',//设置交易密码
     authentication:Constants.plateformShowUrl+'/sso/user/identify',//实名认证
     identify:Constants.plateformShowUrl+'/sso/user/identify.query',//查询实名认证
     tradeSend:Constants.plateformShowUrl+'/sso/user/sso.send',//交易密码
	 resetlogpasswordFirststep:Constants.plateformShowUrl+'/sso/user/resetVerify',//修改登陆密码第一步
     resetloginPassword:Constants.plateformShowUrl+'/sso/user/reset',//修改登陆密码
     
     
}



function sendPostRequestByJsonObj(reqUrl,jsonObj,callBackFun){
	var token = Cookies.get('loginToken')
	$.ajax({
		url:reqUrl,
		type:"post",
		data:JSON.stringify(jsonObj),
		dataType:'json',
        timeout:30000,
        beforeSend:function(xhr){
			xhr.setRequestHeader("token", token);
			xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		},
		success:function(data,xhr,textStatus){
			if(callBackFun){
				callBackFun(data,xhr,textStatus)
			}
		},
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
                 var lan = localStorage.getItem('countryLanguage')
                if(lan=='zh-CN'){
                    layer.msg('<div name="timeout">请求超时</div>')
                }else {
                    layer.msg('<div name="timeout">Request Timeout</div>')
                }
            }
        },
		error:function(data,xhr,textStatus){
			console.log(data);

		}
	})
}


function sendPostNoTokenJsonObj(reqUrl,jsonObj,callBackFun){
    $.ajax({
        url:reqUrl,
        type:"post",
        data:{fields:jsonObj},
        dataType:'json',
        // beforeSend:function(xhr){
        //     xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        // },
        success:function(data,xhr,textStatus){
            if(callBackFun){
                callBackFun(data,xhr,textStatus)
            }
        },
        error:function(data,xhr,textStatus){
            console.log(data);

        }
    })
}


function sendPostJsonObj(reqUrl,jsonObj,callBackFun){
    $.ajax({
        url:reqUrl,
        type:"post",
        data:jsonObj,
        dataType:'json',
        // beforeSend:function(xhr){
        //     xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        // },
        success:function(data,xhr,textStatus){
            if(callBackFun){
                callBackFun(data,xhr,textStatus)
            }
        },
        error:function(data,xhr,textStatus){
            console.log(data);

        }
    })
}







function sendGetRequest(reqUrl,callBackFun){
	var token = Cookies.get('loginToken')
	$.ajax({
		url:reqUrl,
		type:"GET",
		dataType:'json',
		cache:true,
		beforeSend:function(xhr){
			xhr.setRequestHeader("token", token);
			xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		},
		success:function(data,xhr,status){
			if(callBackFun){
				callBackFun(data,status)
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			console.log(XMLHttpRequest)
		}
	})
}




function sendGetRequestByJsonObj(reqUrl,jsonObj,callBackFun){
	//var token = Cookies.get('loginToken')
	$.ajax({
		url:reqUrl,
		type:"GET",
		data:jsonObj,
		dataType:'json',
		cache:true,
		async:true,
		beforeSend:function(xhr){
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
		},
		success:function(data,xhr,status){
			if(callBackFun){
				callBackFun(data,status)
			}
		}
	})
}


