import { ServiceProps } from "@/lib/services";
import { services } from "@/lib/services";
import { DELAY } from "@/lib/constants";

export const fetchCenterServices = async (
  centerId: number
): Promise<ServiceProps[]> => {
  const delay = DELAY;
  await new Promise((resolve) => setTimeout(resolve, delay));
  const centerServices = services.filter(
    (service) => service.centerId === centerId
  );
  return centerServices;
};
