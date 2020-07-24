<template>
  <q-page padding class="row">
    <div class="col" v-if="ferment && ferment.fermentData">
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col">
          <q-card>
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
                      ferment.og,
                      ferment.fermentData[ferment.fermentData.length - 1]
                        .gravity
                    )
                  }}%</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section avatar>SG:</q-item-section>
                <q-item-section>
                  {{
                    platoToSg(
                      ferment.fermentData[ferment.fermentData.length - 1]
                        .gravity
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
                  {{ calcAbvSg(ferment.og, ferment.fg) }}%</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section avatar>SG:</q-item-section>
                <q-item-section> {{ ferment.fg }}</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>

      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <chart
          :series="series"
          :options="chartOptions"
          style="max-width: 800px; margin: 0 auto;"
          key="chart"
        />
        <q-table
          :data="ferment.fermentData"
          :columns="cols"
          :rows-per-page-options="[10, 25, 50, 100, 0]"
          key="table"
        />
      </transition-group>
    </div>
    <template v-else>
      <div class="col row justify-center">
        <div class="column col-xs-12 col-sm-4 justify-center">
          <div class="col-4">
            <q-img
              src="images/HaveAHomeBrew.svg"
              alt="No data image"
              class="full-height"
              contain
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
    ferment() {
      return this.$store.state.main.ferments.find(
        (ferment) => ferment.id === this.$route.params.id
      )
    },
    series() {
      return [
        {
          name: 'Gravity',
          data: this.ferment.fermentData.map((x) =>
            this.platoToSg(x.gravity).toFixed(3)
          )
        },
        {
          name: 'Temperature',
          data: this.ferment.fermentData.map((x) => x.temperature)
        }
      ]
    },
    chartOptions() {
      return {
        chart: {
          type: 'area',
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
          categories: this.ferment.fermentData.map((x) =>
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
    }
  },
  methods: {
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
  }
}
</script>

