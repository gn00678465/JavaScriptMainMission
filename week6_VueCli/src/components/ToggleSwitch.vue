<template>
  <div>
    <input type="checkbox" :id="prodId" :disabled="disabled"
    :checked="checked" @change="change($event)" />
    <label :for="prodId" :class="{disabled: disabled}">Toggle</label>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    prodId: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    change(e) {
      this.$emit('input', e.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
$toggle-size: 48px;
$toggle-space: 3px;

input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
  &:checked + label {
    background: #bada55;
    &::after {
      left: calc(100% - #{$toggle-space});
      transform: translateX(-100%);
    }
  }
}
label {
  cursor: pointer;
  text-indent: -9999px;
  width: $toggle-size;
  height: $toggle-size / 2;
  background: grey;
  display: inline-block;
  border-radius: $toggle-size;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: $toggle-space;
    left: $toggle-space;
    width: ($toggle-size / 2) - ($toggle-space * 2);
    height: ($toggle-size / 2) - ($toggle-space * 2);
    background: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }
}
label:not(.disabled):active:after {
  width: $toggle-size * .65;
}

label.disabled {
  cursor: auto;
  user-select: none;
  opacity: 0.65;
}
</style>
