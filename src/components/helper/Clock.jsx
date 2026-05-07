import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  

  const secDeg = seconds * 6;
  const minDeg = minutes * 6;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="clock-wrapper">
      <div className="clock">
        <div className="center-dot"></div>

        {[...Array(12)].map((_, i) => (
          <p key={i} className={`number num-${i + 1}`}>
            {i + 1}
          </p>
        ))}

        <div
          className="h-hand"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        ></div>

        <div
          className="min-hand"
          style={{ transform: `rotate(${minDeg}deg)` }}
        ></div>

        <div
          className="second-hand"
          style={{ transform: `rotate(${secDeg}deg)`}}
        ></div>
      </div>
    </div>
  );
}