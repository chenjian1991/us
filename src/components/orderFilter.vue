<template>
   <Row class="filter-box" id="orderFilter">
      <Col span="24">
         <!--日期-->
         <div class="inline-box">
            <DatePicker type="date" v-model="startTime" :options="optionsStart" :placeholder="$t('orderStartTime')"
                        @on-change="changeStartTime"
                        style="width: 110px" class="date-picker"></DatePicker>
            <span class="dark-gray">&nbsp;—&nbsp;</span>
            <DatePicker type="date" v-model="endTime" :options="optionsEnd" :placeholder="$t('orderEndTime')"
                        @on-change="changeEndTime"
                        style="width: 110px"
                        class="date-picker"></DatePicker>
         </div>
         <!--交易对-->
         <div class="inline-box">
            <Input v-model="baseAsset" :placeholder="$t('orderCoin')" style="width: 110px"/>
            <span class="dark-gray">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <Select v-model="quoteAsset" style="width:110px">
               <Option v-for="item in quoteAssetList" :value="item" :key="item">
                  {{ item==='ALL'?$t('orderAll'):item }}
               </Option>
            </Select>
         </div>
         <!--方向-->
         <div class="inline-box">
            <Select v-model="orderSide" style="width:110px">
               <Option v-for="item in orderSideList" :value="item.side" :key="$t(item.label)">
                  {{$t(item.label) }}
               </Option>
            </Select>
         </div>
         <!--搜索-->
         <div class="inline-box">
            <Button type="primary" @click="search">{{$t('orderSearch')}}</Button>
         </div>
         <!--重置-->
         <div class="inline-box">
            <Button @click="reset">{{$t('orderReset')}}</Button>
         </div>
         <!--隐藏已撤销-->
         <div class="inline-box" v-if="showHide">
            <!--单选框-->
            <div class="radio-box" @click="changeAgree">
               <span class="label-radio" :class="orderStatus ? 'label-radio-checked' : ''"></span>
               <span class="text">{{$t('orderHide')}}</span>
            </div>
         </div>
      </Col>
      <!--<Col span="12" align="right"></Col>-->
   </Row>

</template>

<script>
   import {
      getSymbolList,
   } from '_api/exchange.js'

   export default {
      name: "orderFilter",
      props: ['showHide', 'symbolList'],
      data() {
         return {
            startTime: '',//清空日期框
            endTime: '',//清空日期框
            optionsStart: {
               disabledDate(date) {
                  return
               }
            },
            optionsEnd: {
               disabledDate(date) {
                  return
               }
            },
            startDateTime: '',//接口开始时间戳
            endDateTime: '',//接口结束时间戳
            initEndTimestamp: '',//赋值初始时间 防止下一页的时候变化
            baseAsset: '',//左侧币
            quoteAsset: 'ALL',//右侧币
            quoteAssetList: [],//右侧币种列表
            orderSide: 'ALL',
            orderSideList: [
               {label: 'orderSideAll', side: 'ALL'},
               {label: 'BUY', side: 'BUY'},
               {label: 'SELL', side: 'SELL'},
            ],
            orderStatus: false,
         }
      },
      methods: {
         changeStartTime(value) {
            if (value) {
               this.startDateTime = new Date(value).getTime() - 8 * 3600 * 1000
               this.initEndTimestamp = new Date(value).getTime() - 8 * 3600 * 1000
               this.optionsEnd.disabledDate = (date => {
                  return date && date.valueOf() < this.startDateTime;
               })
            } else {
               this.initEndTimestamp = this.startDateTime = ''
               this.optionsEnd.disabledDate = (date => {
                  return
               })
            }
         },
         changeEndTime(value) {
            if (value) {
               this.endDateTime = new Date(value).getTime() + 16 * 3600 * 1000 - 1
               this.optionsStart.disabledDate = (date => {
                  return date && date.valueOf() > this.endDateTime;
               })
            } else {
               this.endDateTime = ''
               this.optionsStart.disabledDate = (date => {
                  return
               })
            }
         },
         changeAgree() {
            this.orderStatus = !this.orderStatus
            this.search()
         },
         reset() {
            this.startTime = this.endTime = this.startDateTime = this.endDateTime = this.initEndTimestamp = ''
            this.baseAsset = ''
            this.quoteAsset = this.quoteAssetList[0]
            this.orderSide = 'ALL'
            this.orderStatus = false
            this.$emit('reset')
         },
         search() {
            let params = {}
            if (this.startDateTime) {
               params.startDateTime = this.startDateTime
            }
            if (this.endDateTime) {
               params.endDateTime = this.endDateTime
            }
            if (this.baseAsset) {
               params.baseAsset = this.baseAsset.toUpperCase()
            }
            if (this.quoteAsset !== 'ALL') {
               params.quoteAsset = this.quoteAsset
            }
            if (this.orderSide !== 'ALL') {
               params.orderSide = this.orderSide
            }
            if (this.orderStatus) {
               params.orderStatus = this.orderStatus ? 'FILLED' : ''
            }
            this.$emit('search', params)
         },
      },
      watch: {
         symbolList(newValue) {
            this.quoteAssetList = newValue
         }
      }
   }
