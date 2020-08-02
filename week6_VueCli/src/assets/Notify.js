export default {
  methods: {
    // 成功通知
    successNotify(message) {
      this.$toast.success(message);
    },
    // 失敗通知
    errorNotify(message) {
      this.$toast.error(message);
    },
    // 確認通知
    dialogNotify() {
    },
  },
};
