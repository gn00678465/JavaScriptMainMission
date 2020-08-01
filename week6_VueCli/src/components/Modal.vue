<template>
  <transition name="modal" v-if="showModal">
    <div class="modal">
      <div class="modal__container modal__wrapper-xl">
        <!-- header -->
        <h4 class="modal__header">
          <slot name="header">
            default header
          </slot>
        </h4>
        <!-- body -->
        <div class="modal__body">
          <div class="container">
            <div class="row">
              <div class="col-4">
              </div>
              <div class="col-8">
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <InputField/>
                    </div>
                    <div class="col-6">
                      <InputField/>
                    </div>
                    <div class="col-6">
                      <InputField/>
                    </div>
                    <div class="col-6">
                      <InputField/>
                    </div>
                    <div class="col-6">
                      <InputField/>
                    </div>
                    <hr>
                    <div class="col-12">
                      <InputField/>
                    </div>
                    <div class="col-12">
                      產品描述：
                      <vue-editor v-model="inputTemp.content" />
                    </div>
                    <div class="col-6">
                      是否啟用：
                      <ToggleSwitch/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- footer -->
        <div class="modal__footer"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import ToggleSwitch from './ToggleSwitch.vue';
import InputField from './InputField.vue';

export default {
  name: 'Modal',
  components: { InputField, VueEditor, ToggleSwitch },
  data() {
    return {
      showModal: false,
      inputTemp: {},
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../assets/_sass/sass.scss';

.box {
  background: #000;
  color: #fff;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.8s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal {
    &__container {
      width: 100%;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.8s ease;
    }
    &__header {
      padding: 1rem;
      font-size: 1.5rem;
      border-bottom: 1px solid #dee2e6;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
    }
    &__body {
      padding: 1rem;
    }
  }
}

// size
.modal__wrapper {
  max-width: 500px;
  &-sm {
    max-width: 300px;
  }
  &-lg {
    max-width: 800px;
  }
  &-xl {
    max-width: 1140px;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter-active .modal__container {
  animation: bounceInDown .7s forwards;
}
.modal-leave-active .modal__container {
  animation: bounceOutUp .7s forwards;
}
// enter
@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
// leave
@keyframes bounceOutUp {
  20% {
    transform: translate3d(0, -10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, 20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0) scaleY(3);
  }
}

</style>
