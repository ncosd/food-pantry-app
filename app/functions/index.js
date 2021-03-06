const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const sendgridKey = functions.config().sendgrid.key;
const fromEmail = functions.config().sendgrid.from;
const toEmail = functions.config().delivery.to;
const bccEmail = functions.config().delivery.bcc;


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

    console.log('profile', profile);
    subject = `New Delivery Profile ${profile.firstname}  ${profile.lastname}`;

    htmlMsg = `New delivery profile was added for ${profile.firstname} ${profile.lastname}<br>
Link to profile: not available yet<br>
Email: ${profile.email}<br>
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
