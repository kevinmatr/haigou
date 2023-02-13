<template>
  <div id="container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";

const map = shallowRef(null);

const initMap = () => {
  AMapLoader.load({
    key: "fc1a792f5b0f0f35cbc3006738bc224d", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      this.map = new AMap.Map("container", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 5, //初始化地图级别
        center: [105.602725, 37.076636], //初始化地图中心点位置
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
onMounted(() => {
  initMap();
  map;
});
</script>
<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>
