<template>
<div>
  <DeliveryApplicationState :deliveryAppState="deliveryAppState"></DeliveryApplicationState>

  <DeliveryForm
          v-bind:user="user"
          v-bind:profile="profile"
          v-bind:showSuccess="showSuccess"
          v-bind:successMessage="successMessage"
          v-bind:error="error"
          @clicked="onFormSubmit"
        />
</div>
</template>

<script>
import DeliveryForm from "@/components/DeliveryForm.vue";
import DeliveryApplicationState from "@/components/DeliveryApplicationState.vue";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthUserStore } from '@/stores/authUser'

export default {
  name: 'DeliveryFormView',
  computed: {

  },
  data() {
    return {
      user: useAuthUserStore(),
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
  async mounted() {
    this.error = "";
    if (!this.user.isLoggedIn) {
       this.error = "Error, user not logged in.";
       return
    }
    const db = getFirestore()
    const uid = this.user.data.uid;
    const deliveryProfileRef = doc(db, "deliveryprofile", uid)

    try {
    const deliveryProfileSnap = await getDoc(deliveryProfileRef)

    if (deliveryProfileSnap.exists()) {
        this.profile = deliveryProfileSnap.data()

        const deliveryProfileStateRef = doc(db, "deliveryprofilestate", uid)
        const deliveryProfileStateSnap = await getDoc(deliveryProfileStateRef)

        if (deliveryProfileStateSnap.exists()) {
            this.deliveryAppState = deliveryProfileStateSnap
        } else {
            console.log("no dpstate");
        }
    } else {
      console.log("no deliveryprofile")
    }
    } catch (err) {
       console.log("error ", err)
    }
  },
  methods: {
   onFormSubmit(profileForm) {
      const db = getFirestore()

      setDoc(doc(db, "deliveryprofile", this.user.data.uid), {
        userid: this.user.data.uid,
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
      })

    }
  }
}
</script>

<style></style>
