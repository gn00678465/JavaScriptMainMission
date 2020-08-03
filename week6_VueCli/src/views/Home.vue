<template>
  <div>
    <Navbar :LinkType="'router-link'" :NavLinks="NavLinks" :OtherLinks="OtherLinks"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/HomeNavbar.vue';

export default {
  name: 'Home',
  components: { Navbar },
  data() {
    return {
      NavLinks: [
        {
          path: 'products',
          name: '產品列表',
        },
        {
          path: 'about',
          name: '關於我們',
        },
        {
          path: 'content',
          name: '聯絡我們',
        },
      ],
      OtherLinks: [
        {
          path: 'user',
          name: '使用者登入',
          icon: 'user',
        },
        {
          path: 'carts',
          name: '購物車列表',
          icon: 'shopping-cart',
        },
      ],
    };
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
</style>
