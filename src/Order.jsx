import { useState } from "react";
import Pizza from "./Pizza";

export default function Order() {
  //   const pizzaType = "pepperoni";
  //   const pizzaSize = "M";

  // it's just an array, we can destructure it
  //   const [pizzaType, setPizzaType] = useState("pepperoni");
  // this one line is equivalent of these three lines
  //   const pizzaHook = useState("lol");
  //   const pizzaType = pizzaHook[0];
  //   const setPizzaType = pizzaHook[1];

  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              <option value="pepperoni">The Pepperoni Pizza</option>
              <option value="hawaiian">The Hawaiian Pizza</option>
              <option value="big_meat">The Big Meat Pizza</option>
            </select>
          </div>
          {/* in theory event bubbling still works in react but don't do it like this */}
          {/* <div onChange={(e) => setPizzaSize(e.target.value)}> */}
          {/* we have one event listener on parent element react doesn't like this because it's views as inaccessible */}
          {/* generally you don't want change handlers on a div */}
          {/* because screen readers and all that kind of stuff can't access divs
          they access inputs */}
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "S"}
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "M"}
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "L"}
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add To Cart</button>
          <div className="order-pizza">
            <Pizza
              name="Pepperoni Pizza"
              description="A classic pizza with pepperoni and cheese."
              image={"/public/pizzas/pepperoni.webp"}
            />
            <p>$13.37</p>
          </div>
        </div>
      </form>
    </div>
  );
}
