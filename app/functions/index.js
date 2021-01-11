const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//exports.addUserRole = functions.https.onRequest((request, response) => {


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
