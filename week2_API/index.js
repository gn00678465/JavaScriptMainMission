const row = document.querySelector('.container > .row')

var obj = {
  config: {
    uuid: '99034dfb-2d10-45b5-8844-dd3e163815eb',
    token: 'DyLmAZQXa5vt2lsjWW6hUQ46VgIHy1MiZ0Tq57yEHMP95eAjKJouy7bzJOkt',
    url: 'https://course-ec-api.hexschool.io/api/'
  },
  products: [],
  getData: function() {
    var vm = this;
    axios.defaults.headers.common['Authorization'] = `Bearer ${vm.config.token}`;
    axios.get(`${vm.config.url}${vm.config.uuid}/admin/ec/products`)
      .then(function (response) {
        response.data.data.forEach(item => {
          vm.products.push(item)
          vm.render()
        })
    })
  },
  btnAction () {
    const btns = document.querySelectorAll('.postCard__btn--active')
    btns.forEach( btn => btn.addEventListener('click', function () {
      this.parentNode.classList.toggle('active')
    }))
  },
  render () {
    let str = ''
    this.products.forEach( product => {
      str += `
      <div class="col-4">
        <div class="postCard color">
          <div class="postCard__header">
            <div class="postCard__title">${product.title}</div>
            <div class="postCard__price">$${product.price}</div>
            <button class="pure__btn postCard__addBtn">加入購物車</button>
          </div>
          <div class="postCard__content">
            <div class="postCard__img">
              <img src="${product.imageUrl[0]}" class="img_fluid" alt="">
            </div>
            <div class="postCard__bg"></div>
            <div class="postCard__description">
              ${product.content}
            </div>
          </div>
          <div class="postCard__btn--active">
            <i class="fas fa-cog"></i>
          </div>
          <div class="postCard__footer">
            <div class="sns_btn">
              <i class="fab fa-facebook-square"></i>
              <i class="fab fa-twitter-square"></i>
              <i class="fab fa-instagram-square"></i>
            </div>
            <button class="pure__btn postCard__detailBtn">詳細</button>
          </div>
        </div>
      </div>
      `
    })
    row.innerHTML = str
    this.btnAction()
  },
  delData () {
    axios.delete(`${this.config.url}${this.config.uuid}/admin/ec/product/mU6QbqjfvtAXHc1gCn5OTuXhfFWJGNYuktb3l7ULV0GssKyKbCYgcnmqA6iKB5Rk`)
    .then((res) => console.log(res))
  }
}

obj.getData();

document.querySelector('.Delete').addEventListener('click', function () {
  obj.delData ()
})