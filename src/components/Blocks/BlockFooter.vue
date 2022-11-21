<template>
  <h1 class="heading">
    Комментарий от PsyReply
  </h1>
<div class="container-fluid">
  <div class="container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/7PGUZAIXqjI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>
</template>

<script>
export default {
  name: "BlockFooter"
}
</script>

<style scoped>
.container-fluid {
  background-color: #212121;
}
.container {
  width: 560px;
  display: flex;
  margin-bottom: 100px;
  padding: 0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 17px 40px #ff810054;
  border: 2px solid #ffb100b8;
}
.heading {
  z-index: 99999;
  position: relative;
  color: white;
  font-size: 37px;
  font-weight: 700;
  margin-top: 60px;
}
</style>