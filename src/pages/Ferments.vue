<template>
  <q-page padding>
    <ferments-grid :tableData="ferments" />
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
