<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
    :can-cancel="true"
    :is-full-page="true"></loading>
    <div class="container">
      <h2>所有產品</h2>
      <div class="row">
        <div class="col">
          <table>
            <thead>
              <tr>
                <th width="50px"><span class="th">#</span></th>
                <th width="120px"><span class="th">分類</span></th>
                <th width="200"><span class="th">產品名稱</span></th>
                <th width="80px"><span class="th">售價</span></th>
                <th width="80px"><span class="th">詳細資訊</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(prod, i) in productsList" :key="prod.id">
                <td>{{ i + 1}}</td>
                <td>{{prod.category}}</td>
                <td>{{prod.title}}</td>
                <td>{{prod.price}}</td>
                <td><router-link :to="`product/${prod.id}`">進入</router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Pagination v-if="paginationMeta.total_pages"
      :total_pages="paginationMeta.total_pages" :page.sync="page"/>
    </div>
  </div>
</template>

<script>
import FrontMixin from '@/assets/Frontend_mixin';
import notify from '@/assets/Notify';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  components: { Pagination },
  mixins: [FrontMixin, notify],
  data() {
    return {
      isLoading: false,
      productsList: [],
      paginationMeta: {},
      page: 1,
    };
  },
  created() {
    this.GetAllProducts(this.page);
  },
  watch: {
    page() {
      this.GetAllProducts(this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../../assets/_sass/sass.scss';

h2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
}

table {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
