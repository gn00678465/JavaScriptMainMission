<template>
  <ValidationObserver tag="form" v-slot="{ invalid }" @submit.prevent="submit">
    <validation-provider
      tag="div"
      class="form-input"
      rules="mimes:image/*"
      v-slot="{ errors }"
    >
      <label for="file">選擇圖片</label>
      <input type="file" id="file" accept="image/*" @change="preview($event)">
      <div class="preview">
        <img id="file-preview" v-if="src !== ''" :src="src">
      </div>
      <!-- 錯誤訊息 -->
      <span class="error">{{ errors[0] }}</span>
    </validation-provider>
    <button type="submit" :disabled='invalid'>上傳圖片</button>
  </ValidationObserver>
</template>

<script>
import notify from '@/assets/Notify';

export default {
  name: 'InputUpload',
  mixins: [notify],
  data() {
    return {
      src: '',
    };
  },
  methods: {
    preview(e) {
      const { size } = e.target.files[0];
      // const subname = this.getFileNameExtension(name);
      // const newName = `${Math.floor(Date.now() / 1000)}.${subname}`;
      const maxSize = 2 * 1024 * 1024;
      if (size > maxSize) {
        const msg = '檔案大於 2 MB，請重新選擇!';
        this.errorNotify(msg);
      } else {
        this.src = URL.createObjectURL(e.target.files[0]);
        this.formData(e.target.files[0]);
      }
    },
    getFileNameExtension(name) {
      return (/[.]/.exec(name)) ? /[^.]+$/.exec(name)[0] : undefined;
    },
    formData(data) {
      const formData = new FormData();
      formData.append('file', data);
      return formData;
    },
    submit() {
      this.$emit('submit', this.formData());
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  width: 100%;
  padding:1.5rem;
  background:#fff;
  border:2px dashed #555;
  border-radius: 5px;
  input {
    display: none;
  }
  label {
    display:block;
    width:100%;
    height:50px;
    line-height:50px;
    text-align:center;
    background:#333;
    color:#fff;
    font-size:1rem;
    text-transform:Uppercase;
    font-weight:600;
    border-radius:10px;
    cursor:pointer;
  }
  #file-preview {
    width:100%;
    margin-top:10px;
  }
  + button {
    margin-top: 0.5rem;
    outline: none;
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 12px 20px;
    color: #000;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    text-transform: uppercase;
    cursor: pointer;
    &:disabled {
      opacity: 0.65;
      cursor: auto;
    }
  }
}
</style>
