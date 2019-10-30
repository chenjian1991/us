/*
 * @Author: LL 
 * @Date: 2018-03-06 10:06:28 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-14 15:23:40
 */

import { storage,getDecimalsNum,getUTCDay,getUTCHour,getUTCMinutes,getUTCHour_S} from "@/lib/utils"
import { getHistoricalTimeRange,getSummarizedTimeRange} from '_api/exchange'
const Datafeeds = {}
let KlineSSE= null
let KlineSSECount = 0
Datafeeds.UDFCompatibleDatafeed = function() {
    // 默认配置
    // https://b.aistock.ga/books/tradingview/book/JS-Api.html
    this._configuration = undefined;

    // 商品信息
    // this._symbol = symbol;

    // 初始化
    this._initialize();

}

Datafeeds.UDFCompatibleDatafeed.prototype._initialize = function () {
    this._configuration = this._defaultConfiguration();
}

Datafeeds.UDFCompatibleDatafeed.prototype._defaultConfiguration = function() {
    return {
        supports_search: true,
        supports_group_request: false,
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: true,
        supported_resolutions: ['1','5','15','30','60','240','D','W'],
    };
};

Datafeeds.UDFCompatibleDatafeed.prototype._resolveData = function(response) {
    let bars = [];
    let meta = {
        noData: false,
    };
    if (response.status === 'ERROR' || response.data.length === 0) {
        meta.noData = true;
    } else {
        for (let i = 0; i < response.data.length; ++i) {
            let barValue = {
                time: response.data[i].openDate || response.data[i].openDateTime,
                close: Number(response.data[i].close),
                open: Number(response.data[i].open),
                high: Number(response.data[i].high),
                low: Number(response.data[i].low),
                volume : Number(response.data[i].volume)
            };
            bars.push(barValue);
        }
    }
    return ({
        bars: bars.reverse(),
        meta: meta,
    });
}


/* API START */
/* 
 * callback function(configurationData)
 * 此方法旨在提供填充配置数据的对象。这些数据会影响图表的行为表现，所以它被调用在服务端定制。
 * 图表库要求您使用回调函数来传递datafeed的configurationData参数。
 */
Datafeeds.UDFCompatibleDatafeed.prototype.onReady = function(callback) {
    if(this._configuration) {
        setTimeout(() => {
            callback(this._configuration);
        }, 0);
        
    } else {
        // TODO 异步获取
        // wsRequest('kline_config').then(response => {
        //     this._configuration = response.data;
        //     callback(this._configuration);
        // })
    }
}

/* 
 * symbolName <String> 商品名称或ticker
 * onSymbolResolvedCallback function(SymbolInfo)
 * onResolveErrorCallback function(reason)
 */
Datafeeds.UDFCompatibleDatafeed.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    let currentSymbolObj = storage.get('currentSymbolObj')
    if(!currentSymbolObj){
        onResolveErrorCallback('unknown_symbol');
    }else{
        setTimeout(() => {
            let long = getDecimalsNum(currentSymbolObj.priceTickSize)
            let response =  {
                name: symbolName,
                description: symbolName,
                // 布尔值显示商品是否具有日内（分钟）历史数据。 如果它为false，则当图表中的该商品处于活动状态时，日内周期的所有按钮将被禁用。 如果设置为true，则由datafeed直接提供的所有周期必须在intraday_multipliers数组中设定。
                has_intraday: true,//否具有日内（分钟）历史数据
                has_no_volume: false,//是否有成交量的数据
                has_daily:true,
                minmov: 1,
                minmov2: 0,
                intraday_multipliers:['1','60','120','240','360','480','720'],
                // pointvalue: 1,
                exchange:'',
                pricescale: Math.pow(10,long),
                session: "24x7",
                supported_resolutions: ['1','5','15','30','60','120','240','360','480','720','D','W'],
                ticker:symbolName,
                timezone: "Asia/Shanghai",
                type: 'bitcoin',
                has_daily:true,
                volume_precision:'4',//成交量精确度
                has_empty_bars:false
            }
            onSymbolResolvedCallback(response);
        })
    }
    // let response = {
    //     name: 'BTC/USDT',
    //     ticker: 'BTC/USDT',
    //     description: '描述',
    //     session: '24x7',
    //     timezone: "UTC",
    //     minmov: 1,
    //     pricescale: 100,
    //     has_intraday: true,
    //     has_daily: true,
    //     has_weekly_and_monthly: false,
    //     // supported_resolutions: ['1', '5', '10', '30', '1H', '1D'],
    // }
    
}

