import {getApi} from './axios'
import {userStatus} from './urls'

export const queryUserStatus = (params)=>{
    return getApi(userStatus, params);
}
export const onloadCallback = (id,successCallback,expiredCallback,errorCallback) =>{
                if(grecaptcha.render){
                    console.log('render success');
                }
                let widgetId=grecaptcha.render(id, {
                    'sitekey': '6Le62qUUAAAAAN9EITa_yLNUKThYL0X7sBjZ_hBo',
                    "theme":'light',
                    "size":'normal',
                    'callback': function (data) {//验证成功回调函数
                        if(data.length!==0){
                            successCallback(data,widgetId);
                            setTimeout(() => {
                                grecaptcha.reset(widgetId);//重置谷歌验证
                            }, 1500);
                        }
                    },
                    "expired-callback":function(error){//验证失效回调函数
                        expiredCallback(error)
                        console.log('expired-callback')
                    },
                    "error-callback":function(error){//因为网络等问题无法验证，通过回调函数提醒用户重试
                        errorCallback(error)
                        console.log('error-callback')
                    },

                    });
                    return widgetId;
}
export const geeTest = (id,interactive,successFun,closeFunc)=>{
    Sense.onClose(function(){
        closeFunc()
    })
    Sense.judge({
        id: id,       
        interactive: interactive, //场景
        area: '#area', // 如果有验证码，可以设置验证码的位置
        bg_color: 'red', // 如果有验证码，可以设置验证码的背景颜色
        width: '310px',  // 如果有验证码，可以设置验证码的宽度
        lang:localStorage.getItem('countryLanguage')
        }, 
        (data)=>{
                successFun(data.challenge)
        },
        (err)=>{
                if(err.code === '2001'){
                    Sense.load(function(){
                        Sense.judge({
                            id: id,                
                        }, 
                        (data)=>{
                             successFun(data.challenge)
                        });
                    })
            }
        }

    )


}