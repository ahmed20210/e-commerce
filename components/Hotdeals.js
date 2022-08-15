import React, { useEffect, useState} from 'react'

import afterEffect from "../styles/afterEffect.module.css";
function Hotdeals() {
  const [time, changeTime] = useState(538400);
  const timer = () => {
    const days = Math.floor(time / (60 * 60 * 24));
    const hours = Math.floor(time / (60 * 60)) % 24;
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60

    return [
        {
            name: "days",
            value: days
        },
        {
            name: "hours",
            value: hours
        },
        {
            name: "minutes",
            value: minutes
        },
        {
            name: "seconds",
            value: seconds
        }
    ]
  };
  useEffect(() => {
const interval = setInterval(() => {
  changeTime(time - 1);
}, 1000);
return () => {
    clearInterval(interval);
    }
    }, [time]);
  return (
    <div className="flex lg:justify-between justify-evenly text-sm p-5 bg-slate-100 border-1 border-slate-300 rounded-md max-w-full">
      {timer().map((time, index) => (
        <div
          key={index}
          className={
           "relative text-center"
          }
        >
          <span className="font-bold text-xl">{time.value}</span>
          <br />
          <span>{time.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Hotdeals