//They are in this kind of weird state where they're not recommended, but they are not deprecated
import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  state = { hasError: false };
  // static method means you can directly do ErrorBoundary.getDerivedStateFromError()
  // it works directly on instantiated class as opposed to everything else is an instant method
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  // this is called life cycle methods
  // ex componentDidMount, componentWillUnmount, componentDidUpdate
  // componentDidMount is equal to useEffect with empty array
  // componentWillUnmount is equal to useEffect with return function it runs once at the end
  // componentDidUpdate is equal to useEffect with dependencies it runs every time when component changes
  // there is also constructor
  // if you ever have to do something when the component is very first created
  //   constructor(props) {
  //     super(props);
  //   }
  componentDidCatch(error, info) {
    // send to TrackJS/Sentry you can log your errors here
    console.error("ErrorBoundary caught some stupid error", error, info);
  }
  // every react Class Component has render function everything else is totally optional but it must have render function
  // and the render() is like 95% as the same thing like normal react component function body
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this page.<Link to="/">Click Here</Link> to
            go back to the home page.
          </p>
        </div>
      );
    }
    return this.props.children;
    // return this.props.children is saying if there is no error be invisible, don't show me anything
    // <ErrorBoundary>
    //     <h1>hi!</h1>
    // </ErrorBoundary>
  }
}

export default ErrorBoundary;
