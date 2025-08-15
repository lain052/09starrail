<!-- src/App.vue -->
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: #0a0a1a;
  color: #ffffff;
}

#app {
  min-height: 100vh;
}
</style>