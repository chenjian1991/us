<template>
  <div class="gbbomain-order-box">
    <div class="below">
      <!--当前委托单-->
      <div class="open-order">
        <ul class="space-between item-title">
          <li>{{$t("bbjyOpenOrders")}}</li>
          <li>
            <router-link to="/order">{{$t('bbjyOrderAll')}}</router-link>
          </li>
        </ul>
        <div class="table-box">
          <ul>
            <li class="tr-title">
              <div>{{$t('bbjyOrderDate')}}</div>
              <div>{{$t("bbjyOrderPair")}}</div>
              <div>{{$t("bbjyOrderType")}}</div>
              <div>{{$t("bbjyOrderSide")}}</div>
              <div>{{$t("bbjyOrderPrice")}}</div>
              <div>Size</div>
              <div>{{$t("bbjyOrderFilled")}}</div>
              <div>{{$t("bbjyOrderTotal")}}</div>
              <div>{{$t("bbjyOperation")}}</div>
            </li>
            <li class="no-order" v-if="myOpenList.length === 0">
              <img src="../images/no_order.png" width="50px" height="42px" alt />
              {{$t("bbjyOrderTIP")}}
            </li>
            <li v-else v-for="(v,i) in myOpenList" :key="i" class="orderItem">
              <div>{{v.createdAt}}</div>
              <div>{{v.symbol}}</div>
              <div>{{$t(v.orderType)}}</div>
              <div :class="[v.orderSide === 'BUY'?'greenText':'redText']">{{$t(v.orderSide)}}</div>
              <div>{{v.limitPrice}}</div>
              <div>{{v.filledCumulativeQuantity +'/'+ v.quantity}}</div>
              <div>{{v.percent}}%</div>
              <div>{{v.total}}</div>
              <!-- 撤单 -->
              <div class="cancleBtn">
                <a
                        class="cancel"
                        @click="cancelMyOrder(v.orderId,v)"
                        :disabled="v.isDisabled"
                >
                  <Icon type="md-close" />
                  {{$t(v.btnText)}}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 历史委托单 -->
      <div class="history">
        <ul class="space-between item-title">
          <li>{{$t("bbjyHistory")}}</li>
          <li>
            <Checkbox v-model="hideCancleOrder" class="hideCancleOrder">{{$t('隐藏已撤单')}}</Checkbox>
            <router-link to="/order">{{$t("bbjyOrderAll")}}</router-link>
          </li>
        </ul>
        <div class="table-box">
          <ul>
            <li class="tr-title">
              <div>{{$t("bbjyHistoryDate")}}</div>
              <div>{{$t("bbjyHistoryPair")}}</div>
              <div>{{$t("bbjyHistoryType")}}</div>
              <div>{{$t("bbjyHistorySide")}}</div>
              <div>{{$t("bbjyHistoryAvg")}}</div>
              <div>{{$t("bbjyHistoryPrice")}}</div>
              <div>Size</div>
              <div>{{$t("bbjyHistoryFilled")}}</div>
              <div>{{$t("bbjyHistoryTotal")}}</div>
              <div>{{$t("bbjyHistoryStatus")}}</div>
            </li>
            <!--无历史-->
            <li class="no-order" v-if="myCompletedList.length === 0">
              <img src="../images/no_order.png" width="50px" height="42px" alt />
              {{$t("bbjyHistoryTIP")}}
            </li>
            <li v-else v-for="(v, i) in myCompletedList_sort" :key="i" class="orderItem">
              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.createdAt}}</div>
              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.symbol}}</div>
              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{$t(v.orderType)}}</div>
              <div
                      :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'',v.orderSide === 'BUY'?'greenText':'redText']"
              >{{$t(v.orderSide)}}</div>
              <div
                      :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']"
              >{{v.filledAveragePrice}}</div>
              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.limitPrice}}</div>
              <div
                      :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']"
              >{{v.filledCumulativeQuantity +'/'+ v.quantity}}</div>
              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.percent}}%</div>
              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.total}}</div>
              <div
                      :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']"
              >{{$t(v.orderStatus)}}</div>
              <div>
                <router-link
                        v-if="v.orderStatus !== 'CANCELLED'"
                        class="details"
                        tag='a'
                        target="_blank"
                        :to="'orderDetails?orderId=' + v.orderId"
                >Details</router-link>
                <router-link
                  v-if="v.percent != 0"
                  class="details"
                  tag='a'
                  target="_blank"
                  :to="'orderDetails?orderId=' + v.orderId"
                >Details</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "GBBOOrder",
    data() {
      return {
        hideCancleOrder: false
      };
    },
    created() {},
    mounted() {},
    props: {
      myOpenList: {
        type: Array,
        default: function() {
          return [];
        }
      },
      myCompletedList: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    computed: {
      myCompletedList_sort: function() {
        return this.myCompletedList.filter(item => {
          if (this.hideCancleOrder) {
            return item.orderStatus !== "CANCELLED";
          } else {
            return item;
          }
        });
      }
    },
    methods: {
      cancelMyOrder(orderId, v) {
        this.$emit("cancelMyOrder", orderId, v);
      }
    },
    components: {}
  };
