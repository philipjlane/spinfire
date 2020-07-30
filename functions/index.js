const functions = require('firebase-functions');
const admin = require('firebase-admin')
const creds = require('./creds.json')
admin.initializeApp({
    credential: admin.credential.cert(creds),
})

const FS = admin.firestore()

exports.addData = functions.region('europe-west2').https.onRequest((req, res) => {
    console.log('Data received from:', req.body.name)
    console.log('Data received from:', req.body)
    if (req.method === 'GET') {
        res.send('Cannot GET this route')
    }
    if (req.method === 'POST') {
        FS.collection('users').doc(req.body.token).get().then(doc => {
            if (!doc.exists) {
                FS.collection('users').doc(req.body.token).set({ id: req.body.token })
            }
        })
        //     if (doc.exists) {
        FS.collection('users').doc(req.body.token).collection('spindels').doc(`${req.body.ID}`).get().then(doc => {
            if (!doc.exists) {
                FS.collection('users').doc(req.body.token).collection('spindels').doc(`${req.body.ID}`).set({
                    name: req.body.name,
                    added: new Date()
                })
            } else if (doc.exists && doc.data().name !== req.body.name) {
                FS.collection('users').doc(req.body.token).collection('spindels').doc(`${req.body.ID}`).update({ name: req.body.name, updated: new Date })
            }
        }).catch(err => console.error(err))

        FS.collection('users').doc(req.body.token).collection('ferments').where('spindel', '==', `${req.body.ID}`).where('finished', '==', null).get().then(snap => {
            const updateDoc = snap.docs[0].id
            FS.collection('users').doc(req.body.token).collection('ferments').doc(updateDoc).update({
                fermentData: admin.firestore.FieldValue.arrayUnion({ timeStamp: new Date, ...req.body })
            })
        }).catch(() => {
            console.warn(`Spindel [${req.body.name}] reporting data but not associated with active ferment`)
        })
        //     }
        // })

    }
    res.end()
});