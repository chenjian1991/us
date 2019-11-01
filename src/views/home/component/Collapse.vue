<template>
  <div id="FAQCollapse">
    <div class="cardList">
      <!-- Card -->
      <div class="card" v-for="(item,index) in arrLeft" :key="index">
        <div class="card-header card-collapse" :id="index">
          <h5 class="mb-0">
            <button
              class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
              role="button"
              data-toggle="collapse"
              :data-target='"#FAQL"+index'
              aria-expanded="false"
              :aria-controls='"FAQL"+index'
            >
              <div class="btnTitle">
                <img src="../../../assets/images/home/usHome/duihao@2x.png">
                <span>{{item.title}}</span>
              </div>
              <span class="card-btn-arrow">
                <span class="fas fa-arrow-down small"></span>
              </span>
            </button>
          </h5>
        </div>
        <div :id='"FAQL"+index' class="collapse" :aria-labelledby="index" data-parent="#FAQCollapse">
          <div class="card-body">
            <p class="pr-lg-11">{{item.des}}</p>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
    <div class="cardList">
      <!-- Card -->
      <div class="card" v-for="(item,index) in arrRight" :key="index">
        <div class="card-header card-collapse" :id="index">
          <h5 class="mb-0">
            <button
              class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
              role="button"
              data-toggle="collapse"
              :data-target='"#FAQR"+index'
              aria-expanded="false"
              :aria-controls='"FAQR"+index'
            >
              <div class="btnTitle">
                <img src="../../../assets/images/home/usHome/duihao@2x.png">
                <span>{{item.title}}</span>
              </div>
              <span class="card-btn-arrow">
                <span class="fas fa-arrow-down small"></span>
              </span>
            </button>
          </h5>
        </div>
        <div :id='"FAQR"+index' class="collapse" :aria-labelledby="index" data-parent="#FAQCollapse">
          <div class="card-body">
            <p class="pr-lg-11">{{item.des}}</p>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
</div>
</template>
<script>
export default{
  data(){
    return{
      arr:[
        {
          title:"DEEPEST LIQUIDITY",
          des:"Global consolidated order book fills large volume trades with ease"
        },
        {
          title:"BEST GLOBAL PRICES",
          des:"Using smart order router and matching engine technology, GBBO uncovers the best available (lowest) ask price and the best available (highest) bid price in crypto trading"
        },
        {
          title:"CROSS-CURRENCY CONVERSION",
          des:"Execute cross-currency orders for access to true global best pricing, all at no additional fee"
        },
        {
          title:"INSTANT ARBITRAGE",
          des:"Arbitrage from a single network of exchanges instantly, utilizing GBBO’s global consolidated order book"
        },
        {
          title:"TRUE SINGLE ACCOUNT",
          des:"No need to open, keep, and maintain accounts with multiple systems and exchanges"
        },
      ],
      arrLeft:[],
      arrRight:[],
    }
  },
  mounted(){
    this.arr.forEach((item,index)=>{
      if(index%2 === 0){
        this.arrLeft.push(item)
      }else{
        this.arrRight.push(item)
      }
    })
  }
}
</script>
<style lang="less">
#FAQCollapse{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .cardList{
    width:540px;
    .card{
      background-color: #141C23;
      margin-bottom:30px;
      border: none;
      .card-header{
        border-bottom: none;
        background-color: #141C23;
        h5{
          background-color: #141C23;
          border:1px solid rgba(35,47,58,1);
          border-radius:4px;
          .card-btn{
            color:#fff;
            font-size: 18px;
            .btnTitle{
              img{
                width: 24px;
                height: 24px;
                margin-right: 17px;
              }
            }
            .card-btn-arrow{
              color:#0AB1D5;
            }
          }
        }
      }
      .card-body{
        color:#B9C9D6;
        font-size: 14px;
        border:1px solid rgba(35,47,58,1);
      }
    }
  }
}
</style>