// this is a custom hook this a concept that people kind a associate with React
// but it's just a function that calls other hooks
import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  // purely for debugging purposes
  // useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.id}` : "Loading...");
  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      //   await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await fetch("/api/pizza-of-the-day");
      const data = await response.json();
      setPizzaOfTheDay(data);
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