</script>
<style lang="less">
   @color-light-gary: #E7EAED;
   @color-green: #12869A;
   #orderFilter {
      ul {
         margin-bottom: 0 !important;
      }
      .ivu-input-suffix, .ivu-input, .ivu-select-selection, .ivu-select-placeholder, .ivu-select-selected-value, .ivu-btn {
         height: 28px;
         line-height: 26px;
         border-radius: 2px;
      }
      /*日期*/
      .ivu-input-suffix {
         i {
            line-height: 28px;
         }
      }
      /*选择框*/
      .ivu-select-selection:hover, .ivu-input:hover {
         border-color: @color-green;
      }
      .ivu-select-visible .ivu-select-selection, .ivu-input:focus, .ivu-date-picker-focused input {
         border-color: @color-green;
         outline: 0;
         -webkit-box-shadow: none;
         box-shadow: none;
      }
      .ivu-btn {
         padding: 0 17px;
         border-color: @color-green;
      }
      .ivu-btn-primary {
         background-color: @color-green;
      }
      .ivu-btn-default {
         color: @color-green;
      }
   }

</style>

<style lang="less" scoped>
   @color-light-gary: #E7EAED;
   @color-green: #12869A;
   .filter-box {
      position: absolute;
      top: 50px;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /*width: 100%;*/
      height: 50px;
      z-index: 5;
      .light-gray {
         color: @color-light-gary;
      }
      .dark-gray {
         color: #808695;
      }
      .inline-box {
         display: inline-block;
         margin-right: 16px;
      }
      .date-picker {
         height: 28px;
      }
      .input-common {
         width: 100px;
         height: 28px;
         line-height: 26px;
         font-size: 14px;
         padding: 0 8px;
         border-radius: 2px;
         background-color: transparent;
         border: solid 1px @color-light-gary;
         &:hover {
            color: @color-green;
         }
         &:focus {
            outline: 0;
         }
      }
      .radio-box {
         position: relative;
         display: flex;
         align-items: center;
         cursor: pointer;
         padding-left: 12px;
         .label-radio {
            position: absolute;
            top: 4px;
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 1px solid #E7EAED;
            border-radius: 2px;
            margin-right: 5px;
            margin-top: -1px;
         }
         .label-radio-checked { //选中单选框
            background-color: #108093;
         }
         .label-radio-checked:after {
            position: absolute;
            content: '';
            left: 4px;
            top: 1px;
            height: 9px;
            width: 5px;
            border-right: 2px solid #fff;
            border-bottom: 2px solid #fff;
            border-radius: 2px;
            transition: all .2s ease-in-out;
            transform: rotate(45deg);
         }
         .text {
            font-size: 14px;
            color: #949DA6;
            margin-left: 18px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
         }
      }

   }

</style>