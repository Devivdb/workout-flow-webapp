import "./ExerciseSelectionPanel.css";
import { useContext, useEffect } from "react";

import FilteredExercisesList from './FilteredExercisesList.jsx';
import SelectedExercisesList from './SelectedExercisesList.jsx';
import ExerciseDetailPanel from './ExerciseDetailPanel.jsx';
import {FiltersContext} from "../../context/filtersContext/FiltersContext.jsx";

function PopUpSelection() {
    //TODO: Add export buttons for PDF, CSV and JSON

    /// Context
    const {
        activeFilters,
        filteredExercises,
        setFilteredExercises,
        selectedExercises,
        activeExercise,
        setsData,
        handleExerciseSelection,
        handleDeleteExercise,
        handleSelectedExerciseClick,
        handleAddSet,
        handleInputChange,
        handleDeleteSet
    } = useContext(FiltersContext);

    /// Hook
    useEffect(() => {
        const filtered = activeFilters.exercises.filter(exercise =>
            (activeFilters.selectedLevel === "all" || exercise.level === activeFilters.selectedLevel) &&
            (activeFilters.selectedEquipment === "all" || exercise.equipment === activeFilters.selectedEquipment) &&
            (activeFilters.selectedForce === "all" || exercise.force === activeFilters.selectedForce) &&
            (activeFilters.selectedMechanic === "all" || exercise.mechanic === activeFilters.selectedMechanic)
        );

        setFilteredExercises(filtered);
    }, [activeFilters, setFilteredExercises]);


    useEffect(() => {
        if (activeExercise) {
            const exercises = document.querySelectorAll('.selectable-exercise');
            exercises.forEach(exercise => {
                exercise.classList.remove('active');
            });

            const clickedExercise = Array.from(exercises).find(
                element => element.textContent.includes(activeExercise)
            );

            if (clickedExercise) {
                clickedExercise.classList.add('active');
            }
        }
    }, [activeExercise]);

    return (
        <>
            <FilteredExercisesList
                filteredExercises={filteredExercises}
                selectedExercises={selectedExercises}
                onExerciseSelection={handleExerciseSelection}
            />

            <SelectedExercisesList
                selectedExercises={selectedExercises}
                activeExercise={activeExercise}
                onExerciseClick={handleSelectedExerciseClick}
                onDeleteExercise={handleDeleteExercise}
            />

            <ExerciseDetailPanel
                activeExercise={activeExercise}
                selectedExercises={selectedExercises}
                setsData={setsData}
                onAddSet={handleAddSet}
                onInputChange={handleInputChange}
                onDeleteSet={handleDeleteSet}
            />
        </>
    );
}

export default PopUpSelection;