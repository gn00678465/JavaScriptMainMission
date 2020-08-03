export default {
  methods: {
    // 取得所有產品資料 views/Home/Products.vue
    GetAllProducts(page) {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`)
        .then((res) => {
          if (res.status === 200) {
            this.isLoading = false;
            this.productsList = res.data.data;
            this.paginationMeta = res.data.meta.pagination;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorNotify(err.response.data.message);
        });
    },
    // 取得單一產品資料 views/Home/Product.vue
    GetOneProduct(id) {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_PATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.isLoading = false;
            this.product = res.data.data;
            // this.paginationMeta = res.data.meta.pagination;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorNotify(err.response.data.message);
        });
    },
  },
};
