<template>
  <div class="container lists">
    <p class="h1">酷碰卷列表管理系統</p>
  </div>
</template>

<script>
export default {
  name: 'Coupons',
};
</script>

<style lang="scss" scoped>
@import './../../assets/_grid.scss';

table { border-collapse: collapse; border-spacing: 0; }

$main-color: #f0f0f0;
$thead: #c9dff0;

.float-right {
  float: right;
  // position: absolute;
}
.vld-parent {
  min-height: 200px;
}
.lists {
  display: block;
  margin: 0 auto;
  padding: 10px 1.5rem;
  background: lighten($main-color, 5%);
  border-radius: 0.2rem;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
  .h1 {
    position: relative;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    margin: 1.5rem 0;
    &::after {
      content: '';
      clear: both;
    }
  }
}
</style>
