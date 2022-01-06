const axiosJWT = axios.create();

const {REACT_APP_API_URL} = proccess.env;

axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(REACT_APP_API_URL);
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


