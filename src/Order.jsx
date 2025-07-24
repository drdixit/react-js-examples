import { useEffect, useState } from "react";
import Pizza from "./Pizza";
import Cart from "./Cart";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);

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
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   { cart } is same as saying cart:cart if both names are the same
      body: JSON.stringify({ cart }),
    });

    setCart([]);
    setLoading(false);
  }

  // this are not hooks despite the fact that are mutable
  // this is because its kind a derivative state (vue has concepts of derivative states, may be svelte has it too)
  // doesn't exist in react you just keep track on normal variables
  // price is going to be whatever selected pizza's price is
  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(selectedPizza.sizes[pizzaSize]);
  }

  async function fetchPizzaTypes() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  // i need to do like outside of render cycle
  // i have my renders and i have things that need to happen outside of renders.
  // i want to kind of control when that happens
  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  // fetchPizzaTypes();
  // its a bad idea to call it directly here because
  // because it would run every single time when the component rendered
  // basically you are DDosing your self
  // i only do it once when the components loads the answer is useEffect

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                onChange={(e) => setPizzaType(e.target.value)}
                name="pizza-type"
                value={pizzaType}
              >
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
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
          </div>
          {loading ? (
            <h1>loading pizza</h1>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {loading ? <h2>Loading..</h2> : <Cart checkout={checkout} cart={cart} />}
    </div>
  );
}
