"use client";
import { CenterProps } from "@/lib/centers";
import { centers } from "@/lib/centers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { StarIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { ServiceProps } from "@/lib/services";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/Calendar";
import { Times } from "@/components/Times";
import { TimesData } from "@/app/api/bookDateTimes";
import { bookDateTimes } from "@/app/api/bookDateTimes";
import { useRouter } from "next/navigation";
const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
});

type AppointmentForm = z.infer<typeof schema>;

export default function Appointment() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentForm>({
    resolver: zodResolver(schema),
  });

  const [currentCenter, setCurrentCenter] = useState<CenterProps | undefined>();
  const { center } = useParams();
  const services = useUserSelectionsStore((state: any) => state.services);
  const duration = services.reduce((acc: number, service: ServiceProps) => {
    return acc + service.time;
  }, 0);
  const date = useUserSelectionsStore((state: any) => state.date);
  const time = useUserSelectionsStore((state: any) => state.time);

  useEffect(() => {
    const centerData = centers.find((c) => c.company === center);
    setCurrentCenter(centerData);
  }, [center]);

  const addTime = (time: string, duration: number) => {
    const [hours, minutes] = time.split(":").map(Number);

    const start = new Date();
    start.setHours(hours, minutes, 0, 0);

    const end = new Date(start);
    end.setMinutes(start.getMinutes() + duration);

    const format = (d: Date) =>
      d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    return `${format(start)} - ${format(end)}`;
  };

  const parseDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} h ${minutes} m duration`;
  };

  const onSubmit = (data: AppointmentForm) => {
    console.log("onSubmit", data);
    const stored = localStorage.getItem("times");
    const current: TimesData = stored ? JSON.parse(stored) : {};
    const updated = bookDateTimes(date, time, current, duration);
    localStorage.setItem("times", JSON.stringify(updated));
    router.push(`/${center}/appointment`);
  };

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className='flex flex-col gap-4 max-w-screen-xl mx-auto p-6 lg:p-10'>
      <h1 className='text-3xl font-bold font-montserrat mb-6'>Select time</h1>
      <div className='flex flex-row gap-4'>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 w-full mr-12'
        >
          <div className='flex flex-row gap-4'>
            <div className='w-full'>
              <label className='block text-sm font-medium'>First name</label>
              <input
                type='text'
                {...register("firstname")}
                className='w-full border p-2 rounded'
              />
              {errors.firstname && (
                <p className='text-red-500 text-sm'>
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div className='w-full'>
              <label className='block text-sm font-medium'>Last name</label>
              <input
                type='text'
                {...register("lastname")}
                className='w-full border p-2 rounded'
              />
              {errors.lastname && (
                <p className='text-red-500 text-sm'>
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium'>Email</label>
            <input
              type='email'
              {...register("email")}
              className='w-full border p-2 rounded'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>

          <Calendar />
          <Times date={date} />
        </form>
        <div className='sticky top-20 border border-gray-200 rounded-md p-4 w-[550px] flex flex-col justify-between max-h-[600px] p-6 hidden lg:flex'>
          <div className='flex flex-col'>
            <div className='flex flex-row gap-4'>
              <div className='relative h-[100px] w-[100px]'>
                <Image
                  src={currentCenter?.images[0] || "/images/default-image.png"}
                  alt={currentCenter?.name || ""}
                  fill
                  className='object-cover rounded-md'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-lg font-bold font-montserrat'>
                  {currentCenter?.name}
                </p>
                <div className='flex flex-row gap-2'>
                  <p className='text-sm font-montserrat'>
                    {currentCenter?.rating}
                  </p>
                  <StarIcon className='w-4 h-4' fill='black' />
                  <p className='text-sm font-montserrat'>
                    ({currentCenter?.reviews})
                  </p>
                </div>
                <p className='text-sm font-montserrat'>
                  {currentCenter?.address}
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-4 mt-4 font-montserrat'>
              <div className='flex flex-col gap-2 py-4'>
                {date && (
                  <p className='flex flex-row gap-2 text-sm font-medium text-gray-500 font-montserrat'>
                    <CalendarIcon className='w-5 h-5' />
                    {date}
                  </p>
                )}
                {time && (
                  <p className='flex flex-row gap-2 text-sm font-medium text-gray-500 font-montserrat'>
                    <ClockIcon className='w-5 h-5' />
                    {addTime(time, duration)} ({parseDuration(duration)})
                  </p>
                )}
              </div>
              {services.length > 0 ? (
                services.map((service: ServiceProps) => (
                  <div key={service.id} className='flex flex-col'>
                    <div className='flex flex-row gap-2 w-full justify-between'>
                      <p className='text-sm font-medium font-montserrat'>
                        {service.name}
                      </p>
                      <p className='text-sm font-medium font-montserrat'>
                        ${service.price}
                      </p>
                    </div>
                    <p className='text-sm font-medium font-montserrat'>
                      {service.time} min
                    </p>
                  </div>
                ))
              ) : (
                <p className='text-sm font-montserrat text-gray-500'>
                  No services selected
                </p>
              )}
            </div>
            <hr className='my-4' />
            <div className='flex flex-row gap-2 w-full justify-between'>
              <p className='text-sm font-montserrat font-bold'>Total</p>
              <p className='text-sm font-montserrat font-bold'>
                $
                {services.reduce((acc: number, service: ServiceProps) => {
                  return acc + service.price;
                }, 0)}
              </p>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button
              className='w-full mt-4 self-end cursor-pointer'
              type='submit'
              onClick={handleSubmit(onSubmit)}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
