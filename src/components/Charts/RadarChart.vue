<template>
  <div id="chart">
    <apexchart type="radar " height="350" width="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: "RadarChart",
  data: function () {
    return {
      toolbar: { show:false },
      series: [{
        name: 'Значение',
        data: [83, 66, 82],
        colors: ['#fff'],
        toolbar: {
          show: false,
        },
      }],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          height: 350,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        stroke: {
          width: 2,
          colors: ['#42ff43'],
        },
        toolbar: {
          show: false,
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'horizontal',
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 70],
            colorStops: [
              {
                offset: 0,
                color: "rgba(81,255,0,0.8)",
                opacity: 1
              },
              {
                offset: 20,
                color: "rgba(160,255,116,0.8)",
                opacity: 1
              },
              {
                offset: 60,
                color: "rgba(129,255,69,0.8)",
                opacity: 1
              },
              {
                offset: 100,
                color: "rgba(81,255,0,0.8)",
                opacity: 1
              }
            ]
          }
        },
        markers: {
          size: 4
        },
        xaxis: {
          categories: ['Вовлеченность', 'Активность', 'Мотивация']
        },
        yaxis: {
          colors: ['#fff']
        }
      },
    }
  },
}
</script>

<style scoped>
#chart {
  background-color: #1e1e1e;
  margin-right: 10px;
  border-radius: 15px;
  padding: 20px;
  min-width: 250px;
  color: white;
  box-shadow: 0 17px 40px #ff810054;
  border: 2px solid #ffb100b8;
}
</style>