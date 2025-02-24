import { createContext, useState } from "react";

export const EquipmentContext = createContext();

export function EquipmentProvider({ children }) {
    const [selectedEquipment, setSelectedEquipment] = useState("barbell");

    return (
        <EquipmentContext.Provider value={{ selectedEquipment, setSelectedEquipment }}>
            {children}
        </EquipmentContext.Provider>
    );
}