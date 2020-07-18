// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

// Class 設定檔案
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
})

var app = new Vue({
  el: '#app',
  data: {
    payForm: {}
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    
  },
  computed: {
    
  },
})