"use client";

import { ArrowLeftIcon, XIcon } from "lucide-react";
import { useRouter, usePathname, useParams } from "next/navigation";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { Button } from "@/components/ui/button";
import { ServiceProps } from "@/lib/services";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { center } = useParams();
  const title = pathname.includes("time") ? "Select time" : "Select services";
  const totalPrice = useUserSelectionsStore((state) =>
    state.services.reduce(
      (acc: number, service: ServiceProps) => acc + service.price,
      0
    )
  );
  const numberOfServices = useUserSelectionsStore(
    (state) => state.services.length
  );
  const date = useUserSelectionsStore((state) => state.date);
  const time = useUserSelectionsStore((state) => state.time);

  const resetServices = useUserSelectionsStore((state) => state.resetServices);

  const resetTimes = useUserSelectionsStore((state) => state.resetTime);
  const resetDate = useUserSelectionsStore((state) => state.resetDate);
  const handleBack = () => {
    if (title === "Select services") {
      resetServices();
    }
    if (title === "Select time") {
      resetTimes();
      resetDate();
    }
    return router.back();
  };

  const handleClose = () => {
    resetServices();
    router.push("/");
  };

  const handleFooter = () => {
    if (title === "Select services") {
      router.push(`/${center}/booking/time`);
    } else {
      const formRef = document.querySelector("form");
      formRef?.requestSubmit();
    }
  };

  const handleContinue = () => {
    if (title === "Select time") {
      return !date || !time;
    }
    return false;
  };

  return (
    <>
      <nav className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
        <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 flex items-center'>
          <ArrowLeftIcon
            className='w-6 h-6 cursor-pointer hover:text-gray-500 mr-12'
            onClick={handleBack}
          />
          <h1 className='text-xl font-medium font-montserrat'>{title}</h1>
          <XIcon
            className='w-6 h-6 cursor-pointer hover:text-gray-500 ml-auto'
            onClick={handleClose}
          />
        </div>
      </nav>
      {children}
      <div className='fixed bottom-0 left-0 w-full z-50  shadow-md lg:hidden p-4 bg-white border-t border-gray-200'>
        <div className='flex items-center justify-end'>
          <p className='text-lg font-medium font-montserrat mr-12'>
            {numberOfServices} services
          </p>
          <p className='text-lg font-medium font-montserrat mr-12'>
            Total: ${totalPrice}
          </p>
          <Button onClick={handleFooter} disabled={handleContinue()}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
