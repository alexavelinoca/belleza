"use client";

import Services from "@/components/Services";
import SummaryCard from "@/components/SummaryCard";
import { useCenterData } from "@/hooks/useCenterData";
import { Skeleton } from "@/components/ui/skeleton";
import CenterDetails from "@/components/Center/CenterDetails";
import CenterHeader from "@/components/Center/CenterHeader";
import CenterImages from "@/components/Center/CenterImages";

export default function CenterPage() {
  const { centerContent, isLoading } = useCenterData();

  if (isLoading) {
    return (
      <div className='flex flex-col gap-4 max-w-screen-xl mx-auto px-6 py-4'>
        <div className='flex flex-row items-center gap-2'>
          <Skeleton className='rounded-md w-20 h-20 md:w-25 md:h-25 lg:w-30 lg:h-30' />
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
            <Skeleton className='w-full h-10' />
          </h1>
        </div>
        <Skeleton className='w-full h-10' />
        <Skeleton className='w-full h-10' />
        <div className='flex flex-col md:flex-row gap-4 mb-4'>
          <Skeleton className='w-full h-100' />
        </div>
      </div>
    );
  }

  if (!centerContent) {
    return (
      <div className='flex justify-center items-center h-[40vh]'>
        <p className='text-gray-500 text-lg'>Center not found</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 max-w-screen-xl mx-auto px-6 py-4'>
      <CenterHeader centerContent={centerContent} />
      <CenterDetails centerContent={centerContent} />
      <CenterImages centerContent={centerContent} />
      <div className='flex flex-row gap-4'>
        <Services
          company={centerContent.company}
          booking={false}
          centerId={centerContent.id}
        />
        <SummaryCard centerContent={centerContent} />
      </div>
    </div>
  );
}
