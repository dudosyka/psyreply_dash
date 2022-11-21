<template>
  <div class="container-fluid headingmain">
    <div class="container-fluidlogopsymain">
      <a class="psylogotype" href="https://b2b.psyreply.com" target="_blank">
        <img href="https://b2b.psyreply.com" target="_blank" class="logopsy" src="../../../src/assets/psylogo.png">
        <p class="reply">Reply</p>
      </a>
    </div>
    <div class="col-md-auto logotype">
      <span class="hr animate__animated animate__fadeInUp">|</span>
      <img class="logo animate__animated animate__fadeInUp" src="../../../src/assets/agava.svg" />
      <span class="hr animate__animated animate__fadeInUp">|</span>
      <h1 class="heading animate__animated animate__fadeInUp">Monitoring</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: "BlockHeader"
}
</script>
<style scoped>
@media only screen and (max-width: 576px) {
  .container-fluid.headingmain {
    max-height: 70px!important;
    margin: 0;
  }
.container-fluid {
  padding-left: 0!important;
}
  .logo {
    width: 60px!important;
  }
  .heading {
    font-size: 13px!important;
  }
  .numbers {
    margin-right: 0!important;
  }
}
.logo {
  width: 60px
}
.container-fluid.headingmain {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10px;
  margin-bottom: 5px;
  align-items: center;
  background: transparent;
}
.heading {
  font-size: 17px;
  margin-bottom: 0;
  color: white;
  display: flex;
  align-items: center;
}
.hr {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.69);
  margin-left: 10px;
  margin-right: 10px;
}
.date {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.date__heading {
  font-size: 25px;
}
.test__heading {
  font-size: 25px;
}
.logotype {
  display: flex;
  flex-direction: row;
  justify-content: center;

}
.numbers {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  margin-right: 75px;
}
.date__counter {
 color: white;
  margin-bottom: 0;
  background-color: transparent;
  padding: 5px;
  border-radius: 10px;
  margin-right: 5px;
  border: 2px solid #ffb100b8;
  box-shadow: 0 2px 10px #ff810054;
}
.percent__counter {
  color: white;
  margin-bottom: 0;
  background-color: transparent;
  padding: 5px;
  border-radius: 10px;
  border: 2px solid rgba(136, 255, 0, 0.72);
  box-shadow: 0 2px 10px rgba(162, 255, 0, 0.33) !important;
}
.date__number {
  font-weight: 700;
}
.percent {
  font-weight: 700;
}
.numberup1 {
  font-size: 12px;
  color: #7cfc00;
  font-weight: 700;
}
.logopsy {
  width: 30px;
}
.logopsymain {

}
.psylogotype {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  color: white;
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
}
.reply {
  margin: 0;
  padding-left: 10px;
}
</style>