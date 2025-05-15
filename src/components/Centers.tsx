"use client";
import { CenterProps, centers } from "@/lib/centers";
import Center from "./Center";
import { useEffect } from "react";
import { useState } from "react";
import { fetchCenters } from "@/app/api/fetchCenters";

export default function Centers() {
  const [centerData, setCenterData] = useState<CenterProps[]>([]);

  useEffect(() => {
    fetchCenters().then(setCenterData);
  }, []);

  return (
    <div className='flex flex-wrap gap-6'>
      {centerData.map((center) => {
        return <Center key={center.id} {...center} />;
      })}
    </div>
  );
}
