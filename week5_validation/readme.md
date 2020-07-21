# week 5 - 表單驗證

- 使用 Dynamic import 集中管理 API
    ```javascript
    // module.js
    export const getDataAPI = function () {
      return axios.get('API')
    }
    ```
    ```javascript
    // main
    async getData () {
    try {
      const API = await import('./API_frontstage.js')
      // this.isLoading = true
      const res = await API.ProductListAPI();
      this.productList = res.data.data;
      // this.isLoading = false;
    }
    catch (err) { // API.ProductListAPI 錯誤的訊息會在這邊
      console.log(err);
      // this.isLoading = false;
    }
    }
    ```
    > async 使用時可直接省略掉 promise / then 的語法

## [**完成作品**](https://gn00678465.github.io/JavaScriptMainMission/week5_validation/)