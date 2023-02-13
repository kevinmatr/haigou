<template>
  <div>
    <el-row>
      <el-input
        v-model="info.search"
        placeholder="请输入搜索内容"
        class="input-with-select"
      >
        <template #prepend>
          <el-select
            v-model="info.category"
            placeholder="请选择查询分类"
            style="width: 115px"
          >
            <el-option
              v-for="item in cate"
              :key="item"
              :label="item"
              :value="item"
              :disabled="item.disabled"
            />
          </el-select>
        </template>
        <template #append>
          <el-button @click="searchcall">搜索</el-button>
        </template>
      </el-input>
    </el-row>
    <el-table :data="prolist" border style="width: 100%">
      <el-table-column align="center" label="序号" width="180">
        <template #default="scoped">
          <span>{{
            scoped.$index + 1 + (pageObj.count - 1) * pageObj.limitNum
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片">
        <template #default="scoped">
          <img :src="scoped.row.img1" alt="" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称">
        <template #default="scoped">
          <span>{{ scoped.row.proname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌">
        <template #default="scoped">
          <span>{{ scoped.row.brand }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="销量">
        <template #default="scoped">
          <span>{{ scoped.row.sales }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getcategory, filterprolist } from "../../api/pro";

const prolist = ref([]);

const cate = ref([]);

const pageObj = ref({
  count: 1,
  limitNum: 10,
  total: 2,
});

const info = ref({
  category: "",
  search: "",
});

const searchcall = async () => {
  let res = await filterprolist(info.value);
  prolist.value = res.data.data;
};

onMounted(async () => {
  let res = await getcategory();
  cate.value = res.data.data;
  console.log(res, "haha");
});

// watch(
//   pageObj,
//   () => {
//     getpros();
//   },
//   { deep: true, immediate: true }
// );
</script>
<style scoped>
.el-table img {
  width: 100px;
  height: 100px;
}
</style>
