import {getApi} from '_api/axios.js'
import {
   currencyImg
} from '_api/urls.js'


export function Market() {
}

Market.prototype.getCurrencyInfo = (name, fn) => {
   getApi(currencyImg, {currency: name}).then((data) => {
      fn(data);
   })
};