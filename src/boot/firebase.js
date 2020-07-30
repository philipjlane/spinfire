// import something here
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/functions'
import 'firebase/firestore'
import * as firebaseui from 'firebaseui'
// "async" is optional
const config = {
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
export const AUTH2 = firebase.auth
export const STOR = firebase.storage()
export const DB = firebase.database()
export const FS = firebase.firestore()
export const FS2 = firebase.firestore
export const FUNC = firebase.functions()
export const UI = new firebaseui.auth.AuthUI(AUTH);

if (process.env.DEV) {
    const url = new URL(process.env.APP_URL)
    // FUNC.useFunctionsEmulator(`${url.hostname}:5001`)
    //   FUNC.useFunctionsEmulator(`http://${url.hostname}:5001`)
    // FS.settings({
    //     host: 'localhost:5002',
    //     ssl: false
    // })
}

export default async ({ Vue, store, router }) => {
    Vue.prototype.$auth = AUTH
    Vue.prototype.$auth2 = AUTH2
    Vue.prototype.$stor = STOR
    Vue.prototype.$db = DB
    Vue.prototype.$fs = FS
    Vue.prototype.$fs2 = FS2
    Vue.prototype.$func = FUNC
    Vue.prototype.$ui = UI

    //Inject Firestore into Vuex
    store.$fs = FS
    store.$auth = AUTH

    //Create navigation guard
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

        const initializeAuth = new Promise(resolve => {
            // this adds a hook for the initial auth-change event
            AUTH.onAuthStateChanged(user => {
                if (user) {
                    store.dispatch('main/initApp', user.uid)
                }
                resolve(user)
            })
        })
        initializeAuth.then(async user => {
            const hasAuth = user && !user.isAnonymous
            if (requiresAuth && !hasAuth) next('/login')
            else {
                next()
            }

        })
    })
}
