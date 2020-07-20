import forms from './components/form.js'
import cartItem from './components/cartItem.js'

// form
Vue.component('payForm', forms)
// loading
Vue.component('loading', VueLoading)
// cart
Vue.component('cartItem', cartItem)
// filter
Vue.filter('Dollar', function (val) {
  return `$${val}`
})
Vue.filter('Currency', function(num){
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
})