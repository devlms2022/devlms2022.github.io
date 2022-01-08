import axios from "axios";
import TokenService from "./token.services";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["Authorization"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth" && err.response) {
      // Access Token was expired
      if ((err.response.status === 403 || 401) && !originalConfig._retry) {
        originalConfig._retry = true;
        let refreshToken = TokenService.getLocalRefreshToken();

        try {
          const rs = await axios.post(
            process.env.REACT_APP_API_URL + "/token",
            {},
            {
              headers: {
                token: refreshToken,
              },
            }
          );
          refreshToken = rs.data.accessToken;

          TokenService.updateLocalAccessToken(refreshToken);
          return instance(originalConfig);
        } catch (_error) {
          console.log(_error);
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
