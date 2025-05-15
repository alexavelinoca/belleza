"use client";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useUserSelectionsStore from "@/store/userSelectionsStore";
export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const resetServices = useUserSelectionsStore(
    (state: any) => state.resetServices
  );
  const handleBack = () => {
    resetServices();
    return router.back();
  };
  return (
    <>
      <nav className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
        <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 flex items-center'>
          <ArrowLeftIcon
            className='w-6 h-6 cursor-pointer hover:text-gray-500 mr-12'
            onClick={handleBack}
          />
          <h1 className='text-xl font-medium font-montserrat'>
            Select services
          </h1>
          <XIcon
            className='w-6 h-6 cursor-pointer hover:text-gray-500 ml-auto'
            onClick={handleBack}
          />
        </div>
      </nav>
      {children}
    </>
  );
}
