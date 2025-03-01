import { createContext, useState } from "react";

export const PrimaryMusclesContext = createContext();

export function PrimaryMusclesProvider({ children }) {
    const [selectedPrimaryMuscles, setSelectedPrimaryMuscles] = useState(null);

    return (
        <PrimaryMusclesContext.Provider value={{ selectedPrimaryMuscles, setSelectedPrimaryMuscles }}>
            {children}
        </PrimaryMusclesContext.Provider>
    );
}