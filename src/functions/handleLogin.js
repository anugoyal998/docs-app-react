import axios from "axios";
import { setCookies } from "cookies-next";
import { url } from "../constants/url";
import { decodeJwt } from "../helper/decodeJwt";

export const handleLoginSuccess = async (data, setUser) => {
  try {
    const { name, email, imageUrl: img, googleId: gid } = data;
    const rsp = await axios.post(`${url}/api/login`, { name, email, img, gid });
    setCookies("access_token", rsp?.data?.data?.access_token, { maxAge: 3600 });
    setCookies("refresh_token", rsp?.data?.data?.refresh_token, {
      maxAge: 24 * 3600,
    });
    await decodeJwt(setUser);
  } catch (error) {
    console.log(error);
    return;
  }
};
