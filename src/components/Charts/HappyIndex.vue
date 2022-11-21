<template>
  <div id="chart">
    <h1 class="heading">Happy Index</h1>
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
        data: [43.7, 43.9, 36.4, 46.6, 47.7],
        colors: '#fff'
      }],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          height: 250,
          type: 'area',
          colors: ['rgba(68,255,0,0.72)']
        },
        dataLabels: {
          enabled: false,
          style: {
            color: '#fff',
          },
        },
        stroke: {
          curve: 'smooth',
          colors: ['rgba(38,255,0,0.72)']
        },
        fill: {
          type: 'solid',
            colors: ['#99ff6a'],
        },
        markers: {
          colors: ['#ebc20c'],
          strokeColors: '#000'
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
        tooltip: {
          theme: 'dark',
          color: '#fff',
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