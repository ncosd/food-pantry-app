<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="3">
        <DeliveryApplicationState :deliveryAppState="deliveryAppState"></DeliveryApplicationState>
      </v-col>
      <v-col cols="12" md="9">
        <DeliveryForm
          v-bind:user="user"
          v-bind:profile="profile"
          v-bind:showSuccess="showSuccess"
          v-bind:successMessage="successMessage"
          v-bind:error="error"
          @clicked="onFormSubmit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeliveryForm from "@/components/DeliveryForm.vue";
import DeliveryApplicationState from "@/components/DeliveryApplicationState.vue";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
      deliveryAppState: null,
      showSuccess: false,
      successMessage: "",
      error: "",
    }
  },
  components: {
    DeliveryForm,
    DeliveryApplicationState,
  },
  created() {
    this.error = "";
    if (firebase.auth().currentUser == null) {
       console.log("user is null, no uid.  Are you logged in?");
       this.error = "Error loading profile, please go back and try again.";
       return
    }
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    db.collection("deliveryprofile").doc(uid).get().then( (docRef) => {
      if (docRef.exists) {
        console.log('got the profile ', docRef.data(), uid);
        this.profile = docRef.data();

        db.collection("deliveryprofilestate").doc(uid).get().then( (stateRef) => {

          if (stateRef.exists) {
            console.log("got state", stateRef.data().status);
            this.deliveryAppState = stateRef
          } else {
            console.log("no state");
          }
        }).catch(err => {
          console.log("err during profilestate lookup", err);
        });

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
