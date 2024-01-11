import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/Login.vue'
import RegisterView from "../views/auth/Register.vue"
import HomeView from "../views/coordinate/Home.vue"
import ListView from "../views/coordinate/List.vue"
import EditView from "../views/coordinate/Edit.vue"

import Body from "../components/body.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: "Register",
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/',
      component: Body,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView,
          meta: { requiresAuth: true }
        },
        {
          path: 'list',
          name: 'List',
          component: ListView,
          meta: { requiresAuth: true, admin: true }
        },
        {
          path: '/edit/:id',
          name: 'Edit',
          component: EditView,
          props: true,
          meta: { requiresAuth: true, admin: true }
        },
      ]
    },
  ]
})

// Router untuk guest
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)){
    if(sessionStorage.getItem('token')){
      next('/')
      return;
    }
    next()
  } 
  else {
    next()
  }
})

// Router untuk pengunjung
router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(sessionStorage.getItem('token')){
      next();
      return;
    }
    next('/login');
  }
  else {
    next()
  }
})

// Router untuk admin
router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.admin)){
    if(sessionStorage.getItem('role')){
      next();
      return;
    }
    next('/')
  }
  else{
    next()
  }
})

export default router
