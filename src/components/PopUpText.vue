<template>
  <div class="container-fluid animate__animated animate__fadeIn" :class="{'container--active':active}" @click="$emit('close-event')">
    <div class="modalka animate__animated animate__fadeInUp" @click="(e) => { e.stopPropagation() }">
      <h1 class="h1">Добро пожаловать в систему мониторинга PsyReply!</h1>
      <p class="description">
        Перед вами дашборд, состоящий из основных показателей состояния сотрудников, разделенных на группы для повышения эффективности системы.<br><br>
        Обращайте внимание, не только на значение и динамику, но и в какой зоне находится каждый из показателей: если в зеленой - все окей, если в желтой - пора корректировать, если в красной - то, коррекция это уже необходимость.
      </p>

        <h1 class="h1"> Подробнее о каждом из показателей:</h1>

        <h2 class="h2">"Happy Index"</h2>
      <p>"Индекс Счастья" - наш любимый показатель и чем он выше - тем дальше сотрудники от депрессии.</p>
      <h2 class="h2">Тревога</h2>
      <p class="description">Данный график показывает, как изменяется уровень тревоги у группы от недели к неделе.</p>
      <h2 class="h2">Усталость</h2>
      <p class="description">Показатель физической и психологической усталости. Если усталость растет, пора учить группу правильно восстанавливать силы без ущерба для себя и Компании.</p>
      <h2 class="h2">Устойчивость к стрессу</h2>
      <p class="description">Показатель накопленного стресса. Редко у кого в наше непростое время он в зеленой зоне, но стремиться к этому можно и нужно.</p>
      <h2 class="h2">Выгорание</h2>
      <p class="description">Чем его уровень выше, тем дальше сотрудники от того, чтобы получать удовольствие от работы. Они перестают видеть в ней смысл для себя, своих усилий для коллег, руководства и конечных пользователей.</p>
      <h2 class="h2">Активность</h2>
      <p class="description">Вернее ее снижение. Чем выше число внутри радиального бара, тем дольше сотрудники выполняют свой привычный объем работы. Например, вместо 1 рабочего часа, задача занимает у них 3.</p>
      <h2 class="h2">Мотивация</h2>
      <p class="description">Вернее ее снижение, отражает заинтересованность сотрудников в какой-либо деятельности. Например, встать с кровати утром или приступить к работе и чем показатель выше, тем дольше и неохотнее это происходит.</p>
      <h2 class="h2">CSI</h2>
      <p>Уровень удовлетворенности работой и лояльности группы сотрудников.</p>
      <h2 class="h2">Workload</h2>
      <p>Высказывание  сотрудников о том сколько времени и сил занимает у них работа</p>
      <h2 class="h2">Tension</h2>
      <p>Уровень напряженности в группе между коллегами</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ['active']
}
</script>

<style scoped>
@media only screen and (max-width: 414px) {
  .description {
    font-size: 15px;
  }
  .modalka {
    max-height: 600px;
    overflow: scroll;
    overflow-x: hidden!important;
  }
}
div.container-fluid {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999999999;
  backdrop-filter: blur(10px);
  display: none;
  animation-duration: 0.3s;
}
div.container--active {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.modalka {
  background: #1e1e1e;
  color: white;
  padding: 30px;
  border-radius: 16px;
  animation-duration: 0.8s;
  max-width: 900px;
  max-height: 600px;
  overflow: scroll;
  overflow-x: hidden!important;
  text-align: left;
}
.btn {
  text-transform: none;
  border-radius: 27px;
  background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
  backgroun-color: #f09819;
  color: white;
  font-size: 18px;
  box-shadow: 0px 3px 13px #FF8000FF;
  font-weight: 600;
  font-family: 'Rubik', sans-serif;
  margin-left: 10px;
  border: 2px solid #cce5ff;
}
.btn:hover {
  border-color: #FF8000FF!important;
  background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)!important;
}
.heading {
  font-size: 30px;
  font-weight: 700;
}
.handshake {
  font-size: 50px;
  color: white;
  padding-bottom: 10px;
}
.description {
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 20px;

}
.col {
  display: flex;
  flex-direction: column;

}
.h1 {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 20px;
}
.h2 {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 0px;
}
::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #1e1e1e;
}

::-webkit-scrollbar
{
  width: 12px;
  background-color: #1e1e1e;
}

::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}
</style>
