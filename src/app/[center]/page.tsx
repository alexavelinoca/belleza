"use client";

import Services from "@/components/Services";
import SummaryCard from "@/components/SummaryCard";
import { CenterProps } from "@/lib/centers";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { fetchCenters } from "../api/fetchCenters";
import { Skeleton } from "@/components/ui/skeleton";

export default function CenterPage() {
  const { center } = useParams();
  const router = useRouter();
  const [centerContent, setCenterContent] = useState<CenterProps | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCenters().then((data) => {
      setCenterContent(
        data.find((centerName) => centerName.company === center)
      );
      setIsLoading(false);
    });
  }, [center]);

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

  return (
    <div className='flex flex-col gap-4 max-w-screen-xl mx-auto px-6 py-4'>
      <div className='flex flex-row items-center gap-2'>
        <Image
          src={centerContent?.logo || "/images/default-image.png"}
          alt={centerContent?.name || ""}
          width={100}
          height={100}
          className='rounded-md w-20 h-20 md:w-25 md:h-25 lg:w-30 lg:h-30'
        />
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
          {centerContent?.name}
        </h1>
      </div>
      <p className='text-sm md:text-lg font-montserrat font-regular text-gray-600'>
        {centerContent?.description}
      </p>
      <p className='text-lg font-semibold flex items-center gap-2'>
        {centerContent?.rating}
        <StarIcon size={20} className='text-black' fill='currentColor' />
        <span className='text-lg text-purple-500'>
          ( {centerContent?.reviews || 0} )
        </span>
      </p>
      <div className='flex flex-col md:flex-row gap-4 mb-4'>
        <div>
          <Image
            src={centerContent?.images[0] || "/images/default-image.png"}
            alt={centerContent?.name || ""}
            width={1030}
            height={800}
            className='rounded-md aspect-[4/3] object-cover max-h-[300px] md:max-h-[515px]'
          />
        </div>
        <div className='flex flex-col gap-4 hidden lg:flex'>
          <Image
            src={centerContent?.images[1] || "/images/default-image.png"}
            alt={centerContent?.name || ""}
            width={500}
            height={200}
            className='rounded-md aspect-[4/3] object-cover max-h-[250px]'
          />
          <Image
            src={centerContent?.images[2] || "/images/default-image.png"}
            alt={centerContent?.name || ""}
            width={500}
            height={200}
            className='rounded-md aspect-[4/3] object-cover max-h-[250px]'
          />
        </div>
      </div>
      <div className='flex flex-row gap-4'>
        <Services
          company={centerContent?.company || ""}
          booking={false}
          centerId={centerContent?.id || 0}
        />
        <SummaryCard
          centerContent={centerContent as CenterProps}
          router={router as unknown as Router}
        />
      </div>
    </div>
  );
}
