new Vue({
  el: "#app",
  data: {
    login_mail: "",
    login_passwd: ""
  },
  methods: {
    login() {
      const api_addr = "https://course-ec-api.hexschool.io/api/auth/login";
      const vm = this;
      axios
        .post(api_addr, {
          email: this.login_mail,
          password: this.login_passwd
        })
        .then(function(response) {
          if (response.status === 200) vm.redirection(response.data);
        })
        .catch(function(response) {
          console.log(response);
        });
      this.login_mail = "";
      this.login_passwd = "";
    },
    redirection(data) {
      const { uuid, token, expired } = data;
      const sExpired = new Date(expired * 1000);
      // console.log(JSON.stringify({ uuid, token, expired }, 1));
      document.cookie = `MYuuid=${uuid};path=/;expires=${sExpired}`;
      document.cookie = `MYtoken=${token};path=/;expires=${sExpired}`;
      // document.cookie = `myCookies=${JSON.stringify({ uuid, token, expired },1)};path='/'`
      window.location.href = "./products.html";
    }
  }
});
