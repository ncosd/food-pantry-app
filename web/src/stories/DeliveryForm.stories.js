import DeliveryForm from "../components/DeliveryForm.vue";

export default {
  title: "DeliveryForm",
  component: DeliveryForm,
  argTypes: {
    user: {
      description: "User mock",
      defaultValue: {
        loggedIn() { return true },
        data: {
          email: "user@example.com"
        }
      },
    },
    profile: {
      description: "profile mock",
      defaultValue: {
        firstname: "first",
        lastname: "last",
      },
    }
  }
};

export const Form = () => ({
  props: {
    user: {
      loggedIn() { return true },
      data: {
        email: "user@example.com"
      }
    },
    profile: {
        firstname: "first",
        lastname: "last",
    }
  },
  components: { DeliveryForm },
  template: `<DeliveryForm v-bind:user="user" v-bind:profile="profile"/>`
});

Form.story = {
  name: "Form",
};
