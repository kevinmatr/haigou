<template>
  <div class="wrapper">
    <el-icon :size="25" @click="store.dispatch('user/ulogout')"
      ><fold
    /></el-icon>
    <el-avatar shape="square" :size="40" fit="cover" src="url" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<style scoped>
.wrapper {
  padding: 0 30px;
  height: 60px;
  background-color: #c7e1fe;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
