import { setup } from '@storybook/vue3';
import VolunteerRegistrationForm from '@/components/VolunteerRegistrationForm.vue';

export default {
  title: 'components/VolunteerRegistrationForm',
  component: VolunteerRegistrationForm,
  tags: ['autodocs'],
  render: (args) => ({
    components: {
      VolunteerRegistrationForm,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: '<volunteer-registration-form  />',
  }),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Today = {
  args: {
    'email': '',
    'password': '',
    'profile': {},
  },
};
