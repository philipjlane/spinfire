<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title shrink>
          Spin//Fire
        </q-toolbar-title>
        <div v-if="$auth.currentUser && $q.screen.gt.xs">
          User:
          <span v-if="$auth.currentUser.displayName">
            {{ $auth.currentUser.displayName }}
          </span>
          <span v-else>{{ $auth.currentUser.email }}</span>
        </div>
        <q-space></q-space
        ><template v-if="$q.screen.gt.xs">
          <q-tabs v-if="$auth.currentUser" stretch inline-label>
            <q-route-tab to="/" icon="home" label="Home" inline-label />
            <q-route-tab to="/ferments" icon="local_drink" label="Ferments" />
          </q-tabs>
          <q-btn
            v-if="$auth.currentUser"
            stretch
            icon="exit_to_app"
            label="Logout"
            flat
            @click="signOut()"
          />
        </template>
        <q-btn v-else icon="menu" flat>
          <q-menu>
            <q-list separator>
              <q-item-label header v-if="$auth.currentUser">{{
                $auth.currentUser.email
              }}</q-item-label>
              <q-item clickable to="/">
                <q-item-section>
                  Home
                </q-item-section>
              </q-item>
              <q-item clickable to="/ferments">
                <q-item-section>
                  Ferments
                </q-item-section>
              </q-item>
              <q-item clickable @click="signOut()">
                <q-item-section>
                  Logout
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    signOut() {
      this.$auth.signOut().then(() => {
        this.$router.push('/logout')
      })
    }
  }
}
</script>
