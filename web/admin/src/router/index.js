import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import DeliveryApplications from '@/views/DeliveryApplications.vue'
import NotFound from '@/components/NotFound.vue'
import VolunteerRegistration from '@/views/VolunteerRegistration.vue'
import { config } from '@/config'
import { useAuthUserStore } from '@/stores/authUser'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: config.meta.Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: config.meta.Login
  },
  {
    path: '/delivery-applications',
    name: 'DeliveryApplications',
    component: DeliveryApplications,
    meta: config.meta.DeliveryApplications
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
    meta: config.meta.ForgotPassword
  },
  {
    path: '/register',
    name: 'register',
    component: VolunteerRegistration,
    meta: config.meta.Register
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: config.meta.NotFound
  },
]

const router = new createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach( (to, from) => {
  const user = useAuthUserStore()
  if (!user || !(user.isLoggedIn === true) || (user.isAdmin !== true) && (user.isVolunteer !== true)) {
    if (to.path !== '/login' && to.path !== '/register' && to.path !== '/forgot-password') {
      return { name: 'Login' }
    }
  }
})

export default router
