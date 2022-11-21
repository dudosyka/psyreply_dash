<template>
<!--  <div class="container-fluid">-->
<!--    <div class="container">-->
<!--      <i class="fa-solid fa-desktop"></i>-->
<!--      <p class="text1"><b>Reply Stats</b> создан для больших экранов. <br>Пожалуйста, воспользуйтесь ноутбуком или ПК.</p>-->
<!--    </div>-->
<!--  </div>-->
  <div v-if="loaded" class="container-fluid">
    <BlockHeader />
    <div class="col-md-auto numbers">
      <p class="date__counter">Неделя <span class="date__number">{{ groups.general.week }}</span></p>
      <p class="percent__counter">Опрос прошли <span class="percent">{{ groups.general.percent }}%</span></p>
    </div>
    <div>
      <nav class="navbar fixed-bottom navbar-light bg-light">
        <div v-if="changeGroupPopup" class="changeGroupPopup">
          <template v-for="(group, key) in groups" v-bind:key="key">
            <div class="changeGroupItem" :class="key == curGroup ? 'changeGroupItemActive' : ''" @click="curGroup=key">{{ key }}</div>
          </template>
        </div>
        <a class="navbar-brand inactive" href="#" @click="showPopup"><i class="fa-solid fa-bars inactive"></i> Группы</a>
        <a class="navbar-brand inactive" href="#" @click="move(1)"><i class="fa-solid fa-chart-line" :class="(state != 1) ? 'inactive' : ''"></i>Общее</a>
        <a class="navbar-brand inactive" href="#" @click="move(2)"><i class="fa-solid fa-chart-pie" :class="(state != 2) ? 'inactive' : ''"></i>Доп</a>
        <a class="navbar-brand inactive" href="#" @click="move(3)"><i class="fa-solid fa-plus" :class="(state != 3) ? 'inactive' : ''"></i>Цифры</a>
      </nav>
    </div>
    <template v-if="state==1">
      <MainBlock :group="groups[curGroup]"></MainBlock>
    </template>
    <template v-if="state==2">
      <SideBlock :group="groups[curGroup]"></SideBlock>
    </template>
    <template v-if="state==3">
      <FooterNums :group="groups[curGroup]" :video_url="groups.general.video_url"></FooterNums>
    </template>
  </div>
</template>

<script>
import BlockHeader from "@/components/Blocks/BlockHeader";
import MainBlock from "@/components/Blocks/MainBlock";
import SideBlock from "@/components/Blocks/SideBlock";
import FooterNums from "@/components/Blocks/FooterNums";
import axios from "axios";
import conf from "@/conf";

export default {
  name: "MobilePlaceholder",
  components: {FooterNums, SideBlock, MainBlock, BlockHeader},
  data() {
    return {
      state: 1,
      popup: false,
      curGroup: "general",
      changeGroupPopup: false,
      loaded: false,
      groups: {}
    }
  },
  created() {
    axios.post('https://mailer.psyreply.com/admin/dash', { table: conf.table }).then(res => {
      this.loaded = true;
      this.groups = JSON.stringify(res.data);
      this.groups = JSON.parse(this.groups);
    });
    console.log()
  },
  methods: {
    showPopup() {
      this.changeGroupPopup = !this.changeGroupPopup;
    },
    move(state) {
      this.state = state;
      this.changeGroupPopup = false;
    }
  }
}
</script>

<style scoped>

@media only screen and (max-width: 576px) {
  @import url('https://fonts.googleapis.com/css2?family=Kolker+Brush&display=swap');

  .changeGroupPopup {
    position: absolute;
    bottom: 50px;
    left: 10px;
    background: linear-gradient(86.16deg, rgba(255, 255, 255, 0.144) 11.14%, rgba(255, 255, 255, 0.0252) 113.29%);
    box-shadow: 0px 1.1966px 29.915px rgb(69 42 124 / 10%);
    -webkit-backdrop-filter: blur(35px);
    backdrop-filter: blur(35px);
    border-radius: 16px;
    color: white;
    padding: 20px;
    z-index: 99999;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  .changeGroupItem {
    color: white;
    text-decoration: underline;
    margin-bottom: 5px;
    font-family: 'Rubik', SansSerif;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
  }

  .changeGroupItemActive {
    color: #B275FF;
  }
  .footer {
    z-index: 1!important;
  }
  .numbers {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    margin-right: 35px;
    min-width: 440px;
    margin-left: 10px;
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

  .navbar {
    background-color: transparent !important;
    margin-left: 30px;
    margin-right: 30px;
  }

  .navbar-brand {
    margin: 0;
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 13px;
    font-weight: 500;
  }

  .navbar-brand.inactive {
    color: rgba(255, 255, 255, 0.5);
  }


  i.inactive {
    color: rgba(255, 255, 255, 0.5);
  }

  .text1 {
    font-size: 15px;
    margin-top: 30px;
    line-height: 15px;
  }

  .text2 {
    font-size: 15px;
  }

  .container-fluid {
    display: flex !important;
    z-index: 99999;
    top: 0;
    bottom: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
    max-height: 100vh;
    max-width: 100%;
    left: 0;
    right: 0;
    overflow-y: hidden;
    overflow-x: hidden;
    overflow: hidden;
    background-image: url("@/assets/bg.png");
    flex-direction: column;
    //justify-content: center;
    align-items: flex-start;
  }

  .container {
    background: #202020;
    border-radius: 16px;
    padding: 30px;
    border: 2px solid #ffb100b8;
    box-shadow: 0 2px 100px #ff810054 !important;
  }

  h1 {
    color: white;
    font-size: 50px;
    font-weight: 700;
  }

  p {
    color: white;
    font-size: 30px;
  }

  i {
    font-size: 36px;
    color: white;
  }
}
@media only screen and (min-width: 577px) {
  .container-fluid {
    display: none!important;
  }
}
</style>
