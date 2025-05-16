"use client";
import { CenterProps } from "@/lib/centers";
import Center from "./Center";
import { useEffect } from "react";
import { useState } from "react";
import { fetchCenters } from "@/app/api/fetchCenters";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
export default function Centers() {
  const [centerData, setCenterData] = useState<CenterProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCenters().then((data) => {
      setCenterData(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className='flex flex-wrap gap-6'>
        <Skeleton className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] h-[300px]' />
        <Skeleton className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] h-[300px]' />
        <Skeleton className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] h-[300px]' />
        <Skeleton className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] h-[300px]' />
        <Skeleton className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] h-[300px]' />
        <Skeleton className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] h-[300px]' />
        <Skeleton className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] h-[300px]' />
        <Skeleton className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] h-[300px]' />
      </div>
    );
  }

  return (
    <div className='flex flex-wrap gap-6'>
      {centerData.length > 0 ? (
        centerData.map((center) => {
          return <Center key={center.id} {...center} />;
        })
      ) : (
        <div className='flex flex-col w-full h-full items-center justify-center'>
          <p className='text-center font-montserrat text-xl md:text-3xl font-semibold text-gray-400 mt-10'>
            No centers found
          </p>
          <Button
            className='mt-10'
            onClick={() => {
              setIsLoading(true);
              fetchCenters().then((data) => {
                setCenterData(data);
                setIsLoading(false);
              });
            }}
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}
