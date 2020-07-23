<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions('main', ['getSpindels', 'getFerments']),
    initApp() {
      this.getSpindels()
      this.getFerments()
    }
  },
  created() {
    this.initApp()
  }
}
</script>
