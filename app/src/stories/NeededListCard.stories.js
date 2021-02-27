// initialize firebase
import firebase from 'firebase/app';
firebase.initializeApp({projectId: '' });

import NeededListCard from "../components/NeededListCard.vue";

export default {
  title: "NeededListCard",
  component: NeededListCard,
  argTypes: {
    neededList: {
      control: 'text',
      description: 'Information to display',
    },
  },
};

export const Card = () => ({
  props: {
    neededList: {type: String},
  },
  components: { NeededListCard },
  template: `<NeededListCard v-bind="$props"></NeededListCard>`,
});
Card.args = {
  neededList: `<ul><li>Canned food that is not expired</li></ul><p>We cannot accept:</p><ul><li>Alcohol</li></ul>`
};
Card.story = {
   name: "Card",
};
