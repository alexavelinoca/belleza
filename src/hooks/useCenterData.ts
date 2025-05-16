import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CenterProps } from "@/lib/centers";
import { fetchCenters } from "@/app/api/fetchCenters";

export const useCenterData = () => {
  const { center } = useParams();
  const [centerContent, setCenterContent] = useState<CenterProps | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCenters()
      .then((data) => {
        const found = data.find((c) => c.company === center);
        setCenterContent(found);
      })
      .finally(() => setIsLoading(false));
  }, [center]);

  return { centerContent, isLoading };
};
