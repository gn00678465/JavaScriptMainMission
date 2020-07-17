export default {
  name: "pagination",
  template: `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: page === 0}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"
          v-for="num in total"
          :key="num"
          :class="{active: (num - 1) === page}">
          <a class="page-link" href="#" :data-page="num - 1" @click.prevent="selectPage($event)">{{num}}</a>
        </li>
        <li class="page-item" :class="{disabled: page === total - 1}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
`,
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      page: 0
    };
  },
  methods: {
    changePage(fix) {
      this.page += fix;
      if (this.page <= 0) this.page = 0;
      else if (this.page >= this.total - 1) this.page = this.total - 1;
    },
    selectPage(e) {
      this.page = e.target.dataset.page * 1;
    }
  },
  watch: {
    page() {
      this.$emit("update:page", this.page);
    }
  }
};
