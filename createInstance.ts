import jwt_decode from "jwt-decode";
import axios from "axios";

const refreshToken = async () => {
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const createAxios = (user: any, dispath: any, stateSuccess: any) => {
  const newInstance = axios.create({});
  newInstance.interceptors.request.use(
    async (config: any) => {
      let date = new Date();
      const decodedToken: any = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();

        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispath(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err: any) => Promise.reject(err)
  );
  return newInstance;
};
