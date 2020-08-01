<template>
  <validation-provider
      tag="div"
      :rules="rules"
      class="form-group"
      v-slot="{ errors, classes }"
    >
    <label>{{ label }}：</label>
    <input class="form-control" v-if="typeHandler" :type="type" :placeholder="placeholder"
    :name="label" :value="value" @input="$emit('input', $event.target.value)" :class="classes"/>
    <textarea class="form-control" v-else :name="label" id="" :rows="rows" :class="classes"
    :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)">
    </textarea>
    <!-- 錯誤訊息 -->
    <span class="error">{{ errors[0] }}</span>
  </validation-provider>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    label: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
    },
    rules: {
      default: '',
    },
    rows: {
      type: Number,
      default: 5,
    },
    value: {},
  },
  data() {
    return {};
  },
  computed: {
    typeHandler() {
      return !(this.type === 'textarea');
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 0.5rem;
  label {
    display: inline-block;
    margin-bottom: .5rem;
  }
  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    &.is-valid {
      border-color: #28a745;
      padding-right: calc(1.5em + .75rem);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(.375em + .1875rem) center;
      background-size: calc(.75em + .375rem) calc(.75em + .375rem);
    }
    &.is-invalid {
      border-color: #dc3545;
      padding-right: calc(1.5em + .75rem);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(.375em + .1875rem) center;
      background-size: calc(.75em + .375rem) calc(.75em + .375rem);
    }
  }
  .error {
    display: inline-block;
    margin-top: 0.5rem;
    color: #dc3545;
  }
}

</style>
