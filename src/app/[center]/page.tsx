"use client";

import Services from "@/components/Services";
import SummaryCard from "@/components/SummaryCard";
import { CenterProps, centers } from "@/lib/centers";
import { services } from "@/lib/services";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { fetchCenters } from "../api/fetchCenters";

export default function CenterPage() {
  const { center } = useParams();
  const router = useRouter();
  const [centerContent, setCenterContent] = useState<CenterProps | undefined>();

  useEffect(() => {
    fetchCenters().then((data) => {
      console.log("data", data);
      setCenterContent(
        data.find((centerName) => centerName.company === center)
      );
    });
  }, [center]);

  return (
    <div className=' flex flex-col gap-4 max-w-screen-xl mx-auto p-6 lg:p-10'>
      <h1 className='text-4xl font-bold'>{centerContent?.name}</h1>
      <p className='text-lg font-semibold flex items-center gap-2'>
        {centerContent?.rating}
        <StarIcon size={20} className='text-black' fill='currentColor' />
        <span className='text-lg text-purple-500'>
          ( {centerContent?.reviews || 0} )
        </span>
      </p>
      <div className='flex flex-col md:flex-row gap-4 '>
        <div>
          <Image
            src={centerContent?.images[0] || "/images/default-image.png"}
            alt={centerContent?.name || ""}
            width={1030}
            height={800}
            className='rounded-md aspect-[4/3] object-cover max-h-[515px]'
          />
        </div>
        <div className='flex flex-col gap-4'>
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
