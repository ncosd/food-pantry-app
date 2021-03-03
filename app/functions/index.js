const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Every user is a guest.
exports.addUserRoleOnCreate = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      guest: true
    };
    try {
      var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
      return db.collection("roles").doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims
      })
    } catch (error) {
      console.log(error)
    }
  }
});

// When a deliveryProfile is first created, set status to in-review.
exports.addDeliveryProfileOnCreate = functions.firestore
  .document('deliveryprofile/{userId}')
  .onCreate((snap, context) => {
    // create a DeliveryProfileState
    const profile = snap.data();
    var profileState = {
      userid: context.params.userId,
      status: "in-review",
      created: admin.firestore.Timestamp.now(),
      updated: admin.firestore.Timestamp.now()
    };

    db.collection("deliveryprofilestate").doc(context.params.userId).set(profileState);

  });
