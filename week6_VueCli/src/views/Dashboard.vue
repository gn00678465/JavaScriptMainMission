<template>
  <div>
    <navbar :brand="brand" :routers="getRouterPath" :showIcons="false" @LogoutBtn="logout"/>
    <h2>Dashboard</h2>
    <router-view></router-view>
  </div>
</template>

<script>
import backend from '@/assets/Backend_mixin';
import navbar from '@/components/Navbar.vue';
import notify from '@/assets/Notify';

export default {
  name: 'Dashboard',
  components: { navbar },
  mixins: [backend, notify],
  data() {
    return {
      token: '',
      err: {},
      brand: '後台管理系統',
    };
  },
  created() {
    this.token = this.getToken();
    if (this.token === '') {
      this.$router.replace('/login');
    } else {
      this.checkStatus();
    }
  },
  methods: {
    logout() {
      this.SignOut(this.token);
    },
  },
  computed: {
    getRouterPath() {
      return this.$router.options.routes.filter((router) => router.name === 'Dashboard')[0];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
