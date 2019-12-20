<template>
  <main id="orderDetails" class="orderDetails">
    <div class="container">
      <div class="link">
        <router-link to="/gbbo">Exchange</router-link>
        > Order Details
      </div>
      <div class="header-box">
        <Table :columns="HeaderColumns" :data="headerData" ></Table>
      </div>
      <div class="below">
        <div class="chart">
          <h4>Fills By Venue</h4>
          <v-chart :options="option" style="width:400px;margin: 0 auto"/>
        </div>
        <div class="details">
          <h4 class="mb-3">Fills Details</h4>
          <Table :columns="orderColumns" :data="orderDetails"></Table>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/pie'

  import {Exchange} from '@/interface/exchange.js'
  import moment from 'moment'

  import {
    addSymbolSplitLine,
    dealNumber,
  } from '@/lib/utils.js'

  export default {
    name: "orderDetails",
    components: {
      'v-chart': ECharts
    },
    data() {
      return {
        loginToken: $cookies.get('loginToken'),
        orderId: '',
        colorList: [
          '#008A61', '#199570', '#33A181', '#4CAD90', '#66B9A0', '#7FC4B0', '#99D0C0'
        ],

        HeaderColumns: [
          {
            title: 'Pair',
            key: 'symbol',
            width: 150,
            render: (h, params) => {
              return h('div', {}, addSymbolSplitLine(params.row.symbol))
            },
          },
          {
            title: 'Type',
            key: 'orderType',
            width: 150,
          },
          {
            title: 'Side',
            key: 'orderSide',
            render: (h, params) => {
              let orderSide = params.row.orderSide
              let color = orderSide === 'BUY' ? '#008A61' : '#EA4853'
              return h('div', {
                style: {
                  color: color
                }
              }, params.row.orderSide)
            },
          },
          {
            title: 'Price',
            key: 'limitPrice',
            align: 'right',
            width: 180,
          },
          {
            title: 'Size',
            key: 'filledCumulativeQuantity',
            align: 'right',
            width: 180,

          },
          {
            title: 'Filled%',
            align: 'right',
            width: 180,
            render: (h, params) => {
              let filled = (100 * (params.row.filledCumulativeQuantity / params.row.quantity)).toFixed(2) + '%'
              return h('div', {}, filled)
            },
          },
          {
            title: 'Total',
            key: 'total',
            align: 'right',
            width: 180,
            render: (h, params) => {
              let total = params.row.limitPrice * params.row.quantity
              return h('div', {}, dealNumber(total, 8))
            },
          },
        ],
        headerData: [],

        orderColumns: [
          {
            type: 'index',
            title: '#',
            width: 35
          },
          {
            title: 'Time',
            key: 'time',
            width: 150,
          },
          {
            title: 'Price',
            key: 'limitPrice',
            width: 80,

          },
          {
            title: 'Size',
            key: 'quantity',
            align: 'right',
            width: 80
          },
          {
            title: 'Total',
            key: 'total',
            align: 'right',
            width: 120

          },
          {
            title: 'From',
            key: 'from',
            align: 'right',
            className: 'from-color',
            // width: 120
          }
        ],
        orderDetails: [],
        //饼状图
        option: {
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [],
              label: {
                normal: {
                  formatter: '{b|{b}}\n{per|{d}%}  ',
                  rich: {
                    b: {
                      color: '#1E2022',
                      align: 'center',
                      lineHeight: 22,
                    },
                    per: {
                      fontSize: 12,
                      color: '#788390',
                    }
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#008A61',
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }]
        }
      }
    },
    methods: {
      getOrderInfo() {
        this.exchange.getOrderInfo(this.orderId, (result) => {//获取资产
          this.headerData = [result]
        })
      },
      getOrderDetails() {
        this.exchange.getOrderDetail(this.orderId, (result) => {//获取资产
          result.forEach(v => {
            v.time = moment(v.time).format('YY-MM-DD HH:mm:ss')
          })
          this.orderDetails = result
          this.setOption(result)
        })
      },
      setOption(result) {
        let data = []
        result.forEach((v, i) => {
          data.push({
            value: v.total, name: v.from, itemStyle: {
              color: this.colorList[i]
            }
          })
        })
        this.option.series[0].data = data
      },
    },
    beforeMount() {
      let loginToken = this.loginToken
      let ssoProvider = {};
      //创建实例
      this.exchange = new Exchange(ssoProvider);
      this.exchange.ssoProvider.getSsoToken = function (fn) {
        fn(loginToken);
      };
      this.orderId = this.$route.query['orderId']
    },
    mounted() {
      if (this.orderId) {
        this.getOrderDetails()
        this.getOrderInfo()
      }
    }
  }
</script>
<style lang="less">
  #orderDetails {
    /*  table 样式 start*/
    .ivu-table-wrapper {
      border: none;
    }
    .ivu-table {
      background-color: transparent;
      overflow: visible;
      th, td {
        height: 32px;
        border: none;
      }
      &:before {
        background-color: transparent;
      }
      &:after {
        background-color: transparent;
      }
    }
    .ivu-table th {
      background-color: #fff;
    }
    .ivu-table-header .ivu-table-cell, .ivu-table-body .ivu-table-cell {
      padding: 0;
      font-size: 12px;
      font-weight: 500;
    }
    .ivu-table-header .ivu-table-cell {
      color: #788390;
    }
    .ivu-table-body .ivu-table-cell {
      color: #1E2022;
    }
    .ivu-tabs-no-animation > .ivu-tabs-content {
      padding: 0 20px 10px;
    }
    /*table 样式 end*/

    /*自定义table样式*/
    .ivu-table-body .from-color {
      .ivu-table-cell {
        color: #788390;
      }
    }
    .header-box{
      .ivu-table-body .ivu-table-cell {
        font-size: 14px;
      }
    }
  }

</style>
<style lang="less" scoped>
  @import '../../assets/css/common.less';

  .orderDetails {
    padding: 20px 0;
    height: 100%;
    background-color: #F4F6F7;
    .link {
      margin-bottom: 20px;
      .f-14;
      .c-77838F;
      a {
        .c-77838F;
      }
    }
    .header-box {
      padding: 18px 24px;
      margin-bottom: 20px;
      .bgc-fff;
    }
    .below {
      .d-f;
      justify-content: space-between;
      .chart, .details {
        padding: 20px 24px;
        border-radius: 5px;
        .bgc-fff;
        h4 {
          .f-20;
          color: #1E2022;
        }
      }
      .chart {
        width: 450px;
        margin-right: 20px;
      }
      .details {
        width: 640px;

      }
    }

  }
</style>