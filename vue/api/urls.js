let proxyURL = '/api'

//= ======= 币币交易 start========
export const symbolList = `${proxyURL}/spot/util/symbol.list`// 获取交易对
export const symbolList_realtime = `${proxyURL}/quote-realtime/util/symbol.list`// 获取行情交易对

export const depthList = `${proxyURL}/quote-realtime/quote/depth.list`//查询盘口数据

export const createAccount = `${proxyURL}/spot/auth/token/account.create`//创建账户token

export const createToken = `${proxyURL}/spot/auth/token.create`//创建token
export const createSession = `${proxyURL}/spot/auth/session.create`//创建Sesssion
export const createOrderId = `${proxyURL}/spot/order/orderId.create`//创建orderId
export const createPasswordToken = `${proxyURL}/sso/user/trade_password_verify` //签发交易密码token

export const accountInfo = `${proxyURL}/spot/account/info.query` //查询账户信息

export const balanceList = `${proxyURL}/spot/asset/balance.list` //查询资产信息


export const openList = `${proxyURL}/spot/order/open.list` //查询未成交的订单
export const cancelOrder = `${proxyURL}/spot/order/openOrder.cancel` //撤单
export const createOrder = `${proxyURL}/spot/order/newOrder.create` //创建订单
export const completedList = `${proxyURL}/spot/order/completed.list` //查询完全成交和已经撤单 /sso
export const filled = `${proxyURL}/spot/order/detail/filled.list` //查询交易明细


export const fabiCost = `${proxyURL}/content/rate/front/info.query` //法币估值



//K线

export const historicalTrailing = `${proxyURL}/quote-historical/quote/historical.trailing`//交易日级别以上行情数据 (追溯查询)
export const historicalTimeRange = `${proxyURL}/quote-historical/quote/historical.timeRange`//交易日级别以上行情数据 ((起止时间查询))
export const summarizedTimeRange = `${proxyURL}/quote-summarized/quote/summarized.timeRange`//交易日级别以下行情数据 (起止时间查询)

//= ======= 币币交易 end========


//=****************首页 start*******************//
export const announcementList =`${proxyURL}/content/content/announcement-list`//公告列表
// export const bannerList = `${proxyURL}/content/portal/front/banner.list`//轮播图
export const mineing = `${proxyURL}/content/portal/transaction.query`//昨日挖矿产出及全栈流通量
export const bannerList = `${proxyURL}/content/content/banner-list`//轮播图
// 首页banner图
export const userInfo = `${proxyURL}/sso/user/get_user_info`//用户信息
//=****************首页 end *******************//
//=============注册  start=============
export const  sendSms =  `${proxyURL}/sso/user/send`//发送验证码
export const ssoSend = `${proxyURL}/sso/user/sso.send`//登录后发送验证码
export const codeVerify = `${proxyURL}/sso/user/code_verify`//验证验证码
export const ssoCodeVerify = `${proxyURL}/sso/user/sso.codeVerify`//sso验证码验证
export const register = `${proxyURL}/sso/user/register`//注册
export const login = `${proxyURL}/sso/user/login`//登录
export const relatNameVerify = `${proxyURL}/sso/user/identify.query`//获取用户信息
export const userVerify = `${proxyURL}/sso/user/user_verify`//验证用户是否存在
export const googleLogin = `${proxyURL}/sso/user/googleCodeLogin`//谷歌验证
export const resetNewpass = `${proxyURL}/sso/user/reset`//重置密码
export const identify = `${proxyURL}/sso/user/identify.query`//查询实名认证状态
export const binding = `${proxyURL}/sso/security/bindingAccount`//绑定手机号或邮箱
export const verifyEmail = `${proxyURL}/sso/user/user_verify_email`//查询邮箱是否存在
export const restPasswordVerify = `${proxyURL}/sso/user/restPasswordVerify`//查询邮箱是否存在
export const resetLoginPasswordVerify = `${proxyURL}/sso/user/resetVerify`// 修改登录密码第一步
export const resetLoginPassword = `${proxyURL}/sso/user/reset`// 修改登录密码
export const emailRegister = `${proxyURL}/sso/user/register.email`// 邮箱注册
export const reSendEmail = `${proxyURL}/sso/user/register.reSendEmail`// 重新发送验证码
export const activationEmail = `${proxyURL}/sso/user/register.activation`// 激活成功
export const alreadyDividend = `${proxyURL}/content/portal/usdd/dividend.query`// 已经派的利息
export const loginHistory = `${proxyURL}/sso/log/login`//登录历史查询
//交易密码
export const TradingPasswordVerify = `${proxyURL}/sso/user/sso.restTradePasswordVerify`//验证code是否正确
export const setTradingPassword = `${proxyURL}/sso/user/set_trade_password`//设置交易密码
//绑定谷歌
export const queryGoogleURL = `${proxyURL}/sso/security/bindGoogle`//查询二维码
export const bindGoogle = `${proxyURL}/sso/security/bindingSecretKey`//绑定谷歌
export const unbindGoogle = `${proxyURL}/sso/security/unbindingSecretKey`//解绑
export const AndroidDownloadUrl = `${proxyURL}/content/app/getNewestVersion`//设置交易密码

/* f site add 货币交换汇率 start */
export const getLastRate = `https://f.daocoin.money/api/trust_publish/getLastCurrencyRate` //获取最新的汇率
/* 货币交换汇率 end*/







//**************** 注册  //


/*  挖矿  */
export const platform = `${proxyURL}/reconciliation/portal/mining/platform/transaction` //挖矿浮层平台数据
export const queryRewardFilledBuyBrief = `${proxyURL}/spot/asset/rewardFilledBuyBrief.query` //挖矿奖励查询
export const activityList = `${proxyURL}/spot/asset/activity.list` //资产变动情况查询
export const queryRewardLockedAssetBrief = `${proxyURL}/spot/asset/rewardLockedAssetBrief.query` //锁仓奖励概要查询
export const createLocked = `${proxyURL}/spot/asset/locked.create` //创建锁仓
export const listLocked = `${proxyURL}/spot/asset/locked.list` //锁仓历史查询

/*  挖矿  */

/*  资产  */
export const currencyList = `${proxyURL}/spot/util/currency.list` //币种列表
export const queryUsdt2usddUrl = `${proxyURL}/spot/activities/usdt2usdd.query` //查询概要信息
export const exchangeUsdt2usddUrl = `${proxyURL}/spot/activities/usdt2usdd.exchange` //兑换usdd
export const USDDInterest = `${proxyURL}/spot/asset/USDDInterest.query` //USDDInterest
export const realTime = `${proxyURL}/quote-realtime/quote/realTime.last`// 资产交易对行情
//充值
export const queryAddress = `${proxyURL}/spot/asset/deposit/address.query`// 充值地址
//提现
export const withdrawAddressList = `${proxyURL}/spot/util/address/withdraw.list`// 提现地址列表
export const verifyAddress = `${proxyURL}/spot/util/address.verify`// 币种地址规则
export const createWithdrawAddress = `${proxyURL}/spot/util/address/withdraw.create`// 添加提现地址
export const deleteWithdrawAddress = `${proxyURL}/spot/util/address/withdraw.delete`// 添加提现地址
export const withdrawCodeVerify = `${proxyURL}/sso/user/sso.withdraw.codeVerify`// 验证验证码
export const createWithdraw = `${proxyURL}/spot/asset/withdraw.create`// 验证验证码
export const createTicket = `${proxyURL}/spot/asset/ticket.create`//创建资产Ticket

/*  资产  */

/*  市场  */
export const currencyImg=`${proxyURL}/content/supervision/front/currency.list`   //币种图标
