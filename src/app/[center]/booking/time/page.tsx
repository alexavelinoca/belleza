"use client";

import { CenterProps } from "@/lib/centers";
import { centers } from "@/lib/centers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ServiceProps } from "@/lib/services";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import Calendar from "@/components/Calendar";
import { Times } from "@/components/Times";
import { TimesData } from "@/app/api/bookDateTimes";
import { bookDateTimes } from "@/app/api/bookDateTimes";
import { useRouter } from "next/navigation";
import BookingSummaryCard from "@/components/Booking/BookingSummaryCard";

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
  const services = useUserSelectionsStore((state) => state.services);
  const duration = services.reduce((acc: number, service: ServiceProps) => {
    return acc + service.time;
  }, 0);
  const date = useUserSelectionsStore((state) => state.date);
  const time = useUserSelectionsStore((state) => state.time);
  const setFullName = useUserSelectionsStore((state) => state.setFullName);
  const setEmail = useUserSelectionsStore((state) => state.setEmail);

  useEffect(() => {
    const centerData = centers.find((c) => c.company === center);
    setCurrentCenter(centerData);
  }, [center]);

  const onSubmit = (data: AppointmentForm) => {
    const stored = localStorage.getItem("times");
    const current: TimesData = stored ? JSON.parse(stored) : {};
    const updated = bookDateTimes(date, time, current, duration);
    setFullName(data.firstname + " " + data.lastname);
    setEmail(data.email);
    localStorage.setItem("times", JSON.stringify(updated));
    router.push(`/${center}/appointment`);
  };

  const formRef = useRef<HTMLFormElement>(null);

  if (!currentCenter) {
    return <p className='text-center mt-10'>Center not found</p>;
  }

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
        <BookingSummaryCard
          center={currentCenter}
          services={services}
          date={date}
          time={time}
          duration={duration}
        />
      </div>
    </div>
  );
}
