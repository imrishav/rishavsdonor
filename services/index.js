import Axios from "axios";

function createAxios() {
  const axios = Axios.create();

  axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_ENDPOINT}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.timeout = 120000; // 120 seconds before time out

  axios.interceptors.request.use(
    (conf) => {
      // showLoader();
      return conf;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      // hideLoader();
      return response;
    },
    (error) => {
      // hideLoader();
      console.log("error in interceptor", error);
      if (error && error.response) {
        if (error.response.status === 401) {
          // store.dispatch(logout());
          window.location.href = "/";
        }
        if (error.response.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject(error);
    }
  );
  return axios;
}

// Initialise Axios
const api = createAxios();
//
const service = {
  async postWithoutHeaders(route, body) {
    const response = await api.post(route, body);
    return response;
  },
  async postWithHeaders(route, body) {
    const response = await api.post(route, body, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  async getWithAuth(route, authToken) {
    const res = await api.get(route, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        Authentication: authToken,
        // "Content-Type": "application/json",
      },
    });
    return res;
  },

  async getRequest(route) {
    const { data } = await api.get(route);
    return data;
  },

  //   async getRequest() {
  //     const { data } = await api.get(
  //       "https://jsonplaceholder.typicode.com/todos/1"
  //     );
  //     return data;
  //   },
};

if (typeof window !== "undefined") {
  // browser code
  window.$http = service;
}

export default service;
