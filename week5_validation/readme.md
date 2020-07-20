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
async function getData () {
  const module = await import('./module.js')
  module.getDataAPI.then().catch()
}
```

## [**完成作品**](https://gn00678465.github.io/JavaScriptMainMission/week4_Vue+API/)