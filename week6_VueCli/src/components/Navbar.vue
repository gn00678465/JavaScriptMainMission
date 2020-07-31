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
      <div class="nav__icon" v-if="showIcons">
        <a href="#" class="nav__cart"></a>
      </div>
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
    }
    &__cart {
          width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
      background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32pt' height='32pt' viewBox='0 0 32 32' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style='fill:none;stroke-width:32;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%25,0%25,0%25);stroke-opacity:1;stroke-miterlimit:4;' d='M 192 416 C 192 424.8125 184.8125 432 176 432 C 167.1875 432 160 424.8125 160 416 C 160 407.1875 167.1875 400 176 400 C 184.8125 400 192 407.1875 192 416 Z M 192 416 ' transform='matrix(0.0625,0,0,0.0625,0,0)'/%3E%3Cpath style='fill:none;stroke-width:32;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%25,0%25,0%25);stroke-opacity:1;stroke-miterlimit:4;' d='M 416 416 C 416 424.8125 408.8125 432 400 432 C 391.1875 432 384 424.8125 384 416 C 384 407.1875 391.1875 400 400 400 C 408.8125 400 416 407.1875 416 416 Z M 416 416 ' transform='matrix(0.0625,0,0,0.0625,0,0)'/%3E%3Cpath style='fill:none;stroke-width:32;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%25,0%25,0%25);stroke-opacity:1;stroke-miterlimit:4;' d='M 48 80 L 112 80 L 160 352 L 416 352 ' transform='matrix(0.0625,0,0,0.0625,0,0)'/%3E%3Cpath style='fill:none;stroke-width:32;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%25,0%25,0%25);stroke-opacity:1;stroke-miterlimit:4;' d='M 160 288 L 409.4375 288 C 413.25 288 416.5625 285.3125 417.3125 281.5625 L 446.0625 137.5625 C 446.5625 135.1875 445.9375 132.75 444.4375 130.9375 C 442.9375 129.0625 440.625 128 438.25 128 L 128 128 ' transform='matrix(0.0625,0,0,0.0625,0,0)'/%3E%3C/g%3E%3C/svg%3E");
    }
  }
}

</style>
