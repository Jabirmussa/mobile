import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,

    register: async (username, email, password) =>{
        set({ isLoading: true });
        try {
            const response = await fetch("https://backend-wii3.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            });

            const data = await response.json();

            if(!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);
            set({user: data.user, token: data.token, isLoading: false});

            return {success: true};

        } catch (error) {
            set({isLoading: false});
            return {success: false, error: error.message};
        }
    },

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch("https://backend-wii3.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();

            if(!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);
            set({user: data.user, token: data.token, isLoading: false});

            return {success: true};

        } catch (error) {
            set({isLoading: false});
            return {success: false, error: error.message};
        }
    },


    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;

            set({ user, token});

        } catch (error) {
           console.error("Error checking authentication:", error);
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("token");
            set({ user: null, token: null });
        } catch (error) {
            console.error("Error logging out:", error);
        }
    },   

}));
