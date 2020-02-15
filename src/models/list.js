/*
 * Created Date: 2019-10-12 2:03:03 pm
 * Author: cmax(1052520900@qq.com)
 * -----
 * Last Modified: 2019-10-14 1:37:53 pm
 * Modified By: cmax(1052520900@qq.com)
 * -----
 * Copyright © 2019 mjgf
 */
import { query } from "@/services/list";
import { isEmpty } from "@/utils/utils";

const Model = {
  namespace: "list",
  state: {
    list: [],
    total: 0
  },
  effects: {
    *getData({ payload }, { call, put }) {
      const res = yield call(query, payload);
      yield put({
        type: "save",
        payload: {
          list: isEmpty(res.data)
            ? []
            : res.data.records.map(item => ({ ...item, id: item._id })),
          total: res.data.total || 0
        }
      });
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
export default Model;
