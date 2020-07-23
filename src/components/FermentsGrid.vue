<template>
  <q-table
    :columns="cols"
    :data="tableData"
    :filter="filter"
    grid
    hide-header
    row-key="id"
    title="Ferments"
    :loading="!tableData.length"
    selection="multiple"
    :selected.sync="selected"
  >
    <template v-slot:top-right>
      <div class="row">
        <q-btn
          icon="add"
          label="New"
          color="primary"
          class="on-left"
          to="/new"
        />
        <q-input
          borderless
          debounce="300"
          dense
          outlined
          placeholder="Search"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template>
    <template v-slot:item="props">
      <div
        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        :style="props.selected ? 'transform: scale(0.95);' : ''"
      >
        <q-card :class="props.selected ? 'bg-grey-2' : ''">
          <q-card-section>
            <q-checkbox
              dense
              v-model="props.selected"
              :label="props.row.name"
            />
          </q-card-section>
          <q-separator />
          <q-list dense>
            <q-item
              v-for="col in props.cols.filter((col) => col.name !== 'desc')"
              :key="col.name"
            >
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>{{ col.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-actions class="row">
            <q-btn
              label="View data"
              color="primary"
              class="col"
              :to="`/ferments/${props.row.id}`"
            />
            <q-btn label="Archive" color="negative" class="col" />
            <q-btn
              label="Finish"
              color="accent"
              class="col"
              @click="finishFerment(props.row.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'FermentsGrid',
  props: {
    tableData: Array
  },
  data() {
    return {
      filter: '',
      selected: [],
      cols: [
        // { name: 'id', label: 'ID', field: 'id' },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        {
          name: 'fermenter',
          label: 'Fermenter',
          field: 'fermenter',
          align: 'left'
        },
        {
          name: 'spindel',
          label: 'iSpindel',
          field: 'spindel',
          format: (val) => this.spindels.find((x) => x.id === val).name,
          align: 'left'
        },
        {
          name: 'active',
          label: 'Active',
          field: 'finished',
          format: (val) => (!val ? 'True' : 'False'),
          align: 'left'
        }
      ]
    }
  },
  computed: {
    ...mapState('main', ['spindels'])
  },
  methods: {
    ...mapActions('main', ['getFerments']),
    finishFerment(id) {
      this.$fs
        .collection('ferments')
        .doc(id)
        .update({
          finished: new Date()
        })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Ferment finished successfully',
            position: 'top'
          })
        })
        .then(() => {
          this.getFerments()
        })
    }
  }
}
</script>
