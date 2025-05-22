import axios from "axios"

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
})

export default axiosInstance