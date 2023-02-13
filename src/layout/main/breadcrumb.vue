<template>
  <div class="wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in routers"
        :key="item.path"
        :to="{ path: item.path }"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { routes } from "../../router";
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
// console.log(router.currentRoute.value.matched);
const routers = computed(() => {
  // 过滤掉没有meta的
  return router.currentRoute.value.matched.filter((item) => item.meta.title);
});
</script>

<style scoped>
.wrapper {
  margin-left: 24px;
  background-color: #dde4e8;
  display: flex;
  align-items: center;
  height: 60px;
}
</style>
