import React from "react";
import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "React JS with cdn"),
    React.createElement(Pizza, {
      name: "Pepperoni",
      description: "A classic pizza with pepperoni slices",
    }),
    React.createElement(Pizza, {
      name: "Alfredo",
      description: "A creamy white sauce pizza with chicken and spinach",
    }),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
