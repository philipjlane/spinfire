<template>
  <q-page padding>
    <ferments-grid :tableData="ferments" />
    <q-page-sticky
      v-if="$q.screen.lt.sm"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn fab icon="add" color="accent" label="New" to="/new" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import FermentsGrid from 'components/FermentsGrid'
export default {
  name: 'PageFerments',
  components: {
    FermentsGrid
  },
  computed: {
    ...mapState('main', ['ferments'])
  }
}
</script>
