<template>
  <div id="about">
    <div class="mainTitle">
      <div class="ask container">Who are we?</div>
      <div class="answer container">We believe that trading should be transparent, neutral, and give everyone the best chance to win. </div>
    </div>
    <div class="describe">
      <div class="describeInner container">We’re an NYC-based team of visionaries, tech-geeks, enthusiasts, and innovators with a common goal: discover simple solutions to complex problems. Tresso is dedicated to helping our traders realize the best possible outcomes through amplified trading options, speed and efficiency, We’re elevating the trading experience in crypto, token and digital asset markets.  Together, we’re driving trading innovation.</div>
    </div>
    <div class="team container">
      <div class="title">Meet the Tresso Team</div>
      <div class="members">
        <div class="member" v-for="(item,index) in members" :key="index">
          <div class="des">
            <span class="name">{{item.name}}</span> <br>
            <span class="position">{{item.position}}</span> <br><br>
            <span class="experience">{{item.experience}}</span>
          </div>
          <div class="alpha">
            <img :src="item.alpha" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      members:[
        {
          name:"David Weild",
          position:"Co-Chairman",
          experience:"David is a former Vice Chairman of Nasdaq. As head of a Top 10 investment bank, he priced over 1,000 equity offerings He is known for his leadership with the JOBS Act.",
          alpha:require("../../assets/images/about/David Weild.png"),
        },
        {
          name:"Haohan Xu",
          position:"CEO and Co-Founder",
          experience:"Haohan is a fintech investor and Co-Founder of Apifiny. Haohan holds a bachelor’s degree from Columbia University, with a double major in computer science and operations research.",
          alpha:require("../../assets/images/about/Haohan Xu.png"),
        },
        {
          name:"Ashu Swami",
          position:"Chief Technology Officer and Co-Founder",
          experience:"Previously, Ashu headed an SPV of Quadeye Securities which pioneered and traded mining swaps, operated cloud mining data centers, and managed a mining investment fund.",
          alpha:require("../../assets/images/about/Ashu Swami.png"),
        },
        {
          name:"Bob Morris",
          position:"Chief Compliance Officer",
          experience:"Bob has extensive experience in AML/KYC compliance regulation. He founded his own Broker-Dealer and has led numerous trading firms. He also has served as a FINRA arbitrator.",
          alpha:require("../../assets/images/about/Bob Morris.png"),
        },
        {
          name:"Alison Ehrmann",
          position:"SVP of Global Marketing",
          experience:"Alison has held leadership positions in digital marketing, ecommerce, customer experience and subscriptions at ToysRUs, FreshDirect, Conde Nast, Time Warner and Barnes&Noble.com.",
          alpha:require("../../assets/images/about/Alison Ehrmann.png"),
        },
        {
          name:"CHARLIE YEH",
          position:"-",
          experience:"Charlie is an experienced banking lawyer. He previously helped Digital Asset's clients design next generation settlement systems on DLT. Prior to that, Charlie was an Executive Director at JPMorgan covering its clearance and collateral management functions. ",
          alpha:require("../../assets/images/about/CHARLIE YEH.png"),
        },
        {
          name:"SIMON GRUNFELD",
          position:"SVP of Operations",
          experience:"Simon‘s background is mostly from the retail FX and IT solutions marketplace. Simon become a registered CTA (2006) to form Gallant FX and then co- founded Gallant VPS.",
          alpha:require("../../assets/images/about/SIMON GRUNFELD.png"),
        },
      ]
    }
  }
}
</script>

<style lang="less">
#about{
  background-color: #F8F9FA;
  .mainTitle{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 310px;
    background-color: #151D24;
    .ask{
      font-size: 46px;
      color:#fff;
    }
    .answer{
      font-size: 20px;
      color: #fff;
    }
  }
  .describe{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 238px;
    background-color: #fff;
    margin-bottom: 100px;
    .describeInner{
      font-size: 14px;
      color:#77838F;
    }
  }
  .team{
    overflow: hidden;
    .title{
      text-align: center;
      font-size: 36px;
      color:#304454;
      margin-bottom: 60px;
    }
    .members{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .member{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 60px;
        .des{
          float: left;
          width: 206px;
          font-size: 14px;
          color: #304454;
          margin-right:44px;
          margin-bottom:10px;
          .name{
            font-size: 20px;
            color:#304454;
          }
        }
        .alpha{
          float: left;
          width: 250px;
          height: 270px;
          background-color: #fff;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>