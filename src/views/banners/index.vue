<template>
  <div>
    <el-row class="btn">
      <el-button type="primary" @click="isVisible = true">添加轮播图</el-button>
      <el-button type="success" @click="setexcel">导出轮播图EXCEL</el-button>
    </el-row>
    <el-table :data="bannerlist" border style="width: 100%">
      <el-table-column align="center" label="序号" width="180">
        <template #default="scoped">
          <span>{{ scoped.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片">
        <template #default="scoped">
          <img :src="scoped.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="链接">
        <template #default="scoped">
          <span>{{ scoped.row.link ? scoped.row.link : "还买设置链接" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提示">
        <template #default="scoped">
          <span>{{ scoped.row.alt ? scoped.row.alt : "请添加提示" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否开启">
        <template #default="scoped">
          <el-switch
            v-model="scoped.row.flag"
            @change="changeflag(scoped.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="删除">
        <template #default="scoped">
          <el-button type="danger" @click="del(scoped.row.bannerid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加轮播图弹窗 -->
    <el-dialog v-model="isVisible" title="添加轮播图" width="30%">
      <!-- <el-row>
        <el-input placeholder="请输入图片地址" v-model="banner.img"></el-input>
      </el-row> -->
      <el-upload
        class="avatar-uploader"
        action="http://114.116.29.103:8089/upload"
        name="img"
        :show-file-list="true"
        :on-success="handleUploadSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-row>
        <el-input placeholder="请输入图片标题" v-model="banner.alt"></el-input>
      </el-row>
      <el-row>
        <el-input placeholder="请输入图片链接" v-model="banner.link"></el-input>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isVisible = false">取消</el-button>
          <el-button type="primary" @click="add"> 添加 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getbannerlist, setflag, delbanner, addbanner } from "../../api/banner";
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import getexcel from "../../utils/getexcel.js";

// 轮播图数据
const bannerlist = ref([]);

// 获取轮播图数据
const getbanner = async () => {
  let res = await getbannerlist();
  console.log(res);
  bannerlist.value = res.data.data;
  console.log(bannerlist.value);
};

// 更改状态
const changeflag = async (row) => {
  let { bannerid, flag } = row;
  let res = await setflag({ bannerid, flag });
  ElMessage({
    message: res.data.message,
    type: "success",
  });
  console.log(res, "更新");
  location.reload();
};

// 删除轮播图
const del = (idd) => {
  ElMessageBox.confirm("确认要删除图片吗？", "提示", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await delbanner(idd);
      console.log(res);
      ElMessage({
        type: "success",
        message: res.data.message,
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

// 添加弹窗开关
const isVisible = ref(false);

// 添加轮播图数据
const banner = ref({
  img: "",
  alt: "",
  link: "",
});

// 添加轮播图
const add = async () => {
  let res = await addbanner(banner.value);
  console.log(res, "add");
  isVisible.value = false;
  getbanner();
  banner.value = {};
  imageUrl.value = "";
};

// 上传图片
const handleUploadSuccess = (res, uploadFile) => {
  console.log(res, "p");
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "图片上传成功",
    });
    // 设置预览图
    imageUrl.value = URL.createObjectURL(uploadFile.raw);
    banner.value.img = res.data[0];
  } else {
    ElMessage({
      type: "error",
      message: "图片上传失败",
    });
  }
};

// 预览图片
const imageUrl = ref("");

// 导出表格
const setexcel = () => {
  let datas = [
    {
      sheetData: bannerlist.value,
      sheetName: "轮播图",
      sheetFilter: ["bannerid", "img", "flag", "link", "alt"],
      sheetHeader: ["id", "图片地址", "状态", "链接", "提示"],
    },
  ];

  getexcel("banner表格", datas);
};

onMounted(() => {
  getbanner();
});
</script>

<style scoped>
.el-table img {
  width: 200px;
  height: 100px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.btn {
  padding: 10px;
  box-sizing: border-box;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
