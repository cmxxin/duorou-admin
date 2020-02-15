/*
 * Created Date: 2019-10-14 5:57:10 pm
 * Author: cmax(1052520900@qq.com)
 * -----
 * Last Modified: 2019-10-14 5:57:35 pm
 * Modified By: cmax(1052520900@qq.com)
 * -----
 * Copyright © 2019 mjgf
 */
import request from "@/utils/request";

export async function query(params) {
  return request("/api/detail", { params });
}
