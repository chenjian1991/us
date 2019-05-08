<template>
  <div class="chartBox">
    <div class="TVChartContainer" id="tv_chart_container" />
  </div>
</template>

<script>
  // import {
  //   widget
  // } from "../../lib/charting_library.min";
  //在public 中 index.html引入了charting_library.min
  import Datafeed from './udf/index.js'
  import {
    storage
  } from "@/lib/utils"
  
  export default {
    name: "TVChartContainer",
    data() {
      return {
        tvWidget: null,
        locale:'',
        // chartLoading:false
      }
    },
    props: {
      symbol: {
        default: "BTCUSDT",
        type: String
      },
      clientId: {
        default: "tradingview.com",
        type: String
      },
      userId: {
        default: "public_user_id",
        type: String
      },
    },
    computed:{
      changeLanguage() {
          return this.$store.state.app.countryLanguage;
      }
    },
    watch:{
      'symbol':function(oldV,newV){
          storage.set('currentSymbol',this.symbol)
          this.locale = this.$store.state.app.countryLanguage == 'zh-CN'?'zh':'en'
          // this.chartLoading = false;
          this.createWidget()
      },
      changeLanguage:function(newV,oldV){
        if(newV === 'zh-CN'){
            this.locale = 'zh'
        }else{
            this.locale = 'en'
        }
        storage.set('currentSymbol',this.symbol)
        this.createWidget()
      }
    },
    mounted() {
    },
    components:{
    },
    beforeDestroy(){

    },
    methods: {
      removeWidget() {
        if (this.tvWidget) {
            this.tvWidget.remove();
            this.tvWidget = window.tvWidget = null;
        }
       },
      createWidget() {
        //默认1分钟的K线
        // let interval = '60';
        let interval = storage.get('interval');
        if(!storage.has('interval')) {
          interval = '60';
            storage.set('interval', '60');
        }
        const widgetOptions = {
          // debug:true,
          // timeframe:'3D',
          symbol: this.symbol,
          toolbar_bg:'#132029',
          // BEWARE: no trailing slash is expected in feed URL
          // datafeed:new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
          datafeed: new Datafeed.UDFCompatibleDatafeed(),
          interval: interval,
          container_id: "tv_chart_container",
          // library_path: process.env.NODE_ENV == 'production'?"/exchange/b11/charting_library/":"/charting_library/", //static文件夹的路径
          library_path: "/charting_library/", //static文件夹的路径
          // height: 480,
          // width:200,
          locale: this.locale, //从localstorage中读取语言
          drawings_access: {
            type: "black",
            tools: [{
              name: "Regression Trend"
            }]
          },
          disabled_features: [
          "use_localstorage_for_settings",
          "volume_force_overlay",
          "header_compare",
          'adaptive_logo', // 移动端可以隐藏logo
          "header_symbol_search",
          "header_resolutions",
          "header_undo_redo",
          "header_chart_tpye",
          "header_screenshot",
          "header_chart_type",
          "display_market_stauts",
          "study_templates",
          // "left_toolbar",
          "go_to_date",
          "timeframes_toolbar"
        ],
          enabled_features: ["main_series_scale_menu","dont_show_boolean_study_arguments", "hide_last_na_study_output", "legend_context_menu"],
          fullscreen: false,
          autosize: true,
          studies_overrides: {
            // 成交量颜色
            "volume.volume.color.0": "#dd4141",
            "volume.volume.color.1": "#22a665",
          },
          custom_css_url: "css/myself.css",
          loading_screen: {
            backgroundColor: "#fff"
          },
          timezone: "Asia/Shanghai", //默认时区
          overrides: {
            "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
            volumePaneSize: "medium", //成交量大小的显示
            "paneProperties.legendProperties.showLegend": true, //关闭成交量左上角
            //背景色，
            "paneProperties.background": "#132029",
            "paneProperties.vertGridProperties.color": "#21323c",
            "paneProperties.vertGridProperties.style": 0,
            "paneProperties.horzGridProperties.color": "#21323c",
            "paneProperties.horzGridProperties.style": 0,
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor": "#AAA",
            "paneProperties.topMargin": 5,
            "paneProperties.bottomMargin": 5,
            //    线形图样式
            // "mainSeriesProperties.lineStyle.color": "#0303F7",
            // "mainSeriesProperties.lineStyle.linestyle": 0,
            // "mainSeriesProperties.lineStyle.linewidth": 1,
            // "mainSeriesProperties.lineStyle.priceSource": "close",
            //蜡烛的样式
            "mainSeriesProperties.candleStyle.upColor": "#27A781",
            "mainSeriesProperties.candleStyle.downColor": "#CF424E",
            "mainSeriesProperties.candleStyle.drawWick": true,
            "mainSeriesProperties.candleStyle.drawBorder": true,
            "mainSeriesProperties.candleStyle.borderColor": "#27A781",
            "mainSeriesProperties.candleStyle.borderUpColor": "#27A781",
            "mainSeriesProperties.candleStyle.borderDownColor": "#CF424E",
            "mainSeriesProperties.candleStyle.wickUpColor": "#27A781", //控制影线的颜色
            "mainSeriesProperties.candleStyle.wickDownColor": "#CF424E",
            "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
            "paneProperties.crossHairProperties.color": "#475c6a", //十字线的颜色
            //坐标轴和刻度标签颜色
            'scalesProperties.lineColor':'#2c404d',
            'scalesProperties.textColor':'#304a5a',

            //分时图样式
            // "paneProperties.crossHairProperties.style":'0',
            "mainSeriesProperties.areaStyle.color1": "rgba(72,116,146,0.15)",
            "mainSeriesProperties.areaStyle.color2": "rgba(34,52,63,0.15)",
            "mainSeriesProperties.areaStyle.linecolor": "#2a404f",
            "mainSeriesProperties.areaStyle.linestyle": 0,
            "mainSeriesProperties.areaStyle.linewidth": 3,
            "mainSeriesProperties.areaStyle.priceSource": "close",
            //    美国线样式
            // "mainSeriesProperties.barStyle.upColor": "#d75442",
            // "mainSeriesProperties.barStyle.downColor": "#d75442",
            // "mainSeriesProperties.barStyle.barColorsOnPrevClose": true,
            // "mainSeriesProperties.barStyle.dontDrawOpen": true,
          },
          favorites: {
            chartTypes: ["Area", "Line"]
          }
        };
        const tvWidget = window.tv = new window.TradingView.widget(widgetOptions);
        this.tvWidget = tvWidget

        tvWidget.MAStudies = [];
        tvWidget.selectedIntervalButton = null;

        tvWidget.onChartReady(() => {
          // this.chartLoading = false;
          if(this.tvWidget){
            let chart = this.tvWidget.chart();
            let mas = [{
                  day: 5,
                  color: "#9836ff"
              }, {
                  day: 10,
                  color: "#ffe100"
              }, {
                  day: 30,
                  color: "#ff4076"
              }, {
                  day: 60,
                  color: "#49bd72"
              }];
            
            let buttons = [
              {
                  label: this.locale === 'zh'?"分时":"Time",
                  resolution: "1",
                  chartType: 3
              }, 
              {
                  label: "1min",
                  resolution: "1",
                  chartType: 1
              },
               {
                  label: "5min",
                  resolution: "5",
                  chartType: 1
              },
              {
                  label: "15min",
                  resolution: "15",
                  chartType: 1
              }, 
              {
                  label: "30min",
                  resolution: "30",
                  chartType: 1
              },
              {
                  label: "1hour",
                  resolution: "60",
                  chartType: 1
              },
              {
                  label: "2hour",
                  resolution: "120",
                  chartType: 1
              },
               {
                  label: "4hour",
                  resolution: "240",
                  chartType: 1
              },
              {
                  label: "6hour",
                  resolution: "360",
                  chartType: 1
              },
              {
                  label: "8hour",
                  resolution: "480",
                  chartType: 1
              },
              {
                  label: "12hour",
                  resolution: "720",
                  chartType: 1
              },
               {
                  label: "1day",
                  resolution: "D",
                  chartType: 1
              },
              {
                  label: "1week",
                  resolution: "W",
                  chartType: 1
              }
              ]
            const chartType = storage.get('chartType') || 1;
            // const chartType =  1;
            // chart.setChartType(chartType);
              mas.forEach(item => {
                  chart.createStudy("Moving Average", false, false, [item.day], entity => {
                      tvWidget.MAStudies.push(entity);
                  }, {"plot.color": item.color});
              })
            chart.onIntervalChanged().subscribe(null, function (interval, obj) {
                tvWidget.changingInterval = false;
            });
            buttons.forEach((item, index) => {
              let button =  tvWidget.createButton()
              if(chart.chartType() === 3 && item.chartType === 3) {
                  button.addClass('selected');
                  tvWidget.selectedIntervalButton = button;
              } else if((chart.resolution() === item.resolution) && chart.chartType() === 1 && item.chartType === 1) {
                  button.addClass('selected');
                  tvWidget.selectedIntervalButton = button;
              }
              button.attr("data-resolution", item.resolution)
                  .attr("data-chart-type", item.chartType === undefined ? 1 : item.chartType)
                  .html("<span>"+ item.label +"</span>")
                  .on("click", function() {
                      // $('#chartloading').show()
                      // this.chartLoading = false;
                      if (!tvWidget.changingInterval && !button.hasClass("selected")) {
                        // chart.setVisibleRange({from:Math.round(new Date().getTime()/1000)-10*24*60*60,to:Math.round(new Date().getTime()/1000) })
                          let chartType = +button.attr("data-chart-type");
                          let resolution = button.attr("data-resolution");
  
                          if (chart.resolution() !== resolution) {
                              tvWidget.changingInterval = true;
                              chart.setResolution(resolution);
                          }
                          if (chart.chartType() !== chartType) {
                              chart.setChartType(chartType);
                              // widget.applyOverrides({
                              // 	"mainSeriesProperties.style": chartType
                              // });1537358229
                          }
                          storage.set('interval', resolution)
                          storage.set('chartType', chart.chartType())
                          updateSelectedIntervalButton(button);
                          showMAStudies(chartType !== 3);
                      }
                  })
            })
            function updateSelectedIntervalButton(button) {
              tvWidget.selectedIntervalButton && tvWidget.selectedIntervalButton.removeClass("selected");
              button.addClass("selected");
              tvWidget.selectedIntervalButton = button;
            }
  
            function showMAStudies(visible) {
              tvWidget.MAStudies.forEach(item => {
                  // chart.setEntityVisibility(item, true);
              })
            }
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .chartBox{
    height: 100%;
    .TVChartContainer {
      height: 100%;

    }
  }
</style>
