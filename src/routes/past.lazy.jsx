import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";

export const Route = createLazyFileRoute("/past")({
  component: PastOrdersRoute,
});

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
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
    staleTime: 30000,
  });
  if (isLoading) {
    return (
      <div className="past-orders">
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
              <td>{order.order_id}</td>
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
    </div>
  );
}
