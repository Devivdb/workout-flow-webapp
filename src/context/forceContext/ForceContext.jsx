import { createContext, useState } from "react";

export const ForceContext = createContext();

export function ForceProvider({ children }) {
    const [selectedForce, setSelectedForce] = useState("all");

    return (
        <ForceContext.Provider value={{ selectedForce, setSelectedForce }}>
            {children}
        </ForceContext.Provider>
    );
}