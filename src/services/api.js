import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status || 0;

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.erro ||
      JSON.stringify(error?.response?.data) ||
      "Erro inesperado";

    return Promise.reject({ status, message });
  }
);

export default api;
