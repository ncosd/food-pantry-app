export let config = {
  adminAppNavName: import.meta.env.VITE_ADMIN_APP_NAV_NAME || 'ADMIN_APP_NAV_NAME',
  appNavName: import.meta.env.VITE_APP_NAV_NAME || 'APP_NAV_NAME',
  OrganizationName: import.meta.env.VITE_ORGANIZATION_NAME || 'ORGANIZATION_NAME',
  ProjectLongName: import.meta.env.VITE_PROJECT_LONG_NAME || 'PROJECT_LONG_NAME',
  AdminProjectLongName: import.meta.env.VITE_ADMIN_PROJECT_LONG_NAME || 'ADMIN_PROJECT_LONG_NAME',

  meta: {
    Home: {
      title: 'Admin',
      metaTags: [
        {
          name: 'description',
          content: 'Admin Home'
        }
      ]
    },
    Login: {
      title: 'Login',
      metaTags: [
        {
          name: 'description',
          content: 'Login'
        }
      ]
    },
    DeliveryApplications: {
      title: 'Delivery Applications',
      metaTags: [
        {
          name: 'description',
          content: 'Delivery Applications'
        }
      ]
    }
  }
}
