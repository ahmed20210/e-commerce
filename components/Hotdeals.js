import React, { useEffect, useState} from 'react'

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
    <ul className="flex items-center justify-around text-sm  bg-slate-100 border border-slate-300 rounded-md p-3 px-4">
      {timer().map((time, index) => (
        <li
          key={index}
          className={
           " text-center flex flex-col"
          }
        >
          <span className="font-bold text-xl">{time.value}</span>
          <span>{time.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default Hotdeals