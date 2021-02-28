<template>
  <DeliveryForm
        v-bind:user="user"
        v-bind:profile="profile"
        v-bind:showSuccess="showSuccess"
        v-bind:successMessage="successMessage"
        v-bind:error="error"
        @clicked="onFormSubmit"
  />
</template>

<script>
import DeliveryForm from "@/components/DeliveryForm.vue";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { mapGetters } from 'vuex';


export default {
  name: 'DeliveryFormView',
  computed: {
    ...mapGetters({
     user: "user"
    })
  },
  data() {
    return {
      profile: { firstname: "", lastname:"" },
      showSuccess: false,
      successMessage: "",
      error: "",
    }
  },
  components: {
    DeliveryForm
  },
  created() {
    console.log("currentUser=", firebase.auth().currentUser);
    if (firebase.auth().currentUser != null) {
           console.log("currentUser.uid=", firebase.auth().currentUser.uid);
    } else {
       console.log("user is null, no uid");
    }
    const db = firebase.firestore();
    db.collection("deliveryprofile").doc(firebase.auth().currentUser.uid).get().then( (docRef) => {
      if (docRef.exists) {
        console.log('got the profile ', docRef.data());
        this.profile = docRef.data();
      } else {
        console.log("no deliveryprofile");
      }
    }).catch(err => {
      console.log('error getting deliveryprofile', err);
      this.profile = { firstname: "", lastname: "" };
    });
  },
  methods: {
    onFormSubmit(profileForm) {
      console.log("onFormSubmit: value", profileForm.firstname);
      console.log("user", this.user.data.email);
      console.log("uid", firebase.auth().currentUser.uid);
      const db = firebase.firestore();

      db.collection("deliveryprofile").doc(firebase.auth().currentUser.uid).set({
        userid: firebase.auth().currentUser.uid,
        email: this.user.data.email,
        firstname: profileForm.firstname,
        lastname: profileForm.lastname,
        phone: profileForm.phone,
        address1: profileForm.address1,
        address2: profileForm.address2 || "",
        city: profileForm.city,
        state: profileForm.state,
        zip: profileForm.zip,
        num_60: profileForm.num_60 || "0",
        num_1859: profileForm.num_1859 || "0",
        num_1017: profileForm.num_1017 || "0",
        num_10: profileForm.num_10 || "0",
        notes: profileForm.notes || ""
      }).then(() => {
        console.log("Successfully saved");
        this.showSuccess = true,
        this.successMessage = "Application Form Saved",
        this.error = ""
      }).catch((error) => {
        console.log("error adding doc", error);
        this.error = "There was a problem saving the application form, please try again.",
        this.showSuccess = false,
        this.successMessage = ""
      });

    }
  }
}
</script>

<style></style>