</script>
<style lang="less">
  .gbbomain-order-box {
    // flex: 1;
    .below {
      width: 100%;
      .open-order {
        margin-bottom: 6px;
      }
      .open-order,
      .history {
        width: 100%;
        background: #031419;
        min-height: 160px;

        .space-between {
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          height: 30px;
          background: #041d25;
          padding: 0 6px;
          border-bottom: 1px solid #000;
          li {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #d4d4d4;
            font-weight: 500;

            a {
              margin-left: 10px;
              color: #d4d4d4;
              font-size: 12px;
              text-decoration: underline !important;
            }

            .hideCancleOrder {
              color: #D4D4D4;
              .ivu-checkbox-inner {
                border: 1px solid #D4D4D4;
                border-radius: 2px;
                background-color: #041d25;
              }
              .ivu-checkbox-checked .ivu-checkbox-inner {
                border-color: #D4D4D4;
                background-color: #D4D4D4;
              }
              .ivu-checkbox-checked .ivu-checkbox-inner:after {
                border-color: #041d25;
              }
            }

            &:last-child {
              .text {
                display: inline-block;
                height: 50px;
                line-height: 50px;
                padding: 0 8px;
                font-weight: bold;
                cursor: pointer;
              }
            }
          }
        }

        .table-box {
          padding-bottom: 25px;
          background: #031419;
          ul {
            li {
              padding: 0 8px;
              height: 30px;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #000;

              div {
                font-size: 12px;
                text-align: right;
                line-height: 30px;
                font-weight: 500;
                color: #d4d4d4;
                flex: 1;
                &:nth-child(1),
                &:nth-child(2),
                &:nth-child(3),
                &:nth-child(4){
                  text-align: left;
                }
                // &:last-child {
                //   text-align: right;
                // }
              }
            }

            .tr-title {
              height: 24px;
              line-height: 24px;
              background: #031419;
              border-bottom: 0;

              div {
                height: 24px;
                line-height: 24px;
                color: #788390;
                font-size: 12px;
                font-weight: 500;
              }
            }

            .orderItem {
              background: #041D25;

              .redText {
                color: #d74c58;
              }

              .greenText {
                color: #27a781;
              }

              .CANCELLED_Text {
                color: #3f647d;
              }
            }

            .cancel {
              display: inline-block;
              width:72px;
              height:22px;
              line-height: 22px;
              background:rgba(8,52,65,1);
              border-radius:14px;
              margin-left: 10px;
              text-align: center;
              color: #5D7C86;
              cursor: pointer;

              &:hover {
                background-color: #12869a;
                color: #fff;
                border: solid 1px #12869a;
              }
            }
          }

          .no-order {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #688a9d;
            border: none;
            background: #031419;
            padding: 40px;
            height: 100%;

            img {
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }
</style>
