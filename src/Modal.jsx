// NEVER USE MODALS even learning about modal it is sin.
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// const Modal = (props) => { // we are destructuring here
const Modal = ({ children }) => {
  // el stands for element, a Ref is a frozen object we don't use a freeze too much it's usually a library thing.
  // it only has one thing that you can modify in it, which is current why is it this way?
  // because the Ref is an object we can modify the values on it, it's always going to refer to the same thing
  // like the pointer points to the same thing
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    // this has a memory leak and below is clean up function
    // whatever function that you return from effect that run once after it's get unmounted.
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // return createPortal(<div>{props.children}</div>, elRef.current); // other wise you do like this
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
