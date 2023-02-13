import { login } from "../../api/index.js";
import router from "../../router/index.js";
import { ElMessage } from "element-plus";
// 用户信息存储在user里
const state = {
  user: {},
};
const mutations = {
  // 设置user
  set_user(state, userinfo) {
    state.user = userinfo;
  },
};
const actions = {
  ulogout(store) {
    store.commit("set_user", {});
    router.push("/login");
  },
  // 发送请求
  // payload = username password
  ulogin(store, payload) {
    login(payload).then((res) => {
      if (res.data.code == 200) {
        console.log(res);
        store.commit("set_user", res.data.data);

        ElMessage({
          message: res.data.message,
          type: "success",
        });
        setTimeout(() => {
          let redirect = router.currentRoute.value.query.redirect;
          router.push(redirect || "/");
        }, 2000);
      } else {
        ElMessage({
          message: res.data.message,
          type: "error",
        });
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
