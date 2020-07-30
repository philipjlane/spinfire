<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import 'firebaseui/dist/firebaseui.css'
export default {
  name: 'PageLogin',
  data() {
    return {
      uiConfig: {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
          this.$auth2.GoogleAuthProvider.PROVIDER_ID
          //   this.$auth2.FacebookAuthProvider.PROVIDER_ID,
          //   this.$auth2.TwitterAuthProvider.PROVIDER_ID,
          //   this.$auth2.GithubAuthProvider.PROVIDER_ID
        ]
      }
    }
  },
  mounted() {
    this.$ui.start('#firebaseui-auth-container', this.uiConfig)
  }
}
</script>
