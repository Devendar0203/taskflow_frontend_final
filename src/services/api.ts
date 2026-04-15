import axios from "axios";

const api = axios.create({
  baseURL: "/api", // changed to use Vite proxy to prevent CORS errors
});

// ✅ Attach token to every request (except login/register)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const method = config.method?.toLowerCase();
    const url = config.url;
    
    // Check if it's a public endpoint
    const isLogin = url === '/users/login';
    const isRegister = url === '/users' && method === 'post';
    const isPublicEndpoint = isLogin || isRegister;
    
    console.log(`[API Request] ${method?.toUpperCase()} ${url} | Public: ${isPublicEndpoint} | Token: ${!!token}`);

    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle expired/invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config || {};
    console.error(`❌ API Error [${config.method?.toUpperCase()}] ${config.url}:`, error.response?.status, error.response?.data || error.message);
    const isAuthEndpoint = config.url?.includes('/login');
    if (error.response && error.response.status === 401 && !isAuthEndpoint) {
      console.log("🔒 Session expired. Redirecting to login...");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;