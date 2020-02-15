/*
 * Created Date: 2019-10-14 5:56:57 pm
 * Author: cmax(1052520900@qq.com)
 * -----
 * Last Modified: 2019-10-14 5:58:37 pm
 * Modified By: cmax(1052520900@qq.com)
 * -----
 * Copyright © 2019 mjgf
 */
import { query } from "@/services/detail";

const Model = {
  namespace: "detail",
  state: {
    data: {}
  },

  effects: {
    *getData({ payload }, { call, put }) {
      const res = yield call(query, payload);
      yield put({
        type: "save",
        payload: {
          data: res.data
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
