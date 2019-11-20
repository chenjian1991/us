<template>
  <div class="gbboline">
    <div class="gbboline-btns">
      <button class="gbboline-btns__settime" @click="restoreDefault()">Restores</button>
      <button class="gbboline-btns__settime">m</button>
      <button class="gbboline-btns__settime">H</button>
      <button class="gbboline-btns__settime">1D</button>
      <button class="gbboline-btns__settime">1W</button>
      <button class="gbboline-btns__settime">1M</button>
    </div>
    <div ref="kline" class="gbboline-box">

    </div>
  </div>
</template>
<script>
import { createChart, LineStyle } from 'lightweight-charts'
import { getKlineHistoryData } from '_api/exchange'

export default {
  name: 'GBBOKLine',
  data() {
    return {
      flogCount: 30,
      month: 11,
      year: 2019,
      isInited: false,
      kline: {
        highData: [],
        lowData: [],
        marketData: []
      },
      _timestamp: '',
      _chart: '',
      _areaSeries: '',
      _extraSeries: '',
      _barSeries: ''
    }
  },
  props: {
    currentSymbol: {
      type: String,
      default: "BTCUSD"
    },
    kLineData: {
      type: Object,
      default: function(){
        return {}
      }
    }
  },
  watch: {
    kLineData(val, oldVal){
      if(Object.keys(val).length > 0){
        this.updateData(val)
      }
    }
  },
  created(){
    this.getHistoryData()
  },
  mounted(){
    const { highData, lowData, marketData } = this.kline
    for(var i=1; i<this.flogCount; i++){
      const _time = `2019-11-${this.addZero(i)}`
      const hightVal = Math.floor(Math.random() * (999 - 600)) + 600
      const lowVal = Math.floor(Math.random() * (599 - 200)) + 200
      highData.push({
        time: _time,
        value: hightVal
      })
      lowData.push({
        time: _time,
        value: lowVal
      })
      marketData.push({
        time: _time,
        value: (hightVal + lowVal) / 2
      })
    }
    this.klineInit()
    // this.connect()
  },
  methods: {
    updateData(val){
      const { high, low, ma, dateTime } = val
      const time = +`${new Date(dateTime).getTime()}`.replace(/.{3}$/, '')

      this._areaSeries.update({
        time,
        value: high
      })
      this._extraSeries.update({
        time,
        value: low
      })
      this._barSeries.update({
        time,
        value: ma
      })
    },
    restoreDefault(){
      this._chart.timeScale().scrollToRealTime()
    },
    // K线初始化
    klineInit() {
      const { highData, lowData, marketData } = this.kline
      const baseDom = this.$refs.kline
      const klineBox = {
        width: baseDom.offsetWidth,
        height: baseDom.offsetHeight
      }
      console.log('klineBox', klineBox);
      
      this._chart = createChart(baseDom, {
        width: klineBox.width,
        height: klineBox.height,
        priceScale: {
          mode: 1,
        },
        localization: {
          locale: 'en-US', // 语言
          // dateFormat: 'yyyy/MM/dd', // 日期显示格式
        },
        timeScale: {
          timeVisible: true,
          // visible: true,  // 横坐标是否显示时间坐标
          secondsVisible: false,
          // rightOffset: 0,
          // barSpacing: 6,  // 横坐标间隔
          // borderColor: 'rgba(197, 203, 206, 0.4)',
        },
        layout: {
          backgroundColor: '#07141A',
          textColor: '#ffffff',
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.4)',
            style: LineStyle.Dotted,
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.4)',
            style: LineStyle.Dotted,
          },
        },
      });

      // 最高
      this._areaSeries = this._chart.addLineSeries({
        color: "#2CB48C",
        crosshairMarkerVisible: true,
        lineWidth: 2
      });
      // 最低
      this._extraSeries = this._chart.addLineSeries({
        color: "#E83160",
        lineWidth: 2
      });
      // 平均
      this._barSeries = this._chart.addLineSeries({
        lineStyle: 1,
        color: "#fff",
        lineWidth: 1
      })
      // console.log('hight:', highData, 'low:', lowData, 'marketData:', marketData)
      // this._areaSeries.setData(highData)
      // this._extraSeries.setData(lowData)
      // this._barSeries.setData(marketData)
      // this._areaSeries.setData()
      // this._extraSeries.setData()
      // this._barSeries.setData()
      
      // Automatically calculates the visible range to fit all series data.
      // this._chart.timeScale().fitContent()

      // 实时更新数据
      // this._timestamp = setInterval(() => {
      //   // console.log(this.flogCount)
      //   const time = this.timeFormat()
      //   const hightVal = Math.floor(Math.random() * (999 - 600)) + 600
      //   const lowVal = Math.floor(Math.random() * (599 - 200)) + 200
      //   this._areaSeries.update({
      //     time,
      //     value: hightVal
      //   })
      //   this._extraSeries.update({
      //     time,
      //     value: lowVal
      //   })
      //   this._barSeries.update({
      //     time,
      //     value: (hightVal + lowVal) / 2
      //   })
      // }, 3000)
      
    },
    setHistoryData(res) {
      // const { high, low, dateTime } = res
      const time = new Date(dateTime).getTime() / 1000
      this._areaSeries.setData({
        time,
        value: high
      })
      this._extraSeries.setData({
        time,
        value: low
      })
      this._barSeries.setData({})
    },
    timeFormat(){      
      if(this.flogCount > 30){
        this.flogCount = 1
        if(this.month === 12){
          this.month = 1
          this.year += 1
        } else {
          this.month += 1
        }        
      }else{
        this.flogCount += 1
      }

      const newNum = this.addZero(this.flogCount)
      
      return `${this.year}-${this.month}-${newNum}`
    },
    addZero(num){
      return num < 10 ? `0${num}` : num
    },
    getHistoryData() {
      const matchTime = this.dateFormat()
      console.log(matchTime)
      getKlineHistoryData({
        symbol: this.currentSymbol || 'BTCUSD',
        startDateTime: matchTime - 60 * 1000,
        endDateTime: matchTime,
        interval: 'MINUTE_1'
      }).then(res => {
        console.log(res)
      })
    },
    dateFormat(){
      const curDate = new Date()
      const curYear = curDate.getFullYear()
      const curMonth = curDate.getMonth() + 1
      const curGetDate = curDate.getDate()
      const curHours = curDate.getHours()
      const curMinutes = curDate.getMinutes()
      return new Date(`${curYear}-${curMonth}-${curGetDate} ${curHours}:${curMinutes}`).getTime()/1000
    }
  },
  beforeDestroy() {
    clearInterval(this._timestamp)
    this._chart = null
  }
}
</script>
<style lang="less">
  .gbboline{    
    &-btns{
      text-align: right;
      background: #041D25;
      &__settime{
        display: inline-block;
        height: 20px;
        padding: 0 10px;
        border: 0;
        border-right: 1px solid #000;
        color: #788390;
        background: transparent;
        // display: none;
        visibility: hidden;
      }
    }
    &-box{
      width: 450px;
      height: 320px;
      color: #fff;
    }
  }
</style>