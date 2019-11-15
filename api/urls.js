let proxyURL = '/api'
let proxyURLUser='/api/sso/user'
let proxyURLUcenter='/api/sso'

//= ======= 币币交易 start========
export const symbolList = `${proxyURL}/spot/util/symbol.list`// 获取交易对
export const symbolList_realtime = `${proxyURL}/quote-realtime/util/symbol.list`// 获取行情交易对

export const depthList = `${proxyURL}/quote-realtime/quote/depth.list`//查询盘口数据

export const createAccount = `${proxyURL}/spot/auth/token/account.create`//创建账户token

export const createToken = `${proxyURL}/spot/auth/token.create`//创建token
export const createSession = `${proxyURL}/spot/auth/session.create`//创建Sesssion
export const createOrderId = `${proxyURL}/spot/order/orderId.create`//创建orderId

export const accountInfo = `${proxyURL}/spot/account/info.query` //查询账户信息
export const balanceList = `${proxyURL}/spot/asset/balance.list` //查询资产信息

//订单
export const openList = `${proxyURL}/spot/order/open.list` //查询未成交的订单
export const cancelOrder = `${proxyURL}/spot/order/openOrder.cancel` //撤单
export const createOrder = `${proxyURL}/spot/order/newOrder.create` //创建订单
export const createGBBOOrder = `${proxyURL}/spot/order/newGbboOrder.create` //创建GBBO订单
export const completedList = `${proxyURL}/spot/order/completed.list` //查询完全成交和已经撤单 /sso
export const filled = `${proxyURL}/spot/order/detail/filled.list` //查询交易明细
export const completedList_v2 = `${proxyURL}/spot/order/completed.list_v2` //完成订单筛选
export const filledList_v2 = `${proxyURL}/spot/order/detail/filled.list_v2` //完成订单筛选

//收藏币种
export const queryFavoritesPair = `${proxyURL}/sso/favorites-pair/query-all` //收藏币种查询
export const updateFavoritesPair = `${proxyURL}/sso/favorites-pair/save-update-list` //收藏币种更新
export const deleteFavoritesPair = `${proxyURL}/sso/favorites-pair/delete` //收藏币种更新


//K线

export const historicalTimeRange = `${proxyURL}/quote-historical/quote/historical.timeRange`//交易日级别以上行情数据 ((起止时间查询))
export const summarizedTimeRange = `${proxyURL}/quote-summarized/quote/summarized.timeRange`//交易日级别以下行情数据 (起止时间查询)

// k线-new
export const klineHistory = `/quote/summarized.timeRange`




//=============注册  start=============
export const hashUrl = `${proxyURL}/sso/user/hash-password`//判断是否hash
// export const  sendSms =  `${proxyURL}/sso/user/send`//发送验证码
export const ssoSend = `${proxyURL}/sso/user/sso.send`//登录后发送验证码
export const codeVerify = `${proxyURL}/sso/user/code_verify`//验证验证码
export const ssoCodeVerify = `${proxyURL}/sso/user/sso.codeVerify`//sso验证码验证
export const ssoGoogleVerify = `${proxyURL}/sso/user/sso.googleVerify`//发送 API申请 谷歌验证码
export const userVerify = `${proxyURL}/sso/user/user_verify`//验证用户是否存在
export const resetNewpass = `${proxyURL}/sso/user/reset`//重置密码
export const identify = `${proxyURL}/sso/user/identify.query`//查询实名认证状态
export const binding = `${proxyURL}/sso/security/bindingAccount`//绑定手机号或邮箱
export const verifyEmail = `${proxyURL}/sso/user/verify_user_new_email`//查询邮箱是否存在
export const restPasswordVerify = `${proxyURL}/sso/user/restPasswordVerify`//查询邮箱是否存在

export const loginHistory = `${proxyURL}/sso/log/login`//登录历史查询
export const userNameUnique = `${proxyURL}/sso/new-user/query-unique-name/`//登录
//交易密码
export const TradingPasswordVerify = `${proxyURL}/sso/user/sso.restTradePasswordVerify`//验证code是否正确
export const queryTradePasswordOpen = `${proxyURL}/sso/new-user/query-open-trade-password`// 查询是否开启交易密码
export const setOpenTradePassword = `${proxyURL}/sso/new-user/set-open-trade-password`// 设置开启与否
export const createPasswordToken = `${proxyURLUser}/verify-trade-password` //验证交易密码
export const FFfee = `${proxyURL}/spot/account/commissionFFDeductible.update`//手续费折扣

//****************新的用户系统重构接口 */
export const emailRegister = `${proxyURLUser}/email-register`// 邮箱注册
export const register = `${proxyURLUser}/phone-register`//手机注册
export const sendSms = `${proxyURLUser}/register-phone-code`//注册发送验证码
export const reSendEmail = `${proxyURLUser}/resend-register-email`// 重新发送邮件
export const activationEmail = `${proxyURLUser}/email-activation`// 激活成功
export const userStatus = `${proxyURLUser}/get-user-state`// 查询用户状态
export const login = `${proxyURLUser}/login`//登录
export const googleLogin = `${proxyURLUser}/login-google`//登录
export const businessSend = `${proxyURLUser}/send-business-code`//业务发送验证码
export const queryGoogleURL = `${proxyURLUser}/get-google-key`//查询二维码
export const verifyBusinessCode = `${proxyURLUser}/verify-business-code`//验证验证码
export const resetLoginPassword = `${proxyURLUser}/reset-password`//重置登录密码
export const bindGoogle = `${proxyURLUser}/bind-google`//绑定谷歌
export const unbindGoogle = `${proxyURLUser}/unbind-google`//解绑
export const resetLoginPasswordVerify = `${proxyURLUser}/verify-password`// 验证原登录密码是否正确
export const bindSend = `${proxyURLUser}/send-bind-code`//绑定手机，邮箱发送验证码
export const userInfo = `${proxyURLUser}/get-user-info`//查询用户信息
export const setTradingPassword = `${proxyURLUser}/set-trade-password`//设置交易密码
export const switchTradingPassword = `${proxyURLUser}/switch-trade-password`//开启交易密码
export const logout = `${proxyURLUser}/logout`//退出
export const identifyInfo = `${proxyURLUcenter}/identify/get-info`//实名认证查询
export const identifyPhoto = `${proxyURLUcenter}/identify/get-pub-url`//查询图片地址
//**************** 注册  //


export const activityList = `${proxyURL}/spot/asset/activity.list` //资产变动情况查询

export const currencyList = `${proxyURL}/spot/util/currency.list` //币种列表
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
export const currencyImg=`${proxyURL}/content/supervision/front/currency.list`   //币种图标

//社交
export const socialToken = `${proxyURL}/sso/social/get-token`//social token

//实名认证
export const identifySubmitUrl = `${proxyURLUcenter}/identify/submit` //实名认证表单提交
export const identifyUpdateUrl = `${proxyURLUcenter}/identify/update` //实名认证表单修改
export const uploadPic = `${proxyURLUcenter}/identify/upload`//上传图片

