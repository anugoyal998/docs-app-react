import axios from "axios";
import { getCookie, setCookies } from "cookies-next";
import { url } from "../constants/url";

export const decodeJwt = async (setUser) => {
  try {
    const access_token = getCookie("access_token");
    const refresh_token = getCookie("refresh_token");
    if (!refresh_token) return;
    if (!access_token) {
      const rsp = await axios.post(`${url}/api/refresh/token`, {
        refresh_token: refresh_token,
      });
      setCookies("access_token", rsp?.data?.data?.access_token, {
        maxAge: 3600,
      });
      setUser({
        access_token: rsp?.data?.data?.access_token,
        refresh_token: refresh_token,
        user: rsp?.data?.data?.user,
      });
    } else {
      const rsp = await axios.post(`${url}/api/decodeJwt`, { access_token });
      setUser({
        access_token: access_token,
        refresh_token: refresh_token,
        user: rsp?.data?.data,
      });
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
