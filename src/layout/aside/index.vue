<template>
  <div class="wrapper">
    <div class="avatars">
      <el-avatar shape="square" :size="60" fit="cover" src="url" />
      <h2>嗨购后台管理系统</h2>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active="route.path"
      text-color="#fff"
      router
    >
      <el-sub-menu :index="item.path" v-for="item in side">
        <template #title>
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          :index="getFullpath(item.path, ite.path)"
          v-for="ite in item.children"
          ><el-icon><component :is="ite.meta.icon"></component></el-icon
          >{{ ite.meta.title }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { routes } from "../../router";
import { useRoute } from "vue-router";

const route = useRoute();
const side = ref([]);

side.value = routes.filter((item) => !item.meta.hidden);

const getFullpath = (path1, path2) =>
  path1 === "/" ? path1 + path2 : path1 + "/" + path2;
</script>

<style scoped>
.avatars {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #545c64;
}
.avatars h2 {
  color: #fff;
}
.wrapper {
  min-height: 100vh;

  background-color: #545c64;
}
/* .el-menu-vertical-demo {
  min-height: 100vh;
} */
</style>
