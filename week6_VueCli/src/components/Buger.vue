<template>
  <div class="burgerBox" :class="classList" @click="toggleMenu" :style="styleList">
    <div class="burgerBar_top" :style="colorList"></div>
    <div class="burgerBar" :style="colorList"></div>
    <div class="burgerBar_bottom" :style="colorList"></div>
  </div>
</template>

<script>
export default {
  name: 'burgerMenu',
  props: {
    size: {
      type: Number,
      default: 24,
    },
    type: {
      type: String,
      default: 'slider',
    },
    color: {
      type: String,
      default: '#F5A623',
    },
    activeColor: {
      type: String,
      default: '#F5A623',
    },
  },
  data() {
    return {
      styleList: {
        width: `${this.size}px`,
        height: `${this.size}px`,
      },
      colorList: {
        backgroundColor: `${this.color}`,
      },
      classList: {
        toggle: false,
        typeclass: this.type,
      },
    };
  },
  methods: {
    toggleMenu() {
      this.classList.toggle = !this.classList.toggle;
      this.$emit('toggle');
    },
  },
};
</script>

<style scoped lang='scss'>
@mixin burgerBar() {
  width: 100%;
  height: 10%;
  border-radius: 10px;
  position: absolute;
  transition: 0.3s;
}

.burgerBox {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
}
.burgerBar {
  @include burgerBar;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &_top {
    @include burgerBar;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &_bottom {
    @include burgerBar;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.burgerBox.toggle {
  .burgerBar {
    transform: translate(-7em, -50%);
    opacity: 0;
    &_top {
      top: 50%;
      transform: translate(-50%, -40%) rotate(45deg);
    }
    &_bottom {
      top: 50%;
      transform: translate(-50%, -40%) rotate(-45deg);
    }
  }
}
</style>
