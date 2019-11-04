<template>
  <div class="aboutBox" style="font-family: helvetica, 'Microsoft YaHei', 'PingFang SC;">
    <div class="container">
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12 mb-3">
          <ul>
            <li>
              <router-link to="/legal/terms" :class="{active:$route.path === '/legal/terms'}">· User Agreement</router-link>
            </li>
            <li>
              <router-link to="/legal/privacy" :class="{active:$route.path === '/legal/privacy'}">· Privacy Policy</router-link>
            </li>
            <!-- <li>
              <router-link to="/legal/disclaimer" :class="{active:$route.path === '/legal/disclaimer'}">· Disclaimer</router-link>
            </li>
            <li>
              <router-link class="active" to="/legal/fee" :class="{active:$route.path === '/legal/fee'}">· Fee Schedule</router-link>
            </li> -->
            <li>
              <router-link to="/legal/tradingRules" :class="{active:$route.path === '/legal/tradingRules'}">· Trading Rules</router-link>
            </li>
          </ul>
        </div>
        <div class="panel-body paddong_30_left left-part col-lg-10 col-md-9 col-sm-12 col-xs-12">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.aboutBox {
  padding: 40px 0.1rem;
  font-size: 14px;
  font-weight: bolder;
  background: #fff;
  ul {
    li {
      font-size: 14px;
      line-height: 41px;
      a {
        color: rgb(175, 175, 175);
      }
      .active {
        color: rgb(18, 134, 154);
      }
    }
  }
  p {
    margin: 10px 0;
    color: #5c6166;
    text-align: justify;
  }
  .title {
    font-size: 14px;
    color: rgb(52, 72, 87);
    line-height: 40px;
  }
  .panel-title {
    color: #344857;
    border-bottom: 1px solid rgba(24, 24, 62, 0.3);
    margin: 0;
  }
  .panel-gray {
    background: #202a39;
    color: #a7a7a7;
  }
  .font-weight {
    font-weight: bold;
    padding: 15px 0px 0px;
    font-size: 17px;
  }
  .fees {
    width: 500px;
    thead {
      th {
        color: #000;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border: 1px solid #f5f5f5;
        &:nth-child(1) {
          text-align: left;
          padding-left: 15px;
        }
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
          height: 40px;
          line-height: 40px;
          border: 1px solid #f5f5f5;
          &:nth-child(1) {
            text-align: left;
            padding-left: 15px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .aboutBox {
    .fees {
      width: 100% !important;
    }
  }
}
</style>