const functions = require("firebase-functions");
const admin = require('firebase-admin');
const fs = require('firebase-admin/firestore');

admin.initializeApp();

const db = admin.firestore();
const sendgridKey = process.env.SENDGRID_KEY;
const fromEmail = process.env.SENDGRID_FROM;
const toEmail = process.env.DELIVERY_TO;
const bccEmail = process.env.DELIVERY_BCC;


// // Set role for the user based on
// exports.addUserRoleOnCreate = functions.auth.user().onCreate(async (authUser) => {
//   if (authUser.email) {
//     const customClaims = {
//       guest: true
//     };
//     try {
//       var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
//       return db.collection("roles").doc(authUser.uid).set({
//         email: authUser.email,
//         role: customClaims
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }
// });

// Admins can change users roles.
exports.setAdminRole = functions.https.onCall(async (data, context) => {

  // Check the calling user has the admin custom claim
  if (!context.auth.token.admin) return;

  admin.auth().setCustomUserClaims(data.uid, { admin: true }).then(function() {

      db.collection("roles").doc(data.uid).set({ role: { admin: true} }).catch( (error) => {
        console.log("Error setting admin role for user.", error);
      });

      response.end(JSON.stringify({
        status: 'success'
      }));
    });

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
      created: fs.Timestamp.now(),
      updated: fs.Timestamp.now()
    };

    db.collection("deliveryprofilestate").doc(context.params.userId).set(profileState);
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


// When a VolunteerProfile is created, set status to in-review.
exports.addVolunteerProfileOnCreate = functions.firestore
  .document('volunteerprofile/{userId}')
  .onCreate(async (snap, context) => {
    // create a VolunteerProfileState
    const profile = snap.data();
    var profileState = {
      userid: context.params.userId,
      status: "in-review",
      created: fs.Timestamp.now(),
      updated: fs.Timestamp.now()
    };

    db.collection("volunteerpofilestate").doc(context.params.userId).set(profileState);

    // add the volunteer claim
    const customClaims = {
      volunteer: true
    };
    try {
      var _ = await admin.auth().setCustomUserClaims(context.params.userId, customClaims)
      return
    } catch (error) {
      console.log(error)
    }

  });
