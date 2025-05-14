"use client";

import Services from "@/components/Services";
import SummaryCard from "@/components/SummaryCard";
import { Button } from "@/components/ui/button";
import { CenterProps, centers } from "@/lib/centers";
import { ClockIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function CenterPage() {
  const { center } = useParams();
  const router = useRouter();
  const centerContent = centers.find((center2) => center2.company === center);

  return (
    <div className=' flex flex-col gap-4 max-w-screen-xl mx-auto p-6 lg:p-10'>
      <h1 className='text-4xl font-bold'>{centerContent?.name}</h1>
      <p className='text-lg font-semibold flex items-center gap-2'>
        {centerContent?.rating}
        <StarIcon size={20} className='text-black' fill='currentColor' />
        <span className='text-lg text-purple-500'>
          ( {centerContent?.reviews} )
        </span>
      </p>
      <div className='flex flex-col md:flex-row gap-4 '>
        <div>
          <Image
            src={centerContent?.image || ""}
            alt={centerContent?.name || ""}
            width={1030}
            height={800}
            className='rounded-md'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Image
            src={centerContent?.image || ""}
            alt={centerContent?.name || ""}
            width={500}
            height={200}
            className='rounded-md'
          />
          <Image
            src={centerContent?.image || ""}
            alt={centerContent?.name || ""}
            width={500}
            height={200}
            className='rounded-md'
          />
        </div>
      </div>
      <div className='flex flex-row gap-4'>
        <Services
          services={centerContent?.services || []}
          centerName={centerContent?.name || ""}
          rating={centerContent?.rating || 0}
          reviews={centerContent?.reviews || 0}
          company={centerContent?.company || ""}
          booking={false}
        />
        <SummaryCard
          centerContent={centerContent as CenterProps}
          router={router as unknown as Router}
        />
      </div>
    </div>
  );
}
