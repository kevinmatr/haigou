<template>
  <div>
    <el-table :data="prolist" border style="width: 100%" class="tb">
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
          <span class="red">{{ scoped.row.proname }}</span>
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
      <el-table-column align="center" label="分类">
        <template #default="scoped">
          <span>{{ scoped.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="原价">
        <template #default="scoped">
          <span>{{ scoped.row.originprice }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="折扣">
        <template #default="scoped">
          <span>{{ scoped.row.discount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否售卖">
        <template #default="scoped">
          <el-switch
            v-model="is.saleis[scoped.row.issale]"
            @change=""
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否秒杀">
        <template #default="scoped">
          <el-switch v-model="is.seckillis[scoped.row.isseckill]"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否推荐">
        <template #default="scoped">
          <el-switch
            v-model="is.recommendis[scoped.row.isrecommend]"
            @change=""
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
    <el-pagination
      background
      layout="prev, pager, next"
      v-model:page-size="pageObj.limitNum"
      v-model:current-page="pageObj.count"
      :total="pageObj.total"
    />
  </div>
</template>

<script setup>
import { filter } from "lodash";
import { ref, onMounted, watch } from "vue";
import { getprolist, setflag } from "../../api/pro";

const prolist = ref([]);

const is = ref({
  saleis: {
    1: true,
    0: false,
  },
  seckillis: {
    1: true,
    0: false,
  },
  recommendis: {
    1: true,
    0: false,
  },
});

const pageObj = ref({
  count: 1,
  limitNum: 10,
  total: "",
});
const getpros = async () => {
  let res = await getprolist(pageObj.value);
  console.log(res.data.data, "search");
  // let newres = res.data.data.filter((item) => (item.issale ? 1 : true));
  // console.log(newres, "hh");
  prolist.value = res.data.data;
  pageObj.value.total = res.data.total;
};
// onMounted(() => {
//   getpros();
// });

const changeflag = async (row) => {
  let { proid, type, flag } = row;
  let res = await setflag({ proid, type, flag });
  console.log(res, "hhh");
};

watch(
  pageObj,
  () => {
    getpros();
  },
  { deep: true, immediate: true }
);
</script>
<style scoped>
.el-table img {
  width: 100px;
  height: 100px;
}
.el-table {
  margin-bottom: 10px;
}
.red ::v-deep {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
