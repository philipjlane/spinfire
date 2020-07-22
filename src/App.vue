<template>
  <div id='q-app'>
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions('main', ['getSpindels']),
    initApp() {
      this.getSpindels()
    }
  },
  created() {
    this.initApp()
  }
}
</script>
