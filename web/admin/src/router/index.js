import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import DeliveryApplicationsPage from '@/views/DeliveryApplicationsPage.vue'
import NotFound from '@/components/NotFound.vue'
import VolunteerRegistration from '@/views/VolunteerRegistration.vue'
import VolunteersPage from '@/views/VolunteersPage.vue'
import { config } from '@/config'
import { useAuthUserStore } from '@/stores/authUser'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/delivery-applications',
    name: 'DeliveryApplicationsPage',
    component: DeliveryApplicationsPage,
    meta: { admin: true },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: VolunteerRegistration,
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: VolunteersPage,
    meta: { admin: true}
  },
  {
    path: '/delivery-schedule',
    name: 'DeliverySchedule',
    component: () => import ('@/views/DeliverySchedulePage.vue'),
    meta: { admin: true}
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import ('@/views/SchedulePage.vue'),
    meta: { admin: true}
  },
  {
    path: '/profile/:uid?',
    name: 'Profile',
    props: true,
    component: () => import ('@/views/ProfilePage.vue'),
  },
  {
    path: '/location/:id?',
    name: 'Location',
    props: true,
    component: () => import('@/views/LocationPage.vue'),
    meta: { admin: true},
  },
  {
    path: '/locations',
    name: 'LocationsList',
    component: () => import('@/views/LocationsListPage.vue'),
    meta: { admin: true},
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = new createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach( (to, from) => {
  const user = useAuthUserStore()
  if (!user || !(user.isLoggedIn === true) || (user.isAdmin !== true) && (user.isVolunteer !== true)) {
    if (to.path !== '/login' && to.path !== '/register' && to.path !== '/forgot-password' && to.path !== '/contact') {
      return { name: 'Login' }
    }
  }
  if (to.meta.admin === true && !user.isAdmin) {
    return from
  }
})

export default router
