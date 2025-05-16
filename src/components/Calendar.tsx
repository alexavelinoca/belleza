"use client";
import { days } from "@/lib/days";
import { times } from "@/lib/times";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VISIBLE_DAYS = 9;

export default function Calendar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(days[0].month);
  const [currentYear, setCurrentYear] = useState(days[0].year);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setDate } = useUserSelectionsStore();

  const normalize = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const futureDays = days.filter((day) => {
    const currentDate = normalize(new Date());
    const dayDate = normalize(new Date(`${day.year}-${day.month}-${day.date}`));
    return dayDate >= currentDate;
  });

  const visibleDays = futureDays.slice(startIndex, startIndex + VISIBLE_DAYS);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    setCurrentMonth(days[index].month);
    setCurrentYear(days[index].year);
    setDate(
      `${days[index].year}-${days[index].month}-${Number(days[index].date) + 1}`
    );
    const container = containerRef.current;
    const child = container?.children[index] as HTMLElement;
    if (container && child) {
      container.scrollTo({
        left: child.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleClick(selectedIndex);
  }, [selectedIndex]);

  const handleLeft = () => {
    if (startIndex > 0) setStartIndex(startIndex - 7);
  };

  const handleRight = () => {
    console.log("startIndex", startIndex);
    if (startIndex + VISIBLE_DAYS < days.length) setStartIndex(startIndex + 7);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4 w-full justify-between'>
        <h4 className='text-lg font-semibold'>
          {currentMonth} {currentYear}
        </h4>
        <div className='flex flex-row gap-4'>
          <ChevronLeft
            className='cursor-pointer rounded-lg  w-5 h-5'
            onClick={handleLeft}
          />
          <ChevronRight
            className='cursor-pointer rounded-lg  w-5 h-5'
            onClick={handleRight}
          />
        </div>
      </div>
      <div
        ref={containerRef}
        className='flex gap-5 overflow-x-auto no-scrollbar px-2 pb-2'
      >
        {visibleDays.map((day, i) => {
          const realIndex = startIndex + i;
          const isSelected = realIndex === selectedIndex;
          return (
            <div
              key={realIndex}
              className='flex flex-col items-center min-w-[56px] cursor-pointer'
              onClick={() => handleClick(realIndex)}
            >
              <div
                className={`text-lg font-semibold rounded-full w-16 h-16 flex items-center justify-center border transition ${
                  isSelected
                    ? "bg-[#6950f3] text-white border-none"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {day.date}
              </div>
              <span className='text-sm mt-1 text-center'>{day.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
