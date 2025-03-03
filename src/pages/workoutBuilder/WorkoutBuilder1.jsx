import "./WorkoutBuilder1.css";
import useBackground from "../../hooks/useBackground.js";
import {useContext, useEffect} from "react";
import fetchExercisesByEquipment from "../../services/api/fetchExercises.js";
import FiltersExercises from "../../components/filterExercises/FiltersExercises.jsx";
import PopUpSelection from "../../components/popUpSelection/PopUPSelection.jsx";
import {FiltersContext} from "../../context/filtersContext/FiltersContext.jsx";


function WorkoutBuilder1() {

    ///////////////////// Background
    useBackground("workout-builder-background");

    /// Context
    const {
        selectedPrimaryMuscles,
        setExercises,
        resetFilters
    } = useContext(FiltersContext)

    ///////////////////// API fetch
    useEffect(() => {
        async function fetchData() {
            const data = await fetchExercisesByEquipment(selectedPrimaryMuscles);
            setExercises(data);
        }

        fetchData();
    }, [selectedPrimaryMuscles]);

    return (
        <>
            <div className="workout-builder-container">
                <FiltersExercises className="con"/>
                <PopUpSelection/>
            </div>
        </>
    );
}

export default WorkoutBuilder1;