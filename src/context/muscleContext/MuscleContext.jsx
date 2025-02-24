import { createContext, useState } from "react";

export const MuscleContext = createContext();

export function MuscleProvider({ children }) {
    const [selectedMuscle, setSelectedMuscle] = useState(null);

    return (
        <MuscleContext.Provider value={{ selectedMuscle, setSelectedMuscle }}>
            {children}
        </MuscleContext.Provider>
    );
}