/* 
 * symbolInfo:SymbolInfo 商品信息对象
 * resolution: string （分辨率）
 * from: unix 时间戳, 最左边请求的K线时间
 * to: unix 时间戳, 最右边请求的K线时间
 * onHistoryCallback: function(数组bars,meta={ noData = false })
 * -- bars: Bar对象数组{time, close, open, high, low, volume}[]
 * -- meta: object{noData = true | false, nextTime = unix time}
 * onErrorCallback: function(reason：错误原因)
 * firstDataRequest: 布尔值，以标识是否第一次调用此商品/分辨率的历史记录。当设置为true时 你可以忽略to参数（这取决于浏览器的Date.now()) 并返回K线数组直到当前K线（包括它）。
 * 方法介绍：通过日期范围获取历史K线数据。图表库希望通过onHistoryCallback仅一次调用，接收所有的请求历史。而不是被多次调用。
 * 发生不断自动刷新图表问题时，请检查from与onHistoryCallback方法返回的bars时间是否一致，没有数据时请返回noData = true
 * nextTime历史中下一个K线柱的时间。 只有在请求的时间段内没有数据时，才应该被设置。
 * noData只有在请求的时间段内没有数据时，才应该被设置。
 * bar.time为以毫秒开始的Unix时间戳（UTC标准时区）。
 * bar.time对于日K线预期一个交易日 (未开始交易时) 以 00:00 UTC为起点。 图表库会根据商品的交易（Session）时间进行匹配。
 * bar.time对于月K线为这个月的第一个交易日，除去时间的部分。
 */
