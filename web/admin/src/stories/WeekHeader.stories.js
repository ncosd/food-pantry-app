import { setup } from '@storybook/vue3';
import WeekHeader from '@/components/WeekHeader.vue';

export default {
  title: 'components/WeekHeader',
  component: WeekHeader,
  tags: ['autodocs'],
  render: (args) => ({
    components: {
      WeekHeader,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: '<week-header />',
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
