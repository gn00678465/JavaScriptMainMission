<template>
  <div class="pagination-fluid">
    <ul class="page">
      <li class="page__item" @click.prevent="pageHandler(-1)"
      :class="{disabled: current === 1}">
        <a class="page__link" href="#"></a>
      </li>
      <li class="page__item"
      v-for="page in total_pages" :key="page"
      :class="{active: page === current}"
      @click.prevent="clickHandler($event)">
        <a class="page__link" href="#" :data-page="page">{{page}}</a></li>
      <li class="page__item" @click.prevent="pageHandler(1)"
      :class="{disabled: current === total_pages}">
        <a class="page__link" href="#"></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true,
    },
    total_pages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      current: this.page,
    };
  },
  methods: {
    pageHandler(fix) {
      this.current += fix;
      if (this.current === 0) this.current = 1;
      else if (this.current > this.total_pages) this.current = this.total_pages;
    },
    clickHandler(e) {
      if (e.target.dataset.page !== this.current) {
        this.current = e.target.dataset.page * 1;
      }
    },
  },
  watch: {
    current() {
      this.$emit('update:page', this.current);
    },
  },
};
</script>

<style lang="scss" scoped>

$main-color: #f0f0f0;
$secondary-color: #1d1f20;

@mixin display-child($n) {
  @for $i from 2 through $n {
    &:nth-child(#{$i}) {
      a {
        display: inline-block;
      }
    }
  }
}
.pagination {
  display: inline-block;
  background: lighten($main-color, 5%);
  text-align: center;
  padding: 1rem;
  border-radius: 0.2rem;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
}
.pagination-fluid {
  display: block;
  background: lighten($main-color, 5%);
  text-align: center;
  padding: 1rem;
  // border-radius: 0.2rem;
  // box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
}
.page {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  &__item {
    .page__link:not(.active) {
      border: solid 1px darken($main-color, 10%);
      border-radius: 0.2rem;
      color: darken($main-color, 45%);
      text-transform: uppercase;
      display: inline-block;
      text-align: center;
      padding: 0.5rem 0.9rem;
      margin: 0 0.25rem;
    }
    &:not(.disabled):hover {
      .page__link {
        color: lighten($main-color, 5%);
        background-color: $secondary-color;
        border: solid 1px $secondary-color;
      }
    }
    &.active {
      .page__link {
        color: lighten($main-color, 5%);
        background-color: $secondary-color;
        border: solid 1px $secondary-color;
      }
    }
    &.disabled {
      .page__link {
        opacity: 0.65;
        cursor: auto;
      }
    }
    &:first-child {
      margin-right: 1rem;
      .page__link {
        &:after {
          content: "⮜";
        }
      }
    }
    &:last-child {
      margin-left: 1rem;
      .page__link {
        &:after {
          content: "⮞";
        }
      }
    }
  }
}
</style>
