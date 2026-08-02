"use client";

import { useEffect, useState } from "react";

const clubText = 
"Founded in 2003 by undergraduate students Harish Mohan and Anup Nair, QuizInc is the official quiz club of NIT Durgapur. For over two decades, the club has created a platform where curiosity, knowledge and competition come together. Through quizzes, treasure hunts, fandom competitions, collaborations and outreach initiatives, QuizInc continues to encourage critical thinking and learning beyond the classroom."

export default function TypewriterText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= clubText.length) return;

    const timer = setTimeout(() => {
      // Add multiple characters at once
      setIndex((prev) => Math.min(prev + 10, clubText.length));
    }, 8);

    return () => clearTimeout(timer);
  }, [index]);

    return (
      <div className="mt-8 w-full max-w-2xl min-h-[120px]">
        <p className="text-left text-sm font-medium leading-relaxed tracking-wide text-rose-100/80 sm:text-base md:text-lg">
          {clubText.slice(0, index)}

          <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-red-400 align-middle" />
        </p>
      </div>
    );
}