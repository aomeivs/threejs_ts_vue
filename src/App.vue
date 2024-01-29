<script setup lang="ts">
import { onMounted } from 'vue'

import { App } from './App'
const main = () => {
  const container = document.getElementById('scene-container')
  const app = new App(container!)
  app.start()
}
onMounted(() => {
  main()
})
</script>

<template>
  <div class="wrapper" id="scene-container"></div>
</template>

<style scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
}
</style>
