<template>
  <div id="chart">
    <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
  </div>
  <div class="dynamics animate__animated animate__fadeIn">
    <p class="number" ><i class="fa-solid" :class="(delta > 0) ? 'fa-arrow-up' : 'fa-arrow-down'"></i>{{ delta > 0 ? "+" : "" }}{{ delta }}%</p>
  </div>
</template>

<script>
export default {
  name: "VovlChart",
  props: {
    value: Number,
    delta: Number
  },
  data: function () {
    return{
      series: [84],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          height: 250,
          type: 'radialBar',
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            track: {
              startAngle: -135,
              endAngle: 135,
              background: 'rgba(255,255,255,0.18)',
              borderRadius: '16px',
              dropShadow: {
                enabled: false,
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
                offsetY: 50,
                show: true,
                color: '#fff',
                fontSize: '10px',
                fontWeight: 500
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: '#fff',
                fontWeight: 700,
                offsetY: -10,
                fontSize: '30px',
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
                color: "#80ff00",
                opacity: 1
              },
              {
                offset: 20,
                color: "#b3ff74",
                opacity: 1
              },
              {
                offset: 60,
                color: "#92ff45",
                opacity: 1
              },
              {
                offset: 100,
                color: "#3cff00",
                opacity: 1
              }
            ]
          }
        },
        labels: ['Вовлеченность'],
      },
    }
  },
  created() {
    console.log(this.value)
    this.series = [this.value]
  }
}


</script>

<style scoped>
@media (max-width: 576px) {
  .dynamics {
    left: 123px!important;
  }
}
#chart {
  color: white;
}
.number {
  color: greenyellow;
  font-size: 15px;
  font-weight: 500;
  margin-top: 25px;
}
.dynamics {
  position: absolute;
  top: 60px;
  left: 170px;
}
i {
  font-size: 14px;
  margin-right: 5px
}
.numberdown {
  color: #ff2f2f;
  font-size: 15px;
  font-weight: 500;
  margin-top: 25px;
}
</style>
