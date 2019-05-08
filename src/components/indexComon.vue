<template>
    <div>
            <!-- PAGE CONTENT -->
          <div>
					   <div class="spacer_50"></div>

            <div style="margin-top:0px;" class="header-title-breadcrumb element-box-shadow">
              <div class="container">
				  
				  
			  <div class="index-exchange-section">
                <div  class="exchange-section data_background text-center title-subtile-holder"  data-background='/exchange/b11/assets/images/exchange-background2.png' style="padding:0px 0px;">
				              <h1 class="text-center section-title" style="max-width:850px;">{{$t("exchangeMarket")}}</h1>
                      <br>
                      <h1  class="text-center section-title" style="max-width:850px;">{{$t("globalRemove")}}</h1>
                      <p class="text-center font-weight-normal" style="max-width:750px;">
                        {{$t("introduce55")}}			  
                        </p>
					   <div class="spacer_30"></div>
					  <div class="row">
                <div class="">
                  <a href="#">
				          <div class="clearfix col-sm-12 col-md-4 col-lg-2 live-coin live-coin-v4 live-coin-v4-five text-center five-zhan"  href="55.com">
                      <a href="#" class="show-code">
                        <i  class="fa fa-bitcoin"></i>
                      </a>
                      <a target="_blank" href="#" class="show-code"><p class="no-margin"><strong> {{$t("globalExchange")}}</strong></p></a>
                      <p class="no-margin">B-Site</p>
                      <p class="no-margin"><i class="fa fa-caret-up text-green"></i></p>
                      <p class="no-margin"><strong> BTC, ETH, FF, USDT, DASH</br></strong></p>
                    </div>
                    </a>
                </div>
                
                <div class="">
                  <a target="_blank" href="https://l.55.com">
                  <div class="col-sm-12 col-md-4 col-lg-2 live-coin live-coin-v4 live-coin-v4-second text-center five-zhan">
                    <a target="_blank" href="https://l.55.com" class="show-code">
                      <i class="icon-location-pin icons"></i>
                    </a>
					          <div class="spacer_20"></div>
                    <a target="_blank" href="https://l.55.com" class="show-code"><p class="text-white no-margin"><strong>{{$t("localExchange")}}</strong></p></a>
                    <p class="text-white no-margin">L-Site </p>
                    <p class="text-white no-margin"><i class="fa fa-caret-up text-green" aria-hidden="true"></i></p>
                    <p class="text-white no-margin"><strong> {{$t("localExchangeIntroduce")}}</strong></p>
                  </div>
                  </a>
                </div>
				        <div class="">
                  <a target="_blank" href="https://s.55.com" class="show-code">
                  <div class="col-sm-12 col-md-4 col-lg-2 live-coin live-coin-v4 live-coin-v4-five text-center five-zhan">
                    <a target="_blank" href="https://s.55.com" class="show-code">
                      <i class="icon-badge icons"></i>
                    </a>
					          <div class="spacer_20"></div>
                    <a target="_blank" href="https://s.55.com" class="show-code"><p class="no-margin"><strong>{{$t("stockExchange")}}</strong></p></a>
                    <p class="no-margin">S-Site</p>
                    <p class="no-margin"><i style="font-size:12px;" class="fa fa-caret-up text-green" aria-hidden="true"></i></p>
                    <p class="no-margin"><strong>{{$t("stockExchangeIntroduce")}}</strong></p>
                  </div>
                  </a>
                </div>

                <div class="">
                    <a target="_blank" href="https://f.55.com" class="show-code">
                  <div class="col-sm-12 col-md-4 col-lg-2 live-coin live-coin-v4 live-coin-v4-second text-center five-zhan">
                    <a target="_blank" href="https://f.55.com" class="show-code">
                      <i class="icon-refresh icons"></i>
                    </a>
					          <div class="spacer_20"></div>
                    <a target="_blank" href="https://f.55.com" class="show-code"><p class="text-white no-margin"><strong>{{$t("foreignExchange")}}</strong></p></a>
                    <p class="text-white no-margin">F-Site</p>
                    <p class="text-white no-margin"><i style="font-size:12px;" class="fa fa-caret-up text-green" aria-hidden="true"></i></p>
                    <p class="text-white no-margin"><strong> {{$t("foreignExchangeIntroduce")}}</strong></p>
                  </div>
                    </a>
                </div>
				
			      	<div class="">
                 <div class="col-sm-12 col-md-4 col-lg-2 live-coin live-coin-v4 live-coin-v4-five text-center five-zhan">
                    <a href="javascript:;" class="show-code">
                      <i class="icon-people icons"></i>
                    </a>
					          <div class="spacer_20"></div>
                    <p class="no-margin"><strong>{{$t("personalExchange")}}</strong></p>
                    <p class="no-margin">P-Site</p>
                    <p class="no-margin"><i class="fa fa-caret-up text-green" aria-hidden="true"></i></p>
                    <p class="no-margin"><strong>{{$t("personalExchangeIntroduce")}}</strong></p>
                  </div>
                </div>
				
				
                <div class="">
                  <div class="col-sm-12 col-md-4 col-lg-2 live-coin live-coin-v4 live-coin-v4-six text-center five-zhan">
                    <a href="javascript:;" class="show-code">
                      <i class="icon-diamond icons"></i>
                    </a>
					          <div class="spacer_20"></div>
                    <p class="text-white no-margin"><strong> {{$t("produceExchange")}}</strong></p>
                    <p class="text-white no-margin">C-Site</p>
                    <p class="text-white no-margin"><i class="fa fa-caret-up text-green" aria-hidden="true"></i></p>
                    <p class="text-white no-margin"><strong> {{$t("produceExchangeIntrodue")}}</strong></p>
                  </div>
                </div>
              </div>
                    </div>
              </div>
				  
				  
              </div>
            </div>
            <!-- <a href="#" class="scrollToTop"><i class="fa fa-chevron-up text-white" aria-hidden="true"></i></a> -->
          </div>
          <!-- PAGE FOOTER -->
    </div>
</template>
<style lang='less' scoped>
.five-zhan{
        height: 280px;
        padding-top: 60px;
}
</style>

