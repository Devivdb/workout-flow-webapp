import './Search.css'
import FiltersExercises from "../../components/filterExercises/FiltersExercises.jsx";
import FilteredExercisesList from "../../components/exerciseSelectionPanel/FilteredExercisesList.jsx";
import { useContext, useEffect, useCallback } from "react";
import { FiltersContext } from "../../context/filtersContext/FiltersContext.jsx";
import fetchExercisesByEquipment from "../../services/api/fetchExercises.js";
import useBackground from "../../hooks/useBackground.js";

function Search() {
    useBackground("highlights-background");


    const {
        selectedPrimaryMuscles,
        activeFilters,
        setExercises,
        filteredExercises,
        setFilteredExercises,
        selectedExercises,
        handleExerciseSelection
    } = useContext(FiltersContext);

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
            setFilteredExercises([]);
        }
    }, [activeFilters, setFilteredExercises]);

    useEffect(() => {
        async function fetchData() {
            if (selectedPrimaryMuscles) {
                const data = await fetchExercisesByEquipment(selectedPrimaryMuscles);
                setExercises(data);
            } else {
                setExercises([]);
            }
        }

        fetchData();
    }, [selectedPrimaryMuscles]);

    useEffect(() => {
        filterExercises();
    }, [filterExercises]);

    return (
        <>
            <div className="search-page outer-container-search">
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