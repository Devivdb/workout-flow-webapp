import { createContext, useState } from "react";

export const MechanicContext = createContext();

export function MechanicProvider({ children }) {
    const [selectedMechanic, setSelectedMechanic] = useState("all");

    return (
        <MechanicContext.Provider value={{ selectedMechanic, setSelectedMechanic }}>
            {children}
        </MechanicContext.Provider>
    );
}
