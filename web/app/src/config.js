export let config = {
  version: "1.21.0",
  appNavName: import.meta.env.VITE_APP_NAV_NAME || "APP_NAV_NAME",
  appNavImg: import.meta.env.VITE_APP_NAV_IMG || null,
  OrganizationName: import.meta.env.VITE_ORGANIZATION_NAME || "ORGANIZATION_NAME",
  ProjectLongName: import.meta.env.VITE_PROJECT_LONG_NAME || "PROJECT_LONG_NAME",
  DeliveryAreaNames: import.meta.env.VITE_DELIVERY_AREA_NAMES || "",
  DeliveryZipcodesConfig: import.meta.env.VITE_DELIVERY_ZIPCODES || "",
  DeliveryZipcodes: [],
  DeliveryOutsideAreaUrl: import.meta.env.VITE_DELIVERY_OUTSIDE_AREA_URL || "",
  DeliveryMessage: import.meta.env.VITE_DELIVERY_MESSAGE || "",
  DeliveryFormURL: import.meta.env.VITE_DELIVERY_FORM_URL || "/delivery-form",
  VolunteerPortalURL: import.meta.env.VITE_VOLUNTEER_PORTAL_URL || "VOLUNTEER_PORTAL_URL",
  EnableGuestLogin: import.meta.env.VITE_ENABLE_GUEST_LOGIN || "false",
  EnableGuestOrder: import.meta.env.VITE_ENABLE_GUEST_ORDER || "false",
  MainOrgURL: import.meta.env.VITE_MAIN_ORG_URL || 'https://example.com/?#main-org-url-not-set',

  meta: {
    Home: {
      title: "Home",
      metaTags: [
        {
          name: "description",
          content: "Home page"
        }
      ]
    },
    Login: {
      title: "Login",
      metaTags: [
        {
          name: "description",
          content: "Login"
        }
      ]
    },
    Register: {
      title: "Register",
      metaTags: [
        {
          name: "description",
          content: "Register for an account"
        }
      ]
    },
    About: {
      title: "About",
      metaTags: [
        {
          name: "description",
          content: "About page"
        }
      ]
    },
    Contact: {
      title: "Contact Us",
      metaTags: [
        {
          name: "description",
          content: "How to contact us"
        }
      ]
    },
    DeliveryForm: {
      title: "Delivery Profile",
      metaTags: [
        {
          name: "description",
          content: "Your delivery application/profile page."
        }
      ]
    },
    PrivacyPolicy: {
      title: "Privacy Policy",
      metaTags: [
        {
          name: "description",
          content: "Privacy policy."
        }
      ]
    },
    Terms: {
      title: "Terms",
      metaTags: [
        {
          name: "description",
          content: "Terms of use."
        }
      ]
    },
    ForgotPassword: {
      title: "Forgot Password",
      metaTags: [
        {
          name: "description",
          content: "Enter your email if you have forgotten your password."
        }
      ]
    }

  }
}

if (config.DeliveryZipcodesConfig.length > 0) {
  let zips = config.DeliveryZipcodesConfig.replace(/\s+/g, "")
  config.DeliveryZipcodes = config.DeliveryZipcodesConfig.split(",")
}
