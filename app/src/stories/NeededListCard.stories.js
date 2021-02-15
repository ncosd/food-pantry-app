// initialize firebase
import firebase from 'firebase/app';
firebase.initializeApp({projectId: '' });

import NeededListCard from "../components/NeededListCard.vue";

export default {
  title: "NeededListCard",
  component: NeededListCard
};

export const Card = () => ({
  props: {
    name: {
      type: String

    }
  },
  components: { NeededListCard },
  template: `<NeededListCard/>`

});

Card.story = {
   name: "Card",
};
