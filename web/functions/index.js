const functions = require("firebase-functions");
const { onCall } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const fs = require('firebase-admin/firestore');


admin.initializeApp();

const db = admin.firestore();
const sendgridKey = process.env.SENDGRID_KEY;
const fromEmail = process.env.SENDGRID_FROM;
const toEmail = process.env.DELIVERY_TO;
const bccEmail = process.env.DELIVERY_BCC;

// Admins can change user roles
exports.setAdminRolev2 = onCall(async (req) => {

  // Check the calling user has the admin custom claim
  if (!req.auth.token.admin) return;

  try {
    const { customClaims: existingClaims } = await admin.auth().getUser(req.auth.uid)
    existingClaims.admin = true
    await admin.auth().setCustomUserClaims(req.auth.uid, existingClaims)

    return {
      status: 'success'
    };
  } catch (err) {
    console.log('Error setting admin for ' + req.auth.uid + ' err=' + err)
    return functions.https.HttpsError('Error', 'error')
  }

});

// Admins can approve a volunteer v2
exports.setVolunteerv2 = onCall(async (req) => {

  // Check the calling user has the admin custom claim
  if (req.auth.token.admin !== true) {
    console.log('setVolunteer caller not admin')
    throw new functions.https.HttpsError('NotAdmin', 'function caller must be admin')
  }

  try {
    const { customClaims: existingClaims } = await admin.auth().getUser(req.data.id)
    existingClaims.volunteer = true
    existingClaims.pendingvolunteer = null

    await admin.auth().setCustomUserClaims(req.data.id, existingClaims)
    return {
      status: 'success'
    }

  } catch (err) {
    console.log('error ' + err)
    return functions.https.HttpsError('Error', 'Error')
  }
});

// Admins can inactivate a volunteer v2
exports.inactivateVolunteerv2 = onCall(async (req) => {
  // Check the calling user has the admin custom claim
  if (req.auth.token.admin !== true) {
    console.log('setVolunteer caller not admin')
    throw new functions.https.HttpsError('NotAdmin', 'function caller must be admin')
  }

  try {
    const { customClaims: existingClaims } = await admin.auth().getUser(req.data.id)
    existingClaims.volunteer = null
    existingClaims.pendingvolunteer = true
    await admin.auth().setCustomUserClaims(req.data.id, existingClaims)
    return {
      status: 'success'
    }

  } catch (err) {
    console.log('error ' + err)
    return functions.https.HttpsError('Error', 'Error')
  }
});

// When a deliveryProfile is first created, set status to in-review.
exports.addDeliveryProfileOnCreatev2 = onDocumentCreated('deliveryprofile/{userId}', (event) => {

  // create a DeliveryProfileState
  const snap = event.data;
  if (!snap) {
    return;
  }
  const profile = snap.data();
  var profileState = {
    userid: event.params.userId,
    status: "in-review",
    created: fs.Timestamp.now(),
    updated: fs.Timestamp.now()
  };

  db.collection("deliveryprofilestate").doc(event.params.userId).set(profileState);
  subject = `New Delivery Profile ${profile.firstname}  ${profile.lastname}`;

  htmlMsg = `New delivery profile was added for ${profile.firstname} ${profile.lastname}<br>
Link to profile: not available yet<br>
Email: ${profile.email}<br>
Phone: ${profile.phone}<br>
${profile.address1}<br>`
  if (profile.address2) { htmlMsg += `${profile.address2}<br>`;}
  htmlMsg += `${profile.city}, ${profile.state} ${profile.zip}<br><br>
60+  : ${profile.num_60}<br>
18-59: ${profile.num_1859}<br>
10-17: ${profile.num_1017}<br>
 0-10: ${profile.num_10}<br>
Notes: ${profile.notes}<br>`

  textMsg = `New delivery profile was added for ${profile.firstname} ${profile.lastname}\n
Link to profile: not available yet\n
Email: ${profile.email}\n
Phone: ${profile.phone}\n
${profile.address1}\n
${profile.address2}\n
${profile.city}, ${profile.state} ${profile.zip}\n
60+  : ${profile.num_60}\n
18-59: ${profile.num_1859}\n
10-17: ${profile.num_1017}\n
 0-10: ${profile.num_10}\n
Notes: ${profile.notes}`

  // using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
  var sendgrid = require("@sendgrid/mail");
  sendgrid.setApiKey(sendgridKey);
  const msg = {
    to: toEmail,
    from: fromEmail,
    bcc: bccEmail,
    subject: subject,
    text: textMsg,
    html: htmlMsg
  };

  sendgrid.send(msg).then(() => {}, error => {
    console.log(error);
    if (error.response) {
      console.log(error.response.body);
    }
  });


});




