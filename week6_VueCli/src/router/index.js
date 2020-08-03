import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Home' },
    children: [
      {
        path: 'products',
        component: () => import('../views/Home/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/Home/Product.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/Home/About.vue'),
      },
      {
        path: 'carts',
        component: () => import('../views/Home/Carts.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Dashboard/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '後台管理系統' },
    children: [
      {
        path: 'products',
        component: () => import('../views/Dashboard/Products.vue'),
        meta: { title: '產品列表' },
      },
      {
        path: 'coupons',
        component: () => import('../views/Dashboard/Coupons.vue'),
        meta: { title: '酷碰卷列表' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   console.log('to', to);
//   console.log('from', from);
//   next();
// });

export default router;
