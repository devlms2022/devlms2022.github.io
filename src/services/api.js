import axios from "axios";

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
    // console.log(res)
    // const originalConfig = res.config;
    // if(res.data.status !== 200 || res.data.status === 401) {
    //     originalConfig._retry = true;
    //     try {
    //         const rs = await instance.get("/v1/oauth2/refresh_token", {
    //             headers : {
    //                 "X-REFRESH-TOKEN" : TokenService.getLocalRefreshToken()
    //             }
    //         });
    //         const { accessToken } = rs.data;
    //         // console.log(accessToken);
    //         // console.log(instance)
    //         console.log(instance(originalConfig));
    //         TokenService.updateLocalAccessToken(accessToken);
    //         return instance(originalConfig);
    //     } catch (_error) {
    //         return Promise.reject(_error);
    //     }
    // }
    // if

    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // console.log(err.config);
    // console.log(err.response);
    if (originalConfig.url !== "/auth" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.get("/token", {
            headers: {
              "Authorization": rs.data.accessToken,
            },
          });
          const { access_token } = rs.data.data;
          TokenService.updateLocalAccessToken(access_token);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
