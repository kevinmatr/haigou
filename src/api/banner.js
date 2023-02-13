import request from "../utils/request";

// 获取轮播图列表
export const getbannerlist = () => request.get("/banner/list");

// 更新访问
export const setflag = (data = {}) => request.post("/banner/updateFlag", data);

// 删除轮播图
export const delbanner = (bannerid) =>
  request.get("/banner/delete", { params: { bannerid } });

// 增加轮播图
export const addbanner = (data) => request.post("/banner/add", data);
