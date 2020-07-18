export default {
  template: `
  <validation-observer v-slot="{ invalid }">
    <form action="post">
      <!-- name -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors, classes }">
        <label for="name">收件人姓名</label><small class="required"></small>
        <input type="text" class="form-control" :class="classes" name="name" placeholder="請輸入收件人姓名" id="name" v-model="payForm.name">
        <small class="invalid-feedback">{{ errors[0] }}</small>
    </validation-provider>
    <!-- Email -->
      <validation-provider class="form-group" tag="div" rules="required|email" v-slot="{ errors, classes }">
        <label for="email">Email</label><small class="required"></small>
        <input type="email" class="form-control" :class="classes" name="email" id="email" placeholder="請輸入收件人Email" v-model="payForm.email">
        <small class="invalid-feedback">{{ errors[0] }}</small>
    </validation-provider>
    <!-- tel -->
      <validation-provider class="form-group" tag="div" rules="required|integer|min:8" v-slot="{ errors, classes }">
        <label for="tel">電話</label><small class="required"></small>
        <input type="tel" class="form-control" :class="classes" name="tel" id="tel" placeholder="請輸入收件人電話" v-model="payForm.tel">
        <small class="invalid-feedback">{{ errors[0] }}</small>
    </validation-provider>
    <!-- address -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors, classes }">
        <label for="address">地址</label><small class="required"></small>
        <input type="text" class="form-control" :class="classes" name="address" id="address" placeholder="請輸入收件人地址" v-model="payForm.address">
        <small class="invalid-feedback">{{ errors[0] }}</small>
    </validation-provider>
    <!-- payment -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors, classes }">
        <label for="payment">付款方式</label><small class="required"></small>
        <select class="form-control" id="payment" v-model="payForm.payment">
          <option disabled selected>請選擇付款方式</option>
          <option v-for="(payment, index) in payments" :key="index" :value="payment">{{ payment }}</option>
        </select>
        <small class="invalid-feedback">{{ errors[0] }}</small>
    </validation-provider>
    <!-- message -->
      <div class="form-group">
        <label for="message">留言</label>
        <textarea class="form-control" id="message" rows="3" placeholder="請輸入留言" v-model="payForm.message"></textarea>
      </div>
      <!-- submit btn -->
      <div class="w-100 d-flex justify-content-end">
        <button type="submit" :disabled="invalid" class="btn btn-primary ml-auto">送出訂單</button>
      </div>
    </form>
  </validation-observer>
  `,
  data () {
    return {
      payments: ['WebATM','ATM','Barcode','Credit','ApplePay','GooglePay'],
      payForm: {}
    }
  }
}