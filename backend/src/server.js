var admin = require("firebase-admin");
var serviceAccount = require("../keys/firebasePRIVATEkey.json");

if (admin.apps.length === 0) { 
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
