/*
 * Created Date: 2019-10-11 5:56:22 pm
 * Author: cmax(1052520900@qq.com)
 * -----
 * Last Modified: 2019-10-14 3:23:33 pm
 * Modified By: cmax(1052520900@qq.com)
 * -----
 * Copyright © 2019 mjgf
 */
import request from "@/utils/request";

export async function query() {
  return request("/api/categoriesList");
}

export async function getDetail(params) {
  return request.post("/api/getDetail", { data: params, timeout: 30000 });
}
