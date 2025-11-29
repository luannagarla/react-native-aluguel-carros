import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.111:8081/api",
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status || 0;
    let data = error?.response?.data;

    let message;

    if (typeof data === "string") {
      message = data;
    } else {
      message =
        data?.message ||
        data?.erro ||
        "Erro inesperado";
    }

    return Promise.reject({ status, message });
  }
);

export default api;
