<template>
    <div class="depth-container">
        <v-depth-chart :data="resultData"></v-depth-chart>
    </div>
</template>
<script>
export default {
	props:{
		depthPicData:{
			type:Object,
		},
	},
    data(){
        return{
            resultData:null,
        }
	},
	watch:{
		depthPicData(val,oldVal){
			this.resultData = val;
			this.calData(val)
			console.log('change',val)
		}
	},
	methods:{	
		calData(data){
			for (let i in data['bidsList']) {
			  let total = 0
			  for (let n = 0; n <= i; n++) {
			    total += data['bidsList'][n]['quantity']
			  }

			  data['bidsList'][i]['total'] = total.toFixed(2);
			}
			for (let i in data['asksList']) {
			  let total = 0
			  for (let n = i; n < data['asksList'].length; n++) {
			    total += data['asksList'][n]['quantity']
			  }
			  data['asksList'][i]['total'] = total.toFixed(2)
		}

	}

	},
    created(){
   
	},
	mounted(){
	}
}
</script>
<style lang='less'>
    .depth-container{
        width: 450px;
        height: 506px;
        .deepth-chart{
            height: 100%;
            .deepth-chart-layout{
                height: 100% !important;
                .chart-x{
                    top:auto !important;
                    bottom: 0px !important;
                }
                .chart-y{
                    left: 0px !important;
                }
            }
        }
        // canvas{
        //     width: 100%;
        //     height: 100%;
        // }
    }
</style>