import { CenterProps, centers } from "@/lib/centers";
import { DELAY } from "@/lib/constants";

export const fetchCenters = async (): Promise<CenterProps[]> => {
  const delay = DELAY;
  await new Promise((resolve) => setTimeout(resolve, delay));
  return centers;
};
