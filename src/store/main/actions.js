export function getSpindels({ commit }) {
    this.$fs.collection('spindels').get().then(snap => {
        const spindels = []
        snap.forEach(doc => {
            spindels.push({ id: doc.id, ...doc.data() })
        })
        commit('updateSpindels', spindels)
    })
}
export function getFerments({ commit }) {
    this.$fs.collection('ferments').get().then(snap => {
        const ferments = []
        snap.forEach(doc => {
            ferments.push({ id: doc.id, ...doc.data() })
        })
        commit('updateFerments', ferments)
    })
}