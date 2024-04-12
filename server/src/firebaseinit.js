const admin = require("firebase-admin");

const serviceAccount = require("./Firebase_Service_Account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firebaseApp = admin.app();
const firestoreDb = firebaseApp.firestore();
module.exports = {admin: firebaseApp, db: firestoreDb};
