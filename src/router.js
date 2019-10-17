import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/lib/auth';
import Home from './views/Home.vue';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  if (auth.isLogin()) {
    next();
  } else {
    next('/login');
  }
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/post/:id',
      name: 'post',
      props: true,
      component: () => import(/* webpackChunkName: "post" */ './views/Post.vue'),
    },
    {
      path: '/category',
      component: () => import(/* webpackChunkName: "category" */ './views/Category.vue'),
    },
    {
      path: '/compose',
      name: 'compose',
      beforeEnter: requireAuth,
      component: () => import(/* webpackChunkName: "compose" */ './views/Compose.vue'),
    },
    {
      path: '/compose/:id',
      props: true,
      beforeEnter: requireAuth,
      component: () => import(/* webpackChunkName: "compose" */ './views/Compose.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: requireAuth,
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import(/* webpackChunkName: "welcome" */ './views/Welcome.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('account') || to.name === 'welcome') {
    next();
  } else {
    next('/welcome');
  }
});

export default router;
