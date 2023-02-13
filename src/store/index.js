import { createStore } from "vuex";
import c from "vuex-persistedstate";
import user from "./modules/user.js";

const store = createStore({
  state: {},
  modules: {
    user,
  },
  plugins: [
    c({
      key: "abc",
      storage: window.sessionStorage,
      reducer(state) {
        return {
          user: state.user,
        };
      },
    }),
  ],
});

export default store;
