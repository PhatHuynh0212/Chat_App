import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
// import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ userAuth: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ userAuth: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
