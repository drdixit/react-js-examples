const pizza = (props) => {
    return React.createElement(
        "div", {}, [
        React.createElement("h1", {}, props.name),
        React.createElement("p", {}, props.description)
    ])
}
const App = () => {
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1", {}, "React JS with cdn"),
            React.createElement(pizza, {
                name: "Pepperoni",
                description: "A classic pizza with pepperoni slices"
            }),
            React.createElement(pizza, {
                name: "Alfredo",
                description: "A creamy white sauce pizza with chicken and spinach"
            }),
        ]
    );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));