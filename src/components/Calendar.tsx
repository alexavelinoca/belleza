"use client";

import useUserSelectionsStore from "@/store/userSelectionsStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  VISIBLE_DAYS,
  SMALL_SCREEN_VISIBLE_DAYS,
  MONTHS,
} from "@/lib/constants";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import { days } from "@/lib/days";

export default function Calendar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setDate, resetTime, setTime } = useUserSelectionsStore();

  const normalize = (date: Date, index: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const futureDays = days.filter((day) => {
    const currentDate = normalize(new Date(), 0);
    const dayDate = normalize(
      new Date(
        `${day.year}-${MONTHS[day.month]}-${String(day.date).padStart(2, "0")}`
      ),
      1
    );
    return dayDate >= currentDate;
  });

  const isSmallScreen = useIsSmallScreen();

  const visibleDays = useMemo(() => {
    const count = isSmallScreen ? SMALL_SCREEN_VISIBLE_DAYS : VISIBLE_DAYS;
    return futureDays.slice(startIndex, startIndex + count);
  }, [futureDays, startIndex, isSmallScreen]);

  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (futureDays.length > 0 && selectedIndex === 0) {
      handleClick(0);
    }
  }, [futureDays.length]);

  const handleClick = (index: number) => {
    const selected = futureDays[index];
    if (!selected) return;

    resetTime();
    setTime("");
    setSelectedIndex(index);

    const formattedDate = `${String(selected.year).padStart(4, "0")}-${String(
      selected.month
    ).padStart(2, "0")}-${String(selected.date).padStart(2, "0")}`;
    setDate(formattedDate);

    const element = itemRefs.current[index];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    if (
      selectedIndex < startIndex ||
      selectedIndex >= startIndex + visibleDays.length
    ) {
      if (visibleDays.length > 0) {
        handleClick(startIndex);
      }
    }
  }, [startIndex, visibleDays.length]);

  const handleLeft = () => {
    if (startIndex > 0) setStartIndex(startIndex - 7);
  };

  const handleRight = () => {
    if (startIndex + VISIBLE_DAYS < futureDays.length)
      setStartIndex(startIndex + 7);
  };

  const selectedDay = futureDays[selectedIndex];
  if (!selectedDay) return null;

  if (!futureDays.length) {
    return <div className='text-center text-gray-400'>No days available</div>;
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4 w-full justify-between'>
        <h4 className='text-lg font-semibold'>
          {selectedDay?.month} {selectedDay?.year}
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
              ref={(el) => {
                itemRefs.current[realIndex] = el;
              }}
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
