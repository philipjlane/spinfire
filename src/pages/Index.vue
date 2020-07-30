<template>
  <q-page padding>
    <q-banner v-if="spindels && !spindels.length" class="bg-accent text-white"
      >No registered iSpindels - please wait for an iSpindel to register before
      adding a ferment</q-banner
    >

    <p class="text-h5">Welcome to Spin//Fire</p>
    <p>
      Below are your individual configuration details for your iSpindels. Once
      at least one iSpindel has registered with Spin//Fire you can create your
      first ferment and start tracking your data.
    </p>

    <div class="text-h6">
      Coming soon
    </div>
    <ul>
      <li>Mobile app with push notifications</li>
      <li>Alarms and targets</li>
      <li>Webhooks and email notifications</li>
      <li>iSpindel calibration wizard</li>
    </ul>

    <q-list>
      <q-item-label header>
        iSpindel Configuration
      </q-item-label>
      <q-item>
        <q-item-section side>
          Service Type:
        </q-item-section>
        <q-item-section>HTTP </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          Token:
        </q-item-section>
        <q-item-section>{{ $auth.currentUser.uid }} </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          Server Address:
        </q-item-section>
        <q-item-section
          >europe-west2-spinfire-elaitch.cloudfunctions.net
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          Server Port:
        </q-item-section>
        <q-item-section>80</q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          Path /URI:
        </q-item-section>
        <q-item-section>/addData</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PageIndex',
  computed: {
    ...mapState('main', ['spindels'])
  },
  watch: {
    spindels(val, old) {
      try {
        if (Array.isArray(val) && val.length === 1 && old.length === 0) {
          this.$q.notify({
            type: 'positive',
            message: `iSpindel registered: ${val[0].name}`,
            position: 'top'
          })
        }
      } catch (error) {
        //discard benign error as state is not instantited yet and the watcher doesn't like that
      }
    }
  },
  methods: {
    ...mapActions('main', ['initApp'])
  },
  created() {
    this.initApp()
  }
}
</script>
