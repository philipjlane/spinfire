export function getSpindels({ commit }) {
    this.$fs.collection('users')
        .doc(this.$auth.currentUser.uid).collection('spindels').get().then(snap => {
            const spindels = []
            snap.forEach(doc => {
                spindels.push({ id: doc.id, ...doc.data() })
            })
            commit('updateSpindels', spindels)
        })
}
export function getFerments({ commit }) {
    this.$fs.collection('users')
        .doc(this.$auth.currentUser.uid).collection('ferments').orderBy('created', 'desc').get().then(snap => {
            const ferments = []
            snap.forEach(doc => {
                ferments.push({ id: doc.id, ...doc.data() })
            })
            commit('updateFerments', ferments)
        })
}

export function initApp(context) {
    context.dispatch('createSpindelListener')
    context.dispatch('getFerments')
}

export function createFermentListener({ commit }, id) {
    this.$fs.collection('users').doc(this.$auth.currentUser.uid).collection('ferments').doc(id).onSnapshot(snap => {
        commit('updateViewedFerment', snap.data())
    })
}

export function createSpindelListener({ commit }, id) {
    this.$fs.collection('users').doc(this.$auth.currentUser.uid).collection('spindels').onSnapshot(snap => {
        const SPINDELS = []
        snap.forEach(doc => SPINDELS.push({ id: doc.id, ...doc.data() }))
        commit('updateSpindels', SPINDELS)
    })
}