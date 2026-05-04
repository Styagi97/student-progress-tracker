// Axios instance with base URL from environment
// Automatically attaches JWT token to every request
// Handles global error handling (401 session expiry)

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


//Handles 401 errors by refreshing token or logging out user

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // ❗ avoid infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          refreshToken,
        });

        const newToken = res.data.token;

        // ✅ save new token
        localStorage.setItem("token", newToken);

        // ✅ update header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest);
      } catch (err) {
        console.error("Session expired");

        // ✅ clean logout
        localStorage.clear();

        // ❗ better than reload (optional)
        window.location.href = "/";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
