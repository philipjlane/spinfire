// import something here
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/functions'
import 'firebase/firestore'
// "async" is optional
var config = {
    apiKey: "AIzaSyBArBENMDETaXTHy9AuBXvTTr-_6cANqXg",
    authDomain: "spinfire-elaitch.firebaseapp.com",
    databaseURL: "https://spinfire-elaitch.firebaseio.com",
    projectId: "spinfire-elaitch",
    storageBucket: "spinfire-elaitch.appspot.com",
    messagingSenderId: "796075818203",
    appId: "1:796075818203:web:c400a10169d62358d4e0fe",
    measurementId: "G-R80XWX9VTG"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export const AUTH = firebase.auth()
export const STOR = firebase.storage()
export const DB = firebase.database()
export const FS = firebase.firestore()
export const FS2 = firebase.firestore
export const FUNC = firebase.functions()

if (process.env.DEV) {
    const url = new URL(process.env.APP_URL)
    FUNC.useFunctionsEmulator(`${url.hostname}:5001`)
    //   FUNC.useFunctionsEmulator(`http://${url.hostname}:5001`)
    FS.settings({
        host: 'localhost:5002',
        ssl: false
    })
}

export default async ({ Vue, store }) => {
    Vue.prototype.$auth = AUTH
    Vue.prototype.$stor = STOR
    Vue.prototype.$db = DB
    Vue.prototype.$fs = FS
    Vue.prototype.$fs2 = FS2
    Vue.prototype.$func = FUNC

    store.$fs = FS
}
