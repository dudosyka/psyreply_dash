<template>
  <PopUpText :active="popup" v-on:close-event="popup = false" />
  <div v-if="loaded" class="container-fluid">
    <div class="chartbgbg" id="chart">
      <BlockHeader />
      <div class="row header">
        <div class="col-md-auto">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li v-for="(group, key) of groups" :key="key" class="nav-item" role="presentation">
              <button
                class="nav-link active happy"
                type="button"
                role="tab"
                @click="toggleTabs(key, groups)"
              >{{ group.name }}</button>
            </li>
            <button class="btn" @click="popup = true"><i class="fa-solid fa-circle-question"></i></button>
          </ul>
        </div>
            <div class="col-md-auto numbers">
              <p class="date__counter">Неделя <span class="date__number">{{ groups.general.week }}</span></p>
              <p class="percent__counter">Опрос прошли <span class="percent">{{ groups.general.percent }}%</span></p>
              <router-link to="/qwerty123"><i class="fa-solid fa-user login"></i></router-link>
            </div>
      </div>

      <div class="tab-content">
        <template v-for="(group, key) of groups">
          <div v-if="group.show"
               class="tab-pane fade show active animate__animated animate__fadeInUp"
               role="tabpanel"
               aria-labelledby="pills-home-tab1"
               :key="key"
          >

            <BigGraph :group="group"></BigGraph>
            <FooterNums :group="group" :video_url="groups.general.video_url"></FooterNums>
          </div>
        </template>
      </div>
    </div>
  </div>
<!--  <div class="col col__logo">-->
<!--  <div class="logo">-->
<!--    <img class="psylogo" src="../../../src/assets/psylogo.png">-->
<!--  </div>-->
<!--</div>-->
<!--  <BlockFooter class="video" />-->
</template>

<script>

import BlockHeader from "@/components/Blocks/BlockHeader";
import PopUpText from "@/components/PopUpText";
import BigGraph from "@/components/Blocks/BigGraph";
import FooterNums from "@/components/Blocks/FooterNums";
import axios from "axios";
import {default as conf} from '../../conf'

export default {

  name: "BlockBody",
  components: {
    FooterNums,
    BigGraph,
    BlockHeader,

    PopUpText
  },
  data(){
    return {
      popup: false,
      loaded: false,
      groups: {
      }
    }
  },
  created() {
    axios.post('https://mailer.psyreply.com/admin/dash', { table: conf.table }).then(res => {
      this.loaded = true;
      this.groups = JSON.stringify(res.data);
      this.groups = JSON.parse(this.groups);
    });
  },
  methods: {
    closePopup() {
      this.popup = false
    },
    toggleTabs(key, tabs) {
      console.log(key, tabs)
      for (let tab in tabs) tabs[tab].show = false
      tabs[key].show = true
    }
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
    background-image: url("@/assets/bg.png");

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
  //width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url("@/assets/bg.png");
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
  background: transparent;
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
  border: 2px solid rgba(210, 91, 91, 0.2) !important;
  font-weight: 700;
}
.happy:active {
  background-color: transparent!important;
  border: 2px solid rgba(210, 91, 91, 0.2) !important;
  font-weight: 700;
}
.happy:hover {
  background-color: transparent!important;
  border: 2px solid rgba(210, 91, 91, 0.2) !important;
  font-weight: 700;
}
.happy {
  background-color: transparent!important;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.happy:hover {
  color: #fff;
}
happy.active {
  background-color: transparent!important;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
  font-weight: 700;
}
.trevoga.active {
  background-color: transparent!important;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
  font-weight: 700;
}
.trevoga {
  background-color: transparent!important;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.47);
}
.trevoga:hover {
  color: #fff;
}
.ustalost.active {
  background-color: transparent!important;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
  font-weight: 700;
}
.ustalost {
  background-color: transparent!important;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
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
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  padding: 5px;
  font-size: 10px;
  border-radius: 10px;
  margin-right: 5px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 10px rgba(153, 0, 255, 0.33) !important;
}
.date__counter {
   color: white;
   margin-bottom: 0;
   background-color: transparent;
   padding: 5px;
   font-size: 10px;
   border-radius: 10px;
   margin-right: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
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
  background: transparent;
  width: auto;
  margin-top: 0px;
  margin-right: 35px;
}
.logopsy {
  width: 40px;
}
.container {
  width: 360px;
  display: flex;
  padding: 0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 17px 40px #ff810054;
  border: 2px solid #ffb100b8;
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
  background: linear-gradient(86.16deg, rgba(255, 255, 255, 0.144) 11.14%, rgba(255, 255, 255, 0.0252) 113.29%);
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
  color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}
.btn:hover {
  color: #DD7EFF!important;
}
.btn:focus {
  border: 0px solid white;
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
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 600px;
}
.happy.active {
  background-color: transparent!important;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
  font-weight: 700;
}
.happy:hover {
  background-color: transparent!important;
  border: 2px solid rgba(184, 91, 210, 0.2) !important;
  font-weight: 700;
}
.happy:focus {
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 10px rgba(153, 0, 255, 0.33) !important;
  font-weight: 700;
}
.happy.active:focus {
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 10px rgba(153, 0, 255, 0.33) !important;
  font-weight: 700;
}
.happy {
  background-color: transparent!important;
  border: 2px solid rgba(255, 255, 255, 0.2)!important;
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
.login {
  padding-left: 5px;
  padding-right: 5px;
  opacity: 0.3;
}
</style>
