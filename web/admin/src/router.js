import { createRouter, createWebHistory } from 'vue-router'
import { config } from '@/config'
import { useAuthUserStore } from '@/stores/authUser'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: { requiresLogin: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/pages/TermsPage.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'Privacy',
    component: () => import('@/pages/PrivacyPage.vue'),
  },
  {
    path: '/pending',
    name: 'Pending',
    component: () => import('@/pages/Pending.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/pages/ForgotPassword.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/VolunteerRegistration.vue'),
  },
  {
    path: '/volunteers',
    name: 'Volunteers',
    component: () => import('@/pages/VolunteersPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('@/pages/SchedulePage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/schedule-window/:date?',
    name: 'ScheduleWindow',
    props: true,
    component: () => import('@/pages/ScheduleWindowPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/schedule-window/id/:id',
    name: 'ScheduleWindowById',
    props: true,
    component: () => import('@/pages/ScheduleWindowPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/volunteerwindow/:id',
    name: 'VolWindow',
    props: true,
    component: () => import('@/pages/VolunteerWindow.vue'),
    meta: { requiresLogin: true },
  },
  {
    path: '/orders/dashboard',
    name: 'OrdersDashboardPage',
    component: () => import('@/pages/orders/OrdersDashboardPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/orders/settings',
    name: 'OrdersSettingsPage',
    component: () => import('@/pages/orders/OrdersSettingsPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/orders/forms',
    name: 'OrderFormListPage',
    component: () => import('@/pages/orders/OrderFormListPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/orders/forms/form/:id?',
    name: 'OrderFormPage',
    props: true,
    component: () => import('@/pages/orders/OrderFormPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/orders/orders/order/:id?',
    name: 'AdminOrderPage',
    props: true,
    component: () => import('@/pages/orders/AdminOrderPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/orders/orders',
    name: 'OrdersListPage',
    component: () => import('@/pages/orders/OrdersListPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/orders/history',
    name: 'OrdersHistoryPage',
    component: () => import('@/pages/orders/OrdersHistoryPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/orders/items',
    name: 'OrderItemListPage',
    component: () => import('@/pages/orders/OrderItemListPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/orders/items/item/:id?',
    name: 'OrderItemPage',
    props: true,
    component: () => import('@/pages/orders/OrderItemPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/profile/:uid?',
    name: 'Profile',
    props: true,
    component: () => import('@/pages/ProfilePage.vue'),
    meta: { requiresLogin: true },
  },
  {
    path: '/profile-forms/:uid?',
    name: 'Profile-Forms',
    props: true,
    component: () => import('@/pages/ProfileFormsPage.vue'),
    meta: { requiresLogin: true },
  },
  {
    path: '/profile-certs/:uid?',
    name: 'Profile-Certs',
    props: true,
    component: () => import('@/pages/ProfileCertificationsPage.vue'),
    meta: { requiresLogin: true },
  },
  {
    path: '/profile-admin-forms/:volunteerId/:formName',
    name: 'ProfileAdminForms',
    props: true,
    meta: { requiresLogin: true, admin: true },
    component: () => import('@/pages/ProfileAdminFormsPage.vue'),
  },
  {
    path: '/unavailable',
    name: 'Unavailable',
    props: true,
    component: () => import('@/pages/UnavailablePage.vue'),
    meta: { requiresLogin: true },
  },
  {
    path: '/location/:id?',
    name: 'Location',
    props: true,
    component: () => import('@/pages/LocationPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/locations',
    name: 'LocationsList',
    component: () => import('@/pages/LocationsListPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/tasktype/:id?',
    name: 'TaskType',
    props: true,
    component: () => import('@/pages/TaskTypePage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/tasktypes',
    name: 'TaskTypesList',
    component: () => import('@/pages/TaskTypesListPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/agreement/:name',
    name: 'AgreementForm',
    component: () => import('@/pages/AgreementPage.vue'),
    props: true,
    meta: { requiresLogin: true },
  },
  {
    path: '/confidential-agreement',
    name: 'ConfidentialAgreement',
    component: () => import('@/pages/ConfidentialityPage.vue'),
    meta: { requiresLogin: true },
  },
  {
    path: '/delivery/dashboard',
    name: 'DeliveryDashboard',
    component: () => import('@/pages/delivery/DeliveryDashboardPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/delivery/list',
    name: 'DeliveryList',
    component: () => import('@/pages/delivery/DeliveryListPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/delivery/destinations',
    name: 'DestinationsList',
    component: () => import('@/pages/delivery/DestinationsListPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/delivery/destination/:id?',
    name: 'DestinationPage',
    component: () => import('@/pages/delivery/DestinationPage.vue'),
    props: true,
    meta: { requiresLogin: true },
  },
  {
    path: '/delivery/routes',
    name: 'DeliveryRoutesList',
    component: () => import('@/pages/delivery/RouteListPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/admin/reports',
    name: 'AdminReportPage',
    props: true,
    component: () => import('@/pages/reports/ReportsDashboardPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/admin/reports/guest',
    name: 'GuestReportPage',
    props: true,
    component: () => import('@/pages/reports/GuestReportPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/admin/reports/volunteers',
    name: 'VolunteerReportPage',
    props: true,
    component: () => import('@/pages/reports/VolunteersReportPage.vue'),
    meta: { requiresLogin: true, admin: true },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/user-guide',
    name: 'UserGuide',
    component: () => import('@/pages/guide/UserGuidePage.vue'),
  },
  {
    path: '/release-notes/',
    name: 'ReleaseNotes',
    component: () => import('@/pages/ReleaseNotesPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue'),
  }
]

const router = new createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from) => {
  const user = useAuthUserStore()
  if (to.meta.requiresLogin === true) {
    if (user.isLoggedIn !== true) {
      return { name: 'Login' }
    } else if (!user.isVolunteer || user.isPending === true) {
      return { name: 'Pending' }
    }
  }

  if (to.meta.admin === true && !user.isAdmin) {
    return from
  }
})

export default router
