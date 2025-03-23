import './Search.css'
import FiltersExercises from "../../components/filterExercises/FiltersExercises.jsx";
import FilteredExercisesList from "../../components/ExerciseSelectionPanel/FilteredExercisesList.jsx";
import {useContext} from "react";
import {FiltersContext} from "../../context/filtersContext/FiltersContext.jsx";

function Search() {

    /// Context
    const {
        filteredExercises,
        selectedExercises,
        handleExerciseSelection
    } = useContext(FiltersContext)

    return (
        <>
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
