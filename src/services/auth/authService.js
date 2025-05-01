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
                .then((response) => {
                    localStorage.setItem("token", response.data.accessToken);
                    return response.data;
                });
        },

    getCurrentUser: async () => {
        return apiClient.get("/user").then((response) => response.data);
    },

    updateUser: async (data) => {
        try {
            const updateData = {};

            if (data.email) {
                updateData.email = data.email;
            }

            if (data.password && data.repeatedPassword) {
                updateData.password = data.password;
                updateData.repeatedPassword = data.repeatedPassword;
            }

            if (Object.keys(updateData).length === 0) {
                return;
            }

            return await apiClient.put("/user", updateData);
        } catch (error) {
            console.error("Update failed:", error);
            throw error;
        }
    },

    uploadProfileImage: async (imageData) => {
        return apiClient
            .post("/user/image", { base64Image: imageData })
            .then((response) => response.data);
    },
};

export default authService;