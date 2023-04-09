import { setup } from '@storybook/vue3';
import AdminCalendar from '@/components/AdminCalendar.vue';

export default {
  title: 'components/AdminCalendar',
  component: AdminCalendar,
  tags: ['autodocs'],
  render: (args) => ({
    components: {
      AdminCalendar,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: '<admin-calendar :date="date" />',
  }),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Today = {
  args: {
    date: new Date(),
  },
};
