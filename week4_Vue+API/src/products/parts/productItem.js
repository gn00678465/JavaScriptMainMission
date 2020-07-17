export default {
  name: "productItem",
  template: `
  <tr>
    <th scope="row">{{count + 1}}</th>
    <td>{{product.category}}</td>
    <td>{{product.title}}</td>
    <td class="text-right">{{product.origin_price}}</td>
    <td class="text-right">{{product.price}}</td>
    <td class="text-center">
      <i
        class="fas fa-check text-success"
        v-if="product.enabled"
      ></i>
      <i class="fas fa-times text-danger" v-else></i>
    </td>
    <td class="">
      <div
        class="btn-group"
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          class="btn btn-outline-primary fas fa-edit"
          data-action="Edit"
          @click="editClick"
        ></button>
        <button
          type="button"
          class="btn btn-outline-danger fas fa-trash-alt"
          data-action="Del"
          @click="delClick"
        ></button>
      </div>
    </td>
  </tr>
`,
  props: {
    product: {
      type: Object,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    editClick() {
      this.$emit("editclick", this.product);
    },
    delClick() {
      this.$emit("delclick", this.product);
    }
  }
};
