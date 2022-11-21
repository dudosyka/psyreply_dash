<template>
  <div class="container-fluid footer">
    <div class="col-md-auto">
      <h1 class="heading2 animate__animated animate__fadeInUp">{{ group.name }}</h1>
      <div class="row">
        <div class="col-md-auto number__col">
          <div class="tooltip1"><h1 class="heading animate__animated animate__fadeInUp">CSI</h1>
            <span class="tooltiptext1"><b>CSI</b> - удовлетворенность сотрудников работой</span>
          </div>
          <p class="number animate__animated animate__fadeInUp">{{ group.footer.csi }}%</p>
          <p class="numberup animate__animated animate__fadeInUp" :class="(group.footer.delta_csi > 0) ? 'numberup' : 'numberdown'"><i class="fa-solid" :class="(group.footer.delta_csi > 0) ? 'fa-arrow-up' : 'fa-arrow-down'"></i>{{ (group.footer.delta_csi > 0) ? '+' : '' }}{{ group.footer.delta_csi }}%</p>
        </div>
        <div class="col-md-auto number__col">
          <div class="tooltip1"><h1 class="heading animate__animated animate__fadeInUp">Workload</h1>
            <span class="tooltiptext1"><b>Workload</b> - уровень загруженности сотрудника </span>
          </div>
          <p class="number animate__animated animate__fadeInUp">{{ group.footer.workload }}%</p>
          <p class="numberup animate__animated animate__fadeInUp" :class="(group.footer.delta_csi > 0) ? 'numberup' : 'numberdown'"><i class="fa-solid" :class="(group.footer.delta_workload > 0) ? 'fa-arrow-up' : 'fa-arrow-down'"></i>{{ (group.footer.delta_workload > 0) ? '+' : '' }}{{ group.footer.delta_workload }}%</p>
        </div>
        <div class="col-md-auto number__col">
          <div class="tooltip1"><h1 class="heading animate__animated animate__fadeInUp">Tension</h1>
            <span class="tooltiptext1"><b>Tension</b> - напряженность внутри группы</span>
          </div>
          <p class="number animate__animated animate__fadeInUp">{{ group.footer.tension }}%</p>
          <p class="numberup animate__animated animate__fadeInUp" :class="(group.footer.delta_csi > 0) ? 'numberdown' : 'numberup'"><i class="fa-solid" :class="(group.footer.delta_tension > 0) ? 'fa-arrow-up' : 'fa-arrow-down'"></i>{{ (group.footer.delta_tension > 0) ? '+' : '' }}{{ group.footer.delta_tension }}%</p>
        </div>
      </div>
    </div>
    <div class="wealth col-md-auto">
      <h1 class="heading2 animate__animated animate__fadeInUp">Well-being</h1>
      <div class="row">
        <div class=" col-md-auto number__col" style="margin-bottom: 12px;">
          <div class="tooltip1"><h1 class="heading animate__animated animate__fadeInUp">Wealth</h1>
            <span class="tooltiptext1">Поддерживают физическую форму</span>
          </div>
          <p class="number animate__animated animate__fadeInUp">{{ group.footer.wealth }}%</p>
          <p class="numberup animate__animated animate__fadeInUp"><i class="fa-solid"></i>&#12;</p>
          <!--                      <p class="numberup animate__animated animate__fadeInUp"><i class="fa-solid fa-arrow-down"></i>-13%</p>-->
        </div>
        <div class="col-md-auto number__col" style="margin-bottom: 11px;">
          <div class="tooltip1"><h1 class="heading animate__animated animate__fadeInUp">Diet</h1>
            <span class="tooltiptext1">Поддерживают режим питания</span>
          </div>
          <p class="number animate__animated animate__fadeInUp">{{ group.footer.diet }}%</p>
          <p class="numberup animate__animated animate__fadeInUp"><i class="fa-solid"></i>&#12;</p>
          <!--                      <p class="numberup animate__animated animate__fadeInUp"><i class="fa-solid fa-arrow-down"></i>-13%</p>-->
        </div>
        <div class="col-md-auto number__col">
          <div class="tooltip1"><h1 class="heading animate__animated animate__fadeInUp">Sleep</h1>
            <span class="tooltiptext1">Соблюдают режим сна</span>
          </div>
          <p class="number animate__animated animate__fadeInUp">{{ group.footer.sleep }}%</p>
          <p class="numberup animate__animated animate__fadeInUp"><i class="fa-solid"></i>&#12;</p>
          <!--                      <p class="numberup animate__animated animate__fadeInUp"><i class="fa-solid fa-arrow-down"></i>-13%</p>-->
        </div>
        <div class="col-md-auto number__col">
          <div class="tooltip1"><h1 class="heading animate__animated animate__fadeInUp">Impostor</h1>
            <span class="tooltiptext1">Синдром самозванца</span>
          </div>
          <p class="number animate__animated animate__fadeInUp">{{ group.footer.impostor }}%</p>
          <p class="numberup animate__animated animate__fadeInUp"><i class="fa-solid"></i>&#12;</p>
          <!--                      <p class="numberup animate__animated animate__fadeInUp"><i class="fa-solid fa-arrow-down"></i>-13%</p>-->
        </div>
      </div>
    </div>
    <div class="col-md-auto">
      <div class="container">
        <iframe width="250" height="150" :src="video_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterNums",
  props: {
    group: Object,
    video_url: String //https://www.youtube.com/embed/7PGUZAIXqjI
  }
}
</script>

