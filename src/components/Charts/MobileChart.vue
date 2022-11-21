<template>
  <div id="card">
    <div id="chart">
      <apexchart type="radialBar" height="250" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadialChart",
  data: function () {
    return{
      series: [75],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 23,
            hollow: {
              margin: 0,
              size: '70%',
              background: '#1e1e1e',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              startAngle: -135,
              endAngle: 23,
              background: '#212121',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: '#fff',
                fontSize: '16px'
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: '#fff',
                fontSize: '50px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 70],
            colorStops: [
              {
                offset: 0,
                color: "#51ff00",
                opacity: 1
              },
              {
                offset: 20,
                color: "#a0ff74",
                opacity: 1
              },
              {
                offset: 60,
                color: "#81ff45",
                opacity: 1
              },
              {
                offset: 100,
                color: "#51ff00",
                opacity: 1
              }
            ]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Mobile'],
      },
    }
  }
}


</script>

<style scoped>
#chart {
  background-color: transparent;
}
</style>