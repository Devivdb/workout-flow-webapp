import axios from "axios";

// Base URL for the NOVI educational backend
const API_URL = "https://frontend-educational-backend.herokuapp.com/api";

// Create axios instance with default headers
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add interceptor to add auth token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const authService = {
    // Register a new user
    register: async (username, email, password, role = ["user"]) => {
        return apiClient
            .post("/auth/signup", {
                username,
                email,
                password,
                role,
            })
            .then((response) => response.data);
    },

    // Login an existing user
    login: async (username, password) => {
        return apiClient
            .post("/auth/signin", {
                username,
                password,
            })
            .then((response) => response.data);
    },

    // Get current user info
    getCurrentUser: async () => {
        return apiClient.get("/user").then((response) => response.data);
    },

    // Update user profile
    updateUser: async (data) => {
        return apiClient.put("/user", data).then((response) => response.data);
    },

    // Upload profile image
    uploadProfileImage: async (imageData) => {
        return apiClient
            .post("/user/image", { base64Image: imageData })
            .then((response) => response.data);
    },
};

export default authService;