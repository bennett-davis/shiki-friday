"use client";

import { useState } from "react";

export default function CalendarButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Get next Friday at noon Central Time
  const getNextFriday = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 5 is Friday

    let daysUntilFriday;

    if (dayOfWeek === 5) {
      // If today is Friday, check if it's past noon
      if (now.getHours() >= 12) {
        daysUntilFriday = 7; // Next Friday
      } else {
        daysUntilFriday = 0; // Today
      }
    } else if (dayOfWeek < 5) {
      daysUntilFriday = 5 - dayOfWeek; // Days until this Friday
    } else {
      daysUntilFriday = 7 - dayOfWeek + 5; // Days until next Friday
    }

    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    nextFriday.setHours(12, 0, 0, 0); // Noon

    return nextFriday;
  };

  const formatDateForCalendar = (date: Date) => {
    // Convert to proper iCalendar format with time zone designator
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format as YYYYMMDDTHHMMSS
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const createCalendarUrl = () => {
    const startDate = getNextFriday();
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // 1 hour event

    const startDateFormatted = formatDateForCalendar(startDate);
    const endDateFormatted = formatDateForCalendar(endDate);

    // Determine if currently in Daylight Saving Time
    const isDST = () => {
      const jan = new Date(startDate.getFullYear(), 0, 1).getTimezoneOffset();
      const jul = new Date(startDate.getFullYear(), 6, 1).getTimezoneOffset();
      return Math.max(jan, jul) !== startDate.getTimezoneOffset();
    };

    // Central Time timezone ID
    const tzid = isDST() ? "America/Chicago" : "America/Chicago";

    const event = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART;TZID=${tzid}:${startDateFormatted}`,
      `DTEND;TZID=${tzid}:${endDateFormatted}`,
      "SUMMARY:Shiki Friday",
      "DESCRIPTION:Join us for Shiki Friday!",
      "LOCATION:Central Time",
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
