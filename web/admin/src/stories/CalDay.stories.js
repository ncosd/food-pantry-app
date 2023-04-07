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
    template: '<cal-day :date="date" :windows="windows" />',
  }),
  parameters: {
    layout: 'fullscreen',
  },
};

const startDate = new Date();
const endDate = new Date();
endDate.setTime(startDate.getTime()+3000*60*60);
let s1 = new Date(endDate);
let e1 = new Date()
e1.setTime(s1.getTime()+3000*60*60);



export const Today = {
  args: {
    date: new Date(),
    windows: [
      {
        start: startDate,
        end: endDate,
        status: "covered",
      },
      {
        start: s1,
        end: e1,
        status: "open",
      },
      {
        start: s1,
        end: e1,
        status: "cancelled",
      }

      ]
  },
};
