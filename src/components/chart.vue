<template>
  <!-- <div> -->
  <div style="width: 2200px">
    <div class="title">
      {{ $t("titleChart") }}
    </div>
    <apexchart :options="chartOptions" :series="chartSeries" height="370" />
  </div>
</template>

<script>
export default {
  name: "LineChart",
  props: {
    dataHourly: Object,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        theme: {
          monochrome: {
            enabled: true,
            color: "#75dbb4",
            shadeTo: "light",
            shadeIntensity: 0.65,
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "10px",
            },
            formatter: function (val) {
              return val + "h";
            },
          },
          categories: this.dataHourly.hour,
          position: "top",
        },
        dataLabels: {
          enabled: true,
          offsetY: -10,
          enabledOnSeries: [1],
          position: "top",
          style: {
            fontSize: "9px",
            fontWeight: "bold",
            colors: ["#1e9467"],
          },
          background: {
            enabled: false,
          },
          formatter: function (val) {
            return val + " mm/h";
          },
        },
        yaxis: [
          {
            seriesName: "temp",
            labels: {
              formatter: function (value) {
                return value + "°C";
              },
            },
          },
          {
            opposite: true,
            position: "bottom",
            seriesName: "rain",
            title: {
              text: "rain",
            },
            labels: {
              formatter: function (value) {
                return value + " mm/h";
              },
            },
          },
        ],
        stroke: {
          curve: "smooth",
        },
      },
      chartSeries: [
        {
          name: "temp",
          type: "line",
          data: this.dataHourly.temp,
        },
        {
          name: "rain",
          type: "column",
          data: this.dataHourly.rain,
        },
      ],
    };
  },

  watch: {
    dataHourly(newVal) {
      this.chartOptions.xaxis.categories = newVal.hour;
      this.chartSeries[0].data = newVal.temp;
      this.chartSeries[1].data = newVal.rain;
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 20px;
}
</style>
