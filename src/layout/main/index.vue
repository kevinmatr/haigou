<template>
  <div>
    <top></top>
    <breadcrumb></breadcrumb>
    <section class="pages" v-loading="loading">
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup>
import top from "./top.vue";
import breadcrumb from "./breadcrumb.vue";
import { ref, onMounted } from "vue";

const loading = ref(true);

onMounted(() => {
  loading.value = false;
});
</script>

<style scoped>
.pages {
  width: 96%;
  /* padding: 10px; */
  background-color: #fff;
  margin: 0 auto;
  min-height: 100vh;
}
</style>
