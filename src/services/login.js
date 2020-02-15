import request from "@/utils/request";

export async function login(params) {
  return request("/api/login", {
    method: "POST",
    data: params
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function register(data) {
  return request.post("/api/register", { data });
}

export const getTestData = async () => request("/api/test");
