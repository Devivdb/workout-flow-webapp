import axios from "axios";

const API_URL = "https://frontend-educational-backend.herokuapp.com/api";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

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

    login: async (username, password) => {
        return apiClient
            .post("/auth/signin", {
                username,
                password,
            })
            .then((response) => response.data);
    },

    getCurrentUser: async () => {
        return apiClient.get("/user").then((response) => response.data);
    },

    updateUser: async (data) => {
        return apiClient.put("/user", data).then((response) => response.data);
    },

    uploadProfileImage: async (imageData) => {
        return apiClient
            .post("/user/image", { base64Image: imageData })
            .then((response) => response.data);
    },
};

export default authService;