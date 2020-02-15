/*
 * Created Date: 2019-10-11 5:47:49 pm
 * Author: cmax(1052520900@qq.com)
 * -----
 * Last Modified: 2019-10-16 3:09:24 pm
 * Modified By: cmax(1052520900@qq.com)
 * -----
 * Copyright © 2019 mjgf
 */
import { query, getDetail } from "@/services/category";

const Model = {
  namespace: "category",
  state: {
    list: []
  },
  effects: {
    *getData(_, { call, put }) {
      const res = yield call(query);
      yield put({
        type: "save",
        payload: {
          list:
            res.data && res.data.length
              ? res.data.map(item => ({ ...item, children: item.categories }))
              : []
        }
      });
    },

    *getDetail({ payload }, { call }) {
      yield call(getDetail, payload);
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
export default Model;
