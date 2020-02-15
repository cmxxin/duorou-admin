import { routerRedux } from "dva/router";
import { stringify } from "querystring";
import { login, getFakeCaptcha, register } from "@/services/login";
import { setAuthority } from "@/utils/authority";
import { reloadAuthorized } from "@/utils/Authorized";
import { getPageQuery } from "@/utils/utils";

const Model = {
  namespace: "login",
  state: {
    status: undefined
  },

  effects: {
    *register({ payload }, { call, put }) {
      const res = yield call(register, payload);
      yield put({
        type: "changeLoginStatus",
        payload: res
      });
    },

    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: "changeLoginStatus",
        payload: response
      }); // Login successfully

      if (response.status === "ok") {
        reloadAuthorized();
        localStorage.setItem("token", response.token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf("#") + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || "/"));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect
      reloadAuthorized();
      localStorage.removeItem("token");
      if (window.location.pathname !== "/user/login" && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: "/user/login",
            search: stringify({
              redirect: window.location.href
            })
          })
        );
      }
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    }
  }
};
export default Model;