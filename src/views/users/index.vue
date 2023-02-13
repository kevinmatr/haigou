<template>
  <div>users</div>
</template>

<script setup>
const routes = [
  {
    path: "/user",
    meta: {
      title: "用户管理",
    },
    children: [
      {
        path: "user",
        meta: {
          title: "用户列表",
        },
      },
      {
        path: "add",
        meta: {
          title: "添加用户",
        },
      },
    ],
  },
];
</script>

<style lang="scss" scoped></style>
