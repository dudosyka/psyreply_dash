<template>
  <div class="row big_graph">
    <MainBlock :group="group"></MainBlock>
    <SideBlock :group="group"></SideBlock>
  </div>
</template>

<script>

import SideBlock from "@/components/Blocks/SideBlock";
import MainBlock from "@/components/Blocks/MainBlock";
export default {
  name: "BigGraph",
  components: {MainBlock, SideBlock},
  props: {
    group: Object
  }
}
</script>
