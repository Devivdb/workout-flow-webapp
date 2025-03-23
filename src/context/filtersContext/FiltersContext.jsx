import { createContext, useState } from "react";

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
    const [activeFilters, setActiveFilters] = useState({
        selectedPrimaryMuscles: null,
        selectedSecondaryMuscles: null,
        selectedLevel: "beginner",
        selectedEquipment: "barbell",
        selectedForce: "all",
        selectedMechanic: "all",
        exercises: []
    });

    const [pendingFilters, setPendingFilters] = useState({
        selectedPrimaryMuscles: null,
        selectedSecondaryMuscles: null,
        selectedLevel: "beginner",
        selectedEquipment: "barbell",
        selectedForce: "all",
        selectedMechanic: "all",
        exercises: []
    });

    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [setsData, setSetsData] = useState({});
    const [activeExercise, setActiveExercise] = useState(null);

    const updatePendingFilter = (filterName, value) => {
        setPendingFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    const setSelectedPrimaryMuscles = (value) => updatePendingFilter('selectedPrimaryMuscles', value);
    const setSelectedSecondaryMuscles = (value) => updatePendingFilter('selectedSecondaryMuscles', value);
    const setSelectedLevel = (value) => updatePendingFilter('selectedLevel', value);
    const setSelectedEquipment = (value) => updatePendingFilter('selectedEquipment', value);
    const setSelectedForce = (value) => updatePendingFilter('selectedForce', value);
    const setSelectedMechanic = (value) => updatePendingFilter('selectedMechanic', value);
    const setExercises = (value) => updatePendingFilter('exercises', value);

    const applyFilters = () => {
        setActiveFilters({...pendingFilters});
    };

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

    const handleExerciseSelection = (exercise) => {
        setSelectedExercises(prev => {
            const isSelected = prev.some(ex => ex.name === exercise.name);

            if (isSelected) {
                return prev.filter(ex => ex.name !== exercise.name);
            } else {
                return [...prev, {
                    name: exercise.name,
                    equipment: exercise.equipment,
                    secondaryMuscles: exercise.secondaryMuscles,
                    primaryMuscles: exercise.primaryMuscles,
                    level: exercise.level,
                    force: exercise.force,
                    mechanic: exercise.mechanic,
                    instructions: exercise.instructions
                }];
            }
        });
    };

    const handleDeleteExercise = (exerciseName) => {
        setSelectedExercises(prev => prev.filter(ex => ex.name !== exerciseName));

        setSetsData(prev => {
            const { [exerciseName]: _, ...rest } = prev;
            return rest;
        });

        if (activeExercise === exerciseName) {
            setActiveExercise(null);
        }
    };

    const handleSelectedExerciseClick = (exerciseName) => {
        setActiveExercise((prev) => (prev === exerciseName ? null : exerciseName));
    };

    const handleAddSet = (exerciseName) => {
        setSetsData((prev) => ({
            ...prev,
            [exerciseName]: [...(prev[exerciseName] || []), { reps: "", weight: "" }]
        }));
    };

    const handleInputChange = (exerciseName, setIndex, field, value) => {
        setSetsData((prev) => ({
            ...prev,
            [exerciseName]: prev[exerciseName].map((set, index) =>
                index === setIndex ? { ...set, [field]: value } : set
            )
        }));
    };

    const handleDeleteSet = (exerciseName, setIndex) => {
        setSetsData((prev) => {
            const updatedSets = prev[exerciseName].filter((_, index) => index !== setIndex);
            return {
                ...prev,
                [exerciseName]: updatedSets,
            };
        });
    };

    const shouldShowInstructions = (pageId) => {
        return pageId === "page1";
    };

    return (
        <FiltersContext.Provider
            value={{
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

                hasChanges: JSON.stringify(pendingFilters) !== JSON.stringify(activeFilters),

                // Exercise selection state
                filteredExercises,
                setFilteredExercises,
                selectedExercises,
                activeExercise,
                setsData,

                // Exercise selection handlers
                handleExerciseSelection,
                handleDeleteExercise,
                handleSelectedExerciseClick,
                handleAddSet,
                handleInputChange,
                handleDeleteSet,

                // Page id
                shouldShowInstructions
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
}