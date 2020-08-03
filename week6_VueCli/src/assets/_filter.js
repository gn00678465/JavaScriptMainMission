import Vue from 'vue';

// 加入貨幣符號
Vue.filter('Dollar', (val) => `$${val}`);

// 貨幣千分位
Vue.filter('Currency', (num) => {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
});
