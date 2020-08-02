<template>
  <transition name="modal" v-if="showModal">
    <div class="modal">
      <div class="modal__container modal__wrapper-xl">
        <!-- header -->
        <h4 class="modal__header">
          <slot name="header">
            {{ title }}
          </slot>
          <span class="times" @click.prevent="closeModal">&times;</span>
        </h4>
        <!-- body -->
        <div class="modal__body">
          <div class="container">
            <div class="row">
              <div class="col-4">
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <!-- loading -->
                      <div class="vld-parent">
                        <loading :active.sync="isUplading"
                        :can-cancel="true"
                        :loader="'bars'"
                        :color="'#3D87F5'"
                        :is-full-page="false"></loading>
                        <InputUpload ref="file" @submit="uploadFile"/>
                      </div>
                    </div>
                    <hr>
                    <div class="col-12">
                      <InputField :label="'圖片網址 - 1'"
                      v-model="inputTemp.imageUrl[0]"/>
                    </div>
                    <div class="col-12" v-for="i in (inputTemp.imageUrl.length)" :key="i">
                      <InputField :label="`圖片網址 - ${i + 1}`"
                      v-model="inputTemp.imageUrl[i]"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-8">
                <div class="container">
                  <div class="row">
                    <div class="col-10">
                      <InputField :label="'標題'" :placeholder="'請輸入標題'" :rules="'required'"
                      v-model="inputTemp.title"/>
                    </div>
                    <div class="col-2">
                      <span class="label">是否啟用</span>
                      <ToggleSwitch :prodId="'isEnable'" :checked="inputTemp.enabled"
                      v-model="inputTemp.enabled"/>
                    </div>
                    <div class="col-6">
                      <InputField :label="'分類'" :placeholder="'請輸入分類'" :rules="'required'"
                      v-model="inputTemp.category"/>
                    </div>
                    <div class="col-6">
                      <InputField :label="'單位'" :placeholder="'請輸入單位'" :rules="'required'"
                      v-model="inputTemp.unit"/>
                    </div>
                    <div class="col-6">
                      <InputField :label="'原價'" :placeholder="'請輸入原價'" :type="'number'"
                      :rules="'required'"
                      v-model.number="inputTemp.origin_price"/>
                    </div>
                    <div class="col-6">
                      <InputField :label="'售價'" :placeholder="'請輸入售價'" :type="'number'"
                      :rules="'required'"
                      v-model.number="inputTemp.price"/>
                    </div>
                    <hr>
                    <div class="col-12">
                      <InputField :type="'textarea'" :label="'產品描述'" :placeholder="'請輸入產品描述'"
                      :rules="'required'" v-model="inputTemp.content"/>
                    </div>
                    <div class="col-12">
                      <span class="label">商品說明：</span>
                      <vue-editor v-model="inputTemp.description" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- footer -->
        <div class="modal__footer">
          <BtnGroup :btns="btns" @emitHandler="actionHandler"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import notify from '@/assets/Notify';
import ToggleSwitch from './ToggleSwitch.vue';
import BtnGroup from './BtnGroup.vue';
import InputField from './InputField.vue';
import InputUpload from './InputUpload.vue';

export default {
  name: 'Modal',
  mixins: [notify],
  components: {
    InputField,
    VueEditor,
    ToggleSwitch,
    BtnGroup,
    InputUpload,
  },
  data() {
    return {
      showModal: false,
      modalTitle: '',
      inputTemp: {
        imageUrl: [],
      },
      btns: [
        {
          class: 'primary',
          outline: true,
          content: '確定',
          icon: '',
          action: 'checked',
          size: 'xl',
        },
        {
          class: 'error',
          outline: true,
          content: '取消',
          icon: '',
          action: 'cancle',
          size: 'xl',
        },
      ],
      isUplading: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.inputTemp = {};
      this.$set(this.inputTemp, 'imageUrl', []);
    },
    actionHandler(action) {
      this[`${action}Handler`]();
    },
    cancleHandler() {
      this.closeModal();
    },
    checkedHandler() {
      this.$emit('update', this.modalTitle, this.inputTemp);
      this.closeModal();
    },
    uploadFile(data) {
      if (this.inputTemp.imageUrl.length < 4) {
        this.isUplading = true;
        this.UploadFile(data);
      } else {
        this.errorNotify('上傳數量到達限制!');
      }
    },
  },
  computed: {
    title() {
      return this.modalTitle === 'create' ? '新增產品' : '編輯產品';
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
      font-size: 1.8rem;
      border-bottom: 1px solid #dee2e6;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      .times {
        font-size: 2rem;
        font-weight: bold;
        cursor: pointer;
      }
    }
    &__body {
      padding: 1rem;
      .label {
        display: inline-block;
        margin-bottom: 0.5rem;
      }
    }
    &__footer {
      padding: 1rem;
      border-top: 1px solid #dee2e6;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
    }
  }
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 15px;
  margin-right: 15px;
  border: 0;
  border-top: 1px solid rgba(0,0,0,.1);
  width: 100%;
}

// file
.form-file {
  box-sizing: border-box;
  label {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    padding: 0.75rem 0.5rem;
    border-radius: 5px;
    border: 1px solid #ced4da;
    color: #495057;
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
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

// animate
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