<style scoped>
@media (max-width: 576px) {
  .container-fluid {
    display: none!important;
    overflow-x: hidden!important;
    overflow-y: hidden!important;
    overflow: hidden!important;
  }
}
@media only screen and (max-width: 1070px) {
}
.heading {
  font-size: 20px!important;
  color: white;
  margin-top: 5px;
  font-weight: 700;
  margin-bottom: 0;
}
.container-fluid {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
}
.col__number {
  display: flex;
  flex-direction: row;
}
.heading2 {
  font-weight: 700;
  text-align: left;
  margin: 0;
  color: white;
  margin-top: 30px;
  font-size: 23px!important;
}
.number {
  text-align: left;
  font-weight: 700;
}
.container__numbers {
  position: relative;
}
.number__col {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
}
.graphs {
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.big_graph {
  margin-top: 10px;
  max-height: 500px;
}
.number {
  font-size: 33px;
  color: white;
  text-align: left;
  line-height: 40px;
  margin:0;
}
.numberup {
  font-size: 14px!important;
  color: #7cfc00;
  font-weight: 700;
  line-height: 0px;
}
.numberdown {
  font-size: 25px;
  color: #fc004c;
  font-weight: 700;
  line-height: 16px;
}
.webmobile {
  display: flex;
  flex-direction: row;
  /* margin-top: 40px; */
  justify-content: flex-start;
}
.radial_graphs {
  background: #202020;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding-left: 30px;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 100px #ff810054!important;
  max-width: 400px;
  width: 100%;
  max-height: 502px;
  padding-top: 25px;
}
.psylogo {
  width: 50px;
  margin-top: 110px;
}
.col__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0px;
}

.logo:after {
  position: absolute;
  content: "";
  top: 13vw;
  left: 0;
  right: 0;
  height: 40%;
  width: 20%;
  margin: 0 auto;
  transform: scale(1);
  -webkit-filter: blur(5vw);
  -moz-filter: blur(5vw);
  -ms-filter: blur(5vw);
  filter: blur(5vw);
  background: linear-gradient(270deg, #fa709a, #fee140);
  background-size: 200% 200%;
  overflow: hidden;
  z-index: 1;
  animation: animateGlow 10s ease infinite;
}
@keyframes animateGlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.webcol {
}
.mobilecol {
  padding-right: 100px;
}
.logo {
  top: 100px;
}
.video {
  z-index: 999999;
  padding-bottom: 100px;
}
.chartbgbg {
  background: #202020;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  padding-top: 0px;
  -webkit-backdrop-filter: blur(5px);
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 660px!important;
  box-sizing: content-box;
  width: 70%;
  margin-top: 30px!important;
  margin-bottom: 30px!important;
}
.heading {
  font-size: 20px;
  text-align: left;
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
  margin-right: 10px;
}
.motivation__radial {  margin-left: 15px;
  margin-bottom: 10px;
  font-size: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  min-height: 100%!important;
}
.lorem {
  font-size: 13px;
  color: white;
  max-width: 500px;
}
.nav-pills {
  margin: 0;
  font-size: 16px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.nav.right {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
}
.numbers {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  margin-right: 35px;
}
.percent__counter {
  color: white;
  margin-bottom: 0;
  background-color: transparent;
  padding: 5px;
  font-size: 10px;
  border-radius: 10px;
  margin-right: 5px;
  border: 2px solid rgba(136, 255, 0, 0.72);
  box-shadow: 0 2px 10px rgba(162, 255, 0, 0.33) !important;
}
.date__counter {
  color: white;
  margin-bottom: 0;
  background-color: transparent;
  padding: 5px;
  font-size: 10px;
  border-radius: 10px;
  margin-right: 5px;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 10px #ff810054;
}
.date__number {
  font-weight: 700;
}
.percent {
  font-weight: 700;
}
.numberup {
  font-size: 12px;
  color: #7cfc00;
  font-weight: 700;
}
.date__number {
  font-weight: 700;
}

.col.numbers {
  padding-left: 300px;
}
.row.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.numberup1 {
  font-size: 12px;
  color: #ff2436;
  font-weight: 700;
}
.nav-pills .nav-link {
  padding: 5px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 10px;
}
.container-fluid.footer {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: auto;
  margin-top: 0px;
  margin-right: 35px;
}
.logopsy {
  width: 40px;
}
.container {
  width: 250px;
  display: flex;
  padding: 0;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-left: 32px;
  margin-top: 10px;
}
a {
  color: white;
  font-weight: 500;
  text-decoration: none;
  margin-top: 5px;
}
a:hover {
  color: white;
  font-weight: 500;
  text-decoration: none;
  margin-top: 5px;
}
.tooltip1 {
  position: relative;
  display: inline-block;
}

.tooltip1 .tooltiptext1 {
  visibility: hidden;
  width: 400px;
  font-size: 15px;
  font-weight: 500;
  background: #336;
  backdrop-filter: blur(10  px);
  box-shadow: 0px 1.1966px 29.915px rgb(69 42 124 / 10%);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 1s;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.tooltip1:hover .tooltiptext1 {
  visibility: visible;
  opacity: 1;
}
b {
  font-weight: 700;
}
.btn {
  color: #ffb100b8;
  border-radius: 10px;
}
.btn:hover {
  color: white!important;
}
i {
}
.wealth {
  margin-left: 50px;
}

/*.main-bar {
  border-radius: 15px;
  color: white;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 100px #ff810054!important;
}*/
.heading {
  font-size: 25px;
  text-align: left;
  padding-left: 0;
}

.chartbg {
  background: #202020;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  padding-top: 30px;
  -webkit-backdrop-filter: blur(5px);
  border: 2px solid #ffb100b8;
  padding-bottom: 30px;
  box-shadow: 0 2px 100px #ff810054!important;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 600px;
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
