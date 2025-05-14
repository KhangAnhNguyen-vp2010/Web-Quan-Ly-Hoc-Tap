import axios from "axios";

// Lấy base URL từ biến môi trường
const axiosML = axios.create({
  baseURL: import.meta.env.VITE_MACHINE_LEARNING_API_URL,
});

export default axiosML;
