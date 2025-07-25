import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
// import useCurrency from "../useCurrency";
import { priceConverter } from "../useCurrency";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  //   component: PastOrdersRoute,
  component: ErrorBoundaryWrappedPastOrdersRoute,
});

function ErrorBoundaryWrappedPastOrdersRoute() {
  return (
    // ErrorBoundary can only catch things that are rendered inside of it
    // so if it's on the same level as the component it won't catch it. it wouldn't get the opportunity to catch the error. so it has to be outside of it
    // which is why we have to have two components here and we are actually shipping the ErrorBoundaryWrapped... one
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}
// you can put root inside ErrorBoundary advantages of putting it inside the app is you can catch 404 errors
// what if we want to pass a props to it we can so something like this
// function ErrorBoundaryWrappedPastOrdersRoute(props) {
//   return (
//     <ErrorBoundary>
//       <PastOrdersRoute {...props} />
//     </ErrorBoundary>
//   );
// }
// why don't we use spread operator
// ex props {
// stuff: "cool",
// otherStuff: "not cool"}
// function ErrorBoundaryWrappedPastOrdersRoute(props) {
//   return (
//     <ErrorBoundary>
//       this one is way readable you want to be explicit about what you are passing for sack of your future self
//       you make it pretty opaque like what is coming from where and where is it going
//       <PastOrdersRoute stuff={props.stuff} otherStuff={props.otherStuff} />
//             vs
//       the only reason in this particular case that i am okay with using spread operator
//       is that because this perticular component is meant to be a passthrough. it's actually not meant to know about what's coming into it and where it's going
//       <PastOrdersRoute {...props} />
//     </ErrorBoundary>
//   );
// }

function PastOrdersRoute() {
  //   throw new Error("This is a test error for the ErrorBoundary component!");
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState();
  const { isLoading, data } = useQuery({
    // you kind a give out this query keys and it's like how it stores it in the cache
    // and then later, you can say, i am looking for the past-orders, and then i am looking for a page
    // both past-orders and page is a unique thing to this query
    // so it knows later when you go like hey i am looking for past-orders page 2
    // it's be like i have seen that before here you go or i have never seen this before
    // or i seen this before but my cache is stale so i am gonna go get it again
    // that's what this queryKey is for it's for it's for the name of the key in cache.
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    // staleTime is like automatically refetching the data
    staleTime: 30000,
  });

  // below we are just renaming to isLoading to isLoadingPastOrder
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 86400000, // one day in milliseconds
    // its going to go and try and request a focused order for something that doesn't exist yet
    // so how do we prevent it from doing that we only want to request something if there is focusedOrder
    // if there is no focusedOrder we don't want to do anything
    // turns out they thought of that kind a cool
    // if there is an focusedOrder then you go out and grab something if there is not then you won't
    // !! means this is turn into boolean
    // it's doing type conversion right here as opposed to letting tanstack query do it
    enabled: !!focusedOrder,
  });
  if (isLoading) {
    return (
      <div>
        <h2>LOADING...</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>DATE</td>
            <td>TIME</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{priceConverter(pizza.price)}</td>
                    <td>{priceConverter(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={() => setFocusedOrder(null)}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
