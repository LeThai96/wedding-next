'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-light">{timeLeft.days}</div>
        <div className="text-gray-600 mt-2">Days</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-light">{timeLeft.hours}</div>
        <div className="text-gray-600 mt-2">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-light">{timeLeft.minutes}</div>
        <div className="text-gray-600 mt-2">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-light">{timeLeft.seconds}</div>
        <div className="text-gray-600 mt-2">Seconds</div>
      </div>
    </div>
  );
} 