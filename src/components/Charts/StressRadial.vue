<template>
  <div id="chart">
    <apexchart type="radialBar" height="390" :options="chartOptions" :series="series"></apexchart>
  </div>
  <div class="dynamics animate__animated animate__fadeIn">
    <p class="number" ><i class="fa-solid fa-arrow-down"></i>-1%</p>
  </div>
</template>

<script>
export default {
  name: "StressRadial",
  created() {
    console.log('ebanina')
  },
  data: function () {
    return{
      series: [20],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            track: {
              background: '#212121',
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.25
              }
            },
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              show: true,
              name: {
                offsetY: 120,
                show: true,
                color: '#fff',
                fontSize: '17px',
                fontWeight: 700
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: '#fff',
                fontWeight: 700,
                offsetY: -10,
                fontSize: '60px',
                show: true,
              }
            }
          }
        },
        stroke: {
          dashArray: 3
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
                color: "#ffd500",
                opacity: 1
              },
              {
                offset: 20,
                color: "#ffe374",
                opacity: 1
              },
              {
                offset: 60,
                color: "#fff045",
                opacity: 1
              },
              {
                offset: 100,
                color: "#ffda76",
                opacity: 1
              }
            ]
          }
        },
        labels: ['Устойчивость к стрессу'],
      },
    }
  },
}


</script>

<style scoped>
#chart {
  border-radius: 15px;
  color: white;
}
.number {
  color: greenyellow;
  font-size: 20px;
  font-weight: 500;
  margin-top: 25px;
}
.dynamics {
  position: absolute;
  top: 160px;
  left: 240px;
}
i {
  font-size: 14px;
  margin-right: 5px
}
.numberdown {
  color: #ff2f2f;
  font-size: 20px;
  font-weight: 500;
  margin-top: 25px;
}
</style>