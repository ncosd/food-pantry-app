import { setup } from '@storybook/vue3';
import CalDay from '@/components/CalDay.vue';

export default {
  title: 'components/CalDay',
  component: CalDay,
  tags: ['autodocs'],
  render: (args) => ({
    components: {
      CalDay,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: '<cal-day :date="date" />',
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
