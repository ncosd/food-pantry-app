import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';

setup((app)=>{
  app.use(createPinia());
});

import AppNavigation from '@/components/AppNavigation.vue';

export default {
  title: 'components/AppNavigation',
  component: AppNavigation,
  tags: ['autodocs'],
  render: (args) => ({
    components: {
      AppNavigation,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: '<app-navigation :user="user" />',
  }),
  parameters: {
    layout: 'fullscreen',
  },
};

export const LoggedIn = {
  args: {
    user: {
      isLoggedIn: true,
      data: {
        displayName: 'user@example.org',
      },
    },
  },
};

export const LoggedOut = {
  args: {
    user: null,
  }
};
