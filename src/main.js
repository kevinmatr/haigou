import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import store from "./store";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
app.use(router).use(store).use(ElementPlus).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
