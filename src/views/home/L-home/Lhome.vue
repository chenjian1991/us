<template>
    <div>
       <div id="home_pc" class="wrapper">
            <div class="container-self home_container">
       <!--      part1     -->
              <div class="pannel-landing-page data_background text-center content-1">
                <div class="container">
                  <div class="row ico-countdown-group">
                    <div class="col-md-6 col-lg-6 col-xs-12 text-left">
                        <h1><strong class="g_strong">{{$t('LTitle')}}<br /><br />{{$t('LTitleContent')}}</strong></h1>
                        <p class="white-color font-size-16 description">{{$t('LTitleDetails')}}</p>
                        <div  @click="gotoAcount" v-if="!logToken">
                           <router-link to='/safeCenter' class="btn btn-default btn-account" >{{$t('LBtnManage')}}</router-link>
                        </div>
                         <div v-else>
                             <router-link class="btn btn-default btn-account" to='/register'>{{$t('LBtnOpen')}}</router-link>
                         </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xs-12">
                            <img  class="w-480"  :src='imgSrc' />
                    </div>
                  </div>
                </div>
              </div>
 <!--      part2    -->
  <div class="content-2">
                  <div class="container">
							<div class="row">	
								<div class="col-lg-6 col-md-6 col-xs-12">
									<img :src='imgSrc1' class="w-480">
								</div>
								<div class="col-lg-6 col-md-6 col-xs-12">
									<div class="font-26">
										{{$t('LPart1Title1')}}
                                     </br>
                                        {{$t('LPart1Title2')}}
									</div>
									<div class="content-p">
										<p>
										{{$t('LPart1')}}
										</p>
										<p class="margin-t-15">
											{{$t('LPart2')}}
										</p>
									</div>
								</div>
							</div>
						</div>
              </div>
 <!--      part2     -->
 <!--      part3    -->
  <div class="content3">
                  <div class="container">
							<div class="row">	
								<div class="col-lg-6 col-md-6 col-xs-12">
									<div class="business-title">
										{{$t('LPart2Title1')}}
										 </br>
										{{$t('LPart2Title2')}}
									</div>
									<div class="business-description">
										<p>
											{{$t('LPart3')}}
										</p>
										<p class="margin-t-15">
											{{$t('LPart4')}}
										</p>
									</div>
								</div>
								<div class="col-lg-6 col-md-6 col-xs-12">
									<img :src='imgSrc2'>
								</div>
							</div>
						</div>
              </div>
 <!--      part4    -->
  <div class="content4">
        <div class="container">
                <div class="row">	
                    <div class="col-lg-6 col-md-6 col-xs-12">
                        <img  :src='imgSrc3'>
                    </div>
                    <div class="col-lg-6 col-md-6 col-xs-12">
                        <div class="local-business">
                            {{$t('LPart3Title1')}}
                        </div>
                        <div class="local-description">
                            <p>
                            {{$t('LPart5')}}
                            </p>
                            <p class="">
                                {{$t('LPart6')}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  <!--      part5     -->
  <div class="content5">
            <div class="text-center p5-title">
                {{$t('LPart5Title')}}
            </div>
            <div class="container text-center">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-lg-4">
                        <img class="p5-pic" src="../../../assets/images/home/Lhome/point4.png">
                        <div class="p5-content">
                            {{$t('LPart5ContentTitle1')}}
                        </div>
                        <div class="p5-content1">
                            {{$t('LPart5Content1')}}
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-lg-4">
                        <img class="p5-pic" src="../../../assets/images/home/Lhome/point5.png">
                        <div class="p5-content">
                            {{$t('LPart5ContentTitle2')}}
                        </div>
                        <div class="p5-content1">
                            {{$t('LPart5Content2')}}
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-lg-4">
                        <img class="p5-pic" src="../../../assets/images/home/Lhome/point6.png">
                        <div class="p5-content">
                            {{$t('LPart5ContentTitle3')}}
                        </div>
                        <div class="p5-content1">
                            {{$t('LPart5Content3')}}
                        </div>
                    </div>
                </div>
            </div>
		</div>
           </div>
       </div>
      
    </div>
</template>

<script>
	
	import L_header_ch from '../../../assets/images/home/Lhome/L_header_ch.png';
    import L_header from '../../../assets/images/home/Lhome/L_header.png';
    import point1_ch from '../../../assets/images/home/Lhome/point1_ch.png';
    import point1 from '../../../assets/images/home/Lhome/point1.png';
    import point2_ch from '../../../assets/images/home/Lhome/liquid.png';
    import point2 from '../../../assets/images/home/Lhome/liquid.png';
    import point3_ch from '../../../assets/images/home/Lhome/coustomer.png';
    import point3 from '../../../assets/images/home/Lhome/coustomer.png';
    import {getSymbolList_realtime,BannerList,Mineing} from '../../../../api/home.js'//getSymbolList的名字必须与被引入文件的名字相同；
    import{swiper,swiperSlide} from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css';
    import bigDecimal from 'js-big-decimal';
    import {BigNumber} from 'bignumber.js';
    import {getDecimalExNumber } from '../../../lib/utils.js';
    export default {
        data(){
            return{
                imgSrc1:'',
                imgSrc2:'',
                imgSrc3:'',
                language:localStorage.getItem('countryLanguage'),
                modal2:localStorage.getItem('moduleAlert'),
                logToken : localStorage.getItem("logToken"),//new add
                imgSrc:'',
                modal3:false,
                tableData:[],
                tabels:[
                    {text:'1'},
                    {text:'2'},
                    {text:'3'},
                    {text:'4'},
                ],
                downloadFlag:true,
                exchangeTipsUrl:'',
                supervionUrl:'',
                evaluationUrl:'',
                defaultImg:'this.src="'+require('../../../assets/images/home/Lhome/default.png')+'"'
            }
        },
        components:{
           
        },
        computed:{
          
            languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            loginStatus(){
                return this.$store.state.app.isLogin;
            }
         
        },
        methods:{
            
            ChangePic(){
                let lang = localStorage.getItem('countryLanguage');
                if(lang=='zh-CN'){
                   this.imgSrc = L_header_ch;
                   this.imgSrc1 = point1_ch;
                   this.imgSrc2 = point2_ch;
                   this.imgSrc3 = point3_ch;
                }else {
                   this.imgSrc = L_header;
                   this.imgSrc1 = point1;
                   this.imgSrc2 = point2;
                   this.imgSrc3 = point3;
                }
            },
            
            closeDownload(){
                this.downloadFlag = false;
            },
         
            gotoDownload(){
                window.location.href='../../../../login/download.html';
            },
            gotoAcount(){

            },
            
        },
   
        watch:{
            languageChange(val,oldVal){//监听全局语言的状态
            	this.ChangePic()
            },
            loginStatus(val,oldVal){
                 let isLogin =  this.$store.state.app.isLogin;
                    if(isLogin){
                        this.isLogin = true;
                    }else{
                        this.isLogin = false;
                    }
            }
        },
        mounted(){
            this.ChangePic();
            this.$store.commit('changeHeaderColor', '');
            this.$store.commit('changeFooterColor', '#18183E');
        },
        created(){
          
        },
       
    }
</script>
<style lang="less">
 .plate-table .ivu-table th{
    background-color: #fff!important;
}
 .plate-table .ivu-table td:nth-child(7){
    cursor: pointer;
}
.swiper-pagination-bullet-active{
    background: #fff;
}
.swiper-pagination-bullet{
    background: rgba(255,255,255,1);
}
</style>
<style scoped lang='less'>
@import './Lhome.less';
</style>

