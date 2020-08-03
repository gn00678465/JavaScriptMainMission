<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
    :can-cancel="true"
    :is-full-page="false"></loading>
    <div class="container">
      <h2>單一商品細節</h2>
      <ul>
        <li>id: {{product.id}}</li>
        <li>title: {{product.title}}</li>
        <li>content: {{product.content}}</li>
      </ul>
      <img v-if="product.imageUrl" :src="product.imageUrl[0]" alt="">
    </div>
  </div>
</template>

<script>
import FrontMixin from '@/assets/Frontend_mixin';
import notify from '@/assets/Notify';

export default {
  name: 'Product',
  mixins: [FrontMixin, notify],
  data() {
    return {
      isLoading: false,
      product: {},
    };
  },
  created() {
    const { id } = this.$route.params;
    this.GetOneProduct(id);
  },
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  margin-top: 1rem;
}
ul {
  margin-top: 1rem;
}
img {
  margin-top: 1rem;
  max-width: 300px;
}
</style>
