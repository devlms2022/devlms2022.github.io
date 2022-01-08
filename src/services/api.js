import axios from "axios";
import TokenService from "./token.services";

const baseURL = process.env.REACT_APP_API_URL;

const postFile = async (payload) => {
  const api = axios.create({
    baseURL,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  api.interceptors.request.use(
    (config) => {
      config.data = payload;

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
  api.interceptors.response.use(
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
            return api(originalConfig);
          } catch (_error) {
            console.log(_error);
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
  return api;
};

const Api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
Api.interceptors.request.use(
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

Api.interceptors.response.use(
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
          return Api(originalConfig);
        } catch (_error) {
          console.log(_error);
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export { postFile, Api };
