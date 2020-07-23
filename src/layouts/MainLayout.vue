<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          SpinFire
        </q-toolbar-title>
        <q-tabs stretch inline-label>
          <q-route-tab to="/" icon="home" label="Home" inline-label />
          <q-route-tab to="/ferments" icon="local_drink" label="Ferments" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
