import navbar from "./parts/navbar.js";
import pagination from "./parts/pagination.js";
import productItem from "./parts/productItem.js";
import modal from './parts/modal.js'

new Vue({
  el: "#app",
  data: {
    uuid: "",
    token: "",
    products: [],
    input: {}
  },
  components: { navbar, pagination, productItem, modal },
  created() {
    this.uuid = document.cookie.replace(
      /(?:(?:^|.*;\s*)MYuuid\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)MYtoken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const vm = this;
      const api_addr = "https://course-ec-api.hexschool.io/api";
      axios.get(`${api_addr}/${this.uuid}/admin/ec/products`).then(response => {
        vm.products = response.data.data;
      });
    },
    show() {
      $("#productModal").modal("show");
    }
  }
});
