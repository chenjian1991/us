<template>
<div id="optionalRegistration">
  <div class="intro">
    <div class="title container">What kind of account are you interested in?</div>
  </div>
  <div class="options container">
    <div class="lndividual item w-lg-50 w-80" @click="$router.push('register')">
      <div class="icon">
        <img src="./imgs/icon1@2x.png" alt="">
      </div>
      <div class="name">lndividual</div>
    </div>
    <div class="lnstiutional item w-lg-50 w-80" @click="$router.push('institutionUser')">
      <div class="icon">
        <img src="./imgs/icon2@2x.png" alt="">
      </div>
      <div class="name">lnstiutional</div>
    </div>
  </div>
</div>  
</template>

<script>
export default {
  data(){
    return{

    }
  },
}
</script>

<style lang="less">
#optionalRegistration{
  .intro{
    padding: 100px 0 200px;
    background-color: #151D24;
    .title{
      color: #fff;
      font-size: 46px;
      font-weight: 500;
    }
  }
  .options{
    display: flex;
    margin: -100px auto 300px;
    .item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 250px;
      background-color: #fff;
      border-radius:4px;
      box-shadow: 0 10px 22px rgba(0, 0, 0, .2);
      cursor: pointer;
      .icon{
        img{
          width: 64px;
          height: 70px;
        }
      }
      .name{
        margin-top: 40px;
        color: #2A3D4D;
        font-size: 24px;
        font-weight: 700;
      }
      &.lndividual{
        margin-right: 70px;
      }
    }
  }
}
</style>