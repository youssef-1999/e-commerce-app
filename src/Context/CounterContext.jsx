import { createContext, useState } from "react";

// Create the CounterContext with an initial value of 0
export const CounterContext = createContext(0);

// eslint-disable-next-line react/prop-types
export default function CounterContextProvider({ children }) {
    const [counter, setCounter] = useState(0);
    
    return (
        <CounterContext.Provider value={{ counter, setCounter }}>
            {children}
        </CounterContext.Provider>
    );
}

 
