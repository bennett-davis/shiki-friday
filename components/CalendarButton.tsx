"use client";

import { useState } from "react";

export default function CalendarButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Get next Friday at noon Central Time
  const getNextFriday = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 5 is Friday
    const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 + 5 - dayOfWeek;

    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    nextFriday.setHours(12, 0, 0, 0); // Noon

    return nextFriday;
  };

  const formatDateForCalendar = (date: Date) => {
    // Format: YYYYMMDDTHHMMSS
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const createCalendarUrl = () => {
    const startDate = getNextFriday();
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // 2 hour event

    const startDateFormatted = formatDateForCalendar(startDate);
    const endDateFormatted = formatDateForCalendar(endDate);

    const event = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${startDateFormatted}`,
      `DTEND:${endDateFormatted}`,
      "SUMMARY:Shiki Friday",
      "DESCRIPTION:Join us for Shiki Friday!",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    return `data:text/calendar;charset=utf8,${encodeURIComponent(event)}`;
  };

  return (
    <>
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .bounce-animation {
          animation: bounce 2s ease-in-out infinite;
        }
        .bounce-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
      <a
        href={createCalendarUrl()}
        download="shiki-friday.ics"
        className={`mt-8 px-6 py-3 rounded-full text-lg font-medium transition-all ${
          isHovered
            ? "bg-purple-600 text-white transform scale-105"
            : "bg-purple-500 text-white"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Add to Calendar
      </a>
    </>
  );
}
