import React, { useEffect, useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(-1);

  const handleCounter = () => {
    setIntervalId(
      setInterval(() => {
        setCount((prev) => (prev + 1) % 10);
      }, 1000)
    );
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntervalId(-1);
    setCount(0);
  };

  useEffect(() => {
    clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="counterWrapper">
        <h1>{count}</h1>
      </div>
      <div className="buttonWrapper">
        <button onClick={handleCounter}>Start</button>
        <button onClick={stopInterval}>Stop</button>
      </div>
    </>
  );
};

export default Counter;
