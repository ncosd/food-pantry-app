// script to initialize an admin
if (process.argv.length < 3) {
  console.log('Missing email.\n\nUsage: node setadmin.js email@example.com\n');
  process.exit(1);
}

if (!process.env.FPA_SERVICEKEY) {
  console.log('Need FPA_SERVICEKEY set as path to keyfile.json');
  process.exit(1);
}

const email = process.argv[2];
console.log('email='+ email);
var admin = require("firebase-admin");
var serviceAccount = require(process.env.FPA_SERVICEKEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var user = null;
try {
  admin.auth().getUserByEmail(email).then( async (retUser) => {
    console.log('User ' + email + ' is uid=' + retUser.uid);
    user = retUser;

    var { customClaims: existingClaims } = await admin.auth().getUser(retUser.uid)
    if (!existingClaims) {
      existingClaims = {}
    }
    existingClaims.admin = true
    existingClaims.volunteer = true

    await admin.auth().setCustomUserClaims(retUser.uid, existingClaims)
    console.log('Success setting admin claim.  Creating role document for ' + retUser.uid);
    const db = admin.firestore();
    await db.collection("roles").doc(retUser.uid).set({ email: email, role: { admin: true }})
    console.log('Success creating role document for ' + retUser.uid);

  });
} catch(error) {
  console.log(error);
}
