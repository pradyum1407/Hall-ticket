import { create } from "zustand"

const useAuthStore = create((set) => ({
    user: null,
    token: null,

    login: (userdata, token) => {
        sessionStorage.setItem("auth", JSON.stringify({ userdata, token }));
        set({ userdata, token });
    },
    logout: () => {
        sessionStorage.removeItem("auth");
        set({ user: null, token: null });
    },

    initializeAuth: () => {
        const storedData = sessionStorage.getItem("auth");
        if (storedData) {
            const { user, token } = JSON.parse(storedData);
            set({ user, token });
        }
    }
}))


export default useAuthStore;