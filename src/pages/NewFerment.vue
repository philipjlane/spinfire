<template>
  <q-page padding>
    <q-form
      v-if="spindels"
      @reset="onReset"
      @submit="onSubmit(form)"
      class="q-gutter-md"
      ref="formRef"
    >
      <q-input
        :rules="[(val) => (val && val.length > 0) || `Field is required`]"
        label="Ferment Name *"
        lazy-rules
        outlined
        v-model="form.name"
      />
      <q-input
        :rules="[(val) => (val && val.length > 0) || `Field is required`]"
        label="Fermenter Name *"
        lazy-rules
        outlined
        v-model="form.fermenter"
      />
      <q-input
        :rules="[
          (val) => (val && val.length > 0) || `Field is required`,
          (val) => val > 0.5 || `Value is out of range`,
          (val) => val < 1.9 || `Value is out of range`
        ]"
        v-model="form.og"
        label="Original Gravity *"
        lazy-rules
        outlined
        mask="#.###"
        fill-mask
      />
      <q-input
        :rules="[
          (val) => (val && val.length > 0) || `Field is required`,
          (val) => val > 0.5 || `Value is out of range`,
          (val) => val < 1.9 || `Value is out of range`
        ]"
        v-model="form.fg"
        label="Target Gravity *"
        lazy-rules
        outlined
        mask="#.###"
        fill-mask
      />
      <q-select
        v-model="form.spindel"
        :options="selectOptions"
        :rules="[(val) => (val && val.length > 0) || `Field is required`]"
        label="Select iSpindel *"
        lazy-rules
        outlined
        emit-value
        map-options
      />
      <q-btn color="primary" label="Start ferment" type="submit" />
      <q-btn color="primary" flat label="Reset form" type="reset" />
    </q-form>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PageNewFerment',
  data() {
    return {
      form: {
        name: null,
        fermenter: null,
        spindel: null,
        og: null,
        fg: null
      }
    }
  },
  computed: {
    ...mapState('main', ['spindels']),
    selectOptions() {
      return this.spindels.map((x) => {
        return { label: x.name, value: x.id, disable: x.busy }
      })
    }
  },
  methods: {
    ...mapActions('main', ['getFerments']),
    onReset() {
      this.form = {
        name: null,
        fermenter: null,
        spindel: null,
        og: null,
        fg: null
      }
      this.$refs.formRef.resetValidation()
    },
    onSubmit(form) {
      this.$fs
        .collection('users')
        .doc(this.$auth.currentUser.uid)
        .collection('ferments')
        .add({
          ...form,
          finished: null,
          created: this.$fs2.FieldValue.serverTimestamp()
        })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Ferment added successfully',
            position: 'top'
          })
        })
        .then(() => {
          this.$fs
            .collection('users')
            .doc(this.$auth.currentUser.uid)
            .collection('spindels')
            .doc(form.spindel)
            .update({ busy: true })
        })
        .then(() => {
          this.onReset()
          this.getFerments()
          this.$router.push('/ferments')
        })
        .catch((err) => {
          console.error(err)
          this.$q.notify({
            type: 'negative',
            message: 'Error adding ferment',
            position: 'top'
          })
        })
    }
  }
}
</script>
