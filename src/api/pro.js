import request from "../utils/request.js";

// 获取商品列表
export const getprolist = (params = {}) => request.get("/pro/list", { params });

// 获取商品分类
export const getcategory = () => request.get("/pro/getCategory");

// 筛选商品
export const filterprolist = (data = {}) =>
  request.post("/pro/searchPro", data);

// 获取列表
// export const getiskill = () => request.get("/pro/getCategory");
// 更新访问
export const setflag = (data = {}) => request.post("/banner/updateFlag", data);
