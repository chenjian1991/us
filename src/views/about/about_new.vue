<template>
  <div id="about">
    <div class="mainTitle">
      <div class="ask container">Who are we?</div>
      <div class="answer container">We’re a team of visionaries, tech geeks, enthusiasts, and innovators with a common goal: Discover simple solutions to complex problems. Tresso is dedicated to helping our traders realize the best possible outcomes by amplifying trading options, speed, and efficiency. This is about elevating the trading experience in crypto, token, and digital asset markets—together, we’re driving trading innovation. </div>
    </div>
    <!-- <div class="describe">
      <div class="describeInner container">We’re an NYC-based team of visionaries, tech-geeks, enthusiasts, and innovators with a common goal: discover simple solutions to complex problems. Tresso is dedicated to helping our traders realize the best possible outcomes through amplified trading options, speed and efficiency, We’re elevating the trading experience in crypto, token and digital asset markets.  Together, we’re driving trading innovation.</div>
    </div> -->
    <div class="team container">
      <div class="title">The Tresso Team</div>
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
    <!-- <div class="opportunity">
      <div class="title container">
        <div class="oppor_title">Opportunities at Tresso</div>
        <div class="oppor_subTitle">Join our team to help reshape the future of trading</div>
      </div>
      <div class="why container">
        <div class="why_ask">Why Work at Tresso?</div><br/>
        <div class="why_answer">We’re an NYC-based team of visionaries, tech-geeks, enthusiasts, and innovators with a common goal: discover simple solutions to complex problems. Tresso is dedicated to helping our traders realize the best possible outcomes through amplified trading options, speed and efficiency, We’re elevating the trading experience in crypto, token and digital asset markets. Together, we’re driving trading innovation.</div>
      </div>
      <div class="benefit container">
        <div class="headings">
          Benefits:
        </div>
        <div class="tipsItems">
          <div class="tips w-lg-50" v-for="(item,index) in tipsItems" :key="index">
            <div class="name">{{item.name}}</div>
            <div class="line"></div>
            <div class="value">
              <span v-html="item.value"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="opening container">
        <div class="headings">
          Current Openings:
        </div>
        <iframe src="https://boards.greenhouse.io/55globalmarket" 
          frameborder="0"
          height="300px"
          width="100%"
          scrolling="auto"
        ></iframe>
      </div>
    </div> -->
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
          experience:"David is a former Vice Chairman of Nasdaq. As head of a Top 10 investment bank, he priced over 1,000 equity offerings. He is known for his leadership with the JOBS Act.",
          alpha:require("../../assets/images/about/DavidWeild.jpg"),
        },
        {
          name:"Haohan Xu",
          position:"CEO and Co-Founder",
          experience:"Haohan is a fintech investor and Co-Founder of Tresso. Haohan holds a bachelor’s degree from Columbia University, with a double major in computer science and operations research.",
          alpha:require("../../assets/images/about/Haohan Xu for WEB.jpg"),
        },
        {
          name:"Ashu Swami",
          position:"Chief Technology Officer and Co-Founder",
          experience:"Previously, Ashu led a high-frequency trading business at Morgan Stanley, and was a Chief Advisor on blockchain initiatives to Fortune 50 companies such as Intel.",
          alpha:require("../../assets/images/about/Ashu Swami.png"),
        },
        {
          name:"Charlie Yeh",
          position:"General Counsel",
          experience:"Charlie is an experienced banking lawyer. He previously helped Digital Asset's clients design next generation settlement systems on DLT. Prior to that, Charlie was an Executive Director at JPMorgan covering its clearance and collateral management functions. ",
          alpha:require("../../assets/images/about/CHARLIE YEH.png"),
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
          name:"Andrew Banhidi",
          position:"Head of Research and Technology Sales",
          experience:"Andrew’s previous roles include CTO of Global Equities, Sales, Research and Investment Banking at Bank of America Merrill Lynch, CTO of Merrill Lynch Japan, and Director of Global Trading Services at Merrill Lynch. He was also VP of Equity Trading Systems, and Executive Director of Development at Goldman Sachs.",
          alpha:require("../../assets/images/about/Andrew Banhidi for WEB.jpg"),
        },
        {
          name:"Preston Moerke",
          position:"Head of Treasury",
          experience:"Preston was previously Assistant Treasurer at Digital River, responsible for transforming and overseeing cash management, foreign exchange, debt, and investment portfolios. He also led global cash management operations at MoneyGram International, plus roles within Carlson Companies and US Bancorp.",
          alpha:require("../../assets/images/about/Preston Moerke for WEB.jpg"),
        },
        {
          name:"Christa Punturieri",
          position:"Head of Product",
          experience:"Christa comes to Tresso following roles at Bear Stearns, D. E. Shaw & Co., and E*TRADE. She has also held roles at large and startup SaaS and e-commerce organizations. Christa is leading the product vision and strategy for Tresso Group’s blockchain-powered global asset, trader, and consumer network.",
          alpha:require("../../assets/images/about/Christa Punturieri for WEB.jpg"),
        },
        {
          name:"Tim Janas",
          position:"M&A Counsel",
          experience:"Tim’s experience includes debt finance, private equity and tech transactional work at Vault 100 law firms, as well as advisory legal counsel roles for clients on the Forbes Global 2000 and World’s Most Innovative Companies lists.",
          alpha:require("../../assets/images/about/Tim Janas for WEB.jpg"),
        },
        {
          name:"Leo Wu",
          position:"Director of Settlement and Clearance",
          experience:"Leo joins Tresso from Quantitative Brokers, where he was the Team Lead and System Architect. Previously, Leo was a Technology Co-Founder with Bitchain Exchange. He also worked with ConvergEX Group, Sonic Trading and was Vice President of Execution Solutions at the Bank of New York.",
          alpha:require("../../assets/images/about/LeoWu for WEB.jpg"),
        },
        {
          name:"Amit Khandelwal",
          position:"Head of Execution Services",
          experience:"Prior to joining Tresso, Amit was Technical Product Manager of Tower Research Capital. He has also held roles in top-tier investment banks such as Lehman Brothers and Credit Suisse, and elite trading firms including Tower Research Capital and Knight Capital Group.",
          alpha:require("../../assets/images/about/Amit Khandelwal for WEB.jpg"),
        },
        /* {
          name:"SIMON GRUNFELD",
          position:"SVP of Operations",
          experience:"Simon‘s background is mostly from the retail FX and IT solutions marketplace. Simon become a registered CTA (2006) to form Gallant FX and then co- founded Gallant VPS.",
          alpha:require("../../assets/images/about/SIMON GRUNFELD.png"),
        }, */
      ],
      tipsItems:[
        {
          name:"Passionate Environment",
          value:"-A chance to write history and build an ecosystem<br/>"+
          "-Be part of a team completely disrupting an industry"
        },
        {
          name:"Global Network",
          value:"-Be part of a global and mutli-cultural team<br/>"+
          "-Collegiate Environment"
        },
        {
          name:"Comprehensive Health Plans",
          value:"-100% subsidized premiums for employees for Medical, Dental, and Vision<br/>"+
          "-50% subsidized premiums for dependants for Medical, Dental, and Vision<br/>"+
          "-HSA contributions"
        },
        {
          name:" Financial Resources",
          value:"-401K with a match<br/>"+
          "-Meaningful equity"
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
    padding-top: 83px;
    padding-bottom: 98px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    background-color: #151D24;
    .ask{
      font-size: 46px;
      color:#fff;
    }
    .answer{
      margin-top: 36px;
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
    margin-top: 100px;
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
  .opportunity{
    padding-top: 100px;
    background-color: #fff;
    .headings{
      font-size: 24px;
      color: #304454;
      font-weight: 600;
    }
    .title{
      .oppor_title{
        text-align: center;
        color:#304454;
        font-size: 36px;
        font-weight: 600;
      }
      .oppor_subTitle{
        text-align: center;
        color:#77838F;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .why{
      margin-top: 78px;
      .why_ask{
        color: #304454;
        font-weight: 600;
        font-size: 26px;
      }
      .why_answer{
        color: #77838F;
        font-size: 16px;
      }
    }
    .benefit{
      margin-top: 76px;
      .tipsItems{
        margin-top: 29px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .tips{
          margin-bottom: 50px;
          .name{
            color: #304454;
            font-size: 20px;
          }
          .line{
            margin-top: 14px;
            width:100px;
            height:4px;
            background:rgba(1,178,214,1);  
          }
          .value{
            margin-top: 19px;
            span{
              display: block;
            }
          }
        }
      }
    }
    .opening{
      margin-bottom: 147px;
    }
  }
}
</style>