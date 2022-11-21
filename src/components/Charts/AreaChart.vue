<template>
  <div class="chartbg animate__animated animate__fadeInUp" id="chart">
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item animate__animated animate__fadeInUp" role="presentation">
        <button class="nav-link active happy" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Happy Index</button>
      </li>
      <li class="nav-item animate__animated animate__fadeInUp" role="presentation">
        <button class="nav-link trevoga" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Тревога</button>
      </li>
      <li class="nav-item animate__animated animate__fadeInUp" role="presentation">
        <button class="nav-link ustalost" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Усталость</button>
      </li>
      <li class="nav-item animate__animated animate__fadeInUp" role="presentation">
        <button class="nav-link ustalost" id="pills-stress-tab" data-bs-toggle="pill" data-bs-target="#pills-stress" type="button" role="tab" aria-controls="pills-stress" aria-selected="false">Устойчивость к стрессу</button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active animate__animated animate__fadeInUp" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <p class="lorem"></p>
        <HappyIndex />
      </div>
      <div class="tab-pane fade animate__animated animate__fadeInUp" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><TrevogaArea /></div>
      <div class="tab-pane fade animate__animated animate__fadeInUp" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"><UstalostArea /></div>
      <div class="tab-pane fade animate__animated animate__fadeInUp" id="pills-stress" role="tabpanel" aria-labelledby="pills-stress-tab"><StressRadial class="stress__radial" /></div>
    </div>
  </div>
</template>

<script>
import TrevogaArea from "@/components/Charts/TrevogaArea";
import UstalostArea from "@/components/Charts/UstalostArea";
import HappyIndex from "@/components/Charts/HappyIndex";
import StressRadial from "@/components/Charts/StressRadial";

export default {
  name: "AreaChart",
  components: {
    TrevogaArea,
    HappyIndex,
    UstalostArea,
    StressRadial
  },
  data: function () {
    return {
      series: [{
        name: 'series1',
        data: [43.7, 43.9, 36.4]
      }],
      chartOptions: {
        chart: {
          height: 250,
          type: 'area',
          colors: ['#ffb100b8']
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#fff'],
          },
        },
        stroke: {
          curve: 'smooth',
          colors: ['#ffb100b8']
        },
        fill: {
          type: 'solid',
            colors: ['#eb0c0c'],
        },
        xaxis: {
          colors: ['#fff'],
          type: 'datetime',
          categories: ["2022-09-23T16:00:00.000Z", "2022-09-29T16:00:00.000Z", "2022-10-06T16:00:00.000Z"]
        },
        tooltip: {
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
.chartbg {
  background: #202020;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  padding-top: 30px;
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid #ffb100b8;
  padding-bottom: 30px;
  box-shadow: 0 2px 100px #ff810054!important;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 50px;
}
.heading {
  font-size: 25px;
  text-align: left;
  padding-left: 20px;
}
.happy.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.happy {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.happy:hover {
  color: #fff;
}
happy.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.trevoga.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.trevoga {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.trevoga:hover {
  color: #fff;
}
.ustalost.active {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  box-shadow: 0 2px 15px #ff810054!important;
  font-weight: 700;
}
.ustalost {
  background-color: transparent!important;
  border: 2px solid #ffb100b8!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.ustalost:hover {
  color: #fff;
}
button {
  margin-left: 15px;
  margin-bottom: 10px;
  font-size: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.motivation__radial {
  min-height: 100%!important;
}
.lorem {
  font-size: 13px;
  color: white;
  max-width: 500px;
}
</style>