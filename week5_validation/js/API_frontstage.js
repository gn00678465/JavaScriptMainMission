const uuid = '99034dfb-2d10-45b5-8844-dd3e163815eb'
const API = 'https://course-ec-api.hexschool.io'

// get
export const ProductListAPI = function() {
  return axios.get(`${API}/api/${uuid}/ec/products`)
}
export const shoppingListAPI = function() {
  return axios.get(`${API}/api/${uuid}/ec/shopping`)
}

// cart post && patch
export const CartAPI = function(method,{product, quantity}) {
  return axios[method](`${API}/api/${uuid}/ec/shopping`, {product, quantity})
}


// del
export const delCartAPI = function (id) {
  return axios.delete(`${API}/api/${uuid}/ec/shopping/${id}`)
}
export const delAllCartAPI = function () {
  return axios.delete(`${API}/api/${uuid}/ec/shopping/all/product`)
}