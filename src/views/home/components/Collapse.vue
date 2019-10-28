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
            <p>{{item.des}}</p>
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
            <p>{{item.des}}</p>
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
          title:"11111",
          des:"Using smart order router and matching engine technology, GBBO™ uncovers the best available (lowest) ask price and the best available (highest) bid price in crypto trading"
        },
        {
          title:"2222",
          des:"Using smart order router and matching engine technology, GBBO™ uncovers the best available (lowest) ask price and the best available (highest) bid price in crypto trading"
        },
        {
          title:"33333",
          des:"Using smart order router and matching engine technology, GBBO™ uncovers the best available (lowest) ask price and the best available (highest) bid price in crypto trading"
        },
        {
          title:"444444",
          des:"Using smart order router and matching engine technology, GBBO™ uncovers the best available (lowest) ask price and the best available (highest) bid price in crypto trading"
        },
        {
          title:"55555555",
          des:"Using smart order router and matching engine technology, GBBO™ uncovers the best available (lowest) ask price and the best available (highest) bid price in crypto trading"
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
        }
      }
      .card-body{
        color:#B9C9D6;
        font-size: 14px;
      }
    }
  }
}
</style>