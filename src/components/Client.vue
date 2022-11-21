<template>
  <BlockBody />
  <MobilePlaceholder />
</template>

<script>
import BlockBody from "@/components/Blocks/BlockBody";
import MobilePlaceholder from "@/components/Blocks/MobilePlaceholder";

export default {
  name: "ClientComp",
  components: {
    MobilePlaceholder,
    BlockBody
  },
}
</script>

<style scoped>

</style>
