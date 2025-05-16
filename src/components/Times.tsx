"use client";
import { useState, useEffect } from "react";
import { fetchDateTimes } from "@/app/api/fetchDateTimes";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { bookDateTimes, TimesData } from "@/app/api/bookDateTimes";

export function Times({ date }: { date: string }) {
  const [times, setTimes] = useState<{ time: string; available: boolean }[]>(
    []
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { setTime } = useUserSelectionsStore();

  useEffect(() => {
    fetchDateTimes(date).then((times) =>
      setTimes(times as { time: string; available: boolean }[])
    );
  }, [date]);

  const handleClick = (time: string) => {
    setSelectedTime(time);
    setTime(time);
  };

  const availableTimes = times.filter((time) => time.available);

  return (
    <div className='mb-5'>
      {availableTimes.length > 0 ? (
        availableTimes.map((timeAvailable) => {
          const isSelected = selectedTime === timeAvailable.time;
          return (
            <div
              key={timeAvailable.time}
              className={`rounded-md p-4 w-full cursor-pointer mb-2 ${
                isSelected
                  ? "border-2 border-[#6950f3]"
                  : "border border-gray-200"
              }`}
              onClick={() => handleClick(timeAvailable.time)}
            >
              {timeAvailable.time}
            </div>
          );
        })
      ) : (
        <div className='text-center text-gray-600 border border-gray-200 rounded-md p-4 w-full cursor-pointer mb-2'>
          No times available
        </div>
      )}
    </div>
  );
}
