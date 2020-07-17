import navbar from "./parts/navbar.js";
import pagination from "./parts/pagination.js";
import productItem from "./parts/productItem.js";

new Vue({
  el: "#app",
  data: {
    uuid: "",
    token: "",
    products: [],
    input: {
      imageUrl: []
    },
    option: {
      commit: []
    },
    isNew: false,
    totalPage: 0,
    page: 0
  },
  components: { navbar, pagination, productItem },
  created() {
    this.uuid = document.cookie.replace(
      /(?:(?:^|.*;\s*)MYuuid\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)MYtoken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (this.token == '') window.location.href = "./index.html";
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
        vm.totalPage = parseInt(vm.products.length / 10) + 1;
      });
    },
    showModal() {
      $("#productModal").modal("show");
    },
    closeModal() {
      $("#productModal").modal("hide");
    },
    clearInput() {
      this.input = {};
      this.$set(this.input, "imageUrl", []);
      this.option = {};
      this.$set(this.option, "commit", []);
      this.closeModal();
    },
    confirmClick() {
      let result = window.confirm(`要${this.showText}此產品嗎?`);
      if (this.isNew && result) this.addDone();
      else if (!this.isNew && result) this.editDone();
    },
    addHandler() {
      this.isNew = true;
      this.showModal();
    },
    addCommit() {
      const result = window.prompt("請輸入評論");
      this.option.commit.push(result);
    },
    addDone() {
      const vm = this;
      this.input.option = JSON.stringify(this.option);
      const api = `https://course-ec-api.hexschool.io/api/${
        this.uuid
      }/admin/ec/product`;
      axios
        .post(api, this.input)
        .then(response => {
          vm.clearInput();
          vm.getData();
          vm.isNew = false;
        })
        .catch(err => console.log(err));
    },
    editHandler(data) {
      const newData = Object.assign({}, data);
      this.input = newData;
      this.showModal();
    },
    editDone() {
      const vm = this;
      const api = `https://course-ec-api.hexschool.io/api/${
        this.uuid
      }/admin/ec/product/${this.input.id}`;
      axios
        .patch(api, this.input)
        .then(response => {
          vm.clearInput();
          vm.getData();
        })
        .catch(err => console.log(err));
    },
    delHandler(data) {
      const vm = this;
      const api = `https://course-ec-api.hexschool.io/api/${
        this.uuid
      }/admin/ec/product/${data.id}`;
      let result = window.confirm("要刪除此產品嗎?");
      if (result) {
        axios
          .delete(api)
          .then(response => vm.getData())
          .catch(err => console.log(err));
      }
    }
  },
  computed: {
    showProduct() {
      const newProducts = [];
      Array.from(this.products).forEach((product, i) => {
        if (i % 10 === 0) newProducts.push([]);
        const p = parseInt(i / 10);
        newProducts[p].push(product);
      });
      return newProducts[this.page];
    },
    showText() {
      return this.isNew ? "新增" : "編輯";
    }
  },
  updated() {
    const vm = this;
    $("#productModal").on("hidden.bs.modal", function(e) {
      vm.clearInput();
      vm.isNew = false;
    });
  }
});
