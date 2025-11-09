import axios from "axios";
import { logoutAll, refreshToken, token } from "../app/Localstorage";

// Create Axios instance
const mainAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ✅ Utility: redirect to login and clear session
const redirectToLogin = () => {
  logoutAll();
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.setItem("redirectPath", window.location.pathname);
  
  // Prevent multiple redirects
  if (!window.location.pathname.includes("/login")) {
    window.location.href = "/login";
  }
};

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
mainAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("auth/") &&
      !originalRequest.url?.includes("login")
    ) {
      // If already retrying, wait for the current refresh to complete
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return mainAxios(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use the mainAxios instance for the refresh request
        const response = await mainAxios.post(
          `auth/refresh`,
          { refresh_token: refreshToken }, // Send in body instead of query param
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const newAccessToken = response.data.access_token;
        localStorage.setItem("authToken", newAccessToken);
        
        // Process queued requests with new token
        processQueue(null, newAccessToken);

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // Retry the original request
        return mainAxios(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear queue and redirect to login
        processQueue(refreshError, null);
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other authentication errors (only redirect if not already retrying)
    if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

// ===============================
// REQUEST INTERCEPTOR
// ===============================
mainAxios.interceptors.request.use(
  config => {
    const currentToken = token; // Make sure this gets the latest token
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default mainAxios;