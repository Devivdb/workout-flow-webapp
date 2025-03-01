import { createContext, useState } from "react";

export const SecondaryMusclesContext = createContext();

export function SecondaryMusclesProvider({ children }) {
    const [selectedSecondaryMuscles, setSelectedSecondaryMuscles] = useState(null);

    return (
        <SecondaryMusclesContext.Provider value={{ selectedSecondaryMuscles, setSelectedSecondaryMuscles }}>
            {children}
        </SecondaryMusclesContext.Provider>
    );
}