Datafeeds.UDFCompatibleDatafeed.prototype.getBars = function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
    let type = '';
    switch (resolution) {
        case 'D':
            type = 'DAY';
            let startDate = getUTCDay(from)
            let endDate = getUTCDay(to)
            //日级别以上接口
            getHistoricalTimeRange({
                symbol:symbolInfo.description,
                interval:type,
                startDate:startDate,
                endDate:endDate
            }).then(response => {
                const data = this._resolveData(response);
                onHistoryCallback(data.bars, data.meta);
            })
            break;
        case '60'://查询小时历史
            type = 'HOUR_1';
            getSummarizedTimeRange({
                symbol:symbolInfo.description,
                interval:type,
                startDateTime:getUTCHour(from),
                endDateTime:getUTCHour(to)
            }).then(response => {
                // console.log('分钟K',response)
                const data = this._resolveData(response);
                onHistoryCallback(data.bars, data.meta);
            })
            break;
        case '120'://查询2小时历史
            type = 'HOUR_2';
            getSummarizedTimeRange({
                symbol:symbolInfo.description,
                interval:type,
                startDateTime:getUTCHour_S(from,2),
                endDateTime:getUTCHour_S(to,2)
            }).then(response => {
                // console.log('分钟K',response)
                const data = this._resolveData(response);
                onHistoryCallback(data.bars, data.meta);
            })
            break;
        case '240'://查询4小时历史
            type = 'HOUR_4';
            getSummarizedTimeRange({
                symbol:symbolInfo.description,
                interval:type,
                startDateTime:getUTCHour_S(from,4),
                endDateTime:getUTCHour_S(to,4)
            }).then(response => {
                // console.log('分钟K',response)
                const data = this._resolveData(response);
                onHistoryCallback(data.bars, data.meta);
            })
            break;
        case '360'://查询6小时历史
            type = 'HOUR_6';
            getSummarizedTimeRange({
                symbol:symbolInfo.description,
                interval:type,
                startDateTime:getUTCHour_S(from,6),
                endDateTime:getUTCHour_S(to,6)
            }).then(response => {
                // console.log('分钟K',response)
                const data = this._resolveData(response);
                onHistoryCallback(data.bars, data.meta);
            })
            break;
        case '480'://查询8小时历史
            type = 'HOUR_8';
            getSummarizedTimeRange({
                symbol:symbolInfo.description,
                interval:type,
                startDateTime:getUTCHour_S(from,8),
                endDateTime:getUTCHour_S(to,8)
            }).then(response => {
                // console.log('分钟K',response)
                const data = this._resolveData(response);
                onHistoryCallback(data.bars, data.meta);
            })
            break;
        case '720'://查询小时历史
            type = 'HOUR_12';
            getSummarizedTimeRange({
                symbol:symbolInfo.description,
                interval:type,
                startDateTime:getUTCHour_S(from,12),
                endDateTime:getUTCHour_S(to,12)
            }).then(response => {
                // console.log('分钟K',response)
                const data = this._resolveData(response);
                onHistoryCallback(data.bars, data.meta);
            })
            break;            
        case '1':
            type = 'MINUTE_1';
            getSummarizedTimeRange({
                symbol:symbolInfo.description,
                interval:type,
                startDateTime:getUTCMinutes(from),
                endDateTime:getUTCMinutes(to)
            }).then(response => {
                const data = this._resolveData(response);
                onHistoryCallback(data.bars, data.meta);
            })
            break;
    }
