export default {
  name: 'cartItem',
  template: `
  <div>
    <div class="vld-parent">
    <loading :active.sync="loading.isLoading" 
      :can-cancel="true" 
      :is-full-page="loading.fullPage"
      :loader="loading.loader"
      :color="loading.color"
      ></loading>
    <!-- Product -->
    <div class="cart__item">
      <a herf="#" class="btn buttons" @click.prevent="deleteCart">
        <span class="far fa-trash-alt delete-btn"></span>
      </a>
      <div class="cart__image">
        <img :src="cartData.imageUrl[0]" alt="" />
      </div>
      <div class="cart__description">
        <div class="description__title">{{cartData.title}}</div>
        <div class="description__content">單價: {{cartData.price}}</div>
      </div>
      <div class="cart__quantity">
        <button class="minus-btn" type="button" name="button" @click="quantityHandler(-1)">
          <i class="fas fa-minus"></i>
        </button>
        <input type="text" name="name" v-model="quantity">
        <button class="plus-btn" type="button" name="button" @click="quantityHandler(1)">
        <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="cart__price">{{calcPrice|Currency|Dollar}}</div>
    </div>
    </div>
  </div>
  `,
  props: {
    cartitem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      quantity: this.cartitem.quantity,
      loading: {
        fullPage: false,
        isLoading: false,
        loader: 'bars',
        color: 'rgb(0, 123, 255)'
      }
    }
  },
  methods: {
    quantityHandler (fix) {
      this.quantity += fix
      if(this.quantity <= 0 ) this.deleteCart()
    },
    updateCart() {
      this.$emit('update-cart', this.cartData.id, this.quantity)
    },
    deleteCart() {
      this.$emit('del-cart', this.cartData.id)
    }
  },
  computed: {
    cartData () {
      return this.cartitem.product
    },
    calcPrice () {
      return this.cartData.price * this.quantity
    }
  },
  watch: {
    quantity () {
      this.updateCart()
    }
  }
}