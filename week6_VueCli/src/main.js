import Vue from 'vue';
// vee-validate
import {
  ValidationObserver,
  ValidationProvider,
  extend, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/zh_TW.json';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// normalize.css
import 'normalize.css';
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCog,
  faEdit,
  faTrashAlt,
  faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons';
// vue-toastification
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
// vue
import App from './App.vue';
import router from './router';

// vee-validate
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});
// vee-validate Class 設定檔案
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
// axios
Vue.use(VueAxios, axios);
// Loading
Vue.component('Loading', Loading);
// fontawesome
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(
  faCog,
  faEdit,
  faTrashAlt,
  faCloudUploadAlt,
);
// vue-toastification
const options = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
  position: 'top-right',
  timeout: 3000,
  closeOnClick: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false,
};
Vue.use(Toast, options);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
