import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue";
import Info from "../views/infos/index.vue";
import {
  Setting,
  User,
  Edit,
  Discount,
  Connection,
  Picture,
  Goods,
  DataLine,
  EditPen,
  PieChart,
  Document,
  Guide,
  CirclePlusFilled,
  RemoveFilled,
  PictureFilled,
  Pointer,
  Tickets,
  Filter,
  Finished,
  MagicStick,
  FolderOpened,
} from "@element-plus/icons-vue";
import store from "../store";

export const routes = [
  {
    path: "/",
    redirect: "/info",
    component: Layout,
    meta: {
      title: "个人信息",
      icon: "User",
    },
    children: [
      {
        path: "info",
        components: {
          default: Info,
        },
        meta: {
          title: "我的信息",
          icon: "Avatar",
        },
      },
    ],
  },
  {
    path: "/users",
    redirect: "/users/users",
    component: Layout,
    meta: {
      title: "账号管理",
      icon: "Edit",
    },
    children: [
      {
        path: "users",
        components: {
          default: () => import("../views/users/index.vue"),
        },
        meta: {
          title: "用户列表",
          icon: "CirclePlusFilled",
        },
      },
      {
        path: "add",
        components: {
          default: () => import("../views/users/add.vue"),
        },
        meta: {
          title: "添加用户",
          icon: "RemoveFilled",
        },
      },
    ],
  },
  {
    path: "/banners",
    redirect: "/banners/banners",
    component: Layout,
    meta: {
      title: "轮播图管理",
      icon: "Picture",
    },
    children: [
      {
        path: "banners",
        components: {
          default: () => import("../views/banners/index.vue"),
        },
        meta: {
          title: "轮播图列表",
          icon: "PictureFilled",
        },
      },
      {
        path: "add",
        components: {
          default: () => import("../views/banners/add.vue"),
        },
        meta: {
          title: "添加轮播图",
          icon: "CirclePlusFilled",
        },
      },
    ],
  },
  {
    path: "/pros",
    redirect: "/pros/list",
    component: Layout,
    meta: {
      title: "产品管理",
      icon: "Goods",
    },
    children: [
      {
        path: "list",
        components: {
          default: () => import("../views/pros/list.vue"),
        },
        meta: {
          title: "产品列表",
          icon: "Tickets",
        },
      },
      {
        path: "recommend",
        components: {
          default: () => import("../views/pros/recommend.vue"),
        },
        meta: {
          title: "推荐列表",
          icon: "Star",
        },
      },
      {
        path: "seckill",
        components: {
          default: () => import("../views/pros/seckill.vue"),
        },
        meta: {
          title: "秒杀列表",
          icon: "Pointer",
        },
      },
      {
        path: "search",
        components: {
          default: () => import("../views/pros/search.vue"),
        },
        meta: {
          title: "筛选列表",
          icon: "Filter",
        },
      },
    ],
  },
  {
    path: "/datas",
    redirect: "/datas/echarts",
    component: Layout,
    meta: {
      title: "数据可视化",
      icon: "DataLine",
    },
    children: [
      {
        path: "users",
        components: {
          default: () => import("../views/datas/echarts.vue"),
        },
        meta: {
          title: "数据图表",
          icon: "PieChart",
        },
      },
    ],
  },
  {
    path: "/editor",
    redirect: "/editor/index",
    component: Layout,
    meta: {
      title: "编辑器",
      icon: "EditPen",
    },
    children: [
      {
        path: "index",
        components: {
          default: () => import("../views/editor/index.vue"),
        },
        meta: {
          title: "编辑列表",
          icon: "Finished",
        },
      },
      {
        path: "markdown",
        components: {
          default: () => import("../views/editor/markdown.vue"),
        },
        meta: {
          title: "markdown",
          icon: "MagicStick",
        },
      },
    ],
  },
  {
    path: "/excels",
    redirect: "/excels/import",
    component: Layout,
    meta: {
      title: "EXCEL管理",
      icon: "Document",
    },
    children: [
      {
        path: "import",
        components: {
          default: () => import("../views/excels/import.vue"),
        },
        meta: {
          title: "导入EXCEL",
          icon: "FolderAdd",
        },
      },
      {
        path: "export",
        components: {
          default: () => import("../views/excels/export.vue"),
        },
        meta: {
          title: "导出EXCEL",
          icon: "FolderOpened",
        },
      },
    ],
  },
  {
    path: "/maps",
    redirect: "/maps/index",
    component: Layout,
    meta: {
      title: "地图管理",
      icon: "Guide",
    },
    children: [
      {
        path: "index",
        components: {
          default: () => import("../views/maps/index.vue"),
        },
        meta: {
          title: "地图数据",
          icon: "MapLocation",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    components: {
      default: () => import("../views/login.vue"),
    },
    meta: {
      title: "登录",
      hidden: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// 重置路由
routes.map((item, i) => {
  item.id = i + 1;
  item.til = item.meta.title;
  if (item.children && item.children.length) {
    item.children.forEach((ite, j) => {
      ite.id = i + 1 + "_" + j + 1;
      ite.til = ite.meta.til;
      ite.parentID = item.id;
    });
  }
});

router.beforeEach((to, from, next) => {
  let token = store.state.user.user.token;

  if (token || to.name == "login") {
    next();
  } else {
    next({ path: "/login", query: { redirect: to.path } });
  }
});

export default router;
