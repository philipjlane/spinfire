export function getSpindels ({commit}) {
    this.$fs.collection('spindels').get().then(snap => {
        const spindels = []
        snap.forEach(doc => {
            spindels.push({id: doc.id, ...doc.data()})
        })
        commit('updateSpindels', spindels)
    })
}
