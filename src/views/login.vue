<template>
  <div class="login">
    <div class="box">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="loginform"
      >
        <el-form-item label="用户名" prop="adminname">
          <el-input v-model.number="ruleForm.adminname" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { useStore } from "vuex";

const store = useStore();

const ruleFormRef = ref<any>();

// 密码验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value.length != 6) {
    return callback(new Error("密码为六位"));
  }
  return callback();
};
// 双向数据绑定数据
const ruleForm = ref({
  adminname: "",
  password: "",
});

//验证规则
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
});

// 提交方法
const submitForm = (formEl: FormInstance | undefined) => {
  ruleFormRef.value.validate((value) => {
    console.log(ruleForm.value);

    if (value) {
      store.dispatch("user/ulogin", ruleForm.value);
    } else {
      console.log("失败");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgb(245, 250, 255);
  justify-content: center;
  align-items: center;
}
.loginform {
  background-color: #fff;
  width: 500px;
  height: 200px;
}

.el-input__inner {
  width: 200px;
  flex-grow: 0;
}
.box {
  background-color: #fff;
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 3px 3px 14px 0px #7c7b7b;
}
</style>
