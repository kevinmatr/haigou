<template>
  <div class="box">
    <Aside class="aside"></Aside>
    <Main class="main"></Main>
  </div>
</template>

<script setup>
import Aside from "./aside/index.vue";
import Main from "./main/index.vue";
</script>

<style scoped>
.box {
  display: flex;
  background-color: #dde4e8;
}
.aside {
  width: 20%;
}
.main {
  width: 80%;
}
</style>
