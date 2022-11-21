<template>
  <div id="chart">
    <h1 class="heading">Усталость</h1>
    <apexchart type="area" height="290" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "AreaChart",
  data: function () {
    return {
      series: [{
        name: 'Значение',
        data: [45.3, 36.5, 42.6, 38.7, 45.9],
        color: '#ebc20c'
      }],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          height: 350,
          type: 'area',
          colors: ['#ffb100b8']
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          colors: ['#ffb100b8']
        },
        fill: {
          type: 'solid',
            colors: ['#ebc20c'],
        },
        xaxis: {
          colors: ['#fff'],
          type: 'datetime',
          categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z", "2022-10-13T16:00:00.000Z", "2022-10-20T16:00:00.000Z"]
        },
        yaxis: {
          min: 0,
          max: 70
        },
        markers: {
          colors: ['#ebc20c'],
          strokeColors: '#000'
        },
        tooltip: {
          theme: 'dark',
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    }
  }
}


</script>

<style scoped>
#chart {
  border-radius: 15px;
  color: white;
}
.heading {
  font-size: 25px;
  text-align: left;
  padding-left: 20px;
}
</style>