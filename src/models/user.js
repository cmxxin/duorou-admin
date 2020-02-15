import { queryCurrent, query as queryUsers } from "@/services/user";
const UserModel = {
  namespace: "user",
  state: {
    currentUser: {}
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      const payload = response.status === "error" ? {} : response;
      yield put({
        type: "save",
        payload
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      console.log(response, 333332222);
      yield put({
        type: "saveCurrentUser",
        payload: response
      });
    }
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return { ...state, currentUser: payload };
    },

    changeNotifyCount(
      state = {
        currentUser: {}
      },
      action
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
export default UserModel;
