import './Search.css'
import FiltersExercises from "../../components/filterExercises/FiltersExercises.jsx";
import FilteredExercisesList from "../../components/exerciseSelectionPanel/FilteredExercisesList.jsx";
import { useContext, useEffect, useCallback } from "react";
import { FiltersContext } from "../../context/filtersContext/FiltersContext.jsx";
import fetchExercisesByEquipment from "../../services/api/fetchExercises.js";
import useBackground from "../../hooks/useBackground.js";

function Search() {

    useBackground("highlights-background");

    /// Context
    const {
        selectedPrimaryMuscles,
        activeFilters,
        setExercises,
        filteredExercises,
        setFilteredExercises,
        selectedExercises,
        handleExerciseSelection
    } = useContext(FiltersContext);

    // Memoize the filtering function
    const filterExercises = useCallback(() => {
        if (activeFilters.exercises && activeFilters.exercises.length > 0) {
            const filtered = activeFilters.exercises.filter(exercise =>
                (activeFilters.selectedLevel === "all" || exercise.level === activeFilters.selectedLevel) &&
                (activeFilters.selectedEquipment === "all" || exercise.equipment === activeFilters.selectedEquipment) &&
                (activeFilters.selectedForce === "all" || exercise.force === activeFilters.selectedForce) &&
                (activeFilters.selectedMechanic === "all" || exercise.mechanic === activeFilters.selectedMechanic)
            );
            setFilteredExercises(filtered);
        } else {
            // Clear filtered exercises when there are no exercises in activeFilters
            // This handles the reset filters case
            setFilteredExercises([]);
        }
    }, [activeFilters, setFilteredExercises]);

    // API fetch when the selected muscles change or when filters are reset
    useEffect(() => {
        async function fetchData() {
            if (selectedPrimaryMuscles) {
                const data = await fetchExercisesByEquipment(selectedPrimaryMuscles);
                setExercises(data);
            } else {
                // When primary muscles selection is reset, clear exercises
                setExercises([]);
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPrimaryMuscles]); // removed setExercises from dependencies

    // Apply filtering when activeFilters changes
    useEffect(() => {
        filterExercises();
    }, [filterExercises]);

    return (
        <>
            <h1>Excercise finder</h1>
            <div className="outer-container-search">
                <FiltersExercises
                    className="filters-results"/>
                <FilteredExercisesList
                    pageId="page1"
                    className="filter-apply"
                    filteredExercises={filteredExercises}
                    selectedExercises={selectedExercises}
                    onExerciseSelection={handleExerciseSelection}
                />
            </div>
        </>
    )
}

export default Search