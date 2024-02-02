import { createRouter, createWebHistory } from 'vue-router'
import { config } from '@/config'
import { useAuthUserStore } from '@/stores/authUser'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('@/pages/RegisterPage.vue'),
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/delivery-form',
    name: 'DeliveryFormPage',
    component: () => import('@/pages/DeliveryForm.vue'),
    meta: { login:true },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/pages/PrivacyPolicy.vue'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/pages/TermsPage.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/pages/ForgotPassword.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/release-notes/',
    name: 'ReleaseNotes',
    component: () => import('@/pages/ReleaseNotesPage.vue'),
  },
    {
      path: '/volunteer',
      name: 'VolunteerPage',
      component: () => import('@/pages/VolunteerPage.vue'),
      meta: { login: true },
    },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from) => {
  const user = useAuthUserStore()

  if (user.isLoggedIn && (user.isVolunteer && !user.isAdmin) && to.name !== 'VolunteerPage') {
    return { name: 'VolunteerPage' }
  }

  if (to.meta.login === true) {
    if (user.isLoggedIn !== true) {
      return { name: 'LoginPage' }
    }
  }

})

export default router
