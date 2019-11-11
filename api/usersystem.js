import {getApi} from './axios'
import {userStatus} from './urls'

export const queryUserStatus = (params)=>{
    return getApi(userStatus, params);
}
export const geeTest = (id,interactive,successFun)=>{
    debugger
    Sense.onClose(function(){
        debugger
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