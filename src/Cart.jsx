// another price formatter (it's browser's built-in ability)
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// basic of programming
// cart is immutable, because it came from parent so we can't say cart = cart.push() or something like that
// this is not gonna do anything because the cart of the parent is separated from the cart of the child
// another word is, this is what's called one way data flow.
// data only flows down on the components and never flows up
// NOTE: the only way the child component can effect the parent component is through something like
// checkout when you pass a function down from the parent to the child
// hey child when you want to effect the parent call this function
// Cart is it's own incapsulated component, this is different from useState
// which is the mutable part of the child that it can modify itself
// A component can only modify its own state, it can't modify it's child state or it's parent state
// in another words, this components are self incapsulated
export default function Cart({ cart, checkout }) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      {/* this is forbidden thing we are doing, we are using index as key */}
      {/* why? because none of the things in our cart are guaranteed unique */}
      {/* this is specific case where is using index as the key is what you supposed to do */}
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> -
            <span className="type">{item.pizza.name}</span> -
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
