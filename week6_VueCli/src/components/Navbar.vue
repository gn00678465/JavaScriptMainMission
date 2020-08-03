<template>
  <nav class="navbar">
    <div class="container nav">
      <router-link :to="routers.path" class="nav__logo">{{brand}}</router-link>
      <button class="nav__toggle">#</button>
      <div class="nav__collapse">
        <ul class="nav__list">
          <router-link v-for="router in routers.children" :key="router.path"
          :to="`${routers.path}/${router.path}`" tag="li" class="nav__item">
            <a href="#" class="nav__link">{{router.meta.title}}</a>
          </router-link>
        </ul>
      </div>
      <a class="nav__icon" @click.prevent="$emit('LogoutBtn')">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" /><span>登出</span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    brand: {
      required: true,
    },
    routers: {
      type: Object,
      required: true,
    },
    showIcons: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../assets/_grid.scss';

a {
  text-decoration: none;
}

// navbar
.navbar {
  display: flex;
  position: relative;
}
.nav {
  display: flex;
  align-items: center;
  background: transparent;
  line-height: 40px;
  padding: .5rem 0;
  .nav {
    &__toggle {
      padding: .25rem .75rem;
      font-size: 1.25rem;
      line-height: 1;
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: .25rem;
      border: 1px solid #000;
    }
    &__list {
      margin-left: 1.5rem;
      list-style: none;
      display: flex;
    }
    &__item {
      padding-left: 5px;
      padding-right: 5px;
      font-size: 1.1rem;
    }
    &__icon {
      display: flex;
      margin-left: auto;
      align-items: center;
      cursor: pointer;
      span {
        margin-left: 0.25rem;
      }
    }
  }
}

</style>
