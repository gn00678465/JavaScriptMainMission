<template>
  <ValidationObserver tag="form" v-slot="{ invalid }" @submit.prevent="submit">
    <validation-provider
      tag="div"
      class="form-group"
      rules="required|email"
      v-slot="{ errors, classes }"
    >
      <label for="loginemail">mail</label>
      <input type="email" id="loginemail" name="useremail" placeholder="請輸入信箱地址"
      :class="classes" v-model="user.email">
      <!-- 錯誤訊息 -->
      <span class="error">{{ errors[0] }}</span>
    </validation-provider>
    <validation-provider
      tag="div"
      class="form-group"
      rules="required|min:8"
      v-slot="{ errors, classes }"
    >
      <label for="loginpasswd">Password</label>
      <input type="password" id="loginpasswd" name="password" placeholder="請輸入密碼"
      :class="classes" v-model="user.password">
    <!-- 錯誤訊息 -->
      <span class="error">{{ errors[0] }}</span>
    </validation-provider>
    <div class="form-group">
      <label class="form-remember">
        <input type="checkbox">Remember Me
      </label>
      <a class="form-recovery" href="#">Forgot Password?</a>
    </div>
    <div class="form-group">
      <button type="submit" :disabled='invalid'>登入</button>
    </div>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.user);
      // this.user.email = '';
      // this.user.password = '';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
