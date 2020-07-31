<template>
  <tr>
    <td>{{prodItem.category}}</td>
    <td>{{prodItem.title}}</td>
    <td>{{prodItem.origin_price}}</td>
    <td>{{prodItem.price}}</td>
    <td><toggler :prodId="prodItem.id.substr(0, 5)"/></td>
    <td><BtnGroup :btns="btns" @emitHandler="emitHandler"/></td>
  </tr>
</template>

<script>
import toggler from '@/components/ToggleSwitch.vue';
import BtnGroup from '@/components/BtnGroup.vue';

export default {
  name: 'DashboardProductsItem',
  components: { toggler, BtnGroup },
  props: {
    prodItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      btns: [
        {
          class: 'secondary',
          outline: true,
          content: '',
          icon: 'edit',
          action: 'edit',
          size: 'xl',
        },
        {
          class: 'error',
          outline: false,
          content: '',
          icon: 'trash-alt',
          action: 'del',
          size: 'xl',
        },
      ],
    };
  },
  methods: {
    emitHandler(action) {
      this.$emit('click', action, this.prodItem);
    },
    // editHandler(prodItem) {
    //   console.log('this is edit', prodItem);
    // },
    // delHandler(prodItem) {
    //   console.log('this is del', prodItem);
    // },
  },
};
</script>

<style lang="scss" scoped>

</style>
