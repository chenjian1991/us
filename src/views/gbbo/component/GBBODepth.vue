<template>
    <div class="depth-container">
        <v-depth-chart :depthdata="depthdata"></v-depth-chart>
    </div>
</template>
<script>
// const data = {
//   'sell': [
//     { 'price': 9000, 'amount': 8176 },
//     { 'price': 8999.84, 'amount': 10245 },
//     { 'price': 8999.68, 'amount': 19147 },
//     { 'price': 8999.52, 'amount': 4150 },
//     { 'price': 8999.36, 'amount': 10420 },
//     { 'price': 8999.2, 'amount': 16053 },
//     { 'price': 8999.04, 'amount': 8480 },
//     { 'price': 8998.88, 'amount': 12751 },
//     { 'price': 8998.72, 'amount': 14187 },
//     { 'price': 8998.56, 'amount': 7916 },
//     { 'price': 8998.32, 'amount': 14187 },
//     { 'price': 8998.22, 'amount': 14187 },
//     { 'price': 8998.12, 'amount': 1 },
//     { 'price': 8998.02, 'amount': 4 },
//     { 'price': 8997.72, 'amount': 3 },
//     { 'price': 8997.42, 'amount': 2 },
//     { 'price': 8997.22, 'amount': 1 }
//   ],
//   'buy': [
//     { 'price': 8999, 'amount': 1 },
//     { 'price': 8748.74, 'amount': 2 },
//     { 'price': 8748.48, 'amount': 3 },
//     { 'price': 8748.22, 'amount': 4 },
//     { 'price': 8747.96, 'amount': 1 },
//     { 'price': 8747.7, 'amount': 3414 },
//     { 'price': 8747.44, 'amount': 12062 },
//     { 'price': 8747.18, 'amount': 19389 },
//     { 'price': 8746.92, 'amount': 8999 },
//     { 'price': 8746.66, 'amount': 8675 }
//   ]
// }

