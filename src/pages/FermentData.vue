<template>
  <q-page padding>
    <chart v-if="ferment" :series="series" :options="chartOptions" />
    <q-table
      v-if="ferment"
      :data="ferment.fermentData"
      :columns="cols"
      :rows-per-page-options="[10, 25, 50, 100, 0]"
    />
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
          name: 'gravity',
          label: 'GRAVITY',
          field: 'gravity'
        },
        {
          name: 'temp',
          label: 'TEMPERATURE',
          field: 'temperature',
          format: (val, row) => `${val}°${row.temp_units}`
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
          data: this.ferment.fermentData.map((x) => x.gravity)
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
          height: 300,
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
            }
          },
          { opposite: true, title: { text: 'Temperature' } }
        ]
      }
    }
  }
}
</script>

