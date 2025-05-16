import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ServiceProps } from "@/lib/services";

type UserSelectionsState = {
  services: ServiceProps[];
  getServices: () => ServiceProps[];
  addService: (service: ServiceProps) => void;
  resetServices: () => void;
  date: string;
  setDate: (date: string) => void;
  resetDate: () => void;
  time: string;
  setTime: (time: string) => void;
  resetTime: () => void;
};

const useUserSelectionsStore = create<UserSelectionsState>()(
  persist(
    (set, get) => ({
      services: [],
      getServices: () => get().services,
      addService: (service: ServiceProps) => {
        if (get().services.some((s) => s.id === service.id)) {
          set((state) => ({
            services: state.services.filter((s) => s.id !== service.id),
          }));
        } else {
          set((state) => ({
            services: [...state.services, service],
          }));
        }
      },
      resetServices: () => set({ services: [] }),
      date: "",
      setDate: (date: string) => set({ date }),
      resetDate: () => set({ date: "" }),
      time: "",
      setTime: (time: string) => set({ time }),
      resetTime: () => set({ time: "" }),
    }),
    {
      name: "user-selections-store", // clave en localStorage
    }
  )
);

export default useUserSelectionsStore;
