<template>
  <div id="about">
    <div class="mainTitle">
      <div class="ask container">Who are we?</div>
      <div class="answer container">We believe that trading should be transparent, neutral, and give everyone the best chance to win. </div>
    </div>
    <div class="describe">
      <div class="describeInner container">We’re a team of 30+ visionaries, tech-geeks, enthusiasts, and innovators - none of which are mutually exclusive. The one commonality we all share is our passion for finding simple solutions to complex problems.</div>
    </div>
    <div class="team container">
      <div class="title">Meet the Management Team </div>
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
          experience:"David is a former Vice Chairman of Nasdaq. He priced over 1,000 equity offerings as head of top 10 investment bank and his thought leadership led him to be called the “Father of JOBS Act”.",
          alpha:require("../../assets/images/about/David.png"),
        },
        {
          name:"Haohan Xu",
          position:"CEO and Co-founder",
          experience:"Haohan is fintech investor and founder of Apifiny. Haohan holds bachelor degree from Columbia University, and double major in computer science and operations research.",
          alpha:require("../../assets/images/about/Haohan.png"),
        },
        {
          name:"Ashu Swami",
          position:"Chief Technology Officer Co-founder",
          experience:"Ashu Swami previously was the SPV of Quadeye Securities (mining), pioneered trading swaps, operated cloud datacenters, and managed an investment fund. ",
          alpha:require("../../assets/images/about/Ashu.png"),
        },
        {
          name:"Bob Morris",
          position:"Chief Compliance Officer",
          experience:"Bob has managed numerous compliance teams, including AML and Global Economic Sanction transaction monitoring, KYC and CDD remediation, SAR, trade, Bitcoin and Exchanges.",
          alpha:require("../../assets/images/about/Bob.png"),
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