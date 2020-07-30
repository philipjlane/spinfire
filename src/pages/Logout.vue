<template>
  <q-page padding class="flex flex-center">
    <div class="column text-center items-center">
      <div class="text-h6">Succesfully logged out, redirecting to login</div>
      <q-spinner size="lg" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageLogout',
  mounted() {
    setTimeout(() => {
      this.$router.push('/login')
    }, 3000)
  }
}
</script>
