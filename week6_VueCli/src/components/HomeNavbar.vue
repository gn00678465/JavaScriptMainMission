<template>
  <nav class="navbar navbar-bg">
    <!-- Brand -->
    <div class="container nav">
      <router-link class="nav__logo" :to="HomePath">
        Logo
      </router-link>
      <!-- Toggler menu -->
      <button class="nav__toggle">
        <burger
          :color="'#EDEDED'"
          :size="24"
          :type="'slider'"
          @toggle="toggleShow"
          ref="burger"
        />
      </button>
      <!-- Main Menu -->
      <div class="nav__collapse" :class="{'show': isShow}">
        <ul class="nav__list">
          <li class="nav__item" v-for="link in NavLinks" :key="link.path">
            <router-link class="nav__link" :to="`${HomePath}${link.path}`" active-class="active">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <!-- Other Menu -->
      <div class="nav__other">
        <div class="other__item" v-for="link in OtherLinks" :key="link.path">
          <font-awesome-icon class="other__icon" :icon="['fas', link.icon]" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Burger from './Buger.vue';

export default {
  name: 'HomeNavbar',
  components: { Burger },
  props: {
    HomePath: {
      type: String,
      default: '/',
    },
    NavLinks: {
      type: Array,
    },
    OtherLinks: {
      type: Array,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    },
    LinkIsActive(path) {
      return this.$route.path.includes(path);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../assets/_sass/sass.scss';

a {
  text-decoration: none;
}

// navbar
.navbar {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  line-height: 40px;
  padding: 0.5rem 1rem;
  .nav {
    &__logo {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    &__toggle {
      padding: .25rem .75rem;
      font-size: 1.25rem;
      line-height: 1;
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: .25rem;
      border: 1px solid rgba(0,0,0,.1);
    }
    &__collapse {
      flex-basis: 100%;
      flex-grow: 1;
      align-items: center;
      display: block;
      // animation
      max-height: 20em;
      opacity: 1;
      transition: all .5s;
      &:not(.show) {
        // display: none;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: all .3s;
      }
    }
    &__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      padding-left: 0;
      margin-bottom: 0;
    }
    &__other {
      position: absolute;
      top: 0;
      right: 5%;
      display: flex;
      .other__item {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-size: 1.2rem;
        color: #333;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &__item {
      padding: .5rem .75rem;
    }
    &__link {
      position: relative;
      display: block;
      text-align: center;
      &::before,&::after {
        content: '';
        position: absolute;
        transition: width 0.3s;
        bottom: 0;
        width: 0;
      }
      // hover effect
      &:hover {
        &::before {
        left: 50%;
        width: 50%;
        border-bottom: 2px solid #333;
        }
        &::after {
          right: 50%;
          width: 50%;
          border-bottom: 2px solid #333;
        }
      }
      // active effect
      &.active {
        &::after {
          left: 0;
          width: 100%;
          border-bottom: 2px solid #333;
        }
      }
    }
  }
}

// sm
@media (min-width: 574px) {
  .nav {
    .nav {
      &__other {
        right: 13%;
      }
    }
  }
}

// md
@media (min-width: 766px) {
  .nav {
    padding: 0 1rem;
    .nav {
      &__logo {
        position: initial;
      }
      &__toggle {
        display: none;
      }
      &__collapse {
        margin-left: 1rem;
        flex: 1 0 0;
        &:not(.show) {
          opacity: 1;
          max-height: 10em;
        }
      }
      &__list {
        flex-flow: row nowrap;
      }
      &__other {
        position: initial;
        margin-left: auto;
      }
    }
  }
}

.navbar-bg {
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.08);
}
</style>
