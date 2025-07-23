// const Pizza = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("p", {}, props.description),
//   ]);
// };

const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <img src={props.image} alt={props.name} />
    </div>
  );
};

export default Pizza;

// Named export
// usage ~ import { Pizza } from "./Pizza";
//
// export const Pizza = (props) => {
//   return (
//     <div className="pizza">
//       <h1>{props.name}</h1>
//       <p>{props.description}</p>
//     </div>
//   );
// };
// why we want to do named exports? because we can have multiple named exports
// ex i can import { Pizza, Burger } from "./Pizza"; two or multiple things over there
