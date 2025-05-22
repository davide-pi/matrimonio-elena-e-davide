import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center space-x-2 md:space-x-4">
      <CountdownItem value={timeLeft.days} label="countdown.days" />
      <CountdownDivider />
      <CountdownItem value={timeLeft.hours} label="countdown.hours" />
      <CountdownDivider />
      <CountdownItem value={timeLeft.minutes} label="countdown.minutes" />
      <CountdownDivider />
      <CountdownItem value={timeLeft.seconds} label="countdown.seconds" />
    </div>
  );
};

const CountdownItem: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center animate-pulse">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md w-16 md:w-24 h-16 md:h-24 flex items-center justify-center border border-sage-200">
        <span className="text-2xl md:text-4xl font-bold text-sage-800">{value}</span>
      </div>
      <span className="text-xs md:text-sm mt-2 text-sage-700">{t(label)}</span>
    </div>
  );
};

const CountdownDivider: React.FC = () => {
  return (
    <div className="text-xl md:text-3xl font-bold text-sage-600">:</div>
  );
};

export default CountdownTimer;