const data = {
	"asksList": [
        {
		"quantity": 6.1261983,
		"ex": "COINBASEPRO",
		"price": 7189
	}, {
		"quantity": 6.6261983,
		"ex": "COINBASEPRO",
		"price": 7189
	}, {
		"quantity": 6.69548332,
		"ex": "COINBASEPRO",
		"price": 7190
	}, {
		"quantity": 6.99548332,
		"ex": "COINBASEPRO",
		"price": 7190
	}, {
		"quantity": 7.42218254,
		"ex": "COINBASEPRO",
		"price": 7190
	}, {
		"quantity": 8.43301184,
		"ex": "COINBASEPRO",
		"price": 7190
	}, {
		"quantity": 8.61301184,
		"ex": "COINBASEPRO",
		"price": 7190
	}, {
		"quantity": 8.91301184,
		"ex": "COINBASEPRO",
		"price": 7190
	}, {
		"quantity": 10.08344034,
		"ex": "COINBASEPRO",
		"price": 7191
	}, {
		"quantity": 12.85744034,
		"ex": "COINBASEPRO",
		"price": 7192
	}, {
		"quantity": 16.46561994,
		"ex": "COINBASEPRO",
		"price": 7192
	}, {
		"quantity": 16.50561994,
		"ex": "COINBASEPRO",
		"price": 7193
	}, {
		"quantity": 20.03161994,
		"ex": "COINBASEPRO",
		"price": 7193
	}, {
		"quantity": 21.04089454,
		"ex": "COINBASEPRO",
		"price": 7194
	}, {
		"quantity": 22.04089454,
		"ex": "COINBASEPRO",
		"price": 7194
	}, {
		"quantity": 22.23929454,
		"ex": "BITTREX",
		"price": 7194
	}, {
		"quantity": 22.38929454,
		"ex": "BITTREX",
		"price": 7194
	}, {
		"quantity": 23.38929454,
		"ex": "COINBASEPRO",
		"price": 7194
	}, {
		"quantity": 23.68929454,
		"ex": "COINBASEPRO",
		"price": 7195
	}, {
		"quantity": 23.98929454,
		"ex": "COINBASEPRO",
		"price": 7195
	}, {
		"quantity": 24.04929454,
		"ex": "COINBASEPRO",
		"price": 7195
	}, {
		"quantity": 24.08271106,
		"ex": "BITTREX",
		"price": 7195
	}, {
		"quantity": 25.16684216,
		"ex": "COINBASEPRO",
		"price": 7195
	}, {
		"quantity": 25.19196549,
		"ex": "BITTREX",
		"price": 7196
	}, {
		"quantity": 25.44096549,
		"ex": "BITTREX",
		"price": 7202
	}, {
		"quantity": 25.71901119,
		"ex": "BITTREX",
		"price": 7202
	}, {
		"quantity": 25.91901119,
		"ex": "BITTREX",
		"price": 7202.68
	}, {
		"quantity": 26.84901119,
		"ex": "BITTREX",
		"price": 7205.4
	}, {
		"quantity": 29.40751119,
		"ex": "BITTREX",
		"price": 7205.4
	}, {
		"quantity": 29.40801119,
		"ex": "BITTREX",
		"price": 7207.53
	}, {
		"quantity": 29.56701119,
		"ex": "BITTREX",
		"price": 7207.57
	}, {
		"quantity": 31.65132119,
		"ex": "BITTREX",
		"price": 7209.93
	}, {
		"quantity": 31.75132119,
		"ex": "BITTREX",
		"price": 7210.57
	}, {
		"quantity": 31.77132119,
		"ex": "BITTREX",
		"price": 7212.78
	}, {
		"quantity": 36.36326679,
		"ex": "BITTREX",
		"price": 7213.05
	}, {
		"quantity": 38.36326679,
		"ex": "BITTREX",
		"price": 7213.05
	}, {
		"quantity": 38.56326679,
		"ex": "BITTREX",
		"price": 7213.08
	}, {
		"quantity": 39.33249679,
		"ex": "BITTREX",
		"price": 7213.08
	}, {
		"quantity": 39.66591331,
		"ex": "BITTREX",
		"price": 7214.13
	}, {
		"quantity": 39.71091331,
		"ex": "HITBTC",
		"price": 7214.77
	}, {
		"quantity": 39.71678331,
		"ex": "HITBTC",
		"price": 7214.78
	}, {
		"quantity": 39.72488331,
		"ex": "HITBTC",
		"price": 7215.1
	}, {
		"quantity": 40.68988331,
		"ex": "HITBTC",
		"price": 7215.11
	}, {
		"quantity": 41.14488331,
		"ex": "HITBTC",
		"price": 7215.13
	}, {
		"quantity": 41.16488331,
		"ex": "BITTREX",
		"price": 7215.26
	}, {
		"quantity": 41.21488331,
		"ex": "HITBTC",
		"price": 7215.47
	}, {
		"quantity": 41.23703331,
		"ex": "HITBTC",
		"price": 7215.5
	}, {
		"quantity": 41.43703331,
		"ex": "HITBTC",
		"price": 7215.69
	}, {
		"quantity": 41.63703331,
		"ex": "HITBTC",
		"price": 7215.7
	}, {
		"quantity": 42.68703331,
		"ex": "HITBTC",
		"price": 7215.71
	}],
	"bidsList": [
        {
		"quantity": 12.533845,
		"ex": "COINBASEPRO",
		"price": 7189.09
	}, {
		"quantity": 14.6063004,
		"ex": "COINBASEPRO",
		"price": 7189.0
	}, {
		"quantity": 19.0213864,
		"ex": "COINBASEPRO",
		"price": 7188.73
	}, {
		"quantity": 19.0613864,
		"ex": "COINBASEPRO",
		"price": 7188.32
	}, {
		"quantity": 20.8401945,
		"ex": "COINBASEPRO",
		"price": 7188.18
	}, {
		"quantity": 23.6171945,
		"ex": "COINBASEPRO",
		"price": 7188.17
	}, {
		"quantity": 24.3411945,
		"ex": "COINBASEPRO",
		"price": 7187.82
	}, {
		"quantity": 25.3411945,
		"ex": "COINBASEPRO",
		"price": 7187.7
	}, {
		"quantity": 25.4011945,
		"ex": "COINBASEPRO",
		"price": 7187
	}, {
		"quantity": 25.7352825,
		"ex": "HUOBI",
		"price": 7187
	}, {
		"quantity": 25.7366705,
		"ex": "HUOBI",
		"price": 7187
	}, {
		"quantity": 26.0824985,
		"ex": "HUOBI",
		"price": 7187.35
	}, {
		"quantity": 26.0852745,
		"ex": "HUOBI",
		"price": 7187.34
	}, {
		"quantity": 26.0862745,
		"ex": "COINBASEPRO",
		"price": 7187.25
	}, {
		"quantity": 26.0876625,
		"ex": "HUOBI",
		"price": 7187
	}, {
		"quantity": 26.1951805,
		"ex": "HUOBI",
		"price": 7187
	}, {
		"quantity": 26.1965685,
		"ex": "HUOBI",
		"price": 7187
	}, {
		"quantity": 26.4024685,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 26.5224685,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 26.5721485,
		"ex": "COINBASEPRO",
		"price": 7186
	}, {
		"quantity": 26.5732475,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 26.5749135,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 27.3723135,
		"ex": "COINBASEPRO",
		"price": 7186
	}, {
		"quantity": 28.3843315,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 28.5866315,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 29.5804335,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 29.83143694,
		"ex": "COINBASEPRO",
		"price": 7186
	}, {
		"quantity": 29.83863694,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 30.03863694,
		"ex": "HUOBI",
		"price": 7186
	}, {
		"quantity": 31.12276814,
		"ex": "COINBASEPRO",
		"price": 7186
	}, {
		"quantity": 32.12276814,
		"ex": "COINBASEPRO",
		"price": 7186.1
	}, {
		"quantity": 33.16295314,
		"ex": "HUOBI",
		"price": 7186.09
	}, {
		"quantity": 33.37795314,
		"ex": "HUOBI",
		"price": 7185
	}, {
		"quantity": 33.45795314,
		"ex": "COINBASEPRO",
		"price": 7185
	}, {
		"quantity": 33.55795314,
		"ex": "HUOBI",
		"price": 7185
	}, {
		"quantity": 33.57282214,
		"ex": "HUOBI",
		"price": 7185
	}, {
		"quantity": 34.69637694,
		"ex": "COINBASEPRO",
		"price": 7185
	}, {
		"quantity": 35.29637694,
		"ex": "COINBASEPRO",
		"price": 7184
	}, {
		"quantity": 36.29637694,
		"ex": "COINBASEPRO",
		"price": 7184
	}, {
		"quantity": 36.31737694,
		"ex": "COINBASEPRO",
		"price": 7184
	}, {
		"quantity": 36.33997694,
		"ex": "BITHUMB",
		"price": 7163
	}, {
		"quantity": 36.35877694,
		"ex": "BITHUMB",
		"price": 7162
	}, {
		"quantity": 36.36077694,
		"ex": "BITHUMB",
		"price": 7160
	}, {
		"quantity": 38.04147694,
		"ex": "BITHUMB",
		"price": 7159
	}, {
		"quantity": 39.82427694,
		"ex": "BITHUMB",
		"price": 7158
	}, {
		"quantity": 44.84477694,
		"ex": "BITHUMB",
		"price": 7156
	}, {
		"quantity": 44.87143677,
		"ex": "BITSO",
		"price": 7156
	}, {
		"quantity": 46.37483677,
		"ex": "BITHUMB",
		"price": 7155
	}, {
		"quantity": 46.40920909,
		"ex": "BITSO",
		"price": 7155
	}, {
		"quantity": 48.77360909,
		"ex": "BITHUMB",
		"price": 7154
	}],
	"symbol": "BTCUSD",
	"transactionTimestamp": 1577422212116
}
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
export default {
	props:{
		depthdata:{
			type:Object,
			default(){
				return {}
			}
		},
	},
    data(){
        return{
            data:null,
        }
	},
	
    created(){
         setTimeout(() => {
      this.data = data
    }, 1000)
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