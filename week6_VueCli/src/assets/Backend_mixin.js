export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    // 後台 login
    login(form) {
      this.isLoading = true;
      this.$http.post(`${process.env.VUE_APP_PATH}api/auth/login`, form)
        .then((res) => {
          if (res.status === 200) {
            this.redirection(res.data);
            this.successNotify(res.data.message);
            this.$router.replace('/admin');
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.errorNotify(err.response.data.message);
          this.isLoading = false;
        });
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
      this.$http.post(`${process.env.VUE_APP_PATH}api/auth/check`, { api_token: this.token })
        .then((res) => {
          if (res.status === 200) this.$http.defaults.headers.common.Authorization = `Bearer ${this.getToken()}`;
        })
        .catch((err) => {
          this.$router.replace('/login');
          this.errorNotify(err.response.data.message);
        });
    },
    // 取得所有商品列表
    getProductList() {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/admin/ec/products`)
        .then((res) => {
          if (res.status === 200) {
            this.products = res.data.data;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorNotify(err.response.data.message);
        });
    },
    // 上傳團片
    UploadFile(data) {
      this.$http.post(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/admin/storage`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((res) => {
          if (res.status === 200) {
            this.isUplading = false;
            this.inputTemp.imageUrl.push(res.data.data.path);
          }
        })
        .catch((err) => {
          this.isUplading = false;
          this.errorNotify(err.response.data.message);
        });
    },
    // 新增商品
    CreateProd(data) {
      this.$http.post(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/admin/ec/product`, data)
        .then((res) => {
          if (res.status === 200) {
            this.getProductList();
            this.successNotify('商品新增成功');
          }
        })
        .catch((err) => { this.errorNotify(err.response.data.message); });
    },
    // 編輯商品
    UpdateProd(data) {
      this.$http.patch(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${data.id}`, data)
        .then((res) => {
          if (res.status === 200) {
            this.getProductList();
            this.successNotify(`${data.title} 編輯成功`);
          }
        })
        .catch((err) => { this.errorNotify(err.response.data.message); });
    },
    // 刪除商品
    destroyProduct(id) {
      this.isLoading = true;
      this.$http.delete(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.getProductList();
          }
        })
        .catch((err) => { this.errorNotify(err.response.data.message); });
    },
  },
};