// When a deliveryProfile is first created, set status to in-review.
// exports.addDeliveryProfileOnCreate = functions.firestore
//   .document('deliveryprofile/{userId}')
//   .onCreate((snap, context) => {
//     // create a DeliveryProfileState
//     const profile = snap.data();
//     var profileState = {
//       userid: context.params.userId,
//       status: "in-review",
//       created: fs.Timestamp.now(),
//       updated: fs.Timestamp.now()
//     };

//     db.collection("deliveryprofilestate").doc(context.params.userId).set(profileState);
//     subject = `New Delivery Profile ${profile.firstname}  ${profile.lastname}`;

//     htmlMsg = `New delivery profile was added for ${profile.firstname} ${profile.lastname}<br>
// Link to profile: not available yet<br>
// Email: ${profile.email}<br>
// Phone: ${profile.phone}<br>
// ${profile.address1}<br>`
//     if (profile.address2) { htmlMsg += `${profile.address2}<br>`;}
//     htmlMsg += `${profile.city}, ${profile.state} ${profile.zip}<br><br>
// 60+  : ${profile.num_60}<br>
// 18-59: ${profile.num_1859}<br>
// 10-17: ${profile.num_1017}<br>
//  0-10: ${profile.num_10}<br>
// Notes: ${profile.notes}<br>`

//     textMsg = `New delivery profile was added for ${profile.firstname} ${profile.lastname}\n
// Link to profile: not available yet\n
// Email: ${profile.email}\n
// Phone: ${profile.phone}\n
// ${profile.address1}\n
// ${profile.address2}\n
// ${profile.city}, ${profile.state} ${profile.zip}\n
// 60+  : ${profile.num_60}\n
// 18-59: ${profile.num_1859}\n
// 10-17: ${profile.num_1017}\n
//  0-10: ${profile.num_10}\n
// Notes: ${profile.notes}`

//     // using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
//     var sendgrid = require("@sendgrid/mail");
//     sendgrid.setApiKey(sendgridKey);
//     const msg = {
//       to: toEmail,
//       from: fromEmail,
//       bcc: bccEmail,
//       subject: subject,
//       text: textMsg,
//       html: htmlMsg
//     };

//     sendgrid.send(msg).then(() => {}, error => {
//       console.log(error);
//       if (error.response) {
//         console.log(error.response.body);
//       }
//     });

// });


// When a VolunteerProfile is created, set status to in-review and pendingvolunteer to true.
exports.addVolunteerProfileOnCreatev2 = onDocumentCreated('volunteerprofile/{userId}', async (event) => {
  const profileSnap = event.data;
  if (!profileSnap) {
    console.log('No data.');
    return;
  }
  const profile = profileSnap.data();
  var profileState = {
    userid: event.params.userId,
    firstname: profile.firstname,
    lastname: profile.lastname,
    email: profile.email,
    status: "in-review",
    created: fs.Timestamp.now(),
    updated: fs.Timestamp.now()
  };

  db.collection("volunteerprofilestate").doc(event.params.userId).set(profileState);

  // add the pendingvolunteer claim
  const customClaims = {
    pendingvolunteer: true
  };
  try {
    await admin.auth().setCustomUserClaims(event.params.userId, customClaims)
    return
  } catch (error) {
    console.log('Error setting pendingvolunteer claim', error)
  }
});

// When a VolunteerProfile is created, set status to in-review and pendingvolunteer to true.
// exports.addVolunteerProfileOnCreate = functions.firestore
//   .document('volunteerprofile/{userId}')
//   .onCreate(async (snap, context) => {
//     // create a VolunteerProfileState
//     const profile = snap.data();
//     var profileState = {
//       userid: context.params.userId,
//       firstname: profile.firstname,
//       lastname: profile.lastname,
//       email: profile.email,
//       status: "in-review",
//       created: fs.Timestamp.now(),
//       updated: fs.Timestamp.now()
//     };

//     db.collection("volunteerprofilestate").doc(context.params.userId).set(profileState);

//     // add the pendingvolunteer claim
//     const customClaims = {
//       pendingvolunteer: true
//     };
//     try {
//       await admin.auth().setCustomUserClaims(context.params.userId, customClaims)
//       return
//     } catch (error) {
//       console.log(error)
//     }
//   });
