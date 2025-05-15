"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

// Hardcoded 14 días como ejemplo
const days = [
  { month: "May", date: "15", label: "Wed" },
  { month: "May", date: "16", label: "Thu" },
  { month: "May", date: "17", label: "Fri" },
  { month: "May", date: "18", label: "Sat" },
  { month: "May", date: "19", label: "Sun" },
  { month: "May", date: "20", label: "Mon" },
  { month: "May", date: "21", label: "Tue" },
  { month: "May", date: "22", label: "Wed" },
  { month: "May", date: "23", label: "Thu" },
  { month: "May", date: "24", label: "Fri" },
  { month: "May", date: "25", label: "Sat" },
  { month: "May", date: "26", label: "Sun" },
  { month: "May", date: "27", label: "Mon" },
  { month: "May", date: "28", label: "Tue" },
  { month: "May", date: "29", label: "Wed" },
  { month: "May", date: "30", label: "Thu" },
  { month: "May", date: "31", label: "Fri" },
  { month: "June", date: "1", label: "Sat" },
  { month: "June", date: "2", label: "Sun" },
  { month: "June", date: "3", label: "Mon" },
  { month: "June", date: "4", label: "Tue" },
  { month: "June", date: "5", label: "Wed" },
  { month: "June", date: "6", label: "Thu" },
  { month: "June", date: "7", label: "Fri" },
  { month: "June", date: "8", label: "Sat" },
  { month: "June", date: "9", label: "Sun" },
  { month: "June", date: "10", label: "Mon" },
  { month: "June", date: "11", label: "Tue" },
  { month: "June", date: "12", label: "Wed" },
  { month: "June", date: "13", label: "Thu" },
  { month: "June", date: "14", label: "Fri" },
  { month: "June", date: "15", label: "Sat" },
  { month: "June", date: "16", label: "Sun" },
  { month: "June", date: "17", label: "Mon" },
  { month: "June", date: "18", label: "Tue" },
  { month: "June", date: "19", label: "Wed" },
  { month: "June", date: "20", label: "Thu" },
  { month: "June", date: "21", label: "Fri" },
  { month: "June", date: "22", label: "Sat" },
  { month: "June", date: "23", label: "Sun" },
  { month: "June", date: "24", label: "Mon" },
  { month: "June", date: "25", label: "Tue" },
  { month: "June", date: "26", label: "Wed" },
  { month: "June", date: "27", label: "Thu" },
  { month: "June", date: "28", label: "Fri" },
  { month: "June", date: "29", label: "Sat" },
  { month: "June", date: "30", label: "Sun" },
  { month: "July", date: "1", label: "Mon" },
  { month: "July", date: "2", label: "Tue" },
  { month: "July", date: "3", label: "Wed" },
  { month: "July", date: "4", label: "Thu" },
  { month: "July", date: "5", label: "Fri" },
  { month: "July", date: "6", label: "Sat" },
];
const VISIBLE_DAYS = 9;

export default function Calendar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(days[0].month);
  const visibleDays = days.slice(startIndex, startIndex + VISIBLE_DAYS);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    setCurrentMonth(days[index].month);
    const container = containerRef.current;
    const child = container?.children[index] as HTMLElement;
    if (container && child) {
      container.scrollTo({
        left: child.offsetLeft,
        behavior: "smooth",
      });
    }
  };

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
        <h4 className='text-lg font-semibold'>{currentMonth} 2025</h4>
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
          if (day.date === "17") {
            console.log("day", day, i);
          }
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
