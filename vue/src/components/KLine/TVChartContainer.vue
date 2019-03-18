<template>
  <div class="chartBox">
    <Loading scale="4" v-model="chartLoading" class="chartLoading" id="chartloading"/>
    <div class="TVChartContainer" id="tv_chart_container" />
  </div>
</template>

<script>
  import Loading from "@/components/Loading"
  // import {
  //   widget
  // } from "../../lib/charting_library.min";
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
        chartLoading:false
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
          this.chartLoading = false;
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
      Loading
    },
    beforeDestroy(){
      // console.log(12313123121223132)
      // this.removeWidget()
    },
    methods: {
      removeWidget() {
        if (this.tvWidget) {
            this.tvWidget.remove();
            this.tvWidget = window.tvWidget = null;
        }
       },
      createWidget() {
        let interval = storage.get('interval');
        if(!storage.has('interval')) {
            interval = '60';
            storage.set('interval', '60');
        }
        const widgetOptions = {
          // debug:true,
          // timeframe:'3D',
          symbol: this.symbol,
          // BEWARE: no trailing slash is expected in feed URL
          // datafeed:new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
          datafeed: new Datafeed.UDFCompatibleDatafeed(),
          interval: interval,
          container_id: "tv_chart_container",
          library_path: process.env.NODE_ENV == 'production'?"/exchange/b11/charting_library/":"/charting_library/", //static文件夹的路径
          // library_path: "/charting_library/", //static文件夹的路径
          height: 480,
          width:200,
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
          "header_symbol_search",
          "header_resolutions",
          "header_undo_redo",
          "header_chart_tpye",
          "header_screenshot",
          "header_chart_type",
          "display_market_stauts",
          "study_templates",
          "left_toolbar",
          "go_to_date"
        ],
          enabled_features: ["dont_show_boolean_study_arguments", "move_logo_to_main_pane", "hide_last_na_study_output", "legend_context_menu"],
          fullscreen: false,
          autosize: true,
          studies_overrides: {},
          custom_css_url: "css/myself.css",
          loading_screen: {
            backgroundColor: "#fff"
          },
          timezone: "Asia/Shanghai", //默认时区
          overrides: {
            "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
            volumePaneSize: "medium", //成交量大小的显示
            "paneProperties.legendProperties.showLegend": false, //关闭左上角
            //背景色，
            "paneProperties.background": "#15232C",
            "paneProperties.vertGridProperties.color": "#2c3450",
            "paneProperties.vertGridProperties.style": 0,
            "paneProperties.horzGridProperties.color": "#2c3450",
            "paneProperties.horzGridProperties.style": 0,
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor": "#AAA",
            "paneProperties.topMargin": 5,
            "paneProperties.bottomMargin": 5,
            //蜡烛的样式
            "mainSeriesProperties.candleStyle.upColor": "#589065",
            "mainSeriesProperties.candleStyle.downColor": "#ae4e54",
            "mainSeriesProperties.candleStyle.drawWick": true,
            "mainSeriesProperties.candleStyle.drawBorder": true,
            "mainSeriesProperties.candleStyle.borderColor": "#589065",
            "mainSeriesProperties.candleStyle.borderUpColor": "#589065",
            "mainSeriesProperties.candleStyle.borderDownColor": "#ae4e54",
            "mainSeriesProperties.candleStyle.wickUpColor": "#589065", //控制影线的颜色
            "mainSeriesProperties.candleStyle.wickDownColor": "#ae4e54",
            "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
            "paneProperties.crossHairProperties.color": "#fff", //十字线的颜色
            // "paneProperties.crossHairProperties.style":'0',
            "mainSeriesProperties.areaStyle.color1": "rgba(255,255,255,0.1)",
            "mainSeriesProperties.areaStyle.color2": "rgba(255,255,255,0.1)",
            "mainSeriesProperties.areaStyle.linecolor": "#4e5b85",
            "mainSeriesProperties.areaStyle.linestyle": 0,
            "mainSeriesProperties.areaStyle.linewidth": 1,
            "mainSeriesProperties.areaStyle.priceSource": "close"
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
          this.chartLoading = false;
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
            
            let buttons = [{
                  label: this.locale === 'zh'?"分时":"Time",
                  resolution: "1",
                  chartType: 3
              }, {
                  label: "1min",
                  resolution: "1",
                  chartType: 1
              },
               {
                  label: "5min",
                  resolution: "5",
                  chartType: 1
              }, {
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
                  label: "4hour",
                  resolution: "240",
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
            chart.setChartType(chartType);
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
                      this.chartLoading = false;
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
    position: relative;
    .chartLoading{
      position: absolute;
      top:50.5px;
      left:139px;
    }
    .TVChartContainer {
      height: 480px;

    }
  }
</style>
