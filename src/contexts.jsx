// people do context in bunch of different patterns
// this is one way of doing context they create a single context file
// and they throw all of their contexts in here

import { createContext } from "react";

// if you have multiple contexts coming from the same file
// it's important you would do named exports
// export const CartContext = createContext();
// you can leave it like this and call it a day for the sake of
// may be your future typescript self and or future testing self
// it is useful for context to give it like this is the shape of what is going to be held
// inside of this context so we are gonna hold a hook in here
// that's what we are going to do, we are gonna hold a state that is both mutable and readable

// what's a return type of a hook it's an array
// and what's cart it's also an array and some function
// that's what a hook looks like
// const hook = [[], function () {}];
// so we are going to literally put that inside createContext

export const CartContext = createContext([[], function () {}]);
