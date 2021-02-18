import DeliveryForm from "../components/DeliveryForm.vue";

export default {
  title: "DeliveryForm",
  component: DeliveryForm,
};

export const Form = () => ({
  props: {
    user: {
      loggedIn() { return true },
      data: {
        email: "someone@example.com"
      }
    }
  },
  components: { DeliveryForm },
  template: `<DeliveryForm v-bind:user="user"/>`
});

Form.story = {
  name: "Form",
};
