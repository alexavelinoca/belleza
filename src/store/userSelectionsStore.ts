import { create } from "zustand";
import { ServiceProps } from "@/lib/services";

type UserSelectionsState = {
  services: ServiceProps[];
  getServices: () => ServiceProps[];
  addService: (service: ServiceProps) => void;
};

const useUserSelectionsStore = create<UserSelectionsState>((set, get) => ({
  services: [],
  getServices: () => get().services,
  addService: (service: ServiceProps) => {
    if (get().services.some((s) => s.id === service.id)) {
      console.log("service already in services");
      set((state: any) => ({
        services: state.services.filter(
          (s: ServiceProps) => s.id !== service.id
        ),
      }));
    } else {
      console.log("service not in services");
      set((state: any) => ({
        services: [...state.services, service],
      }));
    }
  },
}));

export default useUserSelectionsStore;
