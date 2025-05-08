import axios from "axios";

// Lấy base URL từ biến môi trường
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosClient;
