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
    <div ref="kline" class="gbboline-box"></div>
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
        // this.updateData(val)
      }
    }
  },
  created(){
    // this.getHistoryData()
  },
  mounted(){
    
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
      const baseDom = this.$refs.kline
      const klineBox = {
        width: baseDom.offsetWidth,
        height: baseDom.offsetHeight
      }
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

      

    },
    setHistoryData(res) {
      const { high, low, dateTime } = res
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
      // height: 320px;
      height: 486px;
      color: #fff;
    }
  }
</style>