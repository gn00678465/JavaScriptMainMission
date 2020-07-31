<template>
  <div class="container lists">
    <p class="h1">產品列表管理系統<BtnGroup class="float-right" :btns="btn"
    @emitHandler="createHandler"/></p>
    <div class="vld-parent">
    <loading :active.sync="isLoading"
    :can-cancel="true"
    :is-full-page="false"></loading>
      <table class="table">
        <thead>
          <tr>
            <th><span class="th">分類</span></th>
            <th><span class="th">產品名稱</span></th>
            <th><span class="th">原價</span></th>
            <th><span class="th">售價</span></th>
            <th><span class="th">是否啟用</span></th>
            <th><font-awesome-icon class="icon" :icon="['fas', 'cog']" /></th>
          </tr>
        </thead>
        <tbody>
          <DashboardProductsItem
          v-for="item in newProducts" :key="item.id"
          :prodItem="item"
          @click="emitHandler"/>
      </tbody>
      </table>
    </div>
    <Pagination :total_pages="total_page" :page.sync="page" />
    <Modal ref="modal"/>
  </div>
</template>

<script>
import DashboardProductsItem from '@/components/DashboardProductsItem.vue';
import Pagination from '@/components/Pagination.vue';
import BtnGroup from '@/components/BtnGroup.vue';
import backend from '@/assets/Backend_mixin';

export default {
  name: 'Products',
  components: {
    DashboardProductsItem,
    Pagination,
    BtnGroup,
    Modal: () => import('@/components/Modal.vue'),
  },
  mixins: [backend],
  created() {
    this.getProductList();
  },
  data() {
    return {
      btn: [{
        class: 'primary',
        outline: false,
        content: '新增產品',
        icon: '',
        action: 'new',
        size: 'xl',
      }],
      products: [],
      page: 1,
      total_page: null,
    };
  },
  methods: {
    handleProducts() {
      const list = [];
      this.products.forEach((prod, i) => {
        if (i % 10 === 0) list.push([]);
        const p = parseInt(i / 10, 10);
        list[p].push(prod);
      });
      this.total_page = list.length;
      return list;
    },
    // product handler
    emitHandler(...data) {
      const [action, item] = [...data];
      this[`${action}Handler`](item);
    },
    editHandler(item) {
      console.log('this is edit', item);
    },
    delHandler(item) {
      this.destroyProduct(item.id);
    },
    createHandler() {
      this.$refs.modal.showModal = true;
    },
  },
  computed: {
    newProducts() {
      return this.handleProducts()[this.page - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../../assets/_grid.scss';

table { border-collapse: collapse; border-spacing: 0; }

$main-color: #f0f0f0;
$thead: #c9dff0;

.float-right {
  float: right;
  // position: absolute;
}
.vld-parent {
  min-height: 200px;
}
.lists {
  display: block;
  margin: 0 auto;
  padding: 10px 1.5rem;
  background: lighten($main-color, 5%);
  border-radius: 0.2rem;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
  .h1 {
    position: relative;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    margin: 1.5rem 0;
    &::after {
      content: '';
      clear: both;
    }
  }
}
.table {
  width: 100%;
  font-size: 1.2em;
  margin-bottom: 15px;
  min-height: 200px;
  thead {
    background: $thead;
    tr th {
      font-weight: bold;
      padding: 12px 30px;
      padding-left: 42px;
    }
    .th {
      padding-right: 20px;
      background-repeat: no-repeat;
      background-position: 100% 100%;
    }
    .icon {
      text-align: center;
    }
  }
  tbody {
::v-deep tr {
    color: #555;
    height: 100%;
    td {
      text-align: center;
      height: auto;
      line-height: 1;
      vertical-align: middle;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  }
}
</style>
