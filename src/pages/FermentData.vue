<template>
  <q-page padding>
    <template v-if="viewedFerment && viewedFerment.fermentData">
      <div class="row q-col-gutter-md items-center">
        <div class="col-xs-12 col-sm">
          <chart
            :series="series"
            :options="chartOptions"
            style="margin: 0 auto; min-height: 500px;"
            class="full-height"
            key="chart"
          />
        </div>
        <div
          class="col-xs-12 col-sm-3 column q-pb-md"
          :class="{ 'q-col-gutter-md': $q.screen.gt.xs }"
        >
          <div class="col-auto">
            <q-card>
              <q-card-section class="text-subtitle1">
                {{ viewedFerment.name }}
              </q-card-section>
              <q-separator inset />
              <q-list>
                <q-item>
                  <q-item-section avatar>Fermenter:</q-item-section>
                  <q-item-section>
                    {{ viewedFerment.fermenter }}</q-item-section
                  >
                </q-item>
                <q-item>
                  <q-item-section avatar>iSpindel:</q-item-section>
                  <q-item-section> {{ spindel.name }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>OG:</q-item-section>
                  <q-item-section> {{ viewedFerment.og }}</q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
          <div class="col">
            <q-card
              :class="{
                'bg-positive': targetAbvMet,
                'text-white': targetAbvMet,
                'q-my-md': $q.screen.lt.sm
              }"
            >
              <q-card-section class="text-subtitle1">
                Current
              </q-card-section>
              <q-separator inset />
              <q-list>
                <q-item>
                  <q-item-section avatar>ABV:</q-item-section>
                  <q-item-section>
                    {{
                      calcAbvP(
                        viewedFerment.og,
                        viewedFerment.fermentData[
                          viewedFerment.fermentData.length - 1
                        ].gravity
                      )
                    }}%</q-item-section
                  >
                </q-item>
                <q-item>
                  <q-item-section avatar>SG:</q-item-section>
                  <q-item-section>
                    {{
                      platoToSg(
                        viewedFerment.fermentData[
                          viewedFerment.fermentData.length - 1
                        ].gravity
                      ).toFixed(3)
                    }}</q-item-section
                  >
                </q-item>
              </q-list>
            </q-card>
          </div>
          <div class="col">
            <q-card>
              <q-card-section class="text-subtitle1">
                Target
              </q-card-section>
              <q-separator inset />
              <q-list>
                <q-item>
                  <q-item-section avatar>ABV:</q-item-section>
                  <q-item-section>
                    {{
                      calcAbvSg(viewedFerment.og, viewedFerment.fg)
                    }}%</q-item-section
                  >
                </q-item>
                <q-item>
                  <q-item-section avatar>SG:</q-item-section>
                  <q-item-section> {{ viewedFerment.fg }}</q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>
      </div>
      <q-table
        :data="viewedFerment.fermentData"
        :columns="cols"
        :rows-per-page-options="[10, 25, 50, 100, 0]"
        key="table"
      />
    </template>
    <template v-else>
      <div class="row justify-center">
        <div class="column col-xs-12 col-sm-4 justify-center full-height">
          <div class="col-4 text-center q-pt-lg">
            <img
              src="images/HaveAHomeBrew.svg"
              alt="No data image"
              :class="{ 'full-width': $q.screen.gt.xs }"
              :style="$q.screen.lt.sm ? 'max-width: 300px' : ''"
            />
          </div>
          <div class="col-auto">
            <p class="text-center text-h6">
              No data yet, time to relax and have a homebrew!
            </p>
          </div>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Chart from 'vue-apexcharts'
export default {
  name: 'PageFermentData',
  components: {
    Chart
  },
  data() {
    return {
      cols: [
        {
          name: 'time',
          label: 'TIMESTAMP',
          field: 'timeStamp',
          format: (val) => val.toDate().toLocaleString(),
          align: 'left',
          sortable: true
        },
        {
          name: 'gravitySG',
          label: 'GRAVITY (SG)',
          field: 'gravity',
          format: (val) => this.platoToSg(val).toFixed(3)
        },
        {
          name: 'gravityP',
          label: 'GRAVITY (°P)',
          field: 'gravity'
        },

        {
          name: 'temp',
          label: 'TEMPERATURE',
          field: 'temperature',
          format: (val, row) => `${val.toFixed(2)}°${row.temp_units}`
        },
        {
          name: 'angle',
          label: 'ANGLE',
          field: 'angle',
          format: (val, row) => `${val}°`
        },
        {
          name: 'battery',
          label: 'BATTERY',
          field: 'battery'
        }
      ]
    }
  },
  computed: {
    ...mapState('main', ['viewedFerment']),
    ferment() {
      return this.$store.state.main.ferments.find(
        (ferment) => ferment.id === this.$route.params.id
      )
    },
    spindel() {
      return this.$store.state.main.spindels.find(
        (spindel) => spindel.id === this.viewedFerment.spindel
      )
    },
    series() {
      return [
        {
          name: 'Gravity',
          data: this.viewedFerment.fermentData.map((x) =>
            this.platoToSg(x.gravity).toFixed(3)
          )
        },
        {
          name: 'Temperature',
          data: this.viewedFerment.fermentData.map((x) => x.temperature)
        }
      ]
    },
    chartOptions() {
      return {
        chart: {
          type: 'area',
          height: this.$q.screen.lt.sm ? '600' : '',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'FERMENT DATA',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.viewedFerment.fermentData.map((x) =>
            x.timeStamp.toDate().toLocaleString()
          )
        },
        yaxis: [
          {
            title: {
              text: 'Gravity'
            },
            min: 0.9
          },
          { opposite: true, title: { text: 'Temperature' } }
        ]
      }
    },
    targetAbvMet() {
      return (
        this.platoToSg(
          this.viewedFerment.fermentData[
            this.viewedFerment.fermentData.length - 1
          ].gravity
        ).toFixed(3) <= this.viewedFerment.fg
      )
    }
  },
  methods: {
    ...mapActions('main', ['createFermentListener']),
    platoToSg(val) {
      return 259 / (259 - val)
    },
    calcAbvSg(og, fg) {
      const currentSg = fg
      return (
        ((76.08 * (og - currentSg)) / (1.775 - og)) *
        (currentSg / 0.794)
      ).toFixed(2)
      // return ((og - currentSg) * 131.25).toFixed(3)
    },
    calcAbvP(og, fg) {
      const currentSg = this.platoToSg(fg)
      return (
        ((76.08 * (og - currentSg)) / (1.775 - og)) *
        (currentSg / 0.794)
      ).toFixed(2)
    }
  },
  created() {
    this.createFermentListener(this.$route.params.id)
  }
}
</script>

