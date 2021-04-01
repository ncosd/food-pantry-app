this.config = {
  appNavName: process.env.VUE_APP_APP_NAV_NAME || 'APP_NAV_NAME',
  OrganizationName: process.env.VUE_APP_ORGANIZATION_NAME || 'ORGANIZATION_NAME',
  ProjectLongName: process.env.VUE_APP_PROJECT_LONG_NAME || 'PROJECT_LONG_NAME',

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
};
