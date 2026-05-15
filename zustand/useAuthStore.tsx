import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
};

type UserStore = {
  user: User;

  setUser: (data: Partial<User>) => void;
  updateField: <K extends keyof User>(key: K, value: User[K]) => void;
  removeField: <K extends keyof User>(key: K) => void;
  clearUser: () => void;
};

const initialUser: User = {
  name: "",
  email: "",
  phone: "",
  role: "",
  location: "",
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialUser,

      // 🔥 full or partial update
      setUser: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),

      // 🔥 single field update (type-safe)
      updateField: (key, value) =>
        set((state) => ({
          user: {
            ...state.user,
            [key]: value,
          },
        })),

      // 🔥 remove single field (reset to empty)
      removeField: (key) =>
        set((state) => ({
          user: {
            ...state.user,
            [key]: "" as any,
          },
        })),

      // 🔥 reset all
      clearUser: () => set({ user: initialUser }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
