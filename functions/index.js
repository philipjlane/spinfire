const functions = require('firebase-functions');
const admin = require('firebase-admin')
const creds = require('./creds.json')
admin.initializeApp({
    credential: admin.credential.cert(creds),
})

const FS = admin.firestore()

exports.addData = functions.region('europe-west2').https.onRequest((req, res) => {
    FS.collection('spindels').doc(`${req.body.ID}`).get().then(doc => {
        if (!doc.exists) {
            FS.collection('spindels').doc(`${req.body.ID}`).set({
                name: req.body.name,
                added: new Date()
            })
        } else if (doc.exists && doc.data().name !== req.body.name) {
            FS.collection('spindels').doc(`${req.body.ID}`).update({ name: req.body.name, updated: new Date })
        }
    })
    res.end()
});