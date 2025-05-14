import { ServiceProps } from "@/lib/centers";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

export function Service({
  service,
  company,
  booking,
}: {
  service: ServiceProps;
  company: string;
  booking: boolean;
}) {
  const router = useRouter();

  return (
    <div className='flex flex-row gap-2 min-h-[100px] border border-gray-200 rounded-md p-4'>
      <div className='flex flex-col justify-between w-full pl-1'>
        <h2 className='text-lg font-bold font-montserrat'>{service.name}</h2>
        <p className='text-sm text-gray-500 font-montserrat'>
          {service.time} min
        </p>
        <p className='text-sm font-medium font-montserrat pt-2'>
          $ {service.price}
        </p>
      </div>
      <Button
        variant='outline'
        className={`px-4 py-2 ${!booking && "rounded-2xl"} self-center`}
        onClick={() => !booking && router.push(`/${company}/booking`)}
      >
        {booking ? <PlusIcon className='w-4 h-4' /> : "Book"}
      </Button>
    </div>
  );
}
