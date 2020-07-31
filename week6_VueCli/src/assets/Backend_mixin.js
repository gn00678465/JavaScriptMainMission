export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    // 後台 login
    login(form) {
      const vm = this;
      this.isLoading = true;
      this.$http.post(`${process.env.VUE_APP_PATH}api/auth/login`, form)
        .then((res) => {
          if (res.status === 200) {
            vm.redirection(res.data);
            vm.$router.replace('/admin');
            vm.isLoading = false;
          }
        })
        .catch((err) => { vm.err = err.data; });
    },
    // token 寫入 cookie
    redirection(data) {
      const { token, expired } = data;
      const sExpired = new Date(expired * 1000);
      document.cookie = `HEXtoken=${token};path=/;expires=${sExpired}`;
    },
    // 取出 cookie 內的 token
    getToken() {
      return document.cookie.replace(/(?:(?:^|.*;\s*)HEXtoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    },
    // 確認 Token status
    checkStatus() {
      const vm = this;
      this.$http.post(`${process.env.VUE_APP_PATH}api/auth/check`, { api_token: this.token })
        .then((res) => {
          if (res.status === 200) vm.$http.defaults.headers.common.Authorization = `Bearer ${this.getToken()}`;
        })
        .catch((err) => {
          this.$router.replace('/login');
          vm.err = err.data;
        });
    },
    // 取得所有商品列表
    getProductList() {
      const vm = this;
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/admin/ec/products`)
        .then((res) => {
          if (res.status === 200) {
            vm.products = res.data.data;
            vm.isLoading = false;
          }
        })
        .catch((err) => console.log(err.response.data.message));
    },
    // 刪除商品
    destroyProduct(id) {
      const vm = this;
      this.isLoading = true;
      this.$http.delete(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`)
        .then((res) => {
          if (res.status === 200) {
            vm.getProductList();
          }
        })
        .catch((err) => { vm.err = err.data; });
    },
  },
};
