import axios from "axios";

// Creating the API instance
const api = axios.create({
  baseURL: "/api",
});

// ☢️ NUCLEAR OPTION: Mock all requests globally
// This ensures that even if a service is called, it stays in the browser.
api.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  const url = config.url;
  
  console.log(`[Global Mock Interceptor] ${method} ${url}`);

  // Return a resolved promise with generic success data
  // This prevents the request from actually being sent.
  throw new axios.Cancel(`MOCK_DATA_REQUEST: ${method} ${url}`);
});

// Catch the cancellation and return mock response
// We treat cancellation as a way to "branch" into mock logic.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.resolve({
        data: { message: "Mock success", success: true },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      });
    }
    return Promise.reject(error);
  }
);

export default api;