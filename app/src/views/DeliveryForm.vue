<template>
  <DeliveryForm
        v-bind:user="user"
        v-bind:profile="profile"
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
      profile: { firstname: "", lastname:"" }
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
        firstname: profileForm.firstname
        }).then((doc) => {
          console.log("doc id", doc);
          }).catch((error) => {
            console.log("error adding doc", error);
            });

    }
  }
}
</script>

<style></style>
