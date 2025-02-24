import { createContext, useState } from "react";

export const LevelContext = createContext();

export function LevelProvider({ children }) {
    const [selectedLevel, setSelectedLevel] = useState("beginner");

    return (
        <LevelContext.Provider value={{ selectedLevel, setSelectedLevel }}>
            {children}
        </LevelContext.Provider>
    );
}
