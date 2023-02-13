<template>
  <div>
    <el-button type="primary" style="margin: 16px" @click="drawer = true">
      添加管理员
    </el-button>
    <el-table :data="userlist" border style="width: 100%" class="tb">
      <el-table-column align="center" label="序号" width="180">
        <template #default="scoped">
          <span>{{ scoped.$index }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号">
        <template #default="scoped">
          <span>{{ scoped.row.adminname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限">
        <template #default="scoped">
          <span>{{ roles[scoped.row.role] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scoped">
          <el-button size="small" type="warning" icon="Edit"></el-button>
          <el-button
            size="small"
            type="danger"
            @click="del(scoped.row.adminid)"
            icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer v-model="drawer" title="添加管理员" :with-header="false">
      <el-row>
        <el-input
          type="text"
          v-model="admin.adminname"
          placeholder="请输入用户名"
        />
      </el-row>
      <el-row>
        <el-input
          type="text"
          v-model="admin.password"
          placeholder="请输入密码"
        />
      </el-row>
      <el-row>
        <el-select placeholder="请选择角色" v-model="admin.role">
          <el-option value="1" label="超级管理员"></el-option>
          <el-option value="2" label="管理员"></el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-tree
          ref="tree"
          :data="routes"
          show-checkbox
          node-key="id"
          :props="{ label: 'til' }"
        ></el-tree>
      </el-row>
      <el-row>
        <el-button @click="submitadd">添加用户</el-button>
      </el-row>
    </el-drawer>
  </div>
</template>

<script setup>
import { getuserlist, deluser, adduser } from "../../api/user";
import { ref, onMounted } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { routes } from "../../router";

console.log(routes, "fdfdf");

const drawer = ref(false);

const roles = ref({
  1: "超级管理员",
  2: "管理员",
});

const userlist = ref([]);
// 获取管理员
const getuser = async () => {
  let res = await getuserlist();
  console.log(res);
  userlist.value = res.data.data;
};

// 删除管理员
const del = async (id) => {
  ElMessageBox.confirm("确认要删除用户吗？", "提示", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await deluser(id);
      console.log(res);
      ElMessage({
        type: "success",
        message: res.data.message,
      });
      getuser();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });

  // userlist.value = res.data.data;
};

// 添加管理员
const admin = ref({
  adminname: "",
  password: "",
  role: "1",
  checkedKeys: [],
});

const submitadd = async () => {
  console.log(admin.value);
  admin.value.checkedKeys = [
    ...tree.value.getCheckedKeys(),
    ...tree.value.getHalfCheckedKeys(),
  ];
  let res = await adduser(admin.value);
  console.log(res, "结果");
  drawer.value = false;
  getuser();
};

const tree = ref();

onMounted(() => {
  getuser();
});
</script>

<style scoped>
.el-row {
  margin: 10px;
}
</style>
