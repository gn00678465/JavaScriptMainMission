<template>
  <transition name="modal">
    <div class="modal" v-if="showModal">
      <div class="model__container">
        <!-- header -->
        <div class="modal__header">
          <slot name="header">
            default header
          </slot>
        </div>
        <!-- body -->
        <div class="modal__body">

        </div>
        <!-- footer -->
        <div class="modal__footer"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
