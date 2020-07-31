<template>
  <div>
    <input type="checkbox" :id="prodId" v-model="isEnable"/><label :for="prodId">Toggle</label>
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
  },
  data() {
    return {
      isEnable: false,
    };
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
label:active:after {
  width: $toggle-size * .65;
}
</style>
