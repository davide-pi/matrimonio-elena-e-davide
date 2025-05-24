import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface CountdownTimerProps {
  targetDate: Date;
  size?: "sm" | "md" | "lg";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  size = "md",
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = Math.abs(targetDate.getTime() - new Date().getTime());

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
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
    <div
      className={`flex justify-center items-center space-x-2 md:space-x-4 ${size === "sm" ? "scale-75" : size === "lg" ? "scale-110" : ""}`}
    >
      <CountdownItem value={timeLeft.days} label="countdown.days" size={size} />
      <CountdownDivider />
      <CountdownItem
        value={timeLeft.hours}
        label="countdown.hours"
        size={size}
      />
      <CountdownDivider />
      <CountdownItem
        value={timeLeft.minutes}
        label="countdown.minutes"
        size={size}
      />
      <CountdownDivider />
      <CountdownItem
        value={timeLeft.seconds}
        label="countdown.seconds"
        size={size}
      />
    </div>
  );
};

const CountdownItem: React.FC<{
  value: number;
  label: string;
  size?: "sm" | "md" | "lg";
}> = ({ value, label, size = "md" }) => {
  const { t } = useTranslation();

  const boxSize =
    size === "sm"
      ? "w-10 h-10 md:w-14 md:h-14"
      : size === "lg"
        ? "w-20 h-20 md:w-28 md:h-28"
        : "w-16 md:w-24 h-16 md:h-24";
  const textSize =
    size === "sm"
      ? "text-lg md:text-2xl"
      : size === "lg"
        ? "text-4xl md:text-6xl"
        : "text-2xl md:text-4xl";
  const labelSize =
    size === "sm"
      ? "text-[10px] md:text-xs"
      : size === "lg"
        ? "text-base md:text-lg"
        : "text-xs md:text-sm";

  return (
    <div className="flex flex-col items-center animate-pulse">
      <div
        className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-md ${boxSize} flex items-center justify-center border border-sage-200`}
      >
        <span className={`${textSize} font-bold text-sage-800`}>{value}</span>
      </div>
      <span className={`${labelSize} mt-2 text-sage-700`}>{t(label)}</span>
    </div>
  );
};

const CountdownDivider: React.FC = () => {
  return <div className="text-xl md:text-3xl font-bold text-sage-600">:</div>;
};

export default CountdownTimer;
