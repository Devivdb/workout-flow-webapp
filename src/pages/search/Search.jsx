import './Search.css'
import FiltersExercises from "../../components/filterExercises/FiltersExercises.jsx";
import FilteredExercisesList from "../../components/ExerciseSelectionPanel/FilteredExercisesList.jsx";
import {useContext} from "react";
import {FiltersContext} from "../../context/filtersContext/FiltersContext.jsx";

function Search() {

    // TODO Make a new state for Search to be able to select the filters and see the result of the filters
    //TODO With new state make sure the filters have a default value

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
