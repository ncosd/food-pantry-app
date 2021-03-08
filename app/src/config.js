this.config = {
  appNavName: process.env.VUE_APP_APP_NAV_NAME || 'APP_NAV_NAME',
  OrganizationName: process.env.VUE_APP_ORGANIZATION_NAME || 'ORGANIZATION_NAME',
  ProjectLongName: process.env.VUE_APP_PROJECT_LONG_NAME || 'PROJECT_LONG_NAME',
  DeliveryAreaNames: process.env.VUE_APP_DELIVERY_AREA_NAMES || "Narberth and Lower Merion Township",
  DeliveryZipcodes: process.env.VUE_APP_DELIVERY_ZIP_CODES || [19003, 19010, 19041, 19072, 19096, 19004, 19035, 19066, 19085, 19428],
  DeliveryOutsideAreaUrl: process.env.VUE_APP_DELIVERY_OUTSIDE_AREA_URL || "https://connect4health.org/",

  meta: {
    Home: {
      title: 'Home',
      metaTags: [
        {
          name: 'description',
          content: 'Home page'
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
    Register: {
      title: 'Register',
      metaTags: [
        {
          name: 'description',
          content: 'Register for an account'
        }
      ]
    },
    About: {
      title: 'About',
      metaTags: [
        {
          name: 'description',
          content: 'About page'
        }
      ]
    },
    DeliveryForm: {
      title: 'Delivery Profile',
      metaTags: [
        {
          name: 'description',
          content: 'Your delivery application/profile page.'
        }
      ]
    },
    PrivacyPolicy: {
      title: 'Privacy Policy',
      metaTags: [
        {
          name: 'description',
          content: 'Privacy policy.'
        }
      ]
    },
    Terms: {
      title: 'Terms',
      metaTags: [
        {
          name: 'description',
          content: 'Terms of use.'
        }
      ]
    }
  }
};
