(function(Vue) {
  new Vue({
    el: "#app",
    data: {
      nowAction: "",
      input: {
      },
      products: [
        {
          category:"武功秘笈",
          content:"復古牛皮紙內頁厚度 0.7cm",
          description:"用失傳己久的絕學「還我漂漂拳」",
          enabled:true,
          id:1594215362,
          imageUrl:"https://d.ecimg.tw/items/DEAE9GA9006C241/000001_1478463322.jpg",
          origin_price:"400",
          price:"360",
          stars:"5",
          title:"還我漂漂拳",
          unit:"本",
        },
        {
          category:"武功秘笈",
          description:"武林史上最惡毒的武功絕學「面目全非腳」",
          enabled:true,
          id:1594215778,
          imageUrl:"https://cbu01.alicdn.com/img/ibank/2020/702/481/16488184207_1762109851.jpg",
          origin_price:"500",
          price:"450",
          stars:"5",
          title:"面目全非腳",
          unit:"本",
          content:"復古牛皮紙內頁厚度 0.7cm"
        }
      ]
    },
    methods: {
      // click event
      clickHandler(e, data) {
        if (this.nowAction !== "" && Object.keys(this.input).length > 0) return;
        this.nowAction = e.target.dataset.action;
        this[`${this.nowAction}Handler`](data);
      },
      //alert
      alertshow() {
        const vm = this;
        Swal.fire({
          title: `${vm.showAction}產品`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "確定!",
          cancelButtonText: "取消!"
        }).then(result => {
          vm.alertConfirm(result);
        });
      },
      alertConfirm(result) {
        if (result.value) {
          Swal.fire("Success!", "", "success").then(
            this[`${this.nowAction}Done`]()
          );
        } else {
          this.nowAction = ''
        }
      },
      //data hander
      NewHandler() {
        $("#productModal").modal("show");
      },
      EditHandler(data) {
        $("#productModal").modal("show");
        let tampInput = Object.assign({}, data);
        this.input = tampInput;
      },
      DelHandler(data) {
        this.alertshow();
        this.input = data;
      },
      NewDone() {
        const timeTamp = Math.floor(Date.now() / 1000);
        this.input.id = timeTamp;
        this.products.push(this.input);
        $("#productModal").modal("hide");
        this.nowAction = "";
        this.input = {}
      },
      EditDone() {
        const index = this.products.findIndex(
          product => product.id === this.input.id
        );
        this.products[index] = this.input;
        $("#productModal").modal("hide");
        this.nowAction = "";
        this.input = {}
      },
      DelDone() {
        const index = this.products.findIndex(
          product => product.id === this.input.id
        );
        this.products.splice(index, 1);
        this.nowAction = "";
        
      },
      // commit
      showOptionFn () {
        this.showOption = !this.showOption
      }
    },
    computed: {
      showAction() {
        if (this.nowAction === "New") return "新增";
        else if (this.nowAction === "Edit") return "編輯";
        if (this.nowAction === "Del") return "刪除";
      }
    },
    updated() {
      const vm = this;
      $("#productModal").on("hidden.bs.modal", function(e) {
        vm.nowAction = "";
        vm.input = {}
      });
    }
  });
})(Vue);