//    $('#chartloading').hide()


    // onErrorCallback(reason)
    // console.log()
    // onHistoryCallback({
    //     "t": [1535644800, 1535644800, 1535644800, 1535644800, 1535644800, 1535644800, 1535644800, 1535644800, 1486339200, 1486425600, 1486512000, 1486598400, 1486684800],
    //     "o": [120.42, 121.67, 122.14, 120.93, 121.15, 127.03, 127.975, 128.31, 129.13, 130.54, 131.35, 131.65, 132.46],
    //     "h": [122.1, 122.44, 122.35, 121.63, 121.39, 130.49, 129.39, 129.19, 130.5, 132.09, 132.22, 132.445, 132.94],
    //     "l": [120.28, 121.6, 121.6, 120.66, 120.62, 127.01, 127.78, 128.16, 128.9, 130.45, 131.22, 131.12, 132.05],
    //     "c": [121.88, 121.94, 121.95, 121.63, 121.35, 128.75, 128.53, 129.08, 130.29, 131.53, 132.04, 132.42, 132.12],
    //     "v": [32586673, 26337576, 20562944, 30377503, 49200993, 111985040, 33710411, 24507301, 26845924, 38183841, 23004072, 28349859, 20065458],
    //     "s": "ok"
    // })
}
Datafeeds.UDFCompatibleDatafeed.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    let SSEcache = null
    let url= ''
    const baseURL =  (window.location.protocol == 'http:') ? 'ws://' : 'wss://';
    const host =  window.location.host;
    switch (resolution) {
        case "1":
            url = `${baseURL}${host}/quote/summarized.ws?symbol=${symbolInfo.description}&interval=MINUTE_1`
            break;
        case "60":
            url = `${baseURL}${host}/quote/summarized.ws?symbol=${symbolInfo.description}&interval=HOUR_1`
            break;
        case "120":
            url = `${baseURL}${host}/quote/summarized.ws?symbol=${symbolInfo.description}&interval=HOUR_2`
            break;
        case "240":
            url = `${baseURL}${host}/quote/summarized.ws?symbol=${symbolInfo.description}&interval=HOUR_4`
            break;
        case "360":
            url = `${baseURL}${host}/quote/summarized.ws?symbol=${symbolInfo.description}&interval=HOUR_6`
            break;
        case "480":
            url = `${baseURL}${host}/quote/summarized.ws?symbol=${symbolInfo.description}&interval=HOUR_8`
            break;
        case "720":
            url = `${baseURL}${host}/quote/summarized.ws?symbol=${symbolInfo.description}&interval=HOUR_12`
            break;       
        case "D":
            url = `${baseURL}${host}/quote/historical.ws?symbol=${symbolInfo.description}&interval=DAY`
            break;
        default:
            break;
    }
    KlineSSE && KlineSSE.close()
    KlineSSE = new ReconnectingWebSocket(url)
    KlineSSE.onopen = function(e) {
        //  console.log("K线行情推送连接已经建立：", this.readyState);
    };
    KlineSSE.onmessage = (e) => {
        if (KlineSSECount !== 0) KlineSSECount = 0
        //每次推送一条记录
        let data = JSON.parse(e.data)
        if (data.ping != undefined) {
            var pongResponse = {};
            pongResponse.pong = data.ping;
            KlineSSE.send(JSON.stringify(pongResponse))
            return;
        }
            //快照去重
        if(SSEcache && SSEcache.dateTime == data.dateTime && SSEcache.volume == data.volume){
            return;
        }else{
            let lastK = {
                time: data.openDateTime || data.openDate,
                close: data.close,
                open: data.open,
                high: data.high,
                low: data.low,
                volume : data.volume
            }
            SSEcache = lastK
            onRealtimeCallback(lastK)
        }
    }

    KlineSSE.onerror = (event) => {
        KlineSSE.close()
        if (KlineSSECount > 5) return
        setTimeout(function(){
            KlineSSECount += 1
            KlineSSE = new ReconnectingWebSocket(url)
        }.bind(this),3000)
    };
}
Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeBars = function (listenerGuid) {
    // socket.off('klineNotify')
    KlineSSE && KlineSSE.close()
}

Datafeeds.UDFCompatibleDatafeed.prototype.calculateHistoryDepth = function (resolution, resolutionBack, intervalBack) {
    switch(resolution){
        case 'D':
            return {
                resolutionBack: 'D',
                intervalBack: 150
            };
        case 'W':
            return {
                resolutionBack: 'D',
                intervalBack: 100
            };
        case '60':
            return {
                resolutionBack: 'D',
                intervalBack: 10
            };
        case '120':
            return {
                resolutionBack: 'D',
                intervalBack: 30
            };
        case '240':
            return {
                resolutionBack: 'D',
                intervalBack: 40
            };
        case '360':
            return {
                resolutionBack: 'D',
                intervalBack: 50
            };
        case '480':
            return {
                resolutionBack: 'D',
                intervalBack: 70
            };
        case '720':
            return {
                resolutionBack: 'D',
                intervalBack: 100
            };
        case '1':
            return {
                resolutionBack: 'D',
                intervalBack: 1
            };
        case '5':
            return {
                resolutionBack: 'D',
                intervalBack: 3
            };
        case '15':
            return {
                resolutionBack: 'D',
                intervalBack: 3
            };
        case '30':
            return {
                resolutionBack: 'D',
                intervalBack: 4
            };
        default:
            // return {
            //     resolutionBack: 'D',
            //     intervalBack: 5
            // };
    }

};

Datafeeds.UDFCompatibleDatafeed.prototype.getServerTime = function (callback) {
    // console.log(123123,'serverTIme')
    // wsRequest('server_time').then(response => {
    //     callback(response);
    // })
    // callback(moment().utc())
}

/* API END */

export default {
    UDFCompatibleDatafeed: Datafeeds.UDFCompatibleDatafeed
};





