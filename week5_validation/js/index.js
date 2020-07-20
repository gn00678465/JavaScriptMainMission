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
    payForm: {},
    productList: [],
    cartList: [],
    isLoading: false,
    fullPage: true,
    addCartLoading: {
      isLoading: false,
      loader: 'dots'
    },
    editLoading: false
  },
  created() {
    this.getData()
    this.getCartList()
  },
  mounted() {
  },
  methods: {
    async getData () {
      try {
        const API = await import('./API_frontstage.js')
        this.isLoading = true
        API.ProductListAPI()
        .then ((response) => {
          this.productList = response.data.data
          this.isLoading = false
        })
        .catch((err) => {console.log(err)})
      }
      catch (err) {
        console.log(err)
      }
    },
    async getCartList () {
      try {
        const API = await import('./API_frontstage.js')
        this.isLoading = true
        await API.shoppingListAPI()
        .then ((response) => {
          this.cartList = response.data.data
          this.isLoading = false
        })
        .catch((err) => {console.log(err)})
      }
      catch (err) {
        console.log(err)
      }
    },
    async addCart (data) {
      try {
        this.addCartLoading.isLoading = true
        const product = data.id
        const quantity = 1
        const API = await import('./API_frontstage.js')
        // console.log({product, quantity})
        API.CartAPI('post',{product, quantity})
          .then((res) => {
            // console.log(res)
            if (res.status === 200) this.addCartLoading.isLoading = false
            this.getCartList()
          })
          .catch((err) => {
            console.log(err)
          })
      }
      catch (err) { console.log(err) }
    },
    async editCart (id, quantity) {
      try {
        this.$refs[id][0].loading.isLoading = true
        const API = await import('./API_frontstage.js')
        // console.log({'product': id, quantity})
        API.CartAPI('patch',{'product': id, quantity})
          .then((res) => {
            // console.log(200)
            if (res.status === 200) {
              this.$refs[id][0].loading.isLoading = false
              this.getCartList()
            }
          })
          .catch((err) => console.log(err))
      }
      catch (err) {console.log(err)}
    },
    async delCart (id) {
      try {
        const API = await import('./API_frontstage.js')
      // console.log(module.delCart(id))
      API.delCartAPI(id)
        .then((res) => {
          if (res.status === 200) this.getCartList()
        })
        .catch((err) => console.log(err))
      }
      catch (err) {console.log(err)}
    },
    async delAllCart () {
      try {
        const API = await import('./API_frontstage.js')
        API.delAllCartAPI()
          .then(res => {
            if (res.status === 200) this.getCartList()
          })
          .catch((err) => console.log(err))
      }
      catch (err) {console.log(err)}
    }
  },
  computed: {
    calcTotalPrice () {
      return this.cartList.map( cart => cart.quantity * cart.product.price)
      .reduce((prev, current) => prev + current, 0)
    }
  }
})