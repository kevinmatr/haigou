import request from "../utils/request";

// 获取用户列表
export const getuserlist = () => request.get("/admin/list");

// 删除管理员
export const deluser = (adminid) => request.post("/admin/delete", { adminid });

// 添加管理员
export const adduser = (data) => request.post("admin/add", data);
