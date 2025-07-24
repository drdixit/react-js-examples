import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Order from "./Order";
import Header from "./Header";
import { CartContext } from "./contexts";

const App = () => {
  // a much simpler way of persisting carts to every page is just create a
  // cart state here and pass it to all of them
  // const [cart, setCart] = useState([]);
  // but we want to learn about context so we are going to use that

  // notice we are not destructuring
  const CartHook = useState([]);
  return (
    <StrictMode>
      {/* you can have components that don't really reader markup all they do is they act kind of as passthrough, but they augment the ability of the components inside of them */}
      {/* that's what this Provider is doing it's now making whatever the value we pass into it, it's gonna make available everyone inside of it.*/}
      {/* what's kind of cool about this is we are wrapping our whole app inside it but we could do something like this */}
      {/* where now only PizzaOfTheDay has access to this context */}
      {/* <CartContext.Provider> */}
      {/* <PizzaOfTheDay /> */}
      {/* </CartContext.Provider> */}
      {/* you can even have multiple cart contexts kind of layer out from each other */}
      {/* its gonna find the nearest one. So it's gonna find the closest one to it. */}
      {/* <CartContext.Provider value={2}> */}
      {/* <CartContext.Provider value={1}> */}
      {/* <PizzaOfTheDay /> it's gonna have value 1 because nearest one or closest to it */}
      {/* </CartContext.Provider> */}
      {/* </CartContext.Provider> */}
      {/* again you also thinking why would i do this, i am also asking why would you do that? */}
      {/* DON'T DO THAT but it's possible. it's why they had this kind of weird API. */}
      {/* so if you are watching this from React 19 go head and drop the Provider */}
      {/* and just use the CartContext directly <CartContext.Provider> is <CartContext> in React 19*/}
      <CartContext.Provider value={CartHook}>
        <div>
          <Header />
          {/* there is setter that is also automatically assigning in here */}
          {/* now we can call that with in order */}
          {/* we need to we have to set that hook from inside the order, or */}
          {/* else this whole kind of thing falls apart */}
          {/* does that mean you can set that hook from anywhere */}
          {/* yes you can and yes it's a foot gun */}
          {/* that's why you have to be careful with context */}
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
