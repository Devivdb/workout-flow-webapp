import { createContext, useState } from "react";

export const ExercisesContext = createContext();

export function ExercisesProvider({ children }) {
    const [exercises, setExercises] = useState([]);

    return (
        <ExercisesContext.Provider value={{ exercises, setExercises }}>
            {children}
        </ExercisesContext.Provider>
    );
}