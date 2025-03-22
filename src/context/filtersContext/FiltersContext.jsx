import { createContext, useState } from "react";

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
    // Active filters (applied when search is clicked)
    const [activeFilters, setActiveFilters] = useState({
        selectedPrimaryMuscles: null,
        selectedSecondaryMuscles: null,
        selectedLevel: "beginner",
        selectedEquipment: "barbell",
        selectedForce: "all",
        selectedMechanic: "all",
        exercises: []
    });

    // Current filter selections (not yet applied)
    const [pendingFilters, setPendingFilters] = useState({
        selectedPrimaryMuscles: null,
        selectedSecondaryMuscles: null,
        selectedLevel: "beginner",
        selectedEquipment: "barbell",
        selectedForce: "all",
        selectedMechanic: "all",
        exercises: []
    });

    // Helper function to update a pending filter
    const updatePendingFilter = (filterName, value) => {
        setPendingFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    // Helper functions for specific pending filters
    const setSelectedPrimaryMuscles = (value) => updatePendingFilter('selectedPrimaryMuscles', value);
    const setSelectedSecondaryMuscles = (value) => updatePendingFilter('selectedSecondaryMuscles', value);
    const setSelectedLevel = (value) => updatePendingFilter('selectedLevel', value);
    const setSelectedEquipment = (value) => updatePendingFilter('selectedEquipment', value);
    const setSelectedForce = (value) => updatePendingFilter('selectedForce', value);
    const setSelectedMechanic = (value) => updatePendingFilter('selectedMechanic', value);
    const setExercises = (value) => updatePendingFilter('exercises', value);

    // Apply the pending filters to become active
    const applyFilters = () => {
        setActiveFilters({...pendingFilters});
    };

    // Reset all filters to their default values
    const resetFilters = () => {
        const defaultFilters = {
            selectedPrimaryMuscles: null,
            selectedSecondaryMuscles: null,
            selectedLevel: "beginner",
            selectedEquipment: "barbell",
            selectedForce: "all",
            selectedMechanic: "all",
            exercises: []
        };

        setPendingFilters(defaultFilters);
        setActiveFilters(defaultFilters);
    };

    return (
        <FiltersContext.Provider
            value={{
                // Both filter states
                ...pendingFilters,
                activeFilters,

                // Setters for pending filters
                setSelectedPrimaryMuscles,
                setSelectedSecondaryMuscles,
                setSelectedLevel,
                setSelectedEquipment,
                setSelectedForce,
                setSelectedMechanic,
                setExercises,

                // Actions
                applyFilters,
                resetFilters,

                hasChanges: JSON.stringify(pendingFilters) !== JSON.stringify(activeFilters)
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
}