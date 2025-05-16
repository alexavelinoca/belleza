import { useEffect, useState } from "react";
import { ServiceProps } from "@/lib/services";
import { fetchCenterServices } from "@/app/api/fetchCenterServices";

export function useCenterServices(centerId: number) {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCenterServices(centerId)
      .then(setServices)
      .catch(() => setServices([]))
      .finally(() => setIsLoading(false));
  }, [centerId]);

  return { services, isLoading };
